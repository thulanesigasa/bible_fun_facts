/**
 * Domain-Focused Security Context
 *
 * Manages PIN lock status, biometrics enablement, auto-lock timeouts,
 * app switcher privacy shield, and direct unlock coordination.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PinSecurityService } from '../services/pinSecurityService';
import { BiometricService } from '../services/biometricService';

interface SecurityContextType {
  isPinSet: boolean;
  isBiometricsEnabled: boolean;
  isLocked: boolean;
  setIsLocked: (locked: boolean) => void;
  unlockDirectly: () => void;
  inactivityTimeout: number;
  setInactivityTimeout: (timeout: number) => void;
  appSwitcherShieldEnabled: boolean;
  setAppSwitcherShieldEnabled: (enabled: boolean) => void;
  refreshSecurityState: () => Promise<void>;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

const INACTIVITY_TIMEOUT_KEY = '@inactivity_timeout_v1';
const APP_SWITCHER_SHIELD_KEY = '@app_switcher_shield_v1';
const BIOMETRICS_ENABLED_KEY = '@biometrics_enabled_v1';

export const SecurityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPinSet, setIsPinSet] = useState(false);
  const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [inactivityTimeout, setInactivityTimeoutState] = useState<number>(300); // 5 minutes default
  const [appSwitcherShieldEnabled, setAppSwitcherShieldEnabledState] = useState(true);

  const refreshSecurityState = useCallback(async () => {
    try {
      const [pinActive, bioActive, timeoutRaw, shieldRaw] = await Promise.all([
        PinSecurityService.isPinSet(),
        AsyncStorage.getItem(BIOMETRICS_ENABLED_KEY),
        AsyncStorage.getItem(INACTIVITY_TIMEOUT_KEY),
        AsyncStorage.getItem(APP_SWITCHER_SHIELD_KEY),
      ]);

      setIsPinSet(pinActive);
      setIsBiometricsEnabled(bioActive === 'true');
      if (timeoutRaw) setInactivityTimeoutState(Number(timeoutRaw));
      if (shieldRaw !== null) setAppSwitcherShieldEnabledState(shieldRaw === 'true');
    } catch (e) {
      console.warn('[SecurityContext] Refresh error:', e);
    }
  }, []);

  useEffect(() => {
    refreshSecurityState();
  }, [refreshSecurityState]);

  const unlockDirectly = useCallback(() => {
    setIsLocked(false);
  }, []);

  const setInactivityTimeout = useCallback((timeout: number) => {
    setInactivityTimeoutState(timeout);
    AsyncStorage.setItem(INACTIVITY_TIMEOUT_KEY, String(timeout)).catch(() => {});
  }, []);

  const setAppSwitcherShieldEnabled = useCallback((enabled: boolean) => {
    setAppSwitcherShieldEnabledState(enabled);
    AsyncStorage.setItem(APP_SWITCHER_SHIELD_KEY, String(enabled)).catch(() => {});
  }, []);

  return (
    <SecurityContext.Provider
      value={{
        isPinSet,
        isBiometricsEnabled,
        isLocked,
        setIsLocked,
        unlockDirectly,
        inactivityTimeout,
        setInactivityTimeout,
        appSwitcherShieldEnabled,
        setAppSwitcherShieldEnabled,
        refreshSecurityState,
      }}
    >
      {children}
    </SecurityContext.Provider>
  );
};

export function useSecurity(): SecurityContextType {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
}

export default SecurityContext;
