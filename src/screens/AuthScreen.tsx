import React, { useState, useEffect } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import { useUser } from '../context/UserContext';
import {
  MailSvg,
  LockSvg,
  UserSvg,
  EyeSvg,
  EyeOffSvg,
  CheckSvg,
  CrossSvg,
  ChevronLeftSvg,
  ChevronRightSvg,
  AtSvg,
  ShieldCheckSvg,
  TargetSvg,
  BookOpenSvg,
} from '../components/SvgIcons';

type AuthMode = 'login' | 'signup';
type SignUpStep = 1 | 2 | 3 | 4;

const TRANSLATIONS = [
  { id: 'ESV', label: 'ESV (English Standard)' },
  { id: 'KJV', label: 'KJV (King James)' },
  { id: 'NASB', label: 'NASB (New American Standard)' },
  { id: 'NIV', label: 'NIV (New International)' },
  { id: 'CSB', label: 'CSB (Christian Standard)' },
];

const STUDY_FOCUSES = [
  { id: 'Original Languages & Strong\'s', label: 'Original Languages (Hebrew / Greek)' },
  { id: 'Historical & Cultural Context', label: 'Historical & Ancient Cultural Context' },
  { id: 'Daily Devotional Reflection', label: 'Daily Devotional & Practical Wisdom' },
  { id: 'Systematic Biblical Theology', label: 'Systematic Theology & Doctrine' },
];

const DAILY_GOALS = [
  { id: '5 mins / day', label: '5 mins / day (Quick Exegesis)' },
  { id: '15 mins / day', label: '15 mins / day (Standard Study)' },
  { id: '30+ mins / day', label: '30+ mins / day (Scholarly Deep Dive)' },
];

const KNOWLEDGE_LEVELS = [
  { id: 'Curious Seeker', label: 'Curious Seeker' },
  { id: 'Growing Disciple', label: 'Growing Disciple' },
  { id: 'Bible Teacher / Minister', label: 'Bible Teacher / Minister' },
  { id: 'Theological Scholar', label: 'Theological Scholar' },
];

