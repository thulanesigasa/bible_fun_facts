import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from './Typography';
import { SecurityPinModal } from './SecurityPinModal';
import { PinSecurityService } from '../services/pinSecurityService';

interface BiometricLockOverlayProps {
  visible: boolean;
  biometricType?: string | null;
  onUnlock?: () => void;
  onUnlockBiometric?: () => Promise<boolean>;
  onUnlockDirectly?: () => void;
}

export const BiometricLockOverlay: React.FC<BiometricLockOverlayProps> = ({
  visible,
  biometricType = 'Fingerprint',
  onUnlock,
  onUnlockBiometric,
  onUnlockDirectly,
}) => {
  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [hasPin, setHasPin] = useState<boolean>(false);
  const [biometricFailures, setBiometricFailures] = useState<number>(0);
  const [biometricErrorNotice, setBiometricErrorNotice] = useState<string | null>(null);
  const [pinNoticeMessage, setPinNoticeMessage] = useState<string | null>(null);

  const directUnlock = onUnlockDirectly || onUnlock || (() => {});
  const hasAutoPromptedRef = useRef<boolean>(false);

  useEffect(() => {
    if (visible) {
      PinSecurityService.isPinSet().then(setHasPin);
      setBiometricFailures(0);
      setBiometricErrorNotice(null);
      setPinNoticeMessage(null);

      // Auto-trigger biometric on initial lock appearance once if available
      if (onUnlockBiometric && !hasAutoPromptedRef.current) {
        hasAutoPromptedRef.current = true;
        // Small delay to ensure smooth transition
        const timer = setTimeout(() => {
          handleBiometricAuth();
        }, 200);
        return () => clearTimeout(timer);
      }
    } else {
      setShowPinModal(false);
      hasAutoPromptedRef.current = false;
    }
  }, [visible]);

  const handleBiometricAuth = async () => {
    if (!onUnlockBiometric) return;
    setBiometricErrorNotice(null);

    const success = await onUnlockBiometric();
    if (success) {
      setBiometricFailures(0);
      setBiometricErrorNotice(null);
      // App unlocked via UserContext.isAppLocked = false
    } else {
      const nextFailures = biometricFailures + 1;
      setBiometricFailures(nextFailures);

      if (nextFailures >= 5) {
        // Fingerprint failed 5 times -> automatically taken to PIN!
        setBiometricFailures(0);
        setBiometricErrorNotice(null);
        setPinNoticeMessage('Fingerprint failed 5 times. Enter PIN to unlock.');
        setShowPinModal(true);
      } else {
        const remaining = 5 - nextFailures;
        setBiometricErrorNotice(
          `${biometricType || 'Fingerprint'} failed. ${remaining} ${remaining === 1 ? 'attempt' : 'attempts'} remaining before PIN fallback.`
        );
      }
    }
  };

  const handlePinSuccess = () => {
    // When PIN is entered correctly, immediately unlock the app with zero biometric prompt
    setShowPinModal(false);
    setBiometricFailures(0);
    setBiometricErrorNotice(null);
    setPinNoticeMessage(null);
    directUnlock();
  };

  const handlePinFallbackToBiometric = () => {
    // Vice versa: when PIN fails 5 times, automatically take the user to biometric/fingerprint
    setShowPinModal(false);
    setPinNoticeMessage(null);
    handleBiometricAuth();
  };

  if (!visible) return null;

  return (
    <>
      <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
        <View style={styles.content}>
          {/* Logo with Zero Border-Radius Container per User Instruction */}
          <Image
            source={require('../../assets/logo-transparent.png')}
            style={styles.brandLogo}
            resizeMode="contain"
          />

          {/* App Name Only */}
          <Text variant="h2" weight="800" color="#0F172A" style={styles.title}>
            exégeomai
          </Text>

          <Text variant="body" color="#64748B" style={styles.subtitle}>
            Your sacred study journal, bookmarks, and reflections are locked.
          </Text>

          {/* Optional notice text when biometric attempts fail */}
          {biometricErrorNotice && (
            <View style={styles.noticeBox}>
              <Text variant="caption" weight="700" color="#DC2626" style={styles.noticeText}>
                {biometricErrorNotice}
              </Text>
            </View>
          )}

          {/* Aesthetic Text-Styled Actions */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.textActionButton}
              onPress={handleBiometricAuth}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={`Unlock with ${biometricType || 'Fingerprint'}`}
            >
              <Text variant="body" weight="700" color="#0F172A" style={styles.actionText}>
                Unlock with {biometricType || 'Fingerprint'}
              </Text>
            </TouchableOpacity>

            {hasPin && (
              <TouchableOpacity
                style={styles.secondaryTextActionButton}
                onPress={() => {
                  setPinNoticeMessage(null);
                  setShowPinModal(true);
                }}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Use Security PIN"
              >
                <Text variant="caption" weight="600" color="#64748B" style={styles.secondaryActionText}>
                  Use Security PIN
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>

      {/* Security PIN Modal */}
      <SecurityPinModal
        visible={showPinModal}
        mode="verify"
        initialNotice={pinNoticeMessage}
        onSuccess={handlePinSuccess}
        onClose={() => setShowPinModal(false)}
        onFallbackToBiometric={handlePinFallbackToBiometric}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#F8FAFC', // 60% Dominant Background
    zIndex: 999999,
    elevation: 999999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    maxWidth: 360,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  brandLogo: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
    color: '#64748B',
    marginBottom: 24,
  },
  noticeBox: {
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  noticeText: {
    fontSize: 12,
    textAlign: 'center',
  },
  actionsContainer: {
    alignItems: 'center',
    gap: 16,
    width: '100%',
  },
  textActionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 15,
    letterSpacing: 0.2,
  },
  secondaryTextActionButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryActionText: {
    fontSize: 13,
    letterSpacing: 0.2,
  },
});

export default BiometricLockOverlay;
