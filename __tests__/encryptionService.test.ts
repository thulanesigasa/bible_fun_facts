import { webcrypto } from 'node:crypto';
import { EncryptionService } from '../src/services/encryptionService';

// Mock SecureStoreAdapter so tests run in pure Node environment without native bridge
jest.mock('../src/services/secureStorage', () => {
  let memoryStore: Record<string, string> = {};
  return {
    SecureStoreAdapter: {
      getItem: jest.fn(async (key: string) => memoryStore[key] || null),
      setItem: jest.fn(async (key: string, val: string) => {
        memoryStore[key] = val;
      }),
      removeItem: jest.fn(async (key: string) => {
        delete memoryStore[key];
      }),
    },
  };
});

// Isolate Node/Jest from the ESM package loader; CI separately exercises
// the real audited cipher library in Node's ESM runtime.
jest.mock('@noble/ciphers/aes.js', () => {
  const nodeCrypto = jest.requireActual('node:crypto') as typeof import('node:crypto');
  return {
    gcm: (key: Uint8Array, iv: Uint8Array) => ({
      encrypt(data: Uint8Array) {
        const cipher = nodeCrypto.createCipheriv('aes-256-gcm', Buffer.from(key), Buffer.from(iv));
        return new Uint8Array(Buffer.concat([
          cipher.update(Buffer.from(data)), cipher.final(), cipher.getAuthTag(),
        ]));
      },
      decrypt(data: Uint8Array) {
        const d = Buffer.from(data);
        const decipher = nodeCrypto.createDecipheriv('aes-256-gcm', Buffer.from(key), Buffer.from(iv));
        decipher.setAuthTag(d.subarray(d.length - 16));
        return new Uint8Array(Buffer.concat([
          decipher.update(d.subarray(0, -16)), decipher.final(),
        ]));
      },
    }),
  };
});

const originalCrypto = Object.getOwnPropertyDescriptor(globalThis, 'crypto');
beforeAll(() => {
  Object.defineProperty(globalThis, 'crypto', {
    configurable: true, value: webcrypto,
  });
});
afterAll(() => {
  if (originalCrypto) Object.defineProperty(globalThis, 'crypto', originalCrypto);
  else Reflect.deleteProperty(globalThis, 'crypto');
});

describe('EncryptionService - Hardware-Backed AES-256 Study Journal', () => {
  it('encrypts and decrypts a simple plaintext message correctly', async () => {
    const originalText = 'In the beginning was the Word, and the Word was with God.';
    const encrypted = await EncryptionService.encryptString(originalText);

    expect(typeof encrypted).toBe('string');
    expect(encrypted.length).toBeGreaterThan(originalText.length);
    expect(encrypted).not.toEqual(originalText);
    expect(JSON.parse(encrypted)).toMatchObject({ v: 2, alg: 'AES-256-GCM' });

    const decrypted = await EncryptionService.decryptString(encrypted);
    expect(decrypted).toEqual(originalText);
  });

  it('encrypts and decrypts complex structured study journal objects', async () => {
    const journal = {
      user: 'scholar_eliyah',
      notes: [
        { id: '1', book: 'Genesis', chapter: 1, verse: 1, text: 'Bereshit bara Elohim' },
        { id: '2', book: 'John', chapter: 1, verse: 1, text: 'En arche en ho Logos' },
      ],
      highlights: {
        'GEN.1.1': '#FDD223',
        'JHN.1.1': '#10B981',
      },
      exportDate: '2026-09-28T12:00:00Z',
    };

    const encryptedJournal = await EncryptionService.encryptJournal(journal);
    expect(typeof encryptedJournal).toBe('string');

    const restoredJournal = await EncryptionService.decryptJournal(encryptedJournal);
    expect(restoredJournal).toEqual(journal);
    expect(restoredJournal.notes.length).toBe(2);
    expect(restoredJournal.highlights['GEN.1.1']).toBe('#FDD223');
  });

  it('rejects tampered or corrupted ciphertext payloads', async () => {
    const validEncrypted = await EncryptionService.encryptString('Covenant truth');
    const tampered = validEncrypted.slice(0, -6) + 'XXXXXX';

    await expect(EncryptionService.decryptString(tampered)).rejects.toThrow();
  });
  it('rejects an authenticated ciphertext modified without changing its JSON format', async () => {
    const payload = JSON.parse(await EncryptionService.encryptString('private message'));
    payload.data = (payload.data.slice(0, 2) === '00' ? '01' : '00') + payload.data.slice(2);
    await expect(EncryptionService.decryptString(JSON.stringify(payload))).rejects.toThrow();
  });

  it('supports audited JavaScript AES-GCM when Hermes lacks WebCrypto.subtle', async () => {
    Object.defineProperty(globalThis, 'crypto', {
      configurable: true, value: { getRandomValues: webcrypto.getRandomValues.bind(webcrypto) },
    });
    try {
      const encrypted = await EncryptionService.encryptString('private message');
      await expect(EncryptionService.decryptString(encrypted)).resolves.toBe('private message');
    } finally {
      Object.defineProperty(globalThis, 'crypto', { configurable: true, value: webcrypto });
    }
  });

  it('fails closed if cryptographic randomness is completely unavailable', async () => {
    Object.defineProperty(globalThis, 'crypto', { configurable: true, value: undefined });
    try {
      await expect(EncryptionService.encryptString('secret')).rejects.toThrow();
    } finally {
      Object.defineProperty(globalThis, 'crypto', { configurable: true, value: webcrypto });
    }
  });
});
