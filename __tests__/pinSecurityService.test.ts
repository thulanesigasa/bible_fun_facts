import { PinSecurityService, sha256 } from '../src/services/pinSecurityService';

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

describe('PinSecurityService - Salted SHA-256 & Rate Limiting', () => {
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
});
