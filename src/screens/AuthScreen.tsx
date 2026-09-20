import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import { useUser } from '../context/UserContext';
import { GoogleSvg, AppleSvg } from '../components/SvgIcons';

export default function AuthScreen() {
  const { login } = useUser();

  const handleLogin = (provider: 'Google' | 'Apple') => {
    const mockName = provider === 'Google' ? 'Daniel' : 'Sarah';
    login(mockName);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Branding */}
        <View style={styles.header}>
          <Image
            source={require('../../assets/icon.png')}
            style={styles.authLogo}
            resizeMode="contain"
          />
          <Text variant="h1" style={styles.title}>exégeomai</Text>
          <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
            Unfold, interpret, and declare the depth of the Word
          </Text>
        </View>

        {/* Auth Buttons */}
        <View style={styles.bottomSection}>
          <Text variant="label" weight="800" style={styles.authLabel}>GET STARTED</Text>

          <TouchableOpacity
            style={[styles.googleBtn, shadow.sm]}
            onPress={() => handleLogin('Google')}
            activeOpacity={0.85}
          >
            <View style={styles.btnRow}>
              <GoogleSvg size={20} color="#0F172A" />
              <Text variant="h3" style={styles.googleBtnText}>Sign Up with Google</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.appleBtn, shadow.sm]}
            onPress={() => handleLogin('Apple')}
            activeOpacity={0.85}
          >
            <View style={styles.btnRow}>
              <AppleSvg size={20} color={colors.textPrimary} />
              <Text variant="h3" style={styles.appleBtnText}>Sign Up with Apple</Text>
            </View>
          </TouchableOpacity>

          <Text variant="caption" color={colors.textTertiary} style={styles.disclaimer}>
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.xl, // 32px
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 80, // Multiple of 8
  },
  // Rule 15 & Rule 19: Auth / Login / Register logos: 28x28
  authLogo: {
    width: 28,
    height: 28,
    borderRadius: 6,
    marginBottom: spacing.md, // 16px
  },
  title: {
    fontSize: 32,
    color: colors.textPrimary,
    marginBottom: spacing.sm, // 8px
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: spacing.md, // 16px
    lineHeight: 24,
  },
  bottomSection: {
    marginBottom: spacing.xxl, // 48px
  },
  authLabel: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md, // 16px
    letterSpacing: 2,
  },
  googleBtn: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.md, // 16px
    borderRadius: radius.md, // 16px
    marginBottom: spacing.md, // 16px
    borderWidth: 1,
    borderColor: colors.border,
  },
  appleBtn: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.md, // 16px
    borderRadius: radius.md, // 16px
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg, // 24px
  },
  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md, // 16px
  },
  googleBtnText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  appleBtnText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  disclaimer: {
    textAlign: 'center',
    paddingHorizontal: spacing.xl, // 32px
    fontSize: 12,
    lineHeight: 18,
  },
});
