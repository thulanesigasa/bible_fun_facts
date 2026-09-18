import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme';
import { Text } from '../components/Typography';
import { useUser } from '../context/UserContext';
import { GoogleSvg, AppleSvg, ScripturesSvg } from '../components/SvgIcons';

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
          <View style={styles.logoCircle}>
            <ScripturesSvg size={40} color={colors.background} fill={colors.background} />
          </View>
          <Text variant="h1" style={styles.title}>ScriptureSecrets</Text>
          <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
            Uncover the hidden depth of the Word
          </Text>
        </View>

        {/* Auth Buttons */}
        <View style={styles.bottomSection}>
          <Text variant="label" weight="800" style={styles.authLabel}>GET STARTED</Text>

          <TouchableOpacity
            style={styles.googleBtn}
            onPress={() => handleLogin('Google')}
            activeOpacity={0.85}
          >
            <View style={styles.btnRow}>
              <GoogleSvg size={20} color="#000000" />
              <Text variant="h3" style={styles.googleBtnText}>Sign Up with Google</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.appleBtn}
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
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: radius.full,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg, // 24px
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
    backgroundColor: '#FFFFFF',
    paddingVertical: spacing.md, // 16px
    borderRadius: radius.md, // 16px
    marginBottom: spacing.md, // 16px
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
    color: '#000000',
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
