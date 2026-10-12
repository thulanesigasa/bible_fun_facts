# Security Audit Exceptions

This file documents narrowly scoped, temporary npm audit exceptions for the Expo SDK 57 dependency graph.

The CI security gate still runs `npm audit --omit=dev --json` and fails on any high or critical advisory that does **not** resolve exclusively to the advisory IDs listed below.

## Temporary accepted upstream advisories

### GHSA-vfj7-8cjw-p6xm — braces

- Severity: High
- Dependency path: `braces -> micromatch -> Metro / Expo tooling`
- Status: No compatible non-breaking remediation is available in the current Expo SDK 57 graph.
- npm's forced remediation proposes a breaking Expo downgrade and is therefore rejected.
- Mitigation: application-controlled build inputs; no untrusted glob patterns are intentionally accepted by app runtime features.
- Action: remove this exception as soon as the Expo/Metro dependency graph ships a compatible patched resolution.

### GHSA-86w9-cpqp-85rv — node-forge

- Severity: High
- Dependency path: `node-forge -> @expo/code-signing-certificates -> Expo / expo-updates tooling`
- Status: No compatible non-breaking remediation is available in the current Expo SDK 57 graph.
- npm's forced remediation proposes an incompatible `expo-updates` downgrade and is therefore rejected.
- Mitigation: keep Expo SDK packages aligned and avoid unsupported forced dependency downgrades.
- Action: remove this exception as soon as Expo provides a compatible patched dependency chain.

## Fixed during Master Prompt 1

The production-readiness pass applied targeted overrides for fixable transitive advisories, including patched `shell-quote` and `uuid` versions, and regenerated the lockfile.

## Review policy

These exceptions are not blanket suppressions. The custom audit gate resolves transitive dependency chains to their advisory roots and fails CI if any new high or critical advisory appears outside the exact allowlist above.