export default function AuthScreen() {
  const { login, signupExtended, checkUsernameAvailability } = useUser();
  const [mode, setMode] = useState<AuthMode>('login');
  const [step, setStep] = useState<SignUpStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Login Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Sign Up Step 1: Personal Identity
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [usernameStatus, setUsernameStatus] = useState<{
    checked: boolean;
    available: boolean;
    reason?: string;
    loading: boolean;
  }>({ checked: false, available: false, loading: false });

  // Sign Up Step 2: Contact & Verification
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');

  // Sign Up Step 3: Security & Credentials
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Sign Up Step 4: Study Profile & Preferences
  const [preferredTranslation, setPreferredTranslation] = useState('ESV');
  const [studyFocus, setStudyFocus] = useState('Original Languages & Strong\'s');
  const [dailyGoal, setDailyGoal] = useState('15 mins / day');
  const [knowledgeLevel, setKnowledgeLevel] = useState('Growing Disciple');

  // Debounced username availability checker
  useEffect(() => {
    const clean = username.trim().toLowerCase();
    if (!clean || clean.length < 3) {
      setUsernameStatus({ checked: false, available: false, loading: false });
      return;
    }

    setUsernameStatus(prev => ({ ...prev, loading: true }));
    const timer = setTimeout(async () => {
      const res = await checkUsernameAvailability(clean);
      setUsernameStatus({
        checked: true,
        available: res.available,
        reason: res.reason,
        loading: false,
      });
    }, 400);

    return () => clearTimeout(timer);
  }, [username]);

  // Validation Checkers
  const isEmailValid = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  const emailsMatch = email.trim().length > 0 && email.trim().toLowerCase() === confirmEmail.trim().toLowerCase();

  // Password Criteria
  const hasMinLen = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  const passwordScore = [hasMinLen, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;

  const getPasswordStrengthLabel = () => {
    if (!password) return 'Enter a password';
    if (passwordScore <= 1) return 'Weak (min 8 characters required)';
    if (passwordScore === 2) return 'Fair';
    if (passwordScore === 3) return 'Good';
    return 'Strong & Secure';
  };

  // Step Validation Status
  const canProceedStep1 = firstName.trim().length > 0 && lastName.trim().length > 0 && usernameStatus.checked && usernameStatus.available;
  const canProceedStep2 = isEmailValid(email) && emailsMatch;
  const canProceedStep3 = hasMinLen && passwordScore >= 3 && passwordsMatch;
  const canProceedStep4 = true;

  const handleLoginSubmit = () => {
    const trimmed = loginEmail.trim();
    if (!trimmed) {
      Alert.alert('Required Field', 'Please enter your email address or username.');
      return;
    }
    if (!loginPassword) {
      Alert.alert('Required Field', 'Please enter your password.');
      return;
    }
    login(trimmed, loginPassword);
  };


  const handleFinalSignUp = async () => {
    setIsSubmitting(true);
    try {
      await signupExtended({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        username: username.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        password,
        preferredTranslation,
        studyFocus,
        dailyGoal,
        knowledgeLevel,
      });
    } finally {
      setIsSubmitting(false);
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
          {/* Header Branding - Rule 15 & 19: Auth Logo strictly 28x28 */}
          <View style={styles.header}>
            <Image
              source={require('../../assets/logo-transparent.png')}
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
              onPress={() => {
                setMode('login');
                setStep(1);
              }}
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

          {/* ================================================================ */}
          {/* MODE: LOGIN                                                      */}
          {/* ================================================================ */}
          {mode === 'login' && (
            <View style={styles.formCard}>
              <View style={styles.inputGroup}>
                <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.inputLabel}>
                  EMAIL OR USERNAME
                </Text>
                <View style={[styles.inputWrapper, shadow.sm]}>
                  <MailSvg size={18} color="#94A3B8" style={styles.inputIcon} />
                  <TextInput
                    style={styles.textInput}
                    placeholder="name@example.com"
                    placeholderTextColor="#94A3B8"
                    value={loginEmail}
                    onChangeText={setLoginEmail}
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
                    placeholder="Enter your password"
                    placeholderTextColor="#94A3B8"
                    value={loginPassword}
                    onChangeText={setLoginPassword}
                    secureTextEntry={!showLoginPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    onPress={() => setShowLoginPassword(prev => !prev)}
                    style={styles.eyeBtn}
                    activeOpacity={0.7}
                  >
                    {showLoginPassword ? (
                      <EyeOffSvg size={18} color="#94A3B8" />
                    ) : (
                      <EyeSvg size={18} color="#94A3B8" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.primaryBtn, shadow.sm]}
                onPress={handleLoginSubmit}
                activeOpacity={0.85}
              >
                <Text variant="h3" style={styles.primaryBtnText}>
                  Sign In
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.switchModeLink}
                onPress={() => {
                  setMode('signup');
                  setStep(1);
                }}
                activeOpacity={0.7}
              >
                <Text variant="caption" color={colors.textSecondary}>
                  Don't have an account?{' '}
                  <Text variant="caption" weight="700" color={colors.accent}>
                    Create Account
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ================================================================ */}
          {/* MODE: SIGN UP (MULTI-STEP WIZARD)                                 */}
          {/* ================================================================ */}
          {mode === 'signup' && (
            <View style={styles.wizardContainer}>
              {/* Wizard Step Indicator Bar */}
              <View style={[styles.stepIndicatorCard, shadow.sm]}>
                <View style={styles.stepPillsRow}>
                  {[1, 2, 3, 4].map(s => {
                    const isPassed = step > s;
                    const isCurrent = step === s;
                    return (
                      <View key={s} style={styles.stepPillItem}>
                        <View
                          style={[
                            styles.stepCircle,
                            isPassed && styles.stepCircleCompleted,
                            isCurrent && styles.stepCircleActive,
                          ]}
                        >
                          {isPassed ? (
                            <CheckSvg size={12} color="#FFFFFF" />
                          ) : (
                            <Text
                              variant="caption"
                              weight="700"
                              style={[
                                styles.stepCircleText,
                                isCurrent && styles.stepCircleTextActive,
                              ]}
                            >
                              {s}
                            </Text>
                          )}
                        </View>
                        {s < 4 && (
                          <View
                            style={[
                              styles.stepConnectorLine,
                              isPassed && styles.stepConnectorLineActive,
                            ]}
                          />
                        )}
                      </View>
                    );
                  })}
                </View>

                {/* Step Context Title */}
                <View style={styles.stepTitleContainer}>
                  <Text variant="caption" weight="700" color={colors.accent}>
                    STEP {step} OF 4
                  </Text>
                  <Text variant="h3" style={styles.stepHeading}>
                    {step === 1 && 'Personal Identity & Username'}
                    {step === 2 && 'Contact & Email Verification'}
                    {step === 3 && 'Security & Password Credentials'}
                    {step === 4 && 'Biblical Study Journey & Preferences'}
                  </Text>
                </View>
              </View>

              {/* STEP 1: Personal Identity & Username */}
              {step === 1 && (
                <View style={styles.stepContentCard}>
                  <View style={styles.inputGroup}>
                    <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.inputLabel}>
                      FIRST NAME
                    </Text>
                    <View style={[styles.inputWrapper, shadow.sm]}>
                      <UserSvg size={18} color="#94A3B8" style={styles.inputIcon} />
                      <TextInput
                        style={styles.textInput}
                        placeholder="e.g. Daniel"
                        placeholderTextColor="#94A3B8"
                        value={firstName}
                        onChangeText={setFirstName}
                        autoCapitalize="words"
                        autoCorrect={false}
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.inputLabel}>
                      SURNAME / LAST NAME
                    </Text>
                    <View style={[styles.inputWrapper, shadow.sm]}>
                      <UserSvg size={18} color="#94A3B8" style={styles.inputIcon} />
                      <TextInput
                        style={styles.textInput}
                        placeholder="e.g. Moyo"
                        placeholderTextColor="#94A3B8"
                        value={lastName}
                        onChangeText={setLastName}
                        autoCapitalize="words"
                        autoCorrect={false}
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.inputLabel}>
                      DESIRED USERNAME
                    </Text>
                    <View
                      style={[
                        styles.inputWrapper,
                        shadow.sm,
                        usernameStatus.checked && !usernameStatus.available && styles.inputWrapperError,
                        usernameStatus.checked && usernameStatus.available && styles.inputWrapperSuccess,
                      ]}
                    >
                      <AtSvg size={18} color="#94A3B8" style={styles.inputIcon} />
                      <TextInput
                        style={styles.textInput}
                        placeholder="e.g. daniel_exegesis"
                        placeholderTextColor="#94A3B8"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                      {usernameStatus.loading && (
                        <ActivityIndicator size="small" color={colors.accent} style={styles.statusIndicator} />
                      )}
                      {!usernameStatus.loading && usernameStatus.checked && (
                        <View style={styles.statusIndicator}>
                          {usernameStatus.available ? (
                            <CheckSvg size={16} color={colors.accent} />
                          ) : (
                            <CrossSvg size={16} color={colors.textSecondary} />
                          )}
                        </View>
                      )}
                    </View>

                    {/* Username Feedback Text */}
                    {usernameStatus.checked && (
                      <View style={styles.validationNotice}>
                        <Text
                          variant="caption"
                          color={usernameStatus.available ? colors.accent : colors.textSecondary}
                        >
                          {usernameStatus.available
                            ? `@${username.trim().toLowerCase()} is available!`
                            : (usernameStatus.reason || 'This username is already taken.')}
                        </Text>
                      </View>
                    )}
                  </View>

                  <TouchableOpacity
                    style={[styles.primaryBtn, !canProceedStep1 && styles.primaryBtnDisabled, shadow.sm]}
                    onPress={() => setStep(2)}
                    disabled={!canProceedStep1}
                    activeOpacity={0.85}
                  >
                    <Text variant="h3" style={styles.primaryBtnText}>
                      Continue to Contact Details
                    </Text>
                    <ChevronRightSvg size={18} color="#FFFFFF" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.switchModeLink}
                    onPress={() => setMode('login')}
                    activeOpacity={0.7}
                  >
                    <Text variant="caption" color={colors.textSecondary}>
                      Already have an account?{' '}
                      <Text variant="caption" weight="700" color={colors.accent}>
                        Sign In
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* STEP 2: Contact & Email Confirmation */}
              {step === 2 && (
                <View style={styles.stepContentCard}>
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
                      {isEmailValid(email) && (
                        <CheckSvg size={16} color={colors.accent} style={styles.statusIndicator} />
                      )}
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.inputLabel}>
                      CONFIRM EMAIL ADDRESS
                    </Text>
                    <View
                      style={[
                        styles.inputWrapper,
                        shadow.sm,
                        confirmEmail.length > 0 && !emailsMatch && styles.inputWrapperError,
                        emailsMatch && styles.inputWrapperSuccess,
                      ]}
                    >
                      <MailSvg size={18} color="#94A3B8" style={styles.inputIcon} />
                      <TextInput
                        style={styles.textInput}
                        placeholder="Repeat your email address"
                        placeholderTextColor="#94A3B8"
                        value={confirmEmail}
                        onChangeText={setConfirmEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                      {confirmEmail.length > 0 && (
                        <View style={styles.statusIndicator}>
                          {emailsMatch ? (
                            <CheckSvg size={16} color={colors.accent} />
                          ) : (
                            <CrossSvg size={16} color={colors.textSecondary} />
                          )}
                        </View>
                      )}
                    </View>

                    {confirmEmail.length > 0 && (
                      <View style={styles.validationNotice}>
                        <Text
                          variant="caption"
                          color={emailsMatch ? colors.accent : colors.textSecondary}
                        >
                          {emailsMatch ? 'Email addresses match.' : 'Email addresses do not match yet.'}
                        </Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.stepBtnRow}>
                    <TouchableOpacity
                      style={[styles.secondaryBtn, shadow.sm]}
                      onPress={() => setStep(1)}
                      activeOpacity={0.8}
                    >
                      <ChevronLeftSvg size={18} color={colors.textPrimary} />
                      <Text variant="h3" style={styles.secondaryBtnText}>
                        Back
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.primaryBtnFlex, !canProceedStep2 && styles.primaryBtnDisabled, shadow.sm]}
                      onPress={() => setStep(3)}
                      disabled={!canProceedStep2}
                      activeOpacity={0.85}
                    >
                      <Text variant="h3" style={styles.primaryBtnText}>
                        Continue to Security
                      </Text>
                      <ChevronRightSvg size={18} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* STEP 3: Security & Password Strength Meter */}
              {step === 3 && (
                <View style={styles.stepContentCard}>
                  <View style={styles.inputGroup}>
                    <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.inputLabel}>
                      CREATE PASSWORD
                    </Text>
                    <View style={[styles.inputWrapper, shadow.sm]}>
                      <LockSvg size={18} color="#94A3B8" style={styles.inputIcon} />
                      <TextInput
                        style={styles.textInput}
                        placeholder="Create a strong password"
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

                  {/* 60-30-10 Password Strength Progress Bar (Rule 1 Compliant) */}
                  <View style={styles.strengthBox}>
                    <View style={styles.strengthHeader}>
                      <Text variant="caption" color={colors.textSecondary}>
                        PASSWORD STRENGTH
                      </Text>
                      <Text variant="caption" weight="700" color={colors.accent}>
                        {getPasswordStrengthLabel()}
                      </Text>
                    </View>

                    {/* 4-Segment Bar */}
                    <View style={styles.strengthBarTrack}>
                      {[1, 2, 3, 4].map(idx => (
                        <View
                          key={idx}
                          style={[
                            styles.strengthSegment,
                            passwordScore >= idx && styles.strengthSegmentFilled,
                          ]}
                        />
                      ))}
                    </View>

                    {/* Validation Checklist */}
                    <View style={styles.criteriaGrid}>
                      <View style={styles.criteriaItem}>
                        <View style={[styles.criteriaDot, hasMinLen && styles.criteriaDotMet]}>
                          {hasMinLen && <CheckSvg size={10} color="#FFFFFF" />}
                        </View>
                        <Text variant="caption" color={hasMinLen ? colors.textPrimary : colors.textTertiary}>
                          Minimum 8 characters
                        </Text>
                      </View>

                      <View style={styles.criteriaItem}>
                        <View style={[styles.criteriaDot, hasUpper && styles.criteriaDotMet]}>
                          {hasUpper && <CheckSvg size={10} color="#FFFFFF" />}
                        </View>
                        <Text variant="caption" color={hasUpper ? colors.textPrimary : colors.textTertiary}>
                          Uppercase letter (A-Z)
                        </Text>
                      </View>

                      <View style={styles.criteriaItem}>
                        <View style={[styles.criteriaDot, hasNumber && styles.criteriaDotMet]}>
                          {hasNumber && <CheckSvg size={10} color="#FFFFFF" />}
                        </View>
                        <Text variant="caption" color={hasNumber ? colors.textPrimary : colors.textTertiary}>
                          Number (0-9)
                        </Text>
                      </View>

                      <View style={styles.criteriaItem}>
                        <View style={[styles.criteriaDot, hasSymbol && styles.criteriaDotMet]}>
                          {hasSymbol && <CheckSvg size={10} color="#FFFFFF" />}
                        </View>
                        <Text variant="caption" color={hasSymbol ? colors.textPrimary : colors.textTertiary}>
                          Special symbol (!@#$)
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.inputGroup}>
                    <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.inputLabel}>
                      CONFIRM PASSWORD
                    </Text>
                    <View
                      style={[
                        styles.inputWrapper,
                        shadow.sm,
                        confirmPassword.length > 0 && !passwordsMatch && styles.inputWrapperError,
                        passwordsMatch && styles.inputWrapperSuccess,
                      ]}
                    >
                      <ShieldCheckSvg size={18} color="#94A3B8" style={styles.inputIcon} />
                      <TextInput
                        style={styles.textInput}
                        placeholder="Re-enter your password"
                        placeholderTextColor="#94A3B8"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                      <TouchableOpacity
                        onPress={() => setShowConfirmPassword(prev => !prev)}
                        style={styles.eyeBtn}
                        activeOpacity={0.7}
                      >
                        {showConfirmPassword ? (
                          <EyeOffSvg size={18} color="#94A3B8" />
                        ) : (
                          <EyeSvg size={18} color="#94A3B8" />
                        )}
                      </TouchableOpacity>
                    </View>

                    {confirmPassword.length > 0 && (
                      <View style={styles.validationNotice}>
                        <Text
                          variant="caption"
                          color={passwordsMatch ? colors.accent : colors.textSecondary}
                        >
                          {passwordsMatch ? 'Passwords match.' : 'Passwords do not match yet.'}
                        </Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.stepBtnRow}>
                    <TouchableOpacity
                      style={[styles.secondaryBtn, shadow.sm]}
                      onPress={() => setStep(2)}
                      activeOpacity={0.8}
                    >
                      <ChevronLeftSvg size={18} color={colors.textPrimary} />
                      <Text variant="h3" style={styles.secondaryBtnText}>
                        Back
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.primaryBtnFlex, !canProceedStep3 && styles.primaryBtnDisabled, shadow.sm]}
                      onPress={() => setStep(4)}
                      disabled={!canProceedStep3}
                      activeOpacity={0.85}
                    >
                      <Text variant="h3" style={styles.primaryBtnText}>
                        Continue to Study Focus
                      </Text>
                      <ChevronRightSvg size={18} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* STEP 4: Biblical Journey & Preferences */}
              {step === 4 && (
                <View style={styles.stepContentCard}>
                  {/* Preferred Translation */}
                  <View style={styles.preferenceSection}>
                    <View style={styles.sectionHeaderRow}>
                      <BookOpenSvg size={18} color={colors.accent} />
                      <Text variant="caption" weight="700" color={colors.textPrimary}>
                        PREFERRED SCRIPTURE TRANSLATION
                      </Text>
                    </View>
                    <View style={styles.chipsWrap}>
                      {TRANSLATIONS.map(t => {
                        const isSelected = preferredTranslation === t.id;
                        return (
                          <TouchableOpacity
                            key={t.id}
                            style={[styles.chip, isSelected && styles.chipActive]}
                            onPress={() => setPreferredTranslation(t.id)}
                            activeOpacity={0.8}
                          >
                            <Text
                              variant="caption"
                              weight={isSelected ? '700' : '500'}
                              style={[styles.chipText, isSelected && styles.chipTextActive]}
                            >
                              {t.label}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>

                  {/* Primary Study Focus */}
                  <View style={styles.preferenceSection}>
                    <View style={styles.sectionHeaderRow}>
                      <TargetSvg size={18} color={colors.accent} />
                      <Text variant="caption" weight="700" color={colors.textPrimary}>
                        PRIMARY EXEGESIS FOCUS
                      </Text>
                    </View>
                    <View style={styles.chipsWrap}>
                      {STUDY_FOCUSES.map(f => {
                        const isSelected = studyFocus === f.id;
                        return (
                          <TouchableOpacity
                            key={f.id}
                            style={[styles.chip, isSelected && styles.chipActive]}
                            onPress={() => setStudyFocus(f.id)}
                            activeOpacity={0.8}
                          >
                            <Text
                              variant="caption"
                              weight={isSelected ? '700' : '500'}
                              style={[styles.chipText, isSelected && styles.chipTextActive]}
                            >
                              {f.label}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>

                  {/* Daily Study Cadence */}
                  <View style={styles.preferenceSection}>
                    <View style={styles.sectionHeaderRow}>
                      <Text variant="caption" weight="700" color={colors.textPrimary}>
                        DAILY DEVOTIONAL GOAL
                      </Text>
                    </View>
                    <View style={styles.chipsWrap}>
                      {DAILY_GOALS.map(g => {
                        const isSelected = dailyGoal === g.id;
                        return (
                          <TouchableOpacity
                            key={g.id}
                            style={[styles.chip, isSelected && styles.chipActive]}
                            onPress={() => setDailyGoal(g.id)}
                            activeOpacity={0.8}
                          >
                            <Text
                              variant="caption"
                              weight={isSelected ? '700' : '500'}
                              style={[styles.chipText, isSelected && styles.chipTextActive]}
                            >
                              {g.label}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>

                  {/* Biblical Knowledge Level */}
                  <View style={styles.preferenceSection}>
                    <View style={styles.sectionHeaderRow}>
                      <Text variant="caption" weight="700" color={colors.textPrimary}>
                        STUDY JOURNEY STAGE
                      </Text>
                    </View>
                    <View style={styles.chipsWrap}>
                      {KNOWLEDGE_LEVELS.map(k => {
                        const isSelected = knowledgeLevel === k.id;
                        return (
                          <TouchableOpacity
                            key={k.id}
                            style={[styles.chip, isSelected && styles.chipActive]}
                            onPress={() => setKnowledgeLevel(k.id)}
                            activeOpacity={0.8}
                          >
                            <Text
                              variant="caption"
                              weight={isSelected ? '700' : '500'}
                              style={[styles.chipText, isSelected && styles.chipTextActive]}
                            >
                              {k.label}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>

                  <View style={styles.stepBtnRow}>
                    <TouchableOpacity
                      style={[styles.secondaryBtn, shadow.sm]}
                      onPress={() => setStep(3)}
                      activeOpacity={0.8}
                      disabled={isSubmitting}
                    >
                      <ChevronLeftSvg size={18} color={colors.textPrimary} />
                      <Text variant="h3" style={styles.secondaryBtnText}>
                        Back
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.primaryBtnFlex, shadow.sm]}
                      onPress={handleFinalSignUp}
                      disabled={isSubmitting}
                      activeOpacity={0.85}
                    >
                      {isSubmitting ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                      ) : (
                        <>
                          <Text variant="h3" style={styles.primaryBtnText}>
                            Complete Account
                          </Text>
                          <CheckSvg size={18} color="#FFFFFF" />
                        </>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          )}

          {/* Terms Disclaimer */}
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
    paddingHorizontal: spacing.md, // 16px grid margin per Rule 15
    paddingTop: spacing.lg, // 24px
    paddingBottom: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  // Rule 15 & Rule 19: Auth Logo strictly 28x28
  authLogo: {
    width: 28,
    height: 28,
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
  formCard: {
    marginBottom: spacing.lg,
  },
  wizardContainer: {
    marginBottom: spacing.lg,
  },
  stepIndicatorCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  stepPillItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepCircleActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  stepCircleCompleted: {
    backgroundColor: colors.textPrimary,
    borderColor: colors.textPrimary,
  },
  stepCircleText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  stepCircleTextActive: {
    color: '#FFFFFF',
  },
  stepConnectorLine: {
    width: 32,
    height: 2,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  stepConnectorLineActive: {
    backgroundColor: colors.textPrimary,
  },
  stepTitleContainer: {
    alignItems: 'center',
    marginTop: 4,
  },
  stepHeading: {
    fontSize: 15,
    marginTop: 2,
    textAlign: 'center',
  },
  stepContentCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
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
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    height: 48,
  },
  inputWrapperError: {
    borderColor: colors.textSecondary,
    backgroundColor: colors.surfaceSecondary,
  },
  inputWrapperSuccess: {
    borderColor: colors.accent,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  statusIndicator: {
    marginLeft: spacing.sm,
  },
  validationNotice: {
    marginTop: 4,
    marginLeft: 4,
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
  strengthBox: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  strengthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  strengthBarTrack: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: spacing.md,
  },
  strengthSegment: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.border,
  },
  strengthSegmentFilled: {
    backgroundColor: colors.accent, // 10% Accent #D97706
  },
  criteriaGrid: {
    gap: 6,
  },
  criteriaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  criteriaDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  criteriaDotMet: {
    backgroundColor: colors.accent,
  },
  preferenceSection: {
    marginBottom: spacing.lg,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: spacing.md,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accent,
  },
  chipText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  chipTextActive: {
    color: colors.accent,
  },
  primaryBtn: {
    flexDirection: 'row',
    backgroundColor: colors.accent, // 10% Accent #D97706
    borderRadius: radius.md,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  primaryBtnFlex: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  primaryBtnDisabled: {
    opacity: 0.5,
  },
  primaryBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  stepBtnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 4,
  },
  secondaryBtnText: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  switchModeLink: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md, // 16px
    marginTop: spacing.sm, // 8px
  },
  disclaimer: {
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 16,
  },
});
