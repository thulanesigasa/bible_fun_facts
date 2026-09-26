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
import { Text } from './Typography';
import { SecurityPinModal } from './SecurityPinModal';
import { PinSecurityService } from '../services/pinSecurityService';

interface BiometricLockOverlayProps {
  visible: boolean;
  biometricType?: string | null;
  onUnlock: () => void;
}

export const BiometricLockOverlay: React.FC<BiometricLockOverlayProps> = ({
  visible,
  biometricType = 'Fingerprint',
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
          {/* Logo with Zero Border-Radius Container per User Instruction */}
          <Image
            source={require('../../assets/logo-transparent.png')}
            style={styles.brandLogo}
            resizeMode="contain"
          />

          {/* App Name Only (Secured text removed per user instruction) */}
          <Text variant="h2" weight="800" color="#0F172A" style={styles.title}>
            exégeomai
          </Text>

          <Text variant="body" color="#64748B" style={styles.subtitle}>
            Your sacred study journal, bookmarks, and reflections are locked.
          </Text>

          {/* Aesthetic Text-Styled Actions (Chunky buttons removed per user instruction) */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.textActionButton}
              onPress={onUnlock}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Unlock with Fingerprint"
            >
              <Text variant="body" weight="700" color="#0F172A" style={styles.actionText}>
                Unlock with Fingerprint
              </Text>
            </TouchableOpacity>

            {hasPin && (
              <TouchableOpacity
                style={styles.secondaryTextActionButton}
                onPress={() => setShowPinModal(true)}
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
    marginBottom: 36,
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
