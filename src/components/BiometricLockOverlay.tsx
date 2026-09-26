import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from './Typography';
import { LockSvg, FingerprintSvg, KeypadSvg } from './SvgIcons';
import { SecurityPinModal } from './SecurityPinModal';
import { PinSecurityService } from '../services/pinSecurityService';

interface BiometricLockOverlayProps {
  visible: boolean;
  biometricType?: string | null;
  onUnlock: () => void;
}

export const BiometricLockOverlay: React.FC<BiometricLockOverlayProps> = ({
  visible,
  biometricType = 'Face ID / Fingerprint',
  onUnlock,
}) => {
  const [showPinModal, setShowPinModal] = React.useState<boolean>(false);
  const [hasPin, setHasPin] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (visible) {
      PinSecurityService.isPinSet().then(setHasPin);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
        <View style={styles.content}>
          {/* Brand Container per Rule 15 / 19 */}
          <View style={styles.logoOuter}>
            <Image
              source={require('../../assets/logo-transparent.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          <Text variant="h2" weight="800" color="#0F172A" style={styles.title}>
            exégeomai Secured
          </Text>

          <Text variant="body" color="#64748B" style={styles.subtitle}>
            Your sacred study journal, bookmarks, and reflections are locked.
          </Text>

          <View style={styles.cardContainer}>
            <View style={styles.iconCircle}>
              <LockSvg size={28} color="#0F172A" strokeWidth={2.2} />
            </View>
            <Text variant="caption" color="#64748B" style={styles.cardText}>
              Protected with hardware encryption & device credentials
            </Text>
          </View>

          {/* Action Button: Biometrics */}
          <TouchableOpacity
            style={styles.unlockButton}
            onPress={onUnlock}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel={`Unlock with ${biometricType || 'Biometrics'}`}
          >
            <FingerprintSvg size={20} color="#0F172A" strokeWidth={2.5} />
            <Text variant="body" weight="800" color="#0F172A" style={styles.unlockButtonText}>
              {`Unlock with ${biometricType || 'Biometrics'}`}
            </Text>
          </TouchableOpacity>

          {/* Secondary Action: Security PIN Fallback */}
          {hasPin && (
            <TouchableOpacity
              style={styles.pinFallbackButton}
              onPress={() => setShowPinModal(true)}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Unlock with 4-Digit Security PIN"
            >
              <KeypadSvg size={18} color="#0F172A" strokeWidth={2} />
              <Text variant="body" weight="700" color="#0F172A" style={styles.pinFallbackText}>
                Use Security PIN
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>

      {/* Security PIN Modal */}
      <SecurityPinModal
        visible={showPinModal}
        mode="verify"
        onSuccess={onUnlock}
        onClose={() => setShowPinModal(false)}
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
  // In-app update / lock logo sizing per Rule 15 / 19
  logoOuter: {
    width: 68,
    height: 68,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
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
    fontSize: 22,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 28,
  },
  cardContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF', // 30% Surface Panel
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(253, 210, 35, 0.16)', // 10% Accent Tint
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  unlockButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#FDD223', // 10% Accent
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  unlockButtonText: {
    fontSize: 14,
  },
  pinFallbackButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#FFFFFF', // 30% Surface Panel
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  pinFallbackText: {
    fontSize: 13,
  },
});

export default BiometricLockOverlay;

