import React, { useState, useEffect, useRef } from 'react';
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
  Modal,
  Keyboard,
  LayoutChangeEvent,
  Text as RNText,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSecurePasswordCapture } from '../hooks/useSecurePasswordCapture';
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
  PhoneSvg,
} from '../components/SvgIcons';

type AuthMode = 'login' | 'signup';
type SignUpStep = 1 | 2 | 3;

const COUNTRY_CODES = [
  { code: '+27', name: 'South Africa (ZA)' },
  { code: '+1', name: 'United States / Canada (US/CA)' },
  { code: '+44', name: 'United Kingdom (UK)' },
  { code: '+234', name: 'Nigeria (NG)' },
  { code: '+254', name: 'Kenya (KE)' },
  { code: '+233', name: 'Ghana (GH)' },
  { code: '+256', name: 'Uganda (UG)' },
  { code: '+263', name: 'Zimbabwe (ZW)' },
  { code: '+267', name: 'Botswana (BW)' },
  { code: '+260', name: 'Zambia (ZM)' },
  { code: '+61', name: 'Australia (AU)' },
  { code: '+49', name: 'Germany (DE)' },
  { code: '+33', name: 'France (FR)' },
  { code: '+91', name: 'India (IN)' },
  { code: '+55', name: 'Brazil (BR)' },
];

