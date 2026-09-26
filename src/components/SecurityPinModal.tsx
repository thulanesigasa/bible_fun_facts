import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Platform,
  Animated,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from './Typography';
import { BackspaceSvg, CloseSvg } from './SvgIcons';
import { PinSecurityService } from '../services/pinSecurityService';

export type PinModalMode = 'verify' | 'setup' | 'change' | 'remove';

interface SecurityPinModalProps {
  visible: boolean;
  mode?: PinModalMode;
  onSuccess: () => void;
  onClose: () => void;
}

export const SecurityPinModal: React.FC<SecurityPinModalProps> = ({
  visible,
  mode = 'verify',
  onSuccess,
  onClose,
}) => {
  const [pin, setPin] = useState<string>('');
  const [setupInitialPin, setSetupInitialPin] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const shakeAnim = useRef(new Animated.Value(0)).current;

  // Reset state on open/close
  useEffect(() => {
    if (visible) {
      setPin('');
      setSetupInitialPin('');
      setCurrentStep(1);
      setErrorMessage(null);
      setIsVerifying(false);
    }
  }, [visible, mode]);

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

  const handleKeyPress = (num: string) => {
    if (isVerifying) return;
    if (pin.length < 4) {
      const nextPin = pin + num;
      setPin(nextPin);
      setErrorMessage(null);

      if (nextPin.length === 4) {
        handlePinComplete(nextPin);
      }
    }
  };

  const handleBackspace = () => {
    if (isVerifying) return;
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
      setErrorMessage(null);
    }
  };

  const handlePinComplete = async (completedPin: string) => {
    setIsVerifying(true);

    if (mode === 'verify') {
      const res = await PinSecurityService.verifyPin(completedPin);
      if (res.success) {
        onSuccess();
        onClose();
      } else {
        setErrorMessage(res.error || 'Incorrect PIN');
        triggerShake(() => {
          setPin('');
          setIsVerifying(false);
        });
      }
    } else if (mode === 'setup') {
      if (currentStep === 1) {
        setSetupInitialPin(completedPin);
        setPin('');
        setCurrentStep(2);
        setIsVerifying(false);
      } else {
        if (completedPin === setupInitialPin) {
          const success = await PinSecurityService.setPin(completedPin);
          if (success) {
            onSuccess();
            onClose();
          } else {
            setErrorMessage('Could not save PIN. Please retry.');
            triggerShake(() => {
              setPin('');
              setCurrentStep(1);
              setIsVerifying(false);
            });
          }
        } else {
          setErrorMessage('PINs do not match. Please start again.');
          triggerShake(() => {
            setPin('');
            setSetupInitialPin('');
            setCurrentStep(1);
            setIsVerifying(false);
          });
        }
      }
    } else if (mode === 'change') {
      if (currentStep === 1) {
        const verify = await PinSecurityService.verifyPin(completedPin);
        if (verify.success) {
          setPin('');
          setCurrentStep(2);
          setIsVerifying(false);
        } else {
          setErrorMessage(verify.error || 'Current PIN incorrect');
          triggerShake(() => {
            setPin('');
            setIsVerifying(false);
          });
        }
      } else if (currentStep === 2) {
        setSetupInitialPin(completedPin);
        setPin('');
        setCurrentStep(3);
        setIsVerifying(false);
      } else {
        if (completedPin === setupInitialPin) {
          const success = await PinSecurityService.setPin(completedPin);
          if (success) {
            onSuccess();
            onClose();
          } else {
            setErrorMessage('Could not update PIN');
            triggerShake(() => {
              setPin('');
              setCurrentStep(2);
              setIsVerifying(false);
            });
          }
        } else {
          setErrorMessage('PINs do not match. Re-enter new PIN.');
          triggerShake(() => {
            setPin('');
            setCurrentStep(2);
            setIsVerifying(false);
          });
        }
      }
    } else if (mode === 'remove') {
      const res = await PinSecurityService.removePin(completedPin);
      if (res.success) {
        onSuccess();
        onClose();
      } else {
        setErrorMessage(res.error || 'Current PIN incorrect');
        triggerShake(() => {
          setPin('');
          setIsVerifying(false);
        });
      }
    }
  };

  const getTitleAndSubtitle = () => {
    if (mode === 'verify') {
      return {
        title: 'Security PIN',
        subtitle: 'Enter your 4-digit passcode to unlock exégeomai',
      };
    }
    if (mode === 'setup') {
      return currentStep === 1
        ? { title: 'Create Security PIN', subtitle: 'Choose a 4-digit passcode for your study journal' }
        : { title: 'Confirm Security PIN', subtitle: 'Re-enter your 4-digit passcode to verify' };
    }
    if (mode === 'change') {
      if (currentStep === 1) return { title: 'Current PIN', subtitle: 'Enter your existing 4-digit passcode' };
      if (currentStep === 2) return { title: 'New PIN', subtitle: 'Enter your new 4-digit passcode' };
      return { title: 'Confirm New PIN', subtitle: 'Re-enter your new 4-digit passcode to confirm' };
    }
    return { title: 'Remove Security PIN', subtitle: 'Enter your current passcode to disable PIN lock' };
  };

  const { title, subtitle } = getTitleAndSubtitle();

  if (!visible) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent={false} onRequestClose={onClose}>
      <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />

        {/* Top Dismiss Button */}
        <View style={styles.topNav}>
          <TouchableOpacity
            style={styles.closeCircle}
            onPress={onClose}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Cancel PIN entry"
          >
            <CloseSvg size={18} color="#64748B" strokeWidth={2.2} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Logo container strictly per Rule 15 & 19 */}
          <View style={styles.logoOuter}>
            <Image
              source={require('../../assets/logo-transparent.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <Text variant="h2" weight="800" color="#0F172A" style={styles.title}>
            {title}
          </Text>

          <Text variant="body" color="#64748B" style={styles.subtitle}>
            {subtitle}
          </Text>

          {/* 4 PIN Dots */}
          <Animated.View style={[styles.dotsContainer, { transform: [{ translateX: shakeAnim }] }]}>
            {[0, 1, 2, 3].map((index) => {
              const isFilled = pin.length > index;
              return (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    isFilled && styles.dotFilled,
                    errorMessage && styles.dotError,
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
                        style={styles.keyEmpty}
                        onPress={onClose}
                        activeOpacity={0.7}
                        accessibilityRole="button"
                        accessibilityLabel="Cancel"
                      >
                        <Text variant="caption" weight="700" color="#64748B">
                          Cancel
                        </Text>
                      </TouchableOpacity>
                    );
                  }
                  if (item === 'backspace') {
                    return (
                      <TouchableOpacity
                        key={item}
                        style={styles.keyButton}
                        onPress={handleBackspace}
                        activeOpacity={0.7}
                        accessibilityRole="button"
                        accessibilityLabel="Delete last digit"
                      >
                        <BackspaceSvg size={22} color="#0F172A" strokeWidth={2} />
                      </TouchableOpacity>
                    );
                  }
                  return (
                    <TouchableOpacity
                      key={item}
                      style={styles.keyButton}
                      onPress={() => handleKeyPress(item)}
                      activeOpacity={0.7}
                      accessibilityRole="button"
                      accessibilityLabel={`Digit ${item}`}
                    >
                      <Text variant="h2" weight="800" color="#0F172A" style={styles.keyText}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC', // 60% Dominant Background
    justifyContent: 'space-between',
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  closeCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    maxWidth: 380,
    width: '100%',
    alignSelf: 'center',
  },
  // In-app update / lock logo sizing strictly per Rule 15 & 19
  logoOuter: {
    width: 68,
    height: 68,
    borderRadius: 18,
    backgroundColor: '#FFFFFF', // 30% Panel Surface
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
  },
  logoImage: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
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
    gap: 14,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  keyButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFFFFF', // 30% Panel Surface
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  keyEmpty: {
    width: 68,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 24,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
  },
});

export default SecurityPinModal;
