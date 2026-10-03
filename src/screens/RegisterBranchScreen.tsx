/**
 * Register Branch / Cell / Campus Screen
 *
 * 5-Step flat-body wizard — zero cards, zero pills, zero badges.
 *
 * Step 1 — Branch Type      : Pre-defined options with description text
 * Step 2 — Ministry         : Select the parent ministry (skipped if pre-filled)
 * Step 3 — Location         : Town search + read-only province/postal/country
 * Step 4 — Leadership       : Leader name, country-code + number, email, address
 * Step 5 — Services Schedule: Themed day/time multi-service picker
 * Step 6 — Review & Confirm
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
import { searchTownsOnline, GeoLocation } from '../services/geoService';
import {
  registerBranch,
  getAllMinistries,
  Ministry,
  BranchType,
  getBranchTypeLabel,
} from '../services/ministryService';
import { CloseSvg, CheckSvg, SearchSvg } from '../components/SvgIcons';

// ── Constants ────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 6;

const BRANCH_TYPE_OPTIONS: {
  type: BranchType;
  label: string;
  description: string;
}[] = [
  {
    type: 'branch',
    label: 'Main Branch',
    description: 'A full-service church building or assembly with regular Sunday and midweek services.',
  },
  {
    type: 'homecell',
    label: 'Homecell',
    description: 'A small group that meets in a home for fellowship, prayer, and Bible study.',
  },
  {
    type: 'cell_branch',
    label: 'Cell Branch',
    description: 'A structured cell that operates under a main branch, with its own leader and gathering schedule.',
  },
  {
    type: 'cluster',
    label: 'Cluster',
    description: 'A group of homecells or cell branches overseen by a zone or cluster leader.',
  },
  {
    type: 'sub_cluster',
    label: 'Sub-Cluster',
    description: 'A subdivision of a cluster, typically covering a specific neighbourhood or community.',
  },
];

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const TIME_SLOTS = [
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '14:00', '15:00', '16:00',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00',
];

const COUNTRY_CODES = [
  { code: 'ZA', dial: '+27',  flag: '🇿🇦' },
  { code: 'ZW', dial: '+263', flag: '🇿🇼' },
  { code: 'NG', dial: '+234', flag: '🇳🇬' },
  { code: 'GH', dial: '+233', flag: '🇬🇭' },
  { code: 'KE', dial: '+254', flag: '🇰🇪' },
  { code: 'TZ', dial: '+255', flag: '🇹🇿' },
  { code: 'UG', dial: '+256', flag: '🇺🇬' },
  { code: 'ZM', dial: '+260', flag: '🇿🇲' },
  { code: 'MW', dial: '+265', flag: '🇲🇼' },
  { code: 'BW', dial: '+267', flag: '🇧🇼' },
  { code: 'NA', dial: '+264', flag: '🇳🇦' },
  { code: 'US', dial: '+1',   flag: '🇺🇸' },
  { code: 'GB', dial: '+44',  flag: '🇬🇧' },
  { code: 'AU', dial: '+61',  flag: '🇦🇺' },
];

interface ServiceSlot {
  id: string;
  day: string;
  time: string;
  label: string; // e.g. "Main Service", "Youth Service"
}

const SERVICE_LABELS = [
  'Main Service',
  'Youth Service',
  'Prayer Meeting',
  'Bible Study',
  'Midweek Service',
  'Early Morning Service',
  'Evening Service',
  'Homecell Meeting',
  'Leadership Meeting',
  'Other',
];

// ── Component ────────────────────────────────────────────────────────────────

export default function RegisterBranchScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const { showAlert } = useThemedAlert();
  const scrollRef = useRef<ScrollView>(null);

  const initialMinistryId: string = route.params?.ministryId || '';
  const initialMinistryName: string = route.params?.ministryName || '';

  // Wizard step (1-6)
  const [step, setStep] = useState<number>(1);

  // Step 1: Branch Type
  const [selectedType, setSelectedType] = useState<BranchType>('branch');

  // Step 2: Ministry
  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [selectedMinistryId, setSelectedMinistryId] = useState<string>(initialMinistryId);

  // Step 3: Location
  const [branchName, setBranchName] = useState('');
  const [townQuery, setTownQuery] = useState('Johannesburg');
  const [province, setProvince] = useState('Gauteng');
  const [country, setCountry] = useState('South Africa');
  const [postalCode, setPostalCode] = useState('2000');
  const [latitude, setLatitude] = useState(-26.2041);
  const [longitude, setLongitude] = useState(28.0473);
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState<GeoLocation[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Step 4: Leadership & Contact
  const [leaderName, setLeaderName] = useState('');
  const [dialCode, setDialCode] = useState('+27');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showDialPicker, setShowDialPicker] = useState(false);
  const [contactEmail, setContactEmail] = useState('');

  // Step 5: Services Schedule
  const [services, setServices] = useState<ServiceSlot[]>([
    { id: '1', day: 'Sunday', time: '09:30', label: 'Main Service' },
  ]);
  const [addingService, setAddingService] = useState(false);
  const [draftDay, setDraftDay] = useState('Sunday');
  const [draftTime, setDraftTime] = useState('09:00');
  const [draftCustomTime, setDraftCustomTime] = useState('');
  const [draftLabel, setDraftLabel] = useState('Main Service');
  const [draftCustomLabel, setDraftCustomLabel] = useState('');

  // Submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getAllMinistries().then((list) => {
      setMinistries(list);
      if (!selectedMinistryId && list.length > 0) {
        setSelectedMinistryId(list[0].id);
      }
    });
  }, []);

  useEffect(() => {
    if (townQuery.trim().length >= 2) {
      searchTownsOnline(townQuery).then(setSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [townQuery]);

  const handleSelectTown = (item: GeoLocation) => {
    setTownQuery(item.town);
    setProvince(item.province);
    setCountry(item.country);
    setPostalCode(item.postalCode);
    if (item.coordinates?.latitude !== undefined) setLatitude(item.coordinates.latitude);
    if (item.coordinates?.longitude !== undefined) setLongitude(item.coordinates.longitude);
    setShowSuggestions(false);
  };

  const buildPhone = (): string => {
    const digits = phoneNumber.replace(/\D/g, '').replace(/^0+/, '');
    return digits ? `${dialCode}${digits}` : '';
  };

  const buildMeetingTimesString = (): string =>
    services.map((s) => `${s.day}s: ${s.time} — ${s.label}`).join(' | ');

  const activeMinistry = ministries.find((m) => m.id === selectedMinistryId);

  const goToStep = (n: number) => {
    setStep(n);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  // ── Validation ────────────────────────────────────────────────────────────

  const validateStep = (s: number): boolean => {
    switch (s) {
      case 1:
        return true; // type is always pre-selected
      case 2:
        if (!selectedMinistryId) {
          showAlert({ title: 'Ministry Required', message: 'Please select the ministry this branch belongs to.' });
          return false;
        }
        return true;
      case 3:
        if (!branchName.trim()) {
          showAlert({ title: 'Branch Name Required', message: 'Please give this branch or homecell a name.' });
          return false;
        }
        if (!townQuery.trim()) {
          showAlert({ title: 'Location Required', message: 'Please search and select a town or city.' });
          return false;
        }
        return true;
      case 4:
        if (!leaderName.trim()) {
          showAlert({ title: 'Leader Name Required', message: 'Please enter the name of the branch leader or pastor.' });
          return false;
        }
        return true;
      case 5:
        if (services.length === 0) {
          showAlert({ title: 'Service Schedule Required', message: 'Please add at least one service time.' });
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    // Skip step 2 if ministry was passed in from navigation
    if (step === 1 && initialMinistryId) {
      if (validateStep(1)) goToStep(3);
      return;
    }
    if (validateStep(step)) {
      goToStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 3 && initialMinistryId) {
      goToStep(1);
      return;
    }
    if (step > 1) {
      goToStep(step - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleAddService = () => {
    const finalLabel = draftCustomLabel.trim() || draftLabel;
    const finalTime  = draftCustomTime.trim()  || draftTime;
    const newSlot: ServiceSlot = {
      id: Date.now().toString(),
      day: draftDay,
      time: finalTime,
      label: finalLabel,
    };
    setServices((prev) => [...prev, newSlot]);
    setAddingService(false);
    setDraftDay('Sunday');
    setDraftTime('09:00');
    setDraftCustomTime('');
    setDraftLabel('Main Service');
    setDraftCustomLabel('');
  };

  const handleRemoveService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await registerBranch({
        ministryId: selectedMinistryId,
        ministryName: activeMinistry?.name || initialMinistryName,
        name: branchName.trim(),
        type: selectedType,
        leaderName: leaderName.trim(),
        contactNumber: buildPhone(),
        contactEmail: contactEmail.trim(),
        town: townQuery.trim(),
        province,
        country,
        postalCode,
        address: address.trim(),
        meetingTimes: buildMeetingTimesString(),
        coordinates: { latitude, longitude },
      });

      setIsSubmitting(false);
      showAlert({
        title: 'Branch Registered',
        message: `${branchName} has been pinned in the global directory under ${activeMinistry?.name || initialMinistryName}.`,
        buttons: [
          {
            text: 'Done',
            onPress: () => navigation.goBack(),
          },
          {
            text: 'Add Another',
            onPress: () => {
              setBranchName('');
              setLeaderName('');
              setPhoneNumber('');
              setContactEmail('');
              setAddress('');
              setServices([{ id: '1', day: 'Sunday', time: '09:30', label: 'Main Service' }]);
              goToStep(1);
            },
          },
        ],
      });
    } catch {
      setIsSubmitting(false);
      showAlert({ title: 'Registration Failed', message: 'Could not register the branch. Please try again.' });
    }
  };

  // ── Step Title Labels ─────────────────────────────────────────────────────

  const stepTitles: Record<number, string> = {
    1: 'Branch Type',
    2: 'Ministry',
    3: 'Location & Name',
    4: 'Leadership',
    5: 'Service Schedule',
    6: 'Review & Confirm',
  };

  const effectiveTotal = initialMinistryId ? TOTAL_STEPS - 1 : TOTAL_STEPS;
  const effectiveStep = initialMinistryId && step >= 3 ? step - 1 : step;

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.closeBtn} accessibilityRole="button">
          {step > 1 ? (
            <Text style={styles.backText}>‹ Back</Text>
          ) : (
            <CloseSvg size={20} color={colors.textPrimary} />
          )}
        </TouchableOpacity>
        <Text variant="h3" color={colors.textPrimary} style={styles.headerTitle}>
          Register {getBranchTypeLabel(selectedType)}
        </Text>
        <View style={{ width: 48 }} />
      </View>

      {/* Step progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressLabelRow}>
          <Text style={styles.progressStepText}>STEP {effectiveStep} OF {effectiveTotal}</Text>
          <Text style={styles.progressTitleText}>{stepTitles[step]}</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${(effectiveStep / effectiveTotal) * 100}%` }]} />
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
      >
        <ScrollView
          ref={scrollRef}
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >

          {/* ════════════════════════════════════════════════════════════════ */}
          {/* STEP 1 — BRANCH TYPE                                            */}
          {/* ════════════════════════════════════════════════════════════════ */}
          {step === 1 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>What are you registering?</Text>
              <Text style={styles.sectionSubtitle}>
                Choose the type that best describes this branch or gathering.
              </Text>

              {BRANCH_TYPE_OPTIONS.map((opt) => {
                const isSelected = selectedType === opt.type;
                return (
                  <TouchableOpacity
                    key={opt.type}
                    style={styles.typeRow}
                    onPress={() => setSelectedType(opt.type)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.typeRadioCol}>
                      <View style={styles.typeRadio}>
                        {isSelected && <View style={styles.typeRadioFill} />}
                      </View>
                    </View>
                    <View style={styles.typeTextCol}>
                      <Text
                        style={[styles.typeLabel, isSelected && styles.typeLabelActive]}
                      >
                        {opt.label}
                      </Text>
                      <Text style={styles.typeDescription}>{opt.description}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}

              <TouchableOpacity style={styles.primaryBtn} onPress={handleNext} activeOpacity={0.8}>
                <Text style={styles.primaryBtnText}>Continue ›</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ════════════════════════════════════════════════════════════════ */}
          {/* STEP 2 — MINISTRY SELECTION                                     */}
          {/* ════════════════════════════════════════════════════════════════ */}
          {step === 2 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Which ministry?</Text>
              <Text style={styles.sectionSubtitle}>
                Select the church organization this {getBranchTypeLabel(selectedType).toLowerCase()} belongs to.
              </Text>

              {ministries.map((m) => {
                const isSelected = m.id === selectedMinistryId;
                return (
                  <TouchableOpacity
                    key={m.id}
                    style={styles.ministryRow}
                    onPress={() => setSelectedMinistryId(m.id)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.typeRadioCol}>
                      <View style={styles.typeRadio}>
                        {isSelected && <View style={styles.typeRadioFill} />}
                      </View>
                    </View>
                    <View style={styles.typeTextCol}>
                      <Text style={[styles.typeLabel, isSelected && styles.typeLabelActive]}>
                        {m.name}
                      </Text>
                      <Text style={styles.typeDescription}>
                        {m.founder} · {m.headquarters}, {m.headquartersCountry}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}

              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.secondaryBtn} onPress={handleBack} activeOpacity={0.7}>
                  <Text style={styles.secondaryBtnText}>‹ Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.primaryBtn, { flex: 1 }]} onPress={handleNext} activeOpacity={0.8}>
                  <Text style={styles.primaryBtnText}>Continue ›</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* ════════════════════════════════════════════════════════════════ */}
          {/* STEP 3 — LOCATION & NAME                                        */}
          {/* ════════════════════════════════════════════════════════════════ */}
          {step === 3 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Where is it located?</Text>
              <Text style={styles.sectionSubtitle}>
                Search a town or city — province and postal code are filled automatically.
              </Text>

              {/* Branch Name */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>{getBranchTypeLabel(selectedType)} Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder={`e.g. ${activeMinistry?.name || ''} Sandton Branch`}
                  placeholderTextColor="#94A3B8"
                  value={branchName}
                  onChangeText={setBranchName}
                  autoCapitalize="words"
                  returnKeyType="next"
                />
              </View>

              {/* Town search */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Town / City *</Text>
                <View style={styles.searchRow}>
                  <SearchSvg size={14} color="#64748B" />
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search town or city..."
                    placeholderTextColor="#94A3B8"
                    value={townQuery}
                    onChangeText={(v) => { setTownQuery(v); setShowSuggestions(true); }}
                    onFocus={() => setShowSuggestions(true)}
                    returnKeyType="search"
                  />
                </View>
                {showSuggestions && suggestions.length > 0 && (
                  <View style={styles.suggestionList}>
                    {suggestions.slice(0, 6).map((item, idx) => (
                      <TouchableOpacity
                        key={`${item.town}_${idx}`}
                        style={styles.suggestionRow}
                        onPress={() => handleSelectTown(item)}
                        activeOpacity={0.7}
                      >
                        <View style={{ flex: 1 }}>
                          <Text style={styles.suggestionTown}>{item.town}</Text>
                          <Text style={styles.suggestionMeta}>
                            {item.province}, {item.country} · {item.postalCode}
                          </Text>
                        </View>
                        <CheckSvg size={12} color="#0F172A" />
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              {/* Read-only province + postal */}
              <View style={styles.rowFields}>
                <View style={[styles.fieldGroup, { flex: 1 }]}>
                  <Text style={styles.fieldLabel}>Province / State</Text>
                  <View style={[styles.input, styles.readonlyInput]}>
                    <Text style={styles.readonlyText} numberOfLines={1}>{province || '—'}</Text>
                  </View>
                </View>
                <View style={[styles.fieldGroup, { flex: 0.55 }]}>
                  <Text style={styles.fieldLabel}>Postal Code</Text>
                  <View style={[styles.input, styles.readonlyInput]}>
                    <Text style={styles.readonlyText}>{postalCode || '—'}</Text>
                  </View>
                </View>
              </View>

              {/* Read-only country */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Country</Text>
                <View style={[styles.input, styles.readonlyInput]}>
                  <Text style={styles.readonlyText}>{country || '—'}</Text>
                </View>
              </View>

              {/* Street address */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Street Address (Optional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 12 Main Street, Sandton"
                  placeholderTextColor="#94A3B8"
                  value={address}
                  onChangeText={setAddress}
                  returnKeyType="next"
                />
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.secondaryBtn} onPress={handleBack} activeOpacity={0.7}>
                  <Text style={styles.secondaryBtnText}>‹ Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.primaryBtn, { flex: 1 }]} onPress={handleNext} activeOpacity={0.8}>
                  <Text style={styles.primaryBtnText}>Continue ›</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* ════════════════════════════════════════════════════════════════ */}
          {/* STEP 4 — LEADERSHIP & CONTACT                                   */}
          {/* ════════════════════════════════════════════════════════════════ */}
          {step === 4 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Who leads this {getBranchTypeLabel(selectedType).toLowerCase()}?</Text>
              <Text style={styles.sectionSubtitle}>
                Enter the branch leader or pastor's details for the directory.
              </Text>

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Resident Pastor *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Pastor John Dlamini"
                  placeholderTextColor="#94A3B8"
                  value={leaderName}
                  onChangeText={setLeaderName}
                  autoCapitalize="words"
                  returnKeyType="next"
                />
              </View>

              {/* Phone: dial code + number */}
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Contact Number (Optional)</Text>
                <View style={styles.phoneRow}>
                  <TouchableOpacity
                    style={styles.dialBtn}
                    onPress={() => setShowDialPicker((v) => !v)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.dialText}>
                      {COUNTRY_CODES.find((c) => c.dial === dialCode)?.flag ?? '🌍'}{'  '}{dialCode}
                    </Text>
                    <Text style={styles.dialChevron}>{showDialPicker ? '▲' : '▼'}</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="81 234 5678"
                    placeholderTextColor="#94A3B8"
                    keyboardType="number-pad"
                    value={phoneNumber}
                    onChangeText={(v) => setPhoneNumber(v.replace(/[^0-9]/g, ''))}
                    maxLength={15}
                  />
                </View>
                {showDialPicker && (
                  <ScrollView style={styles.dialList} nestedScrollEnabled keyboardShouldPersistTaps="handled">
                    {COUNTRY_CODES.map((c) => (
                      <TouchableOpacity
                        key={c.code}
                        style={[styles.dialRow, c.dial === dialCode && styles.dialRowActive]}
                        onPress={() => { setDialCode(c.dial); setShowDialPicker(false); }}
                        activeOpacity={0.7}
                      >
                        <Text style={styles.dialRowText}>{c.flag}  {c.dial}</Text>
                        {c.dial === dialCode && <CheckSvg size={12} color="#0F172A" />}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                )}
                {phoneNumber.length > 0 && (
                  <Text style={styles.phonePreview}>Full: {buildPhone()}</Text>
                )}
              </View>

              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Contact Email (Optional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="pastor@church.org"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={contactEmail}
                  onChangeText={setContactEmail}
                  returnKeyType="done"
                />
              </View>

              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.secondaryBtn} onPress={handleBack} activeOpacity={0.7}>
                  <Text style={styles.secondaryBtnText}>‹ Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.primaryBtn, { flex: 1 }]} onPress={handleNext} activeOpacity={0.8}>
                  <Text style={styles.primaryBtnText}>Continue ›</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* ════════════════════════════════════════════════════════════════ */}
          {/* STEP 5 — SERVICES SCHEDULE                                      */}
          {/* ════════════════════════════════════════════════════════════════ */}
          {step === 5 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>When do you meet?</Text>
              <Text style={styles.sectionSubtitle}>
                Add all services this {getBranchTypeLabel(selectedType).toLowerCase()} holds each week.
                You can add multiple service times.
              </Text>

              {/* Existing service slots */}
              {services.map((s, idx) => (
                <View key={s.id} style={styles.serviceSlot}>
                  <View style={styles.serviceSlotInfo}>
                    <Text style={styles.serviceSlotLabel}>{s.label}</Text>
                    <Text style={styles.serviceSlotTime}>{s.day} at {s.time}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleRemoveService(s.id)} activeOpacity={0.7}>
                    <Text style={styles.serviceRemoveText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              ))}

              {/* Add service form */}
              {addingService ? (
                <View style={styles.addServiceForm}>
                  {/* Service type chips + custom text */}
                  <Text style={styles.fieldLabel}>Service Type</Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.serviceLabelScroll}
                    contentContainerStyle={styles.serviceLabelRow}
                    keyboardShouldPersistTaps="handled"
                  >
                    {SERVICE_LABELS.map((lbl) => (
                      <TouchableOpacity
                        key={lbl}
                        onPress={() => { setDraftLabel(lbl); setDraftCustomLabel(''); }}
                        activeOpacity={0.7}
                        style={styles.serviceLabelChip}
                      >
                        <Text
                          style={[
                            styles.serviceLabelChipText,
                            draftLabel === lbl && !draftCustomLabel && styles.serviceLabelChipTextActive,
                          ]}
                        >
                          {lbl}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <TextInput
                    style={[styles.input, { marginTop: 8 }]}
                    placeholder="Or type a custom service name..."
                    placeholderTextColor="#94A3B8"
                    value={draftCustomLabel}
                    onChangeText={setDraftCustomLabel}
                    autoCapitalize="words"
                    returnKeyType="next"
                  />

                  {/* Day chips */}
                  <Text style={[styles.fieldLabel, { marginTop: 16 }]}>Day</Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.serviceLabelScroll}
                    contentContainerStyle={styles.serviceLabelRow}
                    keyboardShouldPersistTaps="handled"
                  >
                    {DAYS_OF_WEEK.map((day) => (
                      <TouchableOpacity
                        key={day}
                        onPress={() => setDraftDay(day)}
                        activeOpacity={0.7}
                        style={styles.serviceLabelChip}
                      >
                        <Text
                          style={[
                            styles.serviceLabelChipText,
                            draftDay === day && styles.serviceLabelChipTextActive,
                          ]}
                        >
                          {day.slice(0, 3)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>

                  {/* Time chips + custom time text input */}
                  <Text style={[styles.fieldLabel, { marginTop: 16 }]}>Time</Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.serviceLabelScroll}
                    contentContainerStyle={styles.serviceLabelRow}
                    keyboardShouldPersistTaps="handled"
                  >
                    {TIME_SLOTS.map((t) => (
                      <TouchableOpacity
                        key={t}
                        onPress={() => { setDraftTime(t); setDraftCustomTime(''); }}
                        activeOpacity={0.7}
                        style={styles.serviceLabelChip}
                      >
                        <Text
                          style={[
                            styles.serviceLabelChipText,
                            draftTime === t && !draftCustomTime && styles.serviceLabelChipTextActive,
                          ]}
                        >
                          {t}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                  <TextInput
                    style={[styles.input, { marginTop: 8 }]}
                    placeholder="Or type a custom time (e.g. 10:45)"
                    placeholderTextColor="#94A3B8"
                    value={draftCustomTime}
                    onChangeText={setDraftCustomTime}
                    keyboardType="numbers-and-punctuation"
                    returnKeyType="done"
                    maxLength={8}
                  />

                  <View style={[styles.actionRow, { marginTop: 16 }]}>
                    <TouchableOpacity
                      style={styles.secondaryBtn}
                      onPress={() => setAddingService(false)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.secondaryBtnText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.primaryBtn, { flex: 1 }]}
                      onPress={handleAddService}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.primaryBtnText}>Add Service</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.addServiceBtn}
                  onPress={() => setAddingService(true)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.addServiceBtnText}>+ Add Service Time</Text>
                </TouchableOpacity>
              )}

              <View style={[styles.actionRow, { marginTop: 24 }]}>
                <TouchableOpacity style={styles.secondaryBtn} onPress={handleBack} activeOpacity={0.7}>
                  <Text style={styles.secondaryBtnText}>‹ Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.primaryBtn, { flex: 1 }]} onPress={handleNext} activeOpacity={0.8}>
                  <Text style={styles.primaryBtnText}>Review Details ›</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* ════════════════════════════════════════════════════════════════ */}
          {/* STEP 6 — REVIEW & CONFIRM                                       */}
          {/* ════════════════════════════════════════════════════════════════ */}
          {step === 6 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Review & Confirm</Text>
              <Text style={styles.sectionSubtitle}>
                Verify all details before adding to the global directory.
              </Text>

              <View style={styles.reviewList}>
                {[
                  { label: 'TYPE', value: getBranchTypeLabel(selectedType) },
                  { label: 'MINISTRY', value: activeMinistry?.name || initialMinistryName },
                  { label: 'NAME', value: branchName },
                  { label: 'LOCATION', value: `${townQuery}, ${province}, ${country} (${postalCode})` },
                  { label: 'ADDRESS', value: address || '—' },
                  { label: 'RESIDENT PASTOR', value: leaderName },
                  { label: 'PHONE', value: buildPhone() || '—' },
                  { label: 'EMAIL', value: contactEmail || '—' },
                ].map((row) => (
                  <View key={row.label} style={styles.reviewRow}>
                    <Text style={styles.reviewLabel}>{row.label}</Text>
                    <Text style={styles.reviewValue}>{row.value}</Text>
                  </View>
                ))}

                {/* Services — each on its own line */}
                <View style={styles.reviewRow}>
                  <Text style={styles.reviewLabel}>SERVICES</Text>
                  {services.map((s) => (
                    <Text key={s.id} style={styles.reviewValue}>
                      {s.label} — {s.day} {s.time}
                    </Text>
                  ))}
                </View>
              </View>

              <View style={[styles.actionRow, { marginTop: 24 }]}>
                <TouchableOpacity style={styles.secondaryBtn} onPress={handleBack} activeOpacity={0.7} disabled={isSubmitting}>
                  <Text style={styles.secondaryBtnText}>‹ Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.primaryBtn, { flex: 1 }, isSubmitting && { opacity: 0.6 }]}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                  activeOpacity={0.8}
                >
                  <Text style={styles.primaryBtnText}>
                    {isSubmitting ? 'Registering...' : 'Confirm & Register'}
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

// ── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15,23,42,0.08)',
    backgroundColor: '#FFFFFF',
  },
  closeBtn: { padding: spacing.xs },
  backText: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  headerTitle: { fontSize: 15, fontWeight: '700', flex: 1, textAlign: 'center' },
  progressContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15,23,42,0.06)',
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressStepText: { fontSize: 10, fontWeight: '800', color: colors.accent, letterSpacing: 0.5 },
  progressTitleText: { fontSize: 12, fontWeight: '600', color: '#0F172A' },
  progressTrack: { height: 3, backgroundColor: 'rgba(15,23,42,0.08)', borderRadius: 1.5, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#0F172A' },

  scroll: { flex: 1 },
  content: { paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: 120 },
  section: { gap: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A', marginBottom: 2 },
  sectionSubtitle: { fontSize: 13, color: '#64748B', lineHeight: 19 },

  // Type & Ministry selector rows
  typeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15,23,42,0.06)',
    gap: 12,
  },
  ministryRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15,23,42,0.06)',
    gap: 12,
  },
  typeRadioCol: { paddingTop: 2 },
  typeRadio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeRadioFill: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#0F172A',
  },
  typeTextCol: { flex: 1 },
  typeLabel: { fontSize: 14, fontWeight: '600', color: '#475569', marginBottom: 3 },
  typeLabelActive: { color: '#0F172A', fontWeight: '800' },
  typeDescription: { fontSize: 12, color: '#64748B', lineHeight: 17 },

  // Form fields
  fieldGroup: { gap: 5 },
  fieldLabel: { fontSize: 11, fontWeight: '700', color: '#334155', letterSpacing: 0.2 },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.12)',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
  },
  readonlyInput: {
    backgroundColor: 'rgba(15,23,42,0.03)',
    borderColor: 'rgba(15,23,42,0.07)',
    justifyContent: 'center',
  },
  readonlyText: { fontSize: 14, color: '#475569' },
  rowFields: { flexDirection: 'row', gap: 12 },

  // Search
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.14)',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    gap: 8,
  },
  searchInput: { flex: 1, paddingVertical: 10, fontSize: 14, color: '#0F172A' },
  suggestionList: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.12)',
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
    borderBottomColor: 'rgba(15,23,42,0.06)',
  },
  suggestionTown: { fontSize: 13, fontWeight: '700', color: '#0F172A', marginBottom: 1 },
  suggestionMeta: { fontSize: 11, color: '#64748B' },

  // Phone
  phoneRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  dialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.12)',
    borderRadius: radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 10,
    minWidth: 88,
  },
  dialText: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  dialChevron: { fontSize: 9, color: '#64748B' },
  dialList: {
    maxHeight: 200,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.12)',
    borderRadius: radius.sm,
    marginTop: 4,
  },
  dialRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15,23,42,0.05)',
  },
  dialRowActive: { backgroundColor: 'rgba(15,23,42,0.04)' },
  dialRowText: { fontSize: 13, color: '#0F172A' },
  phonePreview: { fontSize: 11, color: '#64748B', fontStyle: 'italic' },

  // Services
  serviceSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15,23,42,0.06)',
  },
  serviceSlotInfo: { flex: 1 },
  serviceSlotLabel: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  serviceSlotTime: { fontSize: 12, color: '#64748B', marginTop: 1 },
  serviceRemoveText: { fontSize: 12, fontWeight: '700', color: '#DC2626' },
  addServiceBtn: {
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.12)',
    borderRadius: radius.sm,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  addServiceBtnText: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  addServiceForm: {
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15,23,42,0.06)',
    gap: 8,
  },
  serviceLabelScroll: { flexGrow: 0 },
  serviceLabelRow: { flexDirection: 'row', gap: 8, paddingVertical: 4 },
  serviceLabelChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.10)',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  serviceLabelChipText: { fontSize: 12, color: '#64748B', fontWeight: '500' },
  serviceLabelChipTextActive: { color: '#0F172A', fontWeight: '800', borderBottomWidth: 1.5, borderBottomColor: '#0F172A' },

  // Review
  reviewList: { borderTopWidth: 1, borderTopColor: 'rgba(15,23,42,0.07)' },
  reviewRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15,23,42,0.06)',
  },
  reviewLabel: { fontSize: 9, fontWeight: '800', color: '#94A3B8', letterSpacing: 0.6, marginBottom: 2 },
  reviewValue: { fontSize: 13, color: '#0F172A', lineHeight: 18 },

  // Buttons
  actionRow: { flexDirection: 'row', gap: 12, alignItems: 'center', marginTop: 8 },
  primaryBtn: {
    backgroundColor: '#0F172A',
    borderRadius: radius.sm,
    paddingVertical: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700', letterSpacing: 0.3 },
  secondaryBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.15)',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  secondaryBtnText: { color: '#0F172A', fontSize: 13, fontWeight: '700' },
});
