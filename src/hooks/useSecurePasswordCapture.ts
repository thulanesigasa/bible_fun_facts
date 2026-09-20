import { useState, useEffect, useCallback, useRef } from 'react';
import { Platform } from 'react-native';
import * as ScreenCapture from 'expo-screen-capture';

const SECURITY_TAG = 'password-protection';

interface UseSecurePasswordCaptureOptions {
  onScreenshotDetected?: () => void;
  enableAppSwitcherProtection?: boolean;
}

export function useSecurePasswordCapture(options: UseSecurePasswordCaptureOptions = {}) {
  const [isSecured, setIsSecured] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const activeFocusCountRef = useRef(0);

  // Check hardware and platform support on mount
  useEffect(() => {
    let isMounted = true;
    ScreenCapture.isAvailableAsync()
      .then((available) => {
        if (isMounted) {
          setIsSupported(available);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsSupported(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Optional screenshot detection listener
  useEffect(() => {
    let subscription: { remove: () => void } | undefined;
    try {
      if (typeof ScreenCapture.addScreenshotListener === 'function') {
        subscription = ScreenCapture.addScreenshotListener(() => {
          if (options.onScreenshotDetected) {
            options.onScreenshotDetected();
          }
        });
      }
    } catch {
      // Graceful fallback on environments without listener support
    }

    return () => {
      subscription?.remove();
    };
  }, [options.onScreenshotDetected]);

  /**
   * Activates hardware-level FLAG_SECURE protection.
   * On Android, this adds WindowManager.LayoutParams.FLAG_SECURE to the current window,
   * causing all screen recorders (OS or third-party) to record a solid black/blank screen.
   */
  const activateSecurity = useCallback(async () => {
    activeFocusCountRef.current += 1;
    try {
      await ScreenCapture.preventScreenCaptureAsync(SECURITY_TAG);
      setIsSecured(true);

      if (options.enableAppSwitcherProtection && typeof (ScreenCapture as any).enablePrivacyProtectionAsync === 'function') {
        await (ScreenCapture as any).enablePrivacyProtectionAsync().catch(() => {});
      }
    } catch {
      // Fail safely without disrupting the user
    }
  }, [options.enableAppSwitcherProtection]);

  /**
   * Deactivates hardware-level protection once sensitive password fields lose focus.
   */
  const deactivateSecurity = useCallback(async (force = false) => {
    if (force) {
      activeFocusCountRef.current = 0;
    } else {
      activeFocusCountRef.current = Math.max(0, activeFocusCountRef.current - 1);
    }

    if (activeFocusCountRef.current === 0) {
      try {
        await ScreenCapture.allowScreenCaptureAsync(SECURITY_TAG);
        setIsSecured(false);

        if (options.enableAppSwitcherProtection && typeof (ScreenCapture as any).disablePrivacyProtectionAsync === 'function') {
          await (ScreenCapture as any).disablePrivacyProtectionAsync().catch(() => {});
        }
      } catch {
        // Fail safely
      }
    }
  }, [options.enableAppSwitcherProtection]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      ScreenCapture.allowScreenCaptureAsync(SECURITY_TAG).catch(() => {});
    };
  }, []);

  const handlePasswordFocus = useCallback(() => {
    activateSecurity();
  }, [activateSecurity]);

  const handlePasswordBlur = useCallback(() => {
    deactivateSecurity();
  }, [deactivateSecurity]);

  return {
    isSecured,
    isSupported,
    activateSecurity,
    deactivateSecurity,
    handlePasswordFocus,
    handlePasswordBlur,
  };
}
