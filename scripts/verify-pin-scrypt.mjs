// Real audited scrypt ESM interoperability test (not a Jest mock).
import assert from 'node:assert/strict';
import { scryptSync } from 'node:crypto';
import { scryptAsync } from '@noble/hashes/scrypt.js';

const opts = { N: 1 << 14, r: 8, p: 1, dkLen: 32, asyncTick: 12, maxmem: 32 * 1024 * 1024 };
const actual = await scryptAsync('4831', '0123456789abcdef0123456789abcdef', opts);
const expected = scryptSync('4831', '0123456789abcdef0123456789abcdef', 32,
  { N: opts.N, r: opts.r, p: opts.p, maxmem: opts.maxmem });
assert.deepEqual(Buffer.from(actual), expected,
  'Audited scrypt output must equal OpenSSL RFC 7914 derivation');
console.log('Memory-hard scrypt / Node OpenSSL interoperability: PASS');
