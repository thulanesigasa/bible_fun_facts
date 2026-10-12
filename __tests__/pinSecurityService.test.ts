import { PinSecurityService, sha256, PIN_HASH_KEY, PIN_SALT_KEY } from '../src/services/pinSecurityService';

jest.mock('@noble/hashes/scrypt.js', () => {
  const crypto = jest.requireActual('node:crypto') as typeof import('node:crypto');
  return {
    scryptAsync: async (password: string, salt: string, opts: {
      N: number; r: number; p: number; dkLen: number; maxmem: number;
    }) => new Uint8Array(crypto.scryptSync(
      password, salt, opts.dkLen,
      { N: opts.N, r: opts.r, p: opts.p, maxmem: opts.maxmem },
    )),
  };
});

let memoryStore: Record<string, string> = {};

jest.mock('../src/services/secureStorage', () => ({
  SecureStoreAdapter: {
    getItem: jest.fn(async (key: string) => memoryStore[key] || null),
    setItem: jest.fn(async (key: string, val: string) => {
      memoryStore[key] = val;
    }),
    removeItem: jest.fn(async (key: string) => {
      delete memoryStore[key];
    }),
  },
}));

describe('PinSecurityService - Memory-hard scrypt & Rate Limiting', () => {
  beforeEach(() => {
    memoryStore = {};
  });

  describe('sha256 hashing', () => {
    it('produces deterministic 64-character hex digest', () => {
      const hash1 = sha256('1234');
      const hash2 = sha256('1234');
      const hashDifferent = sha256('5678');

      expect(hash1).toHaveLength(64);
      expect(hash1).toEqual(hash2);
      expect(hash1).not.toEqual(hashDifferent);
    });
  });

  describe('PIN lifecycle & verification', () => {
    it('initially reports no PIN set', async () => {
      const isSet = await PinSecurityService.isPinSet();
      expect(isSet).toBe(false);
    });

    it('rejects invalid PIN formats (must be exactly 4 numeric digits)', async () => {
      const resultNonDigit = await PinSecurityService.setPin('12a4');
      expect(resultNonDigit).toBe(false);

      const resultTooShort = await PinSecurityService.setPin('123');
      expect(resultTooShort).toBe(false);

      const resultTooLong = await PinSecurityService.setPin('12345');
      expect(resultTooLong).toBe(false);
    });

    it('successfully configures and verifies a 4-digit PIN', async () => {
      const setupOk = await PinSecurityService.setPin('4821');
      expect(setupOk).toBe(true);

      const isSet = await PinSecurityService.isPinSet();
      expect(isSet).toBe(true);
    expect(memoryStore[PIN_HASH_KEY].startsWith('scrypt-v1' + '$')).toBe(true);
      expect(memoryStore[PIN_SALT_KEY]).toBeUndefined();

      // Verify correct PIN
      const correctVerify = await PinSecurityService.verifyPin('4821');
      expect(correctVerify.success).toBe(true);

      // Verify incorrect PIN
      const wrongVerify = await PinSecurityService.verifyPin('9999');
      expect(wrongVerify.success).toBe(false);
    });

    it('removes PIN and clears stored hashes', async () => {
      await PinSecurityService.setPin('7732');
      expect(await PinSecurityService.isPinSet()).toBe(true);

      const wrongRemove = await PinSecurityService.removePin('0000');
      expect(wrongRemove.success).toBe(false);

      const removed = await PinSecurityService.removePin('7732');
      expect(removed.success).toBe(true);
      expect(await PinSecurityService.isPinSet()).toBe(false);
    });
  });
  it('rehashes an existing secure-store SHA256 PIN once after successful verification', async () => {
    const salt = 'ab'.repeat(16);
    memoryStore[PIN_SALT_KEY] = salt;
    memoryStore[PIN_HASH_KEY] = sha256('4821' + salt);
    expect((await PinSecurityService.verifyPin('4821')).success).toBe(true);
    expect(memoryStore[PIN_HASH_KEY].startsWith('scrypt-v1' + '$')).toBe(true);
    expect(memoryStore[PIN_SALT_KEY]).toBeUndefined();
    expect((await PinSecurityService.verifyPin('4821')).success).toBe(true);
    expect((await PinSecurityService.verifyPin('0000')).success).toBe(false);
  });
});
