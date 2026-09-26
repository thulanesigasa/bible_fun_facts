import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme';
import { Text } from '../components/Typography';
import { useUser } from '../context/UserContext';
import { useThemedAlert } from '../context/AlertContext';
import { BackspaceSvg } from '../components/SvgIcons';
import { PinSecurityService } from '../services/pinSecurityService';

type PinScreenFlow = 'idle' | 'setup' | 'change' | 'remove';

export default function SecurityPinScreen({ navigation }: { navigation?: any }) {
  const { isPinSet, refreshPinStatus } = useUser();
  const { showAlert } = useThemedAlert();

  const [flow, setFlow] = useState<PinScreenFlow>('idle');
  const [step, setStep] = useState<number>(1);
  const [pin, setPin] = useState<string>('');
  const [firstPin, setFirstPin] = useState<string>('');
  const [currentPinAttempt, setCurrentPinAttempt] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    refreshPinStatus();
  }, []);

  const triggerShake = (callback?: () => void) => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: -12, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 12, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -4, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 4, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start(() => {
      if (callback) callback();
    });
  };

  const handleStartFlow = (mode: PinScreenFlow) => {
    setFlow(mode);
    setStep(1);
    setPin('');
    setFirstPin('');
    setCurrentPinAttempt('');
    setErrorMessage(null);
    setIsProcessing(false);
  };

  const handleCancelFlow = () => {
    setFlow('idle');
    setStep(1);
    setPin('');
    setFirstPin('');
    setCurrentPinAttempt('');
    setErrorMessage(null);
    setIsProcessing(false);
  };

  const handleKeyPress = (digit: string) => {
    if (isProcessing) return;
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);
      setErrorMessage(null);

      if (nextPin.length === 4) {
        handlePinSubmitted(nextPin);
      }
    }
  };

  const handleBackspace = () => {
    if (isProcessing) return;
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
      setErrorMessage(null);
    }
  };

  const handlePinSubmitted = async (completedPin: string) => {
    setIsProcessing(true);

    if (flow === 'setup') {
      if (step === 1) {
        // Validation: Cannot have consecutive repeated digits (e.g. 00, 11, 22)
        if (/(.)\1/.test(completedPin)) {
          setErrorMessage('PIN cannot have consecutive repeated numbers (e.g. 00, 11)');
          triggerShake(() => {
            setPin('');
            setIsProcessing(false);
          });
          return;
        }

        setFirstPin(completedPin);
        setPin('');
        setStep(2);
        setIsProcessing(false);
      } else {
        if (completedPin === firstPin) {
          const success = await PinSecurityService.setPin(completedPin);
          if (success) {
            await refreshPinStatus();
            setIsProcessing(false);
            setFlow('idle');
            showAlert({
              title: 'Security PIN Set',
              message: 'Your 4-digit security PIN has been encrypted and saved to your device hardware enclave.',
              icon: 'logo',
            });
          } else {
            setErrorMessage('Failed to save PIN. Please retry.');
            triggerShake(() => {
              setPin('');
              setStep(1);
              setIsProcessing(false);
            });
          }
        } else {
          setErrorMessage('PINs do not match. Please re-enter.');
          triggerShake(() => {
            setPin('');
            setFirstPin('');
            setStep(1);
            setIsProcessing(false);
          });
        }
      }
    } else if (flow === 'change') {
      if (step === 1) {
        const verify = await PinSecurityService.verifyPin(completedPin);
        if (verify.success) {
          setCurrentPinAttempt(completedPin);
          setPin('');
          setStep(2);
          setIsProcessing(false);
        } else {
          setErrorMessage(verify.error || 'Current PIN incorrect');
          triggerShake(() => {
            setPin('');
            setIsProcessing(false);
          });
        }
      } else if (step === 2) {
        // Validation 1: New PIN cannot be the same as current PIN
        if (completedPin === currentPinAttempt) {
          setErrorMessage('New PIN cannot be the same as your current PIN');
          triggerShake(() => {
            setPin('');
            setIsProcessing(false);
          });
          return;
        }

        // Validation 2: Cannot have consecutive repeated digits (e.g. 00, 11, 22)
        if (/(.)\1/.test(completedPin)) {
          setErrorMessage('PIN cannot have consecutive repeated numbers (e.g. 00, 11)');
          triggerShake(() => {
            setPin('');
            setIsProcessing(false);
          });
          return;
        }

        setFirstPin(completedPin);
        setPin('');
        setStep(3);
        setIsProcessing(false);
      } else {
        if (completedPin === firstPin) {
          const res = await PinSecurityService.changePin(currentPinAttempt, completedPin);
          if (res.success) {
            await refreshPinStatus();
            setIsProcessing(false);
            setFlow('idle');
            showAlert({
              title: 'PIN Updated',
              message: 'Your 4-digit security PIN has been successfully changed.',
              icon: 'logo',
            });
          } else {
            setErrorMessage(res.error || 'Failed to update PIN');
            triggerShake(() => {
              setPin('');
              setStep(2);
              setIsProcessing(false);
            });
          }
        } else {
          setErrorMessage('New PINs do not match. Re-enter new PIN.');
          triggerShake(() => {
            setPin('');
            setStep(2);
            setIsProcessing(false);
          });
        }
      }
    } else if (flow === 'remove') {
      const res = await PinSecurityService.removePin(completedPin);
      if (res.success) {
        await refreshPinStatus();
        setIsProcessing(false);
        setFlow('idle');
        showAlert({
          title: 'PIN Removed',
          message: '4-digit security PIN protection has been deactivated.',
          icon: 'trash',
          isDestructive: true,
        });
      } else {
        setErrorMessage(res.error || 'Current PIN incorrect');
        triggerShake(() => {
          setPin('');
          setIsProcessing(false);
        });
      }
    }
  };

  const getFlowTitleAndPrompt = () => {
    if (flow === 'setup') {
      return {
        title: step === 1 ? 'Create 4-Digit PIN' : 'Confirm 4-Digit PIN',
        subtitle: step === 1 ? 'Choose a 4-digit passcode (no repeated numbers e.g. 00, 11)' : 'Re-enter your 4-digit passcode to verify',
      };
    }
    if (flow === 'change') {
      if (step === 1) return { title: 'Current PIN', subtitle: 'Enter your existing 4-digit passcode' };
      if (step === 2) return { title: 'New PIN', subtitle: 'Enter new PIN (cannot match old PIN or repeated pairs)' };
      return { title: 'Confirm New PIN', subtitle: 'Re-enter your new 4-digit passcode to confirm' };
    }
    if (flow === 'remove') {
      return { title: 'Remove Security PIN', subtitle: 'Enter current 4-digit passcode to disable PIN lock' };
    }
    return { title: '', subtitle: '' };
  };

  const flowMeta = getFlowTitleAndPrompt();

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {flow === 'idle' ? (
          <>
            {/* Header Block - Clean Body Canvas */}
            <View style={styles.headerBlock}>
              <Text variant="h2" weight="800" color={colors.textPrimary} style={styles.title}>
                4-Digit Security PIN
              </Text>
              <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
                Hardware-backed local passcode protecting your personal study journal, bookmark collections, and scripture reflections.
              </Text>
            </View>

            {/* Current PIN Status */}
            <View style={styles.sectionBlock}>
              <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
                CURRENT STATUS
              </Text>

              <View style={styles.actionRow}>
                <View style={styles.rowTitleBox}>
                  <Text variant="h3" style={styles.rowTitle}>
                    PIN Protection
                  </Text>
                  <Text variant="caption" color={colors.textSecondary} style={styles.rowDescription}>
                    {isPinSet
                      ? 'Active • Protected with salted SHA-256 encryption'
                      : 'Not configured • Passcode access is currently disabled'}
                  </Text>
                </View>
                <Text
                  variant="caption"
                  weight="800"
                  color={isPinSet ? colors.accent : colors.textTertiary}
                  style={styles.statusPill}
                >
                  {isPinSet ? 'CONFIGURED' : 'OFF'}
                </Text>
              </View>
            </View>

            {/* Management Options */}
            <View style={styles.sectionBlock}>
              <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
                MANAGE PASSCODE
              </Text>

              {isPinSet ? (
                <>
                  {/* Change PIN Option */}
                  <TouchableOpacity
                    style={styles.actionRow}
                    onPress={() => handleStartFlow('change')}
                    activeOpacity={0.75}
                    accessibilityRole="button"
                    accessibilityLabel="Change 4-digit security PIN"
                  >
                    <View style={styles.rowTitleBox}>
                      <Text variant="h3" style={styles.rowTitle}>
                        Change Security PIN
                      </Text>
                      <Text variant="caption" color={colors.textSecondary} style={styles.rowDescription}>
                        Update your 4-digit passcode after verifying your current one.
                      </Text>
                    </View>
                    <Text style={styles.rowDisclosureArrow}>›</Text>
                  </TouchableOpacity>

                  <View style={styles.rowDivider} />

                  {/* Remove PIN Option */}
                  <TouchableOpacity
                    style={styles.actionRow}
                    onPress={() => handleStartFlow('remove')}
                    activeOpacity={0.75}
                    accessibilityRole="button"
                    accessibilityLabel="Remove 4-digit security PIN"
                  >
                    <View style={styles.rowTitleBox}>
                      <Text variant="h3" style={styles.rowTitle}>
                        Remove Security PIN
                      </Text>
                      <Text variant="caption" color={colors.textSecondary} style={styles.rowDescription}>
                        Disable PIN protection and clear cryptographic keys from device storage.
                      </Text>
                    </View>
                    <Text style={styles.rowDisclosureArrow}>›</Text>
                  </TouchableOpacity>
                </>
              ) : (
                /* Setup PIN Option */
                <TouchableOpacity
                  style={styles.actionRow}
                  onPress={() => handleStartFlow('setup')}
                  activeOpacity={0.75}
                  accessibilityRole="button"
                  accessibilityLabel="Set up 4-digit security PIN"
                >
                  <View style={styles.rowTitleBox}>
                    <Text variant="h3" style={styles.rowTitle}>
                      Set Up Security PIN
                    </Text>
                    <Text variant="caption" color={colors.textSecondary} style={styles.rowDescription}>
                      Create a 4-digit passcode backup for opening exégeomai without biometrics.
                    </Text>
                  </View>
                  <Text style={styles.rowDisclosureArrow}>›</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Cryptographic Specifications */}
            <View style={styles.sectionBlock}>
              <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
                HARDWARE SECURITY SPECIFICATIONS
              </Text>

              <View style={styles.specRow}>
                <Text variant="caption" weight="700" color={colors.textPrimary} style={styles.specLabel}>
                  Cryptographic Primitive
                </Text>
                <Text variant="caption" color={colors.textSecondary} style={styles.specValue}>
                  Salted SHA-256 (32-byte CSPRNG Salt)
                </Text>
              </View>

              <View style={styles.specRow}>
                <Text variant="caption" weight="700" color={colors.textPrimary} style={styles.specLabel}>
                  Key Storage
                </Text>
                <Text variant="caption" color={colors.textSecondary} style={styles.specValue}>
                  Android Keystore / iOS Keychain
                </Text>
              </View>

              <View style={styles.specRow}>
                <Text variant="caption" weight="700" color={colors.textPrimary} style={styles.specLabel}>
                  Brute-Force Lockout
                </Text>
                <Text variant="caption" color={colors.textSecondary} style={styles.specValue}>
                  5-attempt limit with 30s rate-limiting
                </Text>
              </View>
            </View>

            {/* Zero Telemetry Footer Note */}
            <View style={styles.footerNote}>
              <Text variant="caption" color={colors.textTertiary} style={styles.footerText}>
                Your PIN is never transmitted over the network or saved in plaintext. Only the salted cryptographic hash remains on this physical device.
              </Text>
            </View>
          </>
        ) : (
          /* Interactive In-Screen Keypad Flow */
          <View style={styles.keypadWrapper}>
            <View style={styles.keypadHeader}>
              <Text variant="h2" weight="800" color={colors.textPrimary} style={styles.keypadTitle}>
                {flowMeta.title}
              </Text>
              <Text variant="body" color={colors.textSecondary} style={styles.keypadSubtitle}>
                {flowMeta.subtitle}
              </Text>
            </View>

            {/* 4 Dots */}
            <Animated.View style={[styles.dotsContainer, { transform: [{ translateX: shakeAnim }] }]}>
              {[0, 1, 2, 3].map((index) => {
                const isFilled = pin.length > index;
                return (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      isFilled && styles.dotFilled,
                      errorMessage ? styles.dotError : null,
                    ]}
                  />
                );
              })}
            </Animated.View>

            {/* Error Message */}
            <View style={styles.errorBox}>
              {errorMessage ? (
                <Text variant="caption" weight="700" color="#DC2626" style={styles.errorText}>
                  {errorMessage}
                </Text>
              ) : null}
            </View>

            {/* Numeric Keypad */}
            <View style={styles.keypad}>
              {[
                ['1', '2', '3'],
                ['4', '5', '6'],
                ['7', '8', '9'],
                ['cancel', '0', 'backspace'],
              ].map((row, rowIndex) => (
                <View key={rowIndex} style={styles.keypadRow}>
                  {row.map((item) => {
                    if (item === 'cancel') {
                      return (
                        <TouchableOpacity
                          key={item}
                          style={styles.keyActionBtn}
                          onPress={handleCancelFlow}
                          activeOpacity={0.7}
                          accessibilityRole="button"
                          accessibilityLabel="Cancel PIN entry"
                        >
                          <Text variant="caption" weight="700" color={colors.textSecondary}>
                            Cancel
                          </Text>
                        </TouchableOpacity>
                      );
                    }
                    if (item === 'backspace') {
                      return (
                        <TouchableOpacity
                          key={item}
                          style={styles.keyActionBtn}
                          onPress={handleBackspace}
                          activeOpacity={0.7}
                          accessibilityRole="button"
                          accessibilityLabel="Delete last digit"
                        >
                          <BackspaceSvg size={22} color={colors.textPrimary} strokeWidth={2} />
                        </TouchableOpacity>
                      );
                    }
                    return (
                      <TouchableOpacity
                        key={item}
                        style={styles.keyNumberBtn}
                        onPress={() => handleKeyPress(item)}
                        activeOpacity={0.7}
                        accessibilityRole="button"
                        accessibilityLabel={`Digit ${item}`}
                      >
                        <Text variant="h2" weight="800" color={colors.textPrimary} style={styles.keyText}>
                          {item}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background, // 60% Dominant Canvas #F8FAFC
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.md, // 16px
    paddingTop: spacing.lg,        // 24px
    paddingBottom: 48,
  },
  headerBlock: {
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 19,
  },
  sectionBlock: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
    paddingBottom: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    letterSpacing: 1.2,
    marginBottom: spacing.md,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  rowTitleBox: {
    flex: 1,
    paddingRight: spacing.md,
  },
  rowTitle: {
    color: colors.textPrimary,
    marginBottom: 3,
  },
  rowDescription: {
    fontSize: 12,
    lineHeight: 17,
  },
  statusPill: {
    fontSize: 11,
    letterSpacing: 0.8,
  },
  rowDisclosureArrow: {
    fontSize: 22,
    lineHeight: 24,
    color: colors.textTertiary,
    fontWeight: '300',
    paddingLeft: spacing.sm,
  },
  rowDivider: {
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.05)',
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
  },
  specLabel: {
    fontSize: 12,
  },
  specValue: {
    fontSize: 12,
  },
  footerNote: {
    marginTop: spacing.md,
    paddingHorizontal: 4,
  },
  footerText: {
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
  },
  keypadWrapper: {
    alignItems: 'center',
    paddingTop: spacing.md,
  },
  keypadHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  keypadTitle: {
    fontSize: 20,
    marginBottom: 6,
    textAlign: 'center',
  },
  keypadSubtitle: {
    fontSize: 13,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 12,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#CBD5E1',
  },
  dotFilled: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
    transform: [{ scale: 1.15 }],
  },
  dotError: {
    borderColor: '#DC2626',
    backgroundColor: '#DC2626',
  },
  errorBox: {
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 12,
    textAlign: 'center',
  },
  keypad: {
    width: '100%',
    maxWidth: 320,
    gap: 14,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  keyNumberBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFFFFF', // 30% Panel Surface
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyActionBtn: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 22,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
  },
});
