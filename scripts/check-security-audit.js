const { spawnSync } = require('node:child_process');

const ALLOWED_HIGH_ADVISORIES = new Set([
  'GHSA-VFJ7-8CJW-P6XM', // braces via Metro/Expo tooling; no compatible patched resolution currently available
  'GHSA-86W9-CPQP-85RV', // node-forge via Expo code-signing/update tooling; no compatible patched resolution currently available
]);

const result = spawnSync('npm', ['audit', '--omit=dev', '--json'], {
  encoding: 'utf8',
  maxBuffer: 20 * 1024 * 1024,
});

let report;
try {
  report = JSON.parse(result.stdout || '{}');
} catch (error) {
  console.error('Unable to parse npm audit JSON output.');
  console.error(result.stderr || error);
  process.exit(1);
}

const vulnerabilities = report.vulnerabilities || {};
const severityRank = { info: 0, low: 1, moderate: 2, high: 3, critical: 4 };

function advisoryIdFromVia(via) {
  if (!via || typeof via !== 'object') return null;
  const url = String(via.url || '');
  const match = url.match(/GHSA-[A-Za-z0-9-]+/i);
  return match ? match[0].toUpperCase() : null;
}

function collectBlockingRoots(packageName, seen = new Set()) {
  if (seen.has(packageName)) return [];
  seen.add(packageName);

  const entry = vulnerabilities[packageName];
  if (!entry) return [];

  const blockers = [];
  for (const via of entry.via || []) {
    if (typeof via === 'string') {
      blockers.push(...collectBlockingRoots(via, new Set(seen)));
      continue;
    }

    const severity = severityRank[String(via.severity || '').toLowerCase()] ?? 0;
    if (severity < severityRank.high) continue;

    const advisoryId = advisoryIdFromVia(via);
    if (!advisoryId || !ALLOWED_HIGH_ADVISORIES.has(advisoryId)) {
      blockers.push({
        package: packageName,
        advisoryId: advisoryId || 'UNKNOWN',
        severity: via.severity || entry.severity || 'unknown',
        title: via.title || 'Unnamed npm advisory',
        url: via.url || '',
      });
    }
  }
  return blockers;
}

const highOrCriticalPackages = Object.entries(vulnerabilities)
  .filter(([, value]) => (severityRank[String(value.severity || '').toLowerCase()] ?? 0) >= severityRank.high)
  .map(([name]) => name);

const blockers = [];
for (const packageName of highOrCriticalPackages) {
  blockers.push(...collectBlockingRoots(packageName));
}

const uniqueBlockers = Array.from(
  new Map(blockers.map((item) => [`${item.advisoryId}:${item.package}`, item])).values()
);

const metadata = report.metadata?.vulnerabilities || {};
console.log(
  `npm audit summary: ${metadata.critical || 0} critical, ${metadata.high || 0} high, ${metadata.moderate || 0} moderate, ${metadata.low || 0} low.`
);

if (uniqueBlockers.length > 0) {
  console.error('Blocking high/critical advisories detected:');
  for (const blocker of uniqueBlockers) {
    console.error(
      `- ${blocker.advisoryId} [${blocker.severity}] ${blocker.package}: ${blocker.title} ${blocker.url}`
    );
  }
  process.exit(1);
}

if (highOrCriticalPackages.length > 0) {
  console.warn(
    'Only explicitly documented upstream high-severity advisory roots remain. See SECURITY_AUDIT_EXCEPTIONS.md.'
  );
}

process.exit(0);
