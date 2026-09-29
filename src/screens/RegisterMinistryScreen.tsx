/**
 * Register Church Ministry Screen
 *
 * Step-by-Step wizard on a continuous screen body canvas (zero card divs/boxes/pills).
 * - Step 1: Ministry Identity & Vision
 * - Step 2: Headquarters Location (auto-cascading geocoding) & Contact
 * - Step 3: Review & Confirm
 *
 * Contact phone: country-code dropdown + number field (strips leading zero).
 * Province and postal code are read-only — auto-populated when town is selected.
 * KeyboardAvoidingView uses 'height' on Android to ensure no input is hidden.
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme';
import { Text } from '../components/Typography';
import { useThemedAlert } from '../context/AlertContext';
import { registerMinistry } from '../services/ministryService';
import {
  searchTownsOnline,
  GeoLocation,
} from '../services/geoService';
import {
  CloseSvg,
  CheckSvg,
  SearchSvg,
} from '../components/SvgIcons';

// ── Country code list ────────────────────────────────────────────────────────
const COUNTRY_CODES: { code: string; dial: string; flag: string }[] = [
  { code: 'ZA', dial: '+27',  flag: '🇿🇦' },
  { code: 'ZW', dial: '+263', flag: '🇿🇼' },
  { code: 'NG', dial: '+234', flag: '🇳🇬' },
  { code: 'GH', dial: '+233', flag: '🇬🇭' },
  { code: 'KE', dial: '+254', flag: '🇰🇪' },
  { code: 'TZ', dial: '+255', flag: '🇹🇿' },
  { code: 'UG', dial: '+256', flag: '🇺🇬' },
  { code: 'ZM', dial: '+260', flag: '🇿🇲' },
  { code: 'MW', dial: '+265', flag: '🇲🇼' },
  { code: 'MZ', dial: '+258', flag: '🇲🇿' },
  { code: 'BW', dial: '+267', flag: '🇧🇼' },
  { code: 'NA', dial: '+264', flag: '🇳🇦' },
  { code: 'SZ', dial: '+268', flag: '🇸🇿' },
  { code: 'LS', dial: '+266', flag: '🇱🇸' },
  { code: 'US', dial: '+1',   flag: '🇺🇸' },
  { code: 'GB', dial: '+44',  flag: '🇬🇧' },
  { code: 'AU', dial: '+61',  flag: '🇦🇺' },
  { code: 'IN', dial: '+91',  flag: '🇮🇳' },
  { code: 'BR', dial: '+55',  flag: '🇧🇷' },
  { code: 'DE', dial: '+49',  flag: '🇩🇪' },
];

export default function RegisterMinistryScreen({ navigation }: { navigation: any }) {
  const { showAlert } = useThemedAlert();
  const scrollRef = useRef<ScrollView>(null);

  // Wizard Step: 1 = Identity, 2 = Headquarters & Contact, 3 = Review & Confirm
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1: Identity & Vision
  const [name, setName] = useState('');
  const [founder, setFounder] = useState('');
  const [description, setDescription] = useState('');

  // Step 2: Headquarters & Geocoding
  const [townQuery, setTownQuery] = useState('Johannesburg');
  const [headquartersProvince, setHeadquartersProvince] = useState('Gauteng');
  const [headquartersCountry, setHeadquartersCountry] = useState('South Africa');
  const [postalCode, setPostalCode] = useState('2000');
  const [showTownSuggestions, setShowTownSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<GeoLocation[]>([]);

  // Contact details
  const [website, setWebsite] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [selectedDialCode, setSelectedDialCode] = useState<string>('+27');
  const [showDialPicker, setShowDialPicker] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live town search
  useEffect(() => {
    if (townQuery.trim().length >= 2) {
      searchTownsOnline(townQuery).then((results) => {
        setSuggestions(results);
      });
    } else {
      setSuggestions([]);
    }
  }, [townQuery]);

  const handleSelectTown = (item: GeoLocation) => {
    setTownQuery(item.town);
    setHeadquartersProvince(item.province);
    setHeadquartersCountry(item.country);
    setPostalCode(item.postalCode);
    setShowTownSuggestions(false);
  };

  /** Strip leading 0 and non-digits then combine with dial code */
  const buildFullPhone = (): string => {
    const digits = phoneNumber.replace(/\D/g, '').replace(/^0+/, '');
    return digits ? `${selectedDialCode}${digits}` : '';
  };

  const handlePhoneChange = (val: string) => {
    // Allow only digits; leading zero is stripped at build time
    setPhoneNumber(val.replace(/[^0-9]/g, ''));
  };

  const handleNextFromStep1 = () => {
    if (!name.trim()) {
      showAlert({ title: 'Ministry Name Required', message: 'Please provide your church or ministry name.', buttons: [{ text: 'OK' }] });
      return;
    }
    if (!founder.trim()) {
      showAlert({ title: 'Founder / Senior Pastor Required', message: 'Please specify the founder or senior pastor.', buttons: [{ text: 'OK' }] });
      return;
    }
    setCurrentStep(2);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleNextFromStep2 = () => {
    if (!townQuery.trim()) {
      showAlert({ title: 'Headquarters City Required', message: 'Please specify the headquarters city.', buttons: [{ text: 'OK' }] });
      return;
    }
    setCurrentStep(3);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true);
    try {
      const created = await registerMinistry({
        name: name.trim(),
        founder: founder.trim(),
        headquarters: townQuery.trim() || 'Johannesburg',
        headquartersCountry: headquartersCountry.trim() || 'South Africa',
        description:
          description.trim() ||
          `Global Christian ministry founded by ${founder.trim()}, headquartered in ${townQuery.trim()}, ${headquartersCountry.trim()}.`,
        category: 'Christian Ministry',
        website: website.trim(),
        contactEmail: contactEmail.trim(),
        contactPhone: buildFullPhone(),
      });

      setIsSubmitting(false);

      showAlert({
        title: 'Ministry Registered',
        message: `${created.name} is now registered in the global directory. Let's add your first campus or homecell.`,
        buttons: [
          {
            text: 'Add Campus / Homecell',
            onPress: () => {
              navigation.replace('RegisterBranch', {
                ministryId: created.id,
                ministryName: created.name,
              });
            },
          },
        ],
      });
    } catch {
      setIsSubmitting(false);
      showAlert({ title: 'Registration Error', message: 'Could not register at this time. Please try again.', buttons: [{ text: 'OK' }] });
    }
  };

  const selectedCodeObj = COUNTRY_CODES.find((c) => c.dial === selectedDialCode) ?? COUNTRY_CODES[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (currentStep > 1) {
              setCurrentStep((s) => (s - 1) as 1 | 2 | 3);
            } else {
              navigation.goBack();
            }
          }}
          style={styles.closeBtn}
          accessibilityRole="button"
        >
          {currentStep > 1 ? (
            <Text style={styles.backBtnText}>‹ Back</Text>
          ) : (
            <CloseSvg size={20} color={colors.textPrimary} />
          )}
        </TouchableOpacity>

        <Text variant="h3" color={colors.textPrimary} style={styles.headerTitle}>
          Register Ministry
        </Text>

        <View style={{ width: 48 }} />
      </View>

      {/* Step progress */}
      <View style={styles.stepProgressContainer}>
        <View style={styles.stepLabelRow}>
          <Text style={styles.stepProgressLabel}>STEP {currentStep} OF 3</Text>
          <Text style={styles.stepTitleLabel}>
            {currentStep === 1 ? 'Identity & Vision' : currentStep === 2 ? 'Headquarters & Contact' : 'Review & Confirm'}
          </Text>
        </View>
        <View style={styles.progressBarTrack}>
          <View
            style={[
              styles.progressBarFill,
              { width: currentStep === 1 ? '33.3%' : currentStep === 2 ? '66.6%' : '100%' },
            ]}
          />
        </View>
      </View>

      {/* Keyboard-aware scroll — 'height' avoidance keeps inputs above keyboard on both platforms */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
      >
        <ScrollView
          ref={scrollRef}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ================================================================ */}
          {/* STEP 1: IDENTITY & VISION                                         */}
          {/* ================================================================ */}
          {currentStep === 1 && (
            <View style={styles.stepSection}>
              <View style={styles.sectionHeading}>
                <Text style={styles.sectionTitle}>Ministry Identity</Text>
                <Text style={styles.sectionSubtitle}>
                  Enter the primary church name, leadership, and mission.
                </Text>
              </View>

              {/* Ministry Name */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Church / Ministry Name *</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="e.g. Grace Fellowship International"
                  placeholderTextColor="#94A3B8"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  returnKeyType="next"
                />
              </View>

              {/* Founder / Senior Pastor */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Founder / Senior Pastor *</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="e.g. Prophet John Doe"
                  placeholderTextColor="#94A3B8"
                  value={founder}
                  onChangeText={setFounder}
                  autoCapitalize="words"
                  returnKeyType="next"
                />
              </View>

              {/* Ministry Vision */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Ministry Vision & Mission</Text>
                <TextInput
                  style={[styles.inputField, styles.textAreaField]}
                  placeholder="Describe your ministry's core doctrine, commission, and spiritual calling..."
                  placeholderTextColor="#94A3B8"
                  multiline
                  numberOfLines={4}
                  value={description}
                  onChangeText={setDescription}
                  textAlignVertical="top"
                />
              </View>

              <TouchableOpacity
                style={styles.primaryActionButton}
                onPress={handleNextFromStep1}
                activeOpacity={0.8}
                accessibilityRole="button"
              >
                <Text style={styles.primaryActionText}>Continue to Headquarters ›</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ================================================================ */}
          {/* STEP 2: HEADQUARTERS & CONTACT                                    */}
          {/* ================================================================ */}
          {currentStep === 2 && (
            <View style={styles.stepSection}>
              <View style={styles.sectionHeading}>
                <Text style={styles.sectionTitle}>Headquarters Location</Text>
                <Text style={styles.sectionSubtitle}>
                  Search a city or town — province and postal code fill automatically.
                </Text>
              </View>

              {/* Town search */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Headquarters Town / City *</Text>
                <View style={styles.searchFieldWrapper}>
                  <SearchSvg size={16} color="#64748B" />
                  <TextInput
                    style={styles.searchTextInput}
                    placeholder="Search town or city (e.g. Sandton, Harare)..."
                    placeholderTextColor="#94A3B8"
                    value={townQuery}
                    onChangeText={(val) => {
                      setTownQuery(val);
                      setShowTownSuggestions(true);
                    }}
                    onFocus={() => setShowTownSuggestions(true)}
                    returnKeyType="search"
                  />
                </View>

                {showTownSuggestions && suggestions.length > 0 && (
                  <View style={styles.suggestionsList}>
                    {suggestions.slice(0, 6).map((item, idx) => (
                      <TouchableOpacity
                        key={`${item.town}_${item.country}_${idx}`}
                        style={styles.suggestionRow}
                        onPress={() => handleSelectTown(item)}
                        activeOpacity={0.7}
                      >
                        <View style={{ flex: 1 }}>
                          <Text style={styles.suggestionTownText}>{item.town}</Text>
                          <Text style={styles.suggestionMetaText}>
                            {item.province}, {item.country} · {item.postalCode}
                          </Text>
                        </View>
                        <CheckSvg size={14} color="#0F172A" />
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Province & Postal — read-only, auto-populated */}
              <View style={styles.rowInputs}>
                <View style={[styles.fieldGroup, { flex: 1 }]}>
                  <Text style={styles.fieldLabel}>Province / State</Text>
                  <View style={[styles.inputField, styles.readonlyField]}>
                    <Text style={styles.readonlyText} numberOfLines={1}>
                      {headquartersProvince || '—'}
                    </Text>
                  </View>
                </View>

                <View style={[styles.fieldGroup, { flex: 0.55 }]}>
                  <Text style={styles.fieldLabel}>Postal Code</Text>
                  <View style={[styles.inputField, styles.readonlyField]}>
                    <Text style={styles.readonlyText}>{postalCode || '—'}</Text>
                  </View>
                </View>
              </View>

              {/* Country — read-only from geocode */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Country</Text>
                <View style={[styles.inputField, styles.readonlyField]}>
                  <Text style={styles.readonlyText}>{headquartersCountry || '—'}</Text>
                </View>
              </View>

              {/* ── Contact ── */}
              <View style={[styles.sectionHeading, { marginTop: 8 }]}>
                <Text style={styles.sectionTitle}>Contact & Digital Presence</Text>
              </View>

              {/* Website */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Official Website (Optional)</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="https://yourchurch.org"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="none"
                  keyboardType="url"
                  value={website}
                  onChangeText={setWebsite}
                  returnKeyType="next"
                />
              </View>

              {/* Contact phone: country code dropdown + number */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Contact Phone (Optional)</Text>
                <View style={styles.phoneRow}>
                  {/* Dial code picker toggle */}
                  <TouchableOpacity
                    style={styles.dialCodeButton}
                    onPress={() => setShowDialPicker((v) => !v)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.dialCodeText}>
                      {selectedCodeObj.flag} {selectedCodeObj.dial}
                    </Text>
                    <Text style={styles.dialChevron}>{showDialPicker ? '▲' : '▼'}</Text>
                  </TouchableOpacity>

                  {/* Number input — strips leading 0 on change */}
                  <TextInput
                    style={[styles.inputField, styles.phoneNumberInput]}
                    placeholder="11 000 0000"
                    placeholderTextColor="#94A3B8"
                    keyboardType="number-pad"
                    value={phoneNumber}
                    onChangeText={handlePhoneChange}
                    returnKeyType="next"
                    maxLength={15}
                  />
                </View>

                {/* Dial code dropdown list */}
                {showDialPicker && (
                  <ScrollView
                    style={styles.dialPickerList}
                    nestedScrollEnabled
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator
                  >
                    {COUNTRY_CODES.map((c) => (
                      <TouchableOpacity
                        key={c.code}
                        style={[
                          styles.dialPickerRow,
                          c.dial === selectedDialCode && styles.dialPickerRowActive,
                        ]}
                        onPress={() => {
                          setSelectedDialCode(c.dial);
                          setShowDialPicker(false);
                        }}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.dialPickerText}>
                          {c.flag}  {c.dial}
                        </Text>
                        {c.dial === selectedDialCode && (
                          <CheckSvg size={12} color="#0F172A" />
                        )}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}

                {phoneNumber.length > 0 && (
                  <Text style={styles.phonePreview}>
                    Full number: {buildFullPhone()}
                  </Text>
                )}
              </View>

              {/* Email */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Official Email (Optional)</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="office@church.org"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={contactEmail}
                  onChangeText={setContactEmail}
                  returnKeyType="done"
                />
              </View>

              <View style={styles.wizardActionRow}>
                <TouchableOpacity
                  style={styles.secondaryActionButton}
                  onPress={() => setCurrentStep(1)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.secondaryActionText}>‹ Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.primaryActionButton, { flex: 1 }]}
                  onPress={handleNextFromStep2}
                  activeOpacity={0.8}
                >
                  <Text style={styles.primaryActionText}>Review Details ›</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* ================================================================ */}
          {/* STEP 3: REVIEW & CONFIRM                                          */}
          {/* ================================================================ */}
          {currentStep === 3 && (
            <View style={styles.stepSection}>
              <View style={styles.sectionHeading}>
                <Text style={styles.sectionTitle}>Review & Confirm</Text>
                <Text style={styles.sectionSubtitle}>
                  Verify your church information before publishing to the directory.
                </Text>
              </View>

              <View style={styles.summaryList}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Ministry Name</Text>
                  <Text style={styles.summaryValueBold}>{name}</Text>
                </View>

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Founder / Pastor</Text>
                  <Text style={styles.summaryValue}>{founder}</Text>
                </View>

                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Headquarters</Text>
                  <Text style={styles.summaryValue}>
                    {townQuery}, {headquartersProvince}, {headquartersCountry} ({postalCode})
                  </Text>
                </View>

                {website ? (
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Website</Text>
                    <Text style={styles.summaryValue}>{website}</Text>
                  </View>
                ) : null}

                {contactEmail ? (
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Email</Text>
                    <Text style={styles.summaryValue}>{contactEmail}</Text>
                  </View>
                ) : null}

                {buildFullPhone() ? (
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Phone</Text>
                    <Text style={styles.summaryValue}>{buildFullPhone()}</Text>
                  </View>
                ) : null}

                {description ? (
                  <View style={[styles.summaryRow, { borderBottomWidth: 0 }]}>
                    <Text style={styles.summaryLabel}>Vision & Mission</Text>
                    <Text style={styles.summaryDescText}>{description}</Text>
                  </View>
                ) : null}
              </View>

              <View style={styles.reviewNextNote}>
                <Text style={styles.reviewNextNoteText}>
                  After registration you will be taken to add your first campus branch, homecell, or prayer cluster.
                </Text>
              </View>

              <View style={styles.wizardActionRow}>
                <TouchableOpacity
                  style={styles.secondaryActionButton}
                  onPress={() => setCurrentStep(2)}
                  activeOpacity={0.7}
                  disabled={isSubmitting}
                >
                  <Text style={styles.secondaryActionText}>‹ Edit Location</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.primaryActionButton, { flex: 1 }, isSubmitting && { opacity: 0.6 }]}
                  onPress={handleConfirmSubmit}
                  disabled={isSubmitting}
                  activeOpacity={0.8}
                >
                  <Text style={styles.primaryActionText}>
                    {isSubmitting ? 'Registering...' : 'Confirm & Register Ministry'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.08)',
    backgroundColor: '#FFFFFF',
  },
  closeBtn: { padding: spacing.xs },
  backBtnText: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  headerTitle: { fontSize: 16, fontWeight: '700', flex: 1, textAlign: 'center' },
  stepProgressContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  stepLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  stepProgressLabel: { fontSize: 10, fontWeight: '800', color: '#B45309', letterSpacing: 0.5 },
  stepTitleLabel: { fontSize: 12, fontWeight: '600', color: '#0F172A' },
  progressBarTrack: { height: 3, backgroundColor: 'rgba(15, 23, 42, 0.08)', borderRadius: 1.5, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#0F172A' },
  container: { flex: 1 },
  contentContainer: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: 120 },
  stepSection: { gap: 16 },
  sectionHeading: { marginBottom: 4 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A', marginBottom: 2 },
  sectionSubtitle: { fontSize: 13, color: '#64748B', lineHeight: 18 },
  fieldGroup: { marginBottom: 4 },
  fieldLabel: { fontSize: 12, fontWeight: '700', color: '#334155', marginBottom: 6, letterSpacing: 0.2 },
  inputField: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
  },
  textAreaField: { minHeight: 80, textAlignVertical: 'top' },
  readonlyField: {
    backgroundColor: 'rgba(15, 23, 42, 0.03)',
    borderColor: 'rgba(15, 23, 42, 0.07)',
    justifyContent: 'center',
  },
  readonlyText: { fontSize: 14, color: '#475569' },
  rowInputs: { flexDirection: 'row', gap: 12 },
  searchFieldWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.14)',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    gap: 8,
  },
  searchTextInput: { flex: 1, paddingVertical: 10, fontSize: 14, color: '#0F172A' },
  suggestionsList: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
    borderRadius: radius.sm,
    marginTop: 4,
  },
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  suggestionTownText: { fontSize: 13, fontWeight: '700', color: '#0F172A', marginBottom: 1 },
  suggestionMetaText: { fontSize: 11, color: '#64748B' },

  // Phone
  phoneRow: { flexDirection: 'row', gap: 8, alignItems: 'stretch' },
  dialCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
    borderRadius: radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 10,
    minWidth: 90,
  },
  dialCodeText: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  dialChevron: { fontSize: 9, color: '#64748B' },
  phoneNumberInput: { flex: 1 },
  dialPickerList: {
    maxHeight: 200,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
    borderRadius: radius.sm,
    marginTop: 4,
  },
  dialPickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.05)',
  },
  dialPickerRowActive: { backgroundColor: 'rgba(15, 23, 42, 0.04)' },
  dialPickerText: { fontSize: 13, color: '#0F172A' },
  phonePreview: { fontSize: 11, color: '#64748B', marginTop: 4, fontStyle: 'italic' },

  // Summary
  summaryList: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.07)',
  },
  summaryRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  summaryLabel: { fontSize: 10, fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  summaryValue: { fontSize: 14, color: '#0F172A' },
  summaryValueBold: { fontSize: 15, fontWeight: '800', color: '#0F172A' },
  summaryDescText: { fontSize: 13, color: '#334155', lineHeight: 18, marginTop: 2 },
  reviewNextNote: { paddingVertical: 8 },
  reviewNextNoteText: { fontSize: 12, color: '#64748B', lineHeight: 17 },
  wizardActionRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 12 },
  primaryActionButton: {
    backgroundColor: '#0F172A',
    borderRadius: radius.sm,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryActionText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700', letterSpacing: 0.3 },
  secondaryActionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.15)',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryActionText: { color: '#0F172A', fontSize: 13, fontWeight: '700' },
});