export default function AuthScreen({ route, navigation }: { route?: any; navigation?: any }) {
  const { login, signupExtended, checkUsernameAvailability } = useUser();
  const initialMode: AuthMode = route?.params?.initialMode === 'signup' ? 'signup' : 'login';
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [step, setStep] = useState<SignUpStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Input Refs for keyboard Next focus routing
  const firstNameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);
  const usernameRef = useRef<TextInput>(null);

  const emailRef = useRef<TextInput>(null);
  const confirmEmailRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);

  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const loginEmailRef = useRef<TextInput>(null);
  const loginPasswordRef = useRef<TextInput>(null);

  // Enterprise hardware-level screen recording & screenshot protection
  const {
    isSecured,
    activateSecurity,
    deactivateSecurity,
    handlePasswordFocus,
    handlePasswordBlur,
  } = useSecurePasswordCapture({ enableAppSwitcherProtection: true });

  const scrollViewRef = useRef<ScrollView>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const sectionTop = useRef(0);
  const fieldOffsets = useRef<Record<string, number>>({});

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleSectionLayout = (e: LayoutChangeEvent) => {
    sectionTop.current = e.nativeEvent.layout.y;
  };

  const recordFieldLayout = (key: string) => (e: LayoutChangeEvent) => {
    fieldOffsets.current[key] = e.nativeEvent.layout.y;
  };

  const scrollToField = (key: string, fallbackY: number) => {
    const relY = fieldOffsets.current[key];
    const targetY = typeof relY === 'number' ? sectionTop.current + relY : fallbackY;

    setTimeout(() => {
      scrollViewRef.current?.scrollTo({
        y: Math.max(0, targetY - 60),
        animated: true,
      });
    }, Platform.OS === 'ios' ? 80 : 150);
  };

  useEffect(() => {
    if (mode === 'signup' && step === 3) {
      activateSecurity();
    } else {
      deactivateSecurity(true);
    }
  }, [step, mode, activateSecurity, deactivateSecurity]);

  // Auto-focus next field when transitioning wizard steps
  useEffect(() => {
    if (mode === 'signup') {
      if (step === 2) {
        setTimeout(() => {
          emailRef.current?.focus();
          scrollToField('email', 260);
        }, 150);
      } else if (step === 3) {
        setTimeout(() => {
          passwordRef.current?.focus();
          scrollToField('password', 260);
        }, 150);
      }
    }
  }, [step, mode]);

  useEffect(() => {
    if (route?.params?.initialMode) {
      setMode(route.params.initialMode);
      setStep(1);
    }
  }, [route?.params?.initialMode]);

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

  // Sign Up Step 2: Contact & Phone Verification
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+27');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  // Sign Up Step 3: Security & Credentials
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  // Phone Validation Trick: Leading zero (0) is automatically stripped
  const handlePhoneChange = (val: string) => {
    const digitsOnly = val.replace(/[^\d]/g, '');
    const clean = digitsOnly.replace(/^0+/, '');
    setPhoneNumber(clean);
  };
  const isPhoneValid = phoneNumber.replace(/^0+/, '').length >= 7;

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
  const canProceedStep1 =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    usernameStatus.checked &&
    usernameStatus.available;

  const canProceedStep2 = isEmailValid(email) && emailsMatch && isPhoneValid;
  const canProceedStep3 = hasMinLen && passwordScore >= 3 && passwordsMatch;

  const handleLoginSubmit = async () => {
    const trimmed = loginEmail.trim();
    if (!trimmed) {
      Alert.alert('Required Field', 'Please enter your email address or username.');
      return;
    }
    if (!loginPassword) {
      Alert.alert('Required Field', 'Please enter your password.');
      return;
    }
    setIsSubmitting(true);
    try {
      await login(trimmed, loginPassword);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinalSignUp = async () => {
    if (!canProceedStep3) return;
    setIsSubmitting(true);
    try {
      const cleanPhone = phoneNumber.replace(/^0+/, '');
      await signupExtended({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        username: username.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        password,
        countryCode,
        phoneNumber: cleanPhone,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Requirement: Legal disclaimer text matches surrounding text (no underline, no color change, no font change)
  const renderLegalDisclaimer = () => (
    <View style={styles.disclaimerContainer}>
      <RNText style={styles.disclaimerText}>
        By continuing, you agree to our{' '}
        <RNText
          style={styles.disclaimerText}
          onPress={() => navigation.navigate('TermsOfService')}
        >
          Terms of Service
        </RNText>{' '}
        and{' '}
        <RNText
          style={styles.disclaimerText}
          onPress={() => navigation.navigate('PrivacyPolicy')}
        >
          Privacy Policy
        </RNText>.
      </RNText>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        style={styles.keyboardView}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: keyboardHeight > 0 ? keyboardHeight + 120 : 60 },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets={false}
        >
          {/* Top Bar / Back to Welcome */}
          {navigation?.canGoBack?.() && (
            <View style={styles.topBar}>
              <TouchableOpacity
                style={styles.backBtn}
                onPress={() => navigation.goBack()}
                activeOpacity={0.7}
              >
                <ChevronLeftSvg size={18} color={colors.textPrimary} />
                <Text variant="label" color={colors.textPrimary} weight="600" style={styles.backBtnText}>
                  Welcome
                </Text>
              </TouchableOpacity>
            </View>
          )}

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
            <View style={styles.formSection} onLayout={handleSectionLayout}>
              <View style={styles.inputGroup} onLayout={recordFieldLayout('loginEmail')}>
                <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.inputLabel}>
                  EMAIL OR USERNAME
                </Text>
                <View style={[styles.inputWrapper, shadow.sm]}>
                  <MailSvg size={18} color="#94A3B8" style={styles.inputIcon} />
                  <TextInput
                    ref={loginEmailRef}
                    style={styles.textInput}
                    placeholder="name@example.com"
                    placeholderTextColor="#94A3B8"
                    value={loginEmail}
                    onChangeText={setLoginEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    blurOnSubmit={false}
                    onFocus={() => scrollToField('loginEmail', 240)}
                    onSubmitEditing={() => loginPasswordRef.current?.focus()}
                  />
                </View>
              </View>

              <View style={styles.inputGroup} onLayout={recordFieldLayout('loginPassword')}>
                <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.inputLabel}>
                  PASSWORD
                </Text>
                <View style={[styles.inputWrapper, shadow.sm]}>
                  <LockSvg size={18} color="#94A3B8" style={styles.inputIcon} />
                  <TextInput
                    ref={loginPasswordRef}
                    style={styles.textInput}
                    placeholder="Enter your password"
                    placeholderTextColor="#94A3B8"
                    value={loginPassword}
                    onChangeText={setLoginPassword}
                    secureTextEntry={!showLoginPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="done"
                    onFocus={() => {
                      handlePasswordFocus();
                      scrollToField('loginPassword', 340);
                    }}
                    onBlur={handlePasswordBlur}
                    onSubmitEditing={handleLoginSubmit}
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

              {renderLegalDisclaimer()}
            </View>
          )}

          {/* ================================================================ */}
          {/* MODE: SIGN UP (3-STEP STREAMLINED WIZARD)                         */}
          {/* ================================================================ */}
          {mode === 'signup' && (
            <View style={styles.wizardContainer}>
              {/* Wizard Step Indicator Bar: 3 Steps */}
              <View style={styles.stepIndicatorSection}>
                <View style={styles.stepPillsRow}>
                  {[1, 2, 3].map(s => {
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
                        {s < 3 && (
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
                    STEP {step} OF 3
                  </Text>
                  <Text variant="h3" style={styles.stepHeading}>
                    {step === 1 && 'Personal Identity & Username'}
                    {step === 2 && 'Contact & Phone Verification'}
                    {step === 3 && 'Security & Password Credentials'}
                  </Text>
                </View>
              </View>

              {/* STEP 1: Personal Identity & Username */}
              {step === 1 && (
                <View style={styles.stepContentSection} onLayout={handleSectionLayout}>
                  <View style={styles.inputGroup} onLayout={recordFieldLayout('firstName')}>
                    <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.inputLabel}>
                      FIRST NAME
                    </Text>
                    <View style={[styles.inputWrapper, shadow.sm]}>
                      <UserSvg size={18} color="#94A3B8" style={styles.inputIcon} />
                      <TextInput
                        ref={firstNameRef}
                        style={styles.textInput}
                        placeholder="John"
                        placeholderTextColor="#94A3B8"
                        value={firstName}
                        onChangeText={setFirstName}
                        autoCapitalize="words"
                        returnKeyType="next"
                        blurOnSubmit={false}
                        onFocus={() => scrollToField('firstName', 260)}
                        onSubmitEditing={() => lastNameRef.current?.focus()}
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup} onLayout={recordFieldLayout('lastName')}>
                    <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.inputLabel}>
                      LAST NAME / SURNAME
                    </Text>
                    <View style={[styles.inputWrapper, shadow.sm]}>
                      <UserSvg size={18} color="#94A3B8" style={styles.inputIcon} />
                      <TextInput
                        ref={lastNameRef}
                        style={styles.textInput}
                        placeholder="Doe"
                        placeholderTextColor="#94A3B8"
                        value={lastName}
                        onChangeText={setLastName}
                        autoCapitalize="words"
                        returnKeyType="next"
                        blurOnSubmit={false}
                        onFocus={() => scrollToField('lastName', 350)}
                        onSubmitEditing={() => usernameRef.current?.focus()}
                      />
                    </View>
                  </View>

                  <View style={styles.inputGroup} onLayout={recordFieldLayout('username')}>
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
                        ref={usernameRef}
                        style={styles.textInput}
                        placeholder="johndoe_exegesis"
                        placeholderTextColor="#94A3B8"
                        value={username}
                        onChangeText={setUsername}
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        onFocus={() => scrollToField('username', 440)}
                        onSubmitEditing={() => {
                          if (canProceedStep1) {
                            setStep(2);
                          }
                        }}
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
                    <ChevronRightSvg size={18} color="#0F172A" />
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

                  {renderLegalDisclaimer()}
                </View>
              )}

              {/* STEP 2: Contact & Phone Verification */}
              {step === 2 && (
                <View style={styles.stepContentSection} onLayout={handleSectionLayout}>
                  <View style={styles.inputGroup} onLayout={recordFieldLayout('email')}>
                    <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.inputLabel}>
                      EMAIL ADDRESS
                    </Text>
                    <View style={[styles.inputWrapper, shadow.sm]}>
                      <MailSvg size={18} color="#94A3B8" style={styles.inputIcon} />
                      <TextInput
                        ref={emailRef}
                        style={styles.textInput}
                        placeholder="name@example.com"
                        placeholderTextColor="#94A3B8"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        onFocus={() => scrollToField('email', 260)}
                        onSubmitEditing={() => confirmEmailRef.current?.focus()}
                      />
                      {isEmailValid(email) && (
                        <CheckSvg size={16} color={colors.accent} style={styles.statusIndicator} />
                      )}
                    </View>
                  </View>

                  <View style={styles.inputGroup} onLayout={recordFieldLayout('confirmEmail')}>
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
                        ref={confirmEmailRef}
                        style={styles.textInput}
                        placeholder="Repeat your email address"
                        placeholderTextColor="#94A3B8"
                        value={confirmEmail}
                        onChangeText={setConfirmEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        onFocus={() => scrollToField('confirmEmail', 350)}
                        onSubmitEditing={() => phoneRef.current?.focus()}
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

                  {/* Phone Number with Country Code (Leading zero auto-stripped) */}
                  <View style={styles.inputGroup} onLayout={recordFieldLayout('phone')}>
                    <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.inputLabel}>
                      PHONE NUMBER
                    </Text>
                    <View style={styles.phoneRow}>
                      <TouchableOpacity
                        style={[styles.countryCodeBtn, shadow.sm]}
                        onPress={() => setShowCountryPicker(true)}
                        activeOpacity={0.8}
                      >
                        <Text variant="body" weight="700" color={colors.textPrimary}>
                          {countryCode}
                        </Text>
                        <ChevronRightSvg size={14} color="#94A3B8" style={styles.countryChevron} />
                      </TouchableOpacity>

                      <View style={[styles.phoneInputWrapper, shadow.sm]}>
                        <PhoneSvg size={18} color="#94A3B8" style={styles.inputIcon} />
                        <TextInput
                          ref={phoneRef}
                          style={styles.textInput}
                          placeholder="82 123 4567"
                          placeholderTextColor="#94A3B8"
                          value={phoneNumber}
                          onChangeText={handlePhoneChange}
                          keyboardType="phone-pad"
                          returnKeyType="next"
                          blurOnSubmit={false}
                          onFocus={() => scrollToField('phone', 440)}
                          onSubmitEditing={() => {
                            if (canProceedStep2) {
                              setStep(3);
                            }
                          }}
                        />
                        {isPhoneValid && (
                          <CheckSvg size={16} color={colors.accent} style={styles.statusIndicator} />
                        )}
                      </View>
                    </View>

                    <Text variant="caption" color={colors.textSecondary} style={styles.phoneHint}>
                      Leading zero (0) will be automatically excluded.
                    </Text>
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
                        Continue
                      </Text>
                      <ChevronRightSvg size={18} color="#0F172A" />
                    </TouchableOpacity>
                  </View>

                  {renderLegalDisclaimer()}
                </View>
              )}

              {/* STEP 3: Security & Credentials -> Complete Account */}
              {step === 3 && (
                <View style={styles.stepContentSection} onLayout={handleSectionLayout}>
                  <View style={styles.inputGroup} onLayout={recordFieldLayout('password')}>
                    <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.inputLabel}>
                      CREATE PASSWORD
                    </Text>
                    <View style={[styles.inputWrapper, shadow.sm]}>
                      <LockSvg size={18} color="#94A3B8" style={styles.inputIcon} />
                      <TextInput
                        ref={passwordRef}
                        style={styles.textInput}
                        placeholder="Create a strong password"
                        placeholderTextColor="#94A3B8"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="next"
                        blurOnSubmit={false}
                        onFocus={() => {
                          handlePasswordFocus();
                          scrollToField('password', 260);
                        }}
                        onBlur={handlePasswordBlur}
                        onSubmitEditing={() => confirmPasswordRef.current?.focus()}
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

                  {/* 60-30-10 Password Strength Progress Bar */}
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

                  <View style={styles.inputGroup} onLayout={recordFieldLayout('confirmPassword')}>
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
                        ref={confirmPasswordRef}
                        style={styles.textInput}
                        placeholder="Re-enter your password"
                        placeholderTextColor="#94A3B8"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="done"
                        blurOnSubmit={false}
                        onFocus={() => {
                          handlePasswordFocus();
                          scrollToField('confirmPassword', 460);
                        }}
                        onBlur={handlePasswordBlur}
                        onSubmitEditing={handleFinalSignUp}
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
                      disabled={isSubmitting}
                    >
                      <ChevronLeftSvg size={18} color={colors.textPrimary} />
                      <Text variant="h3" style={styles.secondaryBtnText}>
                        Back
                      </Text>
                    </TouchableOpacity>

                    {/* Complete Account Button (Step 4 removed) */}
                    <TouchableOpacity
                      style={[styles.primaryBtnFlex, !canProceedStep3 && styles.primaryBtnDisabled, shadow.sm]}
                      onPress={handleFinalSignUp}
                      disabled={!canProceedStep3 || isSubmitting}
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

                  {renderLegalDisclaimer()}
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Country Code Picker Modal */}
      <Modal
        visible={showCountryPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCountryPicker(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowCountryPicker(false)}
        >
          <View style={[styles.modalSheet, shadow.lg]}>
            <View style={styles.modalHeader}>
              <Text variant="h3" weight="700" color={colors.textPrimary}>
                Select Country Code
              </Text>
              <TouchableOpacity
                onPress={() => setShowCountryPicker(false)}
                style={styles.modalCloseBtn}
              >
                <CrossSvg size={18} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.countryList} showsVerticalScrollIndicator={false}>
              {COUNTRY_CODES.map((item) => {
                const isSelected = item.code === countryCode;
                return (
                  <TouchableOpacity
                    key={item.code}
                    style={[styles.countryItem, isSelected && styles.countryItemActive]}
                    onPress={() => {
                      setCountryCode(item.code);
                      setShowCountryPicker(false);
                      phoneRef.current?.focus();
                    }}
                    activeOpacity={0.7}
                  >
                    <Text
                      variant="body"
                      weight={isSelected ? '700' : '500'}
                      color={isSelected ? colors.accent : colors.textPrimary}
                    >
                      {item.code}  {item.name}
                    </Text>
                    {isSelected && <CheckSvg size={16} color={colors.accent} />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
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
    paddingHorizontal: spacing.lg, // 24px
    paddingTop: spacing.md, // 16px
    flexGrow: 1,
  },
  topBar: {
    marginBottom: spacing.md,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
  },
  backBtnText: {
    fontSize: 13,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  authLogo: {
    width: 28,
    height: 28,
    marginBottom: spacing.sm,
    borderRadius: 6,
  },
  title: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 4,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
  },
  tabSelector: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    padding: 4,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
  },
  tabBtnActive: {
    backgroundColor: colors.surface,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabBtnTextActive: {
    color: colors.accent,
    fontWeight: '700',
  },
  formSection: {
    width: '100%',
  },
  wizardContainer: {
    width: '100%',
  },
  stepIndicatorSection: {
    marginBottom: spacing.lg,
  },
  stepPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
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
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    borderColor: colors.accent,
    backgroundColor: colors.surface,
  },
  stepCircleCompleted: {
    borderColor: colors.accent,
    backgroundColor: colors.accent,
  },
  stepCircleText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  stepCircleTextActive: {
    color: colors.accent,
  },
  stepConnectorLine: {
    width: 48,
    height: 2,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  stepConnectorLineActive: {
    backgroundColor: colors.accent,
  },
  stepTitleContainer: {
    alignItems: 'center',
  },
  stepHeading: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 2,
  },
  stepContentSection: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontSize: 11,
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
  },
  inputWrapperSuccess: {
    borderColor: colors.accent,
  },
  inputWrapperError: {
    borderColor: '#EF4444',
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  textInput: {
    flex: 1,
    height: '100%',
    color: colors.textPrimary,
    fontSize: 14,
  },
  eyeBtn: {
    padding: 4,
  },
  statusIndicator: {
    marginLeft: spacing.sm,
  },
  validationNotice: {
    marginTop: 4,
    paddingHorizontal: 4,
  },
  // Phone Input with Country Code
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  countryCodeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: 48,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  countryChevron: {
    transform: [{ rotate: '90deg' }],
  },
  phoneInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
  },
  phoneHint: {
    fontSize: 11,
    marginTop: 4,
    paddingHorizontal: 4,
  },
  // Password Strength Progress Bar
  strengthBox: {
    marginTop: -4,
    marginBottom: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  strengthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  strengthBarTrack: {
    flexDirection: 'row',
    gap: 6,
    height: 4,
    marginBottom: spacing.sm,
  },
  strengthSegment: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.border,
    borderRadius: 2,
  },
  strengthSegmentFilled: {
    backgroundColor: colors.accent,
  },
  criteriaGrid: {
    gap: 4,
    marginTop: 4,
  },
  criteriaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: radius.md,
    backgroundColor: colors.accent,
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  primaryBtnFlex: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: radius.md,
    backgroundColor: colors.accent,
    gap: spacing.sm,
  },
  primaryBtnDisabled: {
    opacity: 0.5,
  },
  primaryBtnText: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '700',
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
    paddingVertical: spacing.md,
    marginTop: spacing.sm,
  },
  disclaimerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  disclaimerText: {
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 18,
    fontWeight: '400',
    color: colors.textSecondary,
    textDecorationLine: 'none',
  },
  // Modal Country Code Picker
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalSheet: {
    width: '100%',
    maxHeight: 400,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalCloseBtn: {
    padding: 4,
  },
  countryList: {
    marginTop: spacing.sm,
  },
  countryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
  },
  countryItemActive: {
    backgroundColor: 'rgba(253, 210, 35, 0.08)',
  },
});
