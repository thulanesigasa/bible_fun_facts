import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import { useUser } from '../context/UserContext';
import {
  GoogleSvg,
  AppleSvg,
  MailSvg,
  LockSvg,
  UserSvg,
  EyeSvg,
  EyeOffSvg,
} from '../components/SvgIcons';

type AuthMode = 'login' | 'signup';

export default function AuthScreen() {
  const { login, signup } = useUser();
  const [mode, setMode] = useState<AuthMode>('login');

  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      Alert.alert('Required Field', 'Please enter your email address.');
      return;
    }

    if (!password) {
      Alert.alert('Required Field', 'Please enter your password.');
      return;
    }

    if (mode === 'signup') {
      const trimmedName = name.trim();
      if (!trimmedName) {
        Alert.alert('Required Field', 'Please enter your full name.');
        return;
      }
      signup(trimmedName, trimmedEmail, password);
    } else {
      login(trimmedEmail, password);
    }
  };

  const handleSocialAuth = (provider: 'Google' | 'Apple') => {
    const mockName = provider === 'Google' ? 'Daniel' : 'Sarah';
    const mockEmail = `${mockName.toLowerCase()}@example.com`;
    if (mode === 'signup') {
      signup(mockName, mockEmail);
    } else {
      login(mockEmail, undefined, mockName);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Branding - Rule 15 & 19: Auth Logo 28x28 */}
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

          {/* Mode Switcher: Sign In vs Create Account */}
          <View style={[styles.tabSelector, shadow.sm]}>
            <TouchableOpacity
              style={[styles.tabBtn, mode === 'login' && styles.tabBtnActive]}
              onPress={() => setMode('login')}
              activeOpacity={0.8}
            >
              <Text
                variant="h3"
                style={[styles.tabBtnText, mode === 'login' && styles.tabBtnTextActive]}
              >
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabBtn, mode === 'signup' && styles.tabBtnActive]}
              onPress={() => setMode('signup')}
              activeOpacity={0.8}
            >
              <Text
                variant="h3"
                style={[styles.tabBtnText, mode === 'signup' && styles.tabBtnTextActive]}
              >
                Create Account
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Inputs */}
          <View style={styles.formContainer}>
            {mode === 'signup' && (
              <View style={styles.inputGroup}>
                <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.inputLabel}>
                  FULL NAME
                </Text>
                <View style={[styles.inputWrapper, shadow.sm]}>
                  <UserSvg size={18} color="#94A3B8" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your name"
                    placeholderTextColor="#94A3B8"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.inputLabel}>
                EMAIL ADDRESS
              </Text>
              <View style={[styles.inputWrapper, shadow.sm]}>
                <MailSvg size={18} color="#94A3B8" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder="name@example.com"
                  placeholderTextColor="#94A3B8"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.inputLabel}>
                PASSWORD
              </Text>
              <View style={[styles.inputWrapper, shadow.sm]}>
                <LockSvg size={18} color="#94A3B8" style={styles.inputIcon} />
                <TextInput
                  style={styles.textInput}
                  placeholder={mode === 'signup' ? 'Create a secure password' : 'Enter your password'}
                  placeholderTextColor="#94A3B8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(prev => !prev)}
                  style={styles.eyeBtn}
                  activeOpacity={0.7}
                >
                  {showPassword ? (
                    <EyeOffSvg size={18} color="#94A3B8" />
                  ) : (
                    <EyeSvg size={18} color="#94A3B8" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.primaryBtn, shadow.sm]}
              onPress={handleSubmit}
              activeOpacity={0.85}
            >
              <Text variant="h3" style={styles.primaryBtnText}>
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Social Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text variant="caption" color={colors.textTertiary} style={styles.dividerText}>
              OR CONTINUE WITH
            </Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialRow}>
            <TouchableOpacity
              style={[styles.socialBtn, shadow.sm]}
              onPress={() => handleSocialAuth('Google')}
              activeOpacity={0.85}
            >
              <GoogleSvg size={18} color="#0F172A" />
              <Text variant="caption" weight="700" style={styles.socialBtnText}>
                Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialBtn, shadow.sm]}
              onPress={() => handleSocialAuth('Apple')}
              activeOpacity={0.85}
            >
              <AppleSvg size={18} color={colors.textPrimary} />
              <Text variant="caption" weight="700" style={styles.socialBtnText}>
                Apple
              </Text>
            </TouchableOpacity>
          </View>

          {/* Disclaimer */}
          <Text variant="caption" color={colors.textTertiary} style={styles.disclaimer}>
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background, // 60% Dominant Background #F8FAFC
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl, // 32px
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  // Rule 15 & Rule 19: Auth / Login / Register logos: 28x28
  authLogo: {
    width: 28,
    height: 28,
    borderRadius: 6,
    marginBottom: spacing.md, // 16px
  },
  title: {
    fontSize: 28,
    color: colors.textPrimary,
    marginBottom: spacing.sm / 2,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 280,
  },
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.full,
    padding: 4,
    marginBottom: spacing.xl,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: radius.full,
  },
  tabBtnActive: {
    backgroundColor: colors.surface,
  },
  tabBtnText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  tabBtnTextActive: {
    color: colors.textPrimary,
    fontWeight: '700',
  },
  formContainer: {
    marginBottom: spacing.lg,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontSize: 11,
    marginBottom: 4,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface, // 30% Panel/Surface #FFFFFF
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 48,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  eyeBtn: {
    padding: spacing.sm,
  },
  primaryBtn: {
    backgroundColor: colors.accent, // 10% Accent #D97706
    borderRadius: radius.md,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 16,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: 11,
    marginHorizontal: spacing.md,
    letterSpacing: 0.5,
  },
  socialRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  socialBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    height: 46,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  socialBtnText: {
    color: colors.textPrimary,
    fontSize: 14,
  },
  disclaimer: {
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 16,
  },
});
