// Real ESM dependency test, independent of Jest mocks.
import assert from 'node:assert/strict';
import { createCipheriv } from 'node:crypto';
import { gcm } from '@noble/ciphers/aes.js';

const key = Uint8Array.from({ length: 32 }, (_, index) => index);
const nonce = Uint8Array.from({ length: 12 }, (_, index) => 0xa0 + index);
const plain = new TextEncoder().encode('Exegeomai AES-256-GCM compatibility — שלום');

const nobleCiphertext = gcm(key, nonce).encrypt(plain);
const native = createCipheriv('aes-256-gcm', key, nonce);
const nativeCiphertext = Buffer.concat([
  native.update(plain),
  native.final(),
  native.getAuthTag(),
]);
assert.deepEqual(Buffer.from(nobleCiphertext), nativeCiphertext,
  'Noble AES-GCM must produce the same ciphertext/tag as Node OpenSSL');

const restored = gcm(key, nonce).decrypt(nativeCiphertext);
assert.deepEqual(Buffer.from(restored), Buffer.from(plain),
  'Noble must decrypt OpenSSL AES-256-GCM ciphertext');

const tampered = new Uint8Array(nobleCiphertext);
tampered[0] ^= 0x01;
assert.throws(() => gcm(key, nonce).decrypt(tampered),
  /authentication|tag|invalid|integrity|wrong/i,
  'Modified ciphertext must be rejected');

console.log('Audited AES-GCM JavaScript/Node interoperability: PASS');
