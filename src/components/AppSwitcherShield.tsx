import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Platform,
  AppState,
  AppStateStatus,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from './Typography';
import { ShieldSvg } from './SvgIcons';

interface AppSwitcherShieldProps {
  enabled?: boolean;
}

export const AppSwitcherShield: React.FC<AppSwitcherShieldProps> = ({ enabled = true }) => {
  const [isMasked, setIsMasked] = useState<boolean>(false);

  useEffect(() => {
    if (!enabled) {
      setIsMasked(false);
      return;
    }

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'inactive' || nextAppState === 'background') {
        setIsMasked(true);
      } else if (nextAppState === 'active') {
        setIsMasked(false);
      }
    };

    const sub = AppState.addEventListener('change', handleAppStateChange);
    return () => sub.remove();
  }, [enabled]);

  if (!isMasked || !enabled) return null;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
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
          exégeomai
        </Text>

        <Text variant="caption" color="#64748B" style={styles.subtitle}>
          Sacred Scripture Study
        </Text>

        <View style={styles.shieldBadge}>
          <ShieldSvg size={14} color="#0F172A" strokeWidth={2.2} />
          <Text variant="caption" weight="800" color="#0F172A" style={styles.badgeText}>
            Privacy Shield Active
          </Text>
        </View>
      </View>
    </SafeAreaView>
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
    zIndex: 999998,
    elevation: 999998,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  // In-app update / lock logo sizing strictly per Rule 15 / 19
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
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 20,
  },
  shieldBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF', // 30% Panel Surface
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  badgeText: {
    fontSize: 11,
    letterSpacing: 0.3,
  },
});

export default AppSwitcherShield;
