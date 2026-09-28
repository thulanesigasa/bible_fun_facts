import React from 'react';
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
} from 'react-native';
import {
  LogOutSvg,
  TrashSvg,
  ShieldLockSvg,
  DevicesSvg,
  AlertCircleSvg,
  AlertTriangleSvg,
  CheckCircleSvg,
  InfoCircleSvg,
  KeypadSvg,
  BlockSvg,
  FlagSvg,
} from './SvgIcons';

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
  icon = 'info',
  buttons = [{ text: 'OK' }],
  onClose,
  isDestructive = false,
}: ThemedAlertModalProps) {
  if (!visible) return null;

  // Icon calibration: 50x50 SVG inside a 68x68 rounded container (border radius 18px) per Rule 15 & 19
  const renderIcon = () => {
    switch (icon) {
      case 'logout':
        return (
          <View style={[styles.iconContainer, styles.iconContainerTheme]}>
            <LogOutSvg size={36} color="#B45309" />
          </View>
        );
      case 'trash':
      case 'danger':
        return (
          <View style={[styles.iconContainer, styles.iconContainerTheme]}>
            <TrashSvg size={36} color="#B45309" />
          </View>
        );
      case 'warning':
        return (
          <View style={[styles.iconContainer, styles.iconContainerTheme]}>
            <AlertTriangleSvg size={36} color="#B45309" />
          </View>
        );
      case 'success':
        return (
          <View style={[styles.iconContainer, styles.iconContainerTheme]}>
            <CheckCircleSvg size={36} color="#B45309" />
          </View>
        );
      case 'shield':
        return (
          <View style={[styles.iconContainer, styles.iconContainerTheme]}>
            <ShieldLockSvg size={36} color="#B45309" />
          </View>
        );
      case 'device':
      case 'devices':
        return (
          <View style={[styles.iconContainer, styles.iconContainerTheme]}>
            <DevicesSvg size={36} color="#B45309" />
          </View>
        );
      case 'block':
        return (
          <View style={[styles.iconContainer, styles.iconContainerTheme]}>
            <BlockSvg size={36} color="#B45309" />
          </View>
        );
      case 'flag':
        return (
          <View style={[styles.iconContainer, styles.iconContainerTheme]}>
            <FlagSvg size={36} color="#B45309" />
          </View>
        );
      case 'keypad':
        return (
          <View style={[styles.iconContainer, styles.iconContainerTheme]}>
            <KeypadSvg size={36} color="#B45309" />
          </View>
        );
      case 'logo':
        return (
          <Image
            source={require('../../assets/logo-transparent.png')}
            style={styles.alertLogoAlone}
            resizeMode="contain"
          />
        );
      case 'info':
      default:
        return (
          <View style={[styles.iconContainer, styles.iconContainerTheme]}>
            <InfoCircleSvg size={36} color="#B45309" />
          </View>
        );
    }
  };

  const handleButtonPress = async (btn: ThemedAlertButton) => {
    if (onClose) {
      onClose();
    }
    if (btn.onPress) {
      await btn.onPress();
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlayScrim}>
          <TouchableWithoutFeedback>
            <View style={styles.dialogCard}>
              {/* Rule 15/19 Calibrated 68x68 Icon Badge */}
              <View style={styles.iconCenterWrapper}>{renderIcon()}</View>

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
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlayScrim: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  dialogCard: {
    width: Math.min(width - 48, 360),
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.16,
        shadowRadius: 24,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  iconCenterWrapper: {
    marginBottom: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Rule 15/19: 50x50 icon inside 68x68 rounded container with border radius 18px
  iconContainer: {
    width: 68,
    height: 68,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  iconContainerTheme: {
    backgroundColor: '#FEF9C3',
    borderColor: '#FDE047',
  },
  iconContainerDestructive: {
    backgroundColor: '#FEF9C3',
    borderColor: '#FDE047',
  },
  iconContainerWarning: {
    backgroundColor: '#FEF9C3',
    borderColor: '#FDE047',
  },
  iconContainerSuccess: {
    backgroundColor: '#FEF9C3',
    borderColor: '#FDE047',
  },
  iconContainerNeutral: {
    backgroundColor: '#FEF9C3',
    borderColor: '#FDE047',
  },
  alertLogoAlone: {
    width: 56,
    height: 56,
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
    marginBottom: 24,
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
