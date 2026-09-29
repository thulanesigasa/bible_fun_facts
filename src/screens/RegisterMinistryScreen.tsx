/**
 * Register Church Ministry Screen
 *
 * Step-by-Step wizard on a continuous screen body canvas (zero card divs/boxes/pills).
 * - Step 1: Ministry Identity & Vision
 * - Step 2: Headquarters Location (with automated cascading geocoding via local database)
 * - Step 3: Structured Review & Confirmation
 *
 * Upon registration, seamlessly navigates to RegisterBranchScreen to register
 * campuses, branches, and homecells.
 */

import React, { useState, useEffect } from 'react';
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
  ChevronRightSvg,
} from '../components/SvgIcons';

const CATEGORY_OPTIONS = [
  'Apostolic & Kingdom Reformation',
  'Word of Faith & Evangelism',
  'Prophetic & Grace Revelation',
  'Evangelical & Charismatic',
  'Pentecostal Fellowship',
  'Community Bible Church',
];

export default function RegisterMinistryScreen({ navigation }: { navigation: any }) {
  const { showAlert } = useThemedAlert();

  // Wizard Step: 1 = Identity, 2 = Headquarters & Contact, 3 = Review & Confirm
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1: Identity & Vision
  const [name, setName] = useState('');
  const [founder, setFounder] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_OPTIONS[0]);
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
  const [contactPhone, setContactPhone] = useState('');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live town search for auto-cascading geocoding
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

  const handleNextFromStep1 = () => {
    if (!name.trim()) {
      showAlert({
        title: 'Ministry Name Required',
        message: 'Please provide your church or ministry name.',
        buttons: [{ text: 'OK' }],
      });
      return;
    }
    if (!founder.trim()) {
      showAlert({
        title: 'Founder / Senior Pastor Required',
        message: 'Please specify the founder or senior pastor leading the ministry.',
        buttons: [{ text: 'OK' }],
      });
      return;
    }
    setCurrentStep(2);
  };

  const handleNextFromStep2 = () => {
    if (!townQuery.trim()) {
      showAlert({
        title: 'Headquarters City Required',
        message: 'Please specify the headquarters city or town for your ministry.',
        buttons: [{ text: 'OK' }],
      });
      return;
    }
    setCurrentStep(3);
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
        category: selectedCategory,
        website: website.trim(),
        contactEmail: contactEmail.trim(),
        contactPhone: contactPhone.trim(),
      });

      setIsSubmitting(false);

      showAlert({
        title: 'Ministry Registered',
        message: `${created.name} is now officially registered in the global directory. Let's add your first campus branch or homecell.`,
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
      showAlert({
        title: 'Registration Error',
        message: 'Could not register ministry at this time. Please try again.',
        buttons: [{ text: 'OK' }],
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Navigation Bar */}
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
          accessibilityLabel={currentStep > 1 ? 'Go to previous step' : 'Close screen'}
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

      {/* Step Progress Line on Continuous Body */}
      <View style={styles.stepProgressContainer}>
        <View style={styles.stepLabelRow}>
          <Text style={styles.stepProgressLabel}>
            STEP {currentStep} OF 3
          </Text>
          <Text style={styles.stepTitleLabel}>
            {currentStep === 1
              ? 'Identity & Vision'
              : currentStep === 2
              ? 'Headquarters & Location'
              : 'Review & Confirm'}
          </Text>
        </View>

        {/* 2px Minimalist Progress Bar */}
        <View style={styles.progressBarTrack}>
          <View
            style={[
              styles.progressBarFill,
              {
                width:
                  currentStep === 1
                    ? '33.3%'
                    : currentStep === 2
                    ? '66.6%'
                    : '100%',
              },
            ]}
          />
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ============================================================= */}
          {/* STEP 1: IDENTITY & VISION                                    */}
          {/* ============================================================= */}
          {currentStep === 1 && (
            <View style={styles.stepSection}>
              <View style={styles.sectionHeading}>
                <Text style={styles.sectionTitle}>Ministry Identity</Text>
                <Text style={styles.sectionSubtitle}>
                  Enter the primary church name, leadership, and theological focus.
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
                />
              </View>

              {/* Founder / Senior Pastor */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Founder / Senior Pastor *</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="e.g. Pastor John Doe"
                  placeholderTextColor="#94A3B8"
                  value={founder}
                  onChangeText={setFounder}
                  autoCapitalize="words"
                />
              </View>

              {/* Theological Focus / Category (Text Selector, Zero Pills) */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Theological Focus / Category</Text>
                <View style={styles.categoryList}>
                  {CATEGORY_OPTIONS.map((cat) => {
                    const isSelected = cat === selectedCategory;
                    return (
                      <TouchableOpacity
                        key={cat}
                        style={[
                          styles.categoryItem,
                          isSelected && styles.categoryItemActive,
                        ]}
                        onPress={() => setSelectedCategory(cat)}
                        activeOpacity={0.7}
                      >
                        <View style={styles.categoryRadio}>
                          {isSelected && <View style={styles.categoryRadioInner} />}
                        </View>
                        <Text
                          style={[
                            styles.categoryText,
                            isSelected && styles.categoryTextActive,
                          ]}
                        >
                          {cat}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
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
                />
              </View>

              {/* Next Action */}
              <TouchableOpacity
                style={styles.primaryActionButton}
                onPress={handleNextFromStep1}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Continue to headquarters location"
              >
                <Text style={styles.primaryActionText}>
                  Continue to Headquarters ›
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ============================================================= */}
          {/* STEP 2: HEADQUARTERS & CONTACT                               */}
          {/* ============================================================= */}
          {currentStep === 2 && (
            <View style={styles.stepSection}>
              <View style={styles.sectionHeading}>
                <Text style={styles.sectionTitle}>Headquarters Location</Text>
                <Text style={styles.sectionSubtitle}>
                  Type a city or town to auto-populate province, country, and postal code.
                </Text>
              </View>

              {/* City / Town Auto-Cascade Geocoding Search */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Headquarters Town / City *</Text>
                <View style={styles.searchFieldWrapper}>
                  <SearchSvg size={16} color="#64748B" />
                  <TextInput
                    style={styles.searchTextInput}
                    placeholder="Search town, suburb or city (e.g. Sandton, Soweto)..."
                    placeholderTextColor="#94A3B8"
                    value={townQuery}
                    onChangeText={(val) => {
                      setTownQuery(val);
                      setShowTownSuggestions(true);
                    }}
                    onFocus={() => setShowTownSuggestions(true)}
                  />
                </View>

                {/* Live Suggestions Overlay on Body */}
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
                          <Text style={styles.suggestionTownText}>
                            {item.town}
                          </Text>
                          <Text style={styles.suggestionMetaText}>
                            {item.province}, {item.country} • Postal Code: {item.postalCode}
                          </Text>
                        </View>
                        <CheckSvg size={14} color="#0F172A" />
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Auto-Cascaded Details (Zero Divs / Integrated on Body) */}
              <View style={styles.rowInputs}>
                <View style={[styles.fieldGroup, { flex: 1 }]}>
                  <Text style={styles.fieldLabel}>Province / State</Text>
                  <TextInput
                    style={styles.inputField}
                    placeholder="Province"
                    placeholderTextColor="#94A3B8"
                    value={headquartersProvince}
                    onChangeText={setHeadquartersProvince}
                  />
                </View>

                <View style={[styles.fieldGroup, { flex: 1 }]}>
                  <Text style={styles.fieldLabel}>Postal Code</Text>
                  <TextInput
                    style={styles.inputField}
                    placeholder="Code"
                    placeholderTextColor="#94A3B8"
                    value={postalCode}
                    onChangeText={setPostalCode}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Country</Text>
                <TextInput
                  style={styles.inputField}
                  placeholder="Country"
                  placeholderTextColor="#94A3B8"
                  value={headquartersCountry}
                  onChangeText={setHeadquartersCountry}
                />
              </View>

              {/* Contact Information */}
              <View style={[styles.sectionHeading, { marginTop: 16 }]}>
                <Text style={styles.sectionTitle}>Contact & Digital Presence</Text>
              </View>

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
                />
              </View>

              <View style={styles.rowInputs}>
                <View style={[styles.fieldGroup, { flex: 1 }]}>
                  <Text style={styles.fieldLabel}>Contact Phone</Text>
                  <TextInput
                    style={styles.inputField}
                    placeholder="+27 11 000 0000"
                    placeholderTextColor="#94A3B8"
                    keyboardType="phone-pad"
                    value={contactPhone}
                    onChangeText={setContactPhone}
                  />
                </View>

                <View style={[styles.fieldGroup, { flex: 1 }]}>
                  <Text style={styles.fieldLabel}>Official Email</Text>
                  <TextInput
                    style={styles.inputField}
                    placeholder="office@church.org"
                    placeholderTextColor="#94A3B8"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={contactEmail}
                    onChangeText={setContactEmail}
                  />
                </View>
              </View>

              {/* Action Buttons */}
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

          {/* ============================================================= */}
          {/* STEP 3: REVIEW & CONFIRMATION                                */}
          {/* ============================================================= */}
          {currentStep === 3 && (
            <View style={styles.stepSection}>
              <View style={styles.sectionHeading}>
                <Text style={styles.sectionTitle}>Review & Confirm Registration</Text>
                <Text style={styles.sectionSubtitle}>
                  Verify your church information before publishing to the directory.
                </Text>
              </View>

              {/* Summary Details on Continuous Body Canvas */}
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
                  <Text style={styles.summaryLabel}>Theological Focus</Text>
                  <Text style={styles.summaryValue}>{selectedCategory}</Text>
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

                {contactPhone ? (
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Phone</Text>
                    <Text style={styles.summaryValue}>{contactPhone}</Text>
                  </View>
                ) : null}

                {description ? (
                  <View style={[styles.summaryRow, { borderBottomWidth: 0 }]}>
                    <Text style={styles.summaryLabel}>Vision & Mission</Text>
                    <Text style={styles.summaryDescText}>{description}</Text>
                  </View>
                ) : null}
              </View>

              {/* Next Step Explanation */}
              <View style={styles.reviewNextNote}>
                <Text style={styles.reviewNextNoteText}>
                  After registration, you will be taken to add your first campus branch,
                  homecell, or prayer cluster.
                </Text>
              </View>

              {/* Action Buttons */}
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
                  style={[
                    styles.primaryActionButton,
                    { flex: 1 },
                    isSubmitting && { opacity: 0.6 },
                  ]}
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
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
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
  closeBtn: {
    padding: spacing.xs,
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
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
  stepProgressLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#B45309',
    letterSpacing: 0.5,
  },
  stepTitleLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
  },
  progressBarTrack: {
    height: 3,
    backgroundColor: 'rgba(15, 23, 42, 0.08)',
    borderRadius: 1.5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#0F172A',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxl,
  },
  stepSection: {
    gap: 16,
  },
  sectionHeading: {
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
  },
  fieldGroup: {
    marginBottom: 4,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
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
  textAreaField: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  categoryList: {
    gap: 6,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: radius.sm,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    gap: 10,
  },
  categoryItemActive: {
    borderColor: '#0F172A',
    backgroundColor: 'rgba(15, 23, 42, 0.03)',
  },
  categoryRadio: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryRadioInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0F172A',
  },
  categoryText: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#0F172A',
    fontWeight: '700',
  },
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
  searchTextInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
  },
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
  suggestionTownText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 1,
  },
  suggestionMetaText: {
    fontSize: 11,
    color: '#64748B',
  },
  summaryList: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  summaryRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  summaryLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  summaryValue: {
    fontSize: 14,
    color: '#0F172A',
  },
  summaryValueBold: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  summaryDescText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 18,
    marginTop: 2,
  },
  reviewNextNote: {
    paddingVertical: 8,
  },
  reviewNextNoteText: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
  },
  wizardActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
  },
  primaryActionButton: {
    backgroundColor: '#0F172A',
    borderRadius: radius.sm,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryActionText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
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
  secondaryActionText: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '700',
  },
});
