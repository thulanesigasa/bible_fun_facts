import React, { useEffect, useRef, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  Image,
  Animated,
} from 'react-native';

export type AlertIconType =
  | 'logout'
  | 'trash'
  | 'shield'
  | 'device'
  | 'devices'
  | 'keypad'
  | 'danger'
  | 'warning'
  | 'success'
  | 'info'
  | 'block'
  | 'flag'
  | 'logo';

export interface ThemedAlertButton {
  text: string;
  onPress?: () => void | Promise<void>;
  style?: 'default' | 'cancel' | 'destructive';
}

export interface ThemedAlertModalProps {
  visible: boolean;
  title: string;
  message?: string;
  icon?: AlertIconType;
  buttons?: ThemedAlertButton[];
  onClose?: () => void;
  isDestructive?: boolean;
}

const { width } = Dimensions.get('window');

export default function ThemedAlertModal({
  visible,
  title,
  message,
  icon = 'logo',
  buttons = [{ text: 'OK' }],
  onClose,
  isDestructive = false,
}: ThemedAlertModalProps) {
  const [modalVisible, setModalVisible] = useState(visible);
  const slideAnim = useRef(new Animated.Value(400)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          damping: 24,
          stiffness: 220,
          mass: 0.8,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (modalVisible) {
      animateDismiss();
    }
  }, [visible]);

  const animateDismiss = (onComplete?: () => void | Promise<void>) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 400,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
      if (onClose) onClose();
      if (onComplete) onComplete();
    });
  };

  const handleButtonPress = (btn: ThemedAlertButton) => {
    animateDismiss(() => {
      if (btn.onPress) {
        btn.onPress();
      }
    });
  };

  if (!modalVisible) return null;

  return (
    <Modal
      transparent
      visible={modalVisible}
      animationType="none"
      onRequestClose={() => animateDismiss()}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={() => animateDismiss()}>
        <Animated.View style={[styles.overlayScrim, { opacity: fadeAnim }]}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <Animated.View
              style={[
                styles.bottomSheetCard,
                { transform: [{ translateY: slideAnim }] },
              ]}
            >
              {/* Sheet Drag Handle */}
              <View style={styles.sheetHandle} />

              {/* Pop-up Brand Logo: Unboxed transparent mark, zero container background, zero border radius */}
              <View style={styles.iconCenterWrapper}>
                <Image
                  source={require('../../assets/logo-transparent.png')}
                  style={styles.alertLogo}
                  resizeMode="contain"
                />
              </View>

              {/* Title & Message */}
              <Text style={styles.dialogTitle}>{title}</Text>
              {message ? <Text style={styles.dialogMessage}>{message}</Text> : null}

              {/* Action Buttons: 60-30-10 calibrated layout */}
              <View style={[styles.buttonRow, buttons.length === 1 && styles.buttonRowSingle]}>
                {buttons.map((btn, index) => {
                  const isCancel = btn.style === 'cancel';
                  const isDestruct = btn.style === 'destructive' || (isDestructive && !isCancel);

                  return (
                    <TouchableOpacity
                      key={`alert-btn-${index}`}
                      style={[
                        styles.buttonBase,
                        buttons.length === 1 && styles.buttonFull,
                        isCancel && styles.buttonCancel,
                        !isCancel && !isDestruct && styles.buttonPrimary,
                        isDestruct && styles.buttonDestructive,
                      ]}
                      activeOpacity={0.8}
                      onPress={() => handleButtonPress(btn)}
                    >
                      <Text
                        style={[
                          styles.buttonTextBase,
                          isCancel && styles.buttonTextCancel,
                          !isCancel && !isDestruct && styles.buttonTextPrimary,
                          isDestruct && styles.buttonTextDestructive,
                        ]}
                      >
                        {btn.text}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlayScrim: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bottomSheetCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 36 : 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    borderBottomWidth: 0,
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: -6 },
        shadowOpacity: 0.1,
        shadowRadius: 18,
      },
      android: {
        elevation: 16,
      },
    }),
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(15, 23, 42, 0.12)',
    alignSelf: 'center',
    marginBottom: 16,
  },
  iconCenterWrapper: {
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertLogo: {
    width: 56,
    height: 56,
    backgroundColor: 'transparent',
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
    letterSpacing: 0.2,
    marginBottom: 8,
  },
  dialogMessage: {
    fontSize: 14,
    lineHeight: 20,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonRowSingle: {
    justifyContent: 'center',
  },
  buttonBase: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonFull: {
    flex: 1,
    width: '100%',
  },
  buttonCancel: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
  },
  buttonPrimary: {
    backgroundColor: '#FDD223',
  },
  buttonDestructive: {
    backgroundColor: '#FEF9C3',
    borderWidth: 1,
    borderColor: '#FDE047',
  },
  buttonTextBase: {
    fontSize: 14,
    fontWeight: '700',
  },
  buttonTextCancel: {
    color: '#0F172A',
  },
  buttonTextPrimary: {
    color: '#0F172A',
  },
  buttonTextDestructive: {
    color: '#B45309',
  },
});
