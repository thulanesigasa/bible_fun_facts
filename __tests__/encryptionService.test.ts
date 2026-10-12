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

  it('fails closed when platform AES-GCM is unavailable', async () => {
    Object.defineProperty(globalThis, 'crypto', {
      configurable: true, value: { getRandomValues: webcrypto.getRandomValues.bind(webcrypto) },
    });
    try {
      await expect(EncryptionService.encryptString('secret')).rejects.toThrow();
    } finally {
      Object.defineProperty(globalThis, 'crypto', { configurable: true, value: webcrypto });
    }
  });
});
