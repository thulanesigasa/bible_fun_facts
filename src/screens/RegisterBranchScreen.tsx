/**
 * Register Church Branch & Homecell Screen
 *
 * Provides structured registration for Church Branches, Homecells, Cell Branches,
 * Sub-Clusters, and Clusters.
 * Features automated cascading geocoding: selecting a town/city automatically
 * resolves and populates the province/state, country, postal code, and map coordinates.
 */

import React, { useState, useEffect, useMemo } from 'react';
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
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import { useThemedAlert } from '../context/AlertContext';
import {
  BranchRadarMap,
} from '../components/BranchRadarMap';
import {
  searchTowns,
  searchTownsOnline,
  resolveTownDetails,
  GeoLocation,
} from '../services/geoService';
import {
  registerBranch,
  getAllMinistries,
  Ministry,
  BranchType,
  getBranchTypeLabel,
  Branch,
} from '../services/ministryService';
import {
  CloseSvg,
  CheckSvg,
  SearchSvg,
} from '../components/SvgIcons';

const BRANCH_TYPES: { type: BranchType; label: string }[] = [
  { type: 'branch', label: 'Main Branch / Campus' },
  { type: 'homecell', label: 'Homecell' },
  { type: 'cell_branch', label: 'Cell Branch' },
  { type: 'sub_cluster', label: 'Sub-Cluster' },
  { type: 'cluster', label: 'Cluster' },
];

export default function RegisterBranchScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const { showAlert } = useThemedAlert();
  const initialMinistryId = route.params?.ministryId || '';
  const initialMinistryName = route.params?.ministryName || '';

  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [selectedMinistryId, setSelectedMinistryId] = useState<string>(initialMinistryId);
  const [branchName, setBranchName] = useState('');
  const [selectedType, setSelectedType] = useState<BranchType>('branch');
  const [leaderName, setLeaderName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  // Geocoding auto-cascade fields
  const [townQuery, setTownQuery] = useState('Johannesburg');
  const [province, setProvince] = useState('Gauteng');
  const [country, setCountry] = useState('South Africa');
  const [postalCode, setPostalCode] = useState('2000');
  const [coordinates, setCoordinates] = useState({ latitude: -26.2041, longitude: 28.0473 });
  const [showTownSuggestions, setShowTownSuggestions] = useState(false);

  const [address, setAddress] = useState('');
  const [meetingTimes, setMeetingTimes] = useState('Sundays: 09:30 AM | Wednesdays: 18:30 PM');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getAllMinistries().then((list) => {
      setMinistries(list);
      if (!selectedMinistryId && list.length > 0) {
        setSelectedMinistryId(list[0].id);
      }
    });
  }, [selectedMinistryId]);

  const activeMinistry = useMemo(() => {
    return ministries.find((m) => m.id === selectedMinistryId) || null;
  }, [ministries, selectedMinistryId]);

  const [liveSuggestions, setLiveSuggestions] = useState<GeoLocation[]>([]);
  const [isSearchingOnline, setIsSearchingOnline] = useState(false);

  useEffect(() => {
    const q = townQuery.trim();
    if (!q) {
      setLiveSuggestions([]);
      return;
    }

    // Instant local matches
    const local = searchTowns(q).slice(0, 6);
    setLiveSuggestions(local);

    // Debounced online search via OpenStreetMap Nominatim & Photon
    const timer = setTimeout(async () => {
      if (q.length >= 2) {
        setIsSearchingOnline(true);
        try {
          const online = await searchTownsOnline(q);
          setLiveSuggestions(online.slice(0, 8));
        } catch {
          // Keep local matches
        } finally {
          setIsSearchingOnline(false);
        }
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [townQuery]);

  // Automated cascade resolution when user selects a town
  const handleSelectTown = (geo: GeoLocation) => {
    setTownQuery(geo.town);
    setProvince(geo.province);
    setCountry(geo.country);
    setPostalCode(geo.postalCode);
    setCoordinates(geo.coordinates);
    setShowTownSuggestions(false);
  };

  const handleTownInputChange = (text: string) => {
    setTownQuery(text);
    setShowTownSuggestions(true);

    // Try instant local resolution
    const match = resolveTownDetails(text);
    if (match) {
      setProvince(match.province);
      setCountry(match.country);
      setPostalCode(match.postalCode);
      setCoordinates(match.coordinates);
    }
  };

  // Mock preview branch object for the live radar map preview
  const previewBranch: Branch = useMemo(
    () => ({
      id: 'preview-branch',
      ministryId: selectedMinistryId,
      ministryName: activeMinistry?.name || initialMinistryName || 'Church Ministry',
      name: branchName.trim() || 'New Branch Campus',
      type: selectedType,
      leaderName: leaderName.trim() || 'Leadership Team',
      contactNumber: contactNumber.trim() || '+27 11 000 0000',
      town: townQuery.trim() || 'Johannesburg',
      province,
      country,
      postalCode,
      address: address.trim() || `${townQuery} Central Area`,
      meetingTimes: meetingTimes.trim() || 'Sundays: 09:30 AM',
      coordinates,
      createdAt: new Date().toISOString(),
    }),
    [
      selectedMinistryId,
      activeMinistry,
      initialMinistryName,
      branchName,
      selectedType,
      leaderName,
      contactNumber,
      townQuery,
      province,
      country,
      postalCode,
      address,
      meetingTimes,
      coordinates,
    ]
  );

  const handleSubmit = async () => {
    if (!branchName.trim()) {
      showAlert({
        title: 'Branch Name Required',
        message: 'Please enter the branch or homecell name to continue.',
        buttons: [{ text: 'OK' }],
      });
      return;
    }

    if (!townQuery.trim()) {
      showAlert({
        title: 'Area Required',
        message: 'Please specify the town or city for this branch.',
        buttons: [{ text: 'OK' }],
      });
      return;
    }

    if (!leaderName.trim()) {
      showAlert({
        title: 'Leader Name Required',
        message: 'Please enter the name of the pastor or cell leader in charge.',
        buttons: [{ text: 'OK' }],
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await registerBranch({
        ministryId: selectedMinistryId,
        ministryName: activeMinistry?.name || initialMinistryName || 'Church Ministry',
        name: branchName,
        type: selectedType,
        leaderName,
        contactNumber,
        contactEmail,
        town: townQuery,
        province,
        country,
        postalCode,
        address: address || `${townQuery}, ${province}`,
        meetingTimes,
        coordinates,
      });

      setIsSubmitting(false);
      showAlert({
        title: 'Branch Registered Successfully',
        message: `${created.name} (${getBranchTypeLabel(created.type)}) has been added to ${created.ministryName} in ${created.town}, ${created.province}.`,
        buttons: [
          {
            text: 'View Church Directory',
            onPress: () => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('SearchMain');
              }
            },
          },
        ],
      });
    } catch {
      setIsSubmitting(false);
      showAlert({
        title: 'Registration Error',
        message: 'Could not register branch at this time. Please try again.',
        buttons: [{ text: 'OK' }],
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeBtn}
          accessibilityRole="button"
          accessibilityLabel="Close register branch screen"
        >
          <CloseSvg size={20} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text variant="h3" color={colors.textPrimary} style={styles.headerTitle}>
          Register Branch / Cell
        </Text>
        <View style={{ width: 36 }} />
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
          {/* Section 1: Target Ministry */}
          <View style={styles.bodySection}>
            <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.cardSectionLabel}>
              CHURCH / MINISTRY AFFILIATION
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.ministryPillRow}>
              {ministries.map((m) => {
                const isSelected = m.id === selectedMinistryId;
                return (
                  <TouchableOpacity
                    key={m.id}
                    style={[styles.ministryPill, isSelected && styles.ministryPillActive]}
                    onPress={() => setSelectedMinistryId(m.id)}
                    activeOpacity={0.7}
                  >
                    <Text
                      variant="caption"
                      weight={isSelected ? '800' : '600'}
                      color={isSelected ? '#0F172A' : colors.textSecondary}
                    >
                      {m.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Section 2: Branch Structure Type */}
          <View style={styles.bodySection}>
            <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.cardSectionLabel}>
              STRUCTURE TYPE
            </Text>
            <View style={styles.typeChipsGrid}>
              {BRANCH_TYPES.map((t) => {
                const isSelected = t.type === selectedType;
                return (
                  <TouchableOpacity
                    key={t.type}
                    style={[styles.typeChip, isSelected && styles.typeChipActive]}
                    onPress={() => setSelectedType(t.type)}
                    activeOpacity={0.7}
                  >
                    <Text
                      variant="caption"
                      weight={isSelected ? '700' : '500'}
                      color={isSelected ? '#0F172A' : colors.textSecondary}
                    >
                      {t.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Section 3: Branch Details */}
          <View style={styles.bodySection}>
            <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.cardSectionLabel}>
              BRANCH DETAILS
            </Text>

            <View style={styles.inputGroup}>
              <Text variant="caption" weight="700" color={colors.textSecondary}>
                Branch / Cell Name *
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Sandton Central Campus, Bryanston Cell #4"
                placeholderTextColor={colors.textTertiary}
                value={branchName}
                onChangeText={setBranchName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text variant="caption" weight="700" color={colors.textSecondary}>
                Pastor / Leader in Charge *
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Pastor David Ndlovu"
                placeholderTextColor={colors.textTertiary}
                value={leaderName}
                onChangeText={setLeaderName}
              />
            </View>

            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text variant="caption" weight="700" color={colors.textSecondary}>
                  Contact Phone / WhatsApp *
                </Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="+27 11 000 0000"
                  placeholderTextColor={colors.textTertiary}
                  keyboardType="phone-pad"
                  value={contactNumber}
                  onChangeText={setContactNumber}
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text variant="caption" weight="700" color={colors.textSecondary}>
                  Email (Optional)
                </Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="branch@church.org"
                  placeholderTextColor={colors.textTertiary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={contactEmail}
                  onChangeText={setContactEmail}
                />
              </View>
            </View>
          </View>

          {/* Section 4: Automated Geocoding Cascade (Town -> Province -> Country -> Postal Code) */}
          <View style={styles.bodySection}>
            <View style={styles.sectionHeaderRow}>
              <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.cardSectionLabel}>
                GEOGRAPHIC LOCATION & AUTO-CASCADE
              </Text>
              <View style={styles.autoResolvedTag}>
                <CheckSvg size={12} color="#B45309" />
                <Text variant="caption" weight="700" style={styles.autoResolvedTagText}>
                  AUTO-RESOLVED
                </Text>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text variant="caption" weight="700" color={colors.textSecondary}>
                Area (Town / City) *
              </Text>
              <View style={styles.searchBoxWrapper}>
                <SearchSvg size={16} color={colors.textSecondary} />
                <TextInput
                  style={styles.searchTextInput}
                  placeholder="Type or select town (e.g. Johannesburg, Durban, Pretoria)..."
                  placeholderTextColor={colors.textTertiary}
                  value={townQuery}
                  onChangeText={handleTownInputChange}
                  onFocus={() => setShowTownSuggestions(true)}
                />
              </View>

              {/* Autocomplete Suggestion Dropdown */}
              {showTownSuggestions && liveSuggestions.length > 0 && (
                <View style={styles.suggestionsContainer}>
                  {liveSuggestions.map((item, idx) => (
                    <TouchableOpacity
                      key={`${item.town}-${item.province}-${item.country}-${idx}`}
                      style={styles.suggestionItem}
                      onPress={() => handleSelectTown(item)}
                      activeOpacity={0.7}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text variant="body" weight="700" color={colors.textPrimary}>
                          {item.town}
                        </Text>
                        {item.postalCode ? (
                          <Text variant="caption" weight="700" color="#B45309">
                            {item.postalCode}
                          </Text>
                        ) : null}
                      </View>
                      <Text variant="caption" color={colors.textSecondary}>
                        {item.province ? `${item.province}, ` : ''}{item.country}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Auto-Populated Cascade Fields */}
            <View style={styles.cascadeSummaryBox}>
              <View style={styles.cascadeItem}>
                <Text variant="caption" color={colors.textSecondary}>Province / State:</Text>
                <Text variant="caption" weight="700" color={colors.textPrimary}>{province}</Text>
              </View>
              <View style={styles.cascadeItem}>
                <Text variant="caption" color={colors.textSecondary}>Country:</Text>
                <Text variant="caption" weight="700" color={colors.textPrimary}>{country}</Text>
              </View>
              <View style={styles.cascadeItem}>
                <Text variant="caption" color={colors.textSecondary}>Postal Code:</Text>
                <Text variant="caption" weight="700" color={colors.textPrimary}>{postalCode}</Text>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text variant="caption" weight="700" color={colors.textSecondary}>
                Physical Street Address / Landmark
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. 100 Main Street, Suite 4B"
                placeholderTextColor={colors.textTertiary}
                value={address}
                onChangeText={setAddress}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text variant="caption" weight="700" color={colors.textSecondary}>
                Meeting Times & Service Schedule
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="Sundays: 09:30 AM | Wednesdays: 18:30 PM"
                placeholderTextColor={colors.textTertiary}
                value={meetingTimes}
                onChangeText={setMeetingTimes}
              />
            </View>
          </View>

          {/* Section 5: Live Map Preview */}
          <View style={styles.bodySection}>
            <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.cardSectionLabel}>
              LOCATION RADAR PREVIEW
            </Text>
            <BranchRadarMap branches={[previewBranch]} height={220} />
          </View>

          {/* Submit CTA */}
          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Register Branch"
          >
            <Text variant="body" weight="700" style={styles.submitButtonText}>
              {isSubmitting ? 'REGISTERING...' : 'REGISTER BRANCH'}
            </Text>
          </TouchableOpacity>
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
  headerTitle: {
    fontSize: 17,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  bodySection: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  cardSectionLabel: {
    fontSize: 11,
    marginBottom: spacing.xs,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  autoResolvedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(253, 210, 35, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  autoResolvedTagText: {
    fontSize: 10,
    color: '#B45309',
  },
  ministryPillRow: {
    flexDirection: 'row',
    marginTop: spacing.xs,
  },
  ministryPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  ministryPillActive: {
    backgroundColor: '#FDD223',
  },
  typeChipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: spacing.xs,
  },
  typeChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  typeChipActive: {
    backgroundColor: '#FDD223',
  },
  inputGroup: {
    marginTop: spacing.sm,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 14,
    color: colors.textPrimary,
    marginTop: 4,
  },
  searchBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    marginTop: 4,
    gap: spacing.xs,
  },
  searchTextInput: {
    flex: 1,
    paddingVertical: spacing.sm,
    fontSize: 14,
    color: colors.textPrimary,
  },
  suggestionsContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
    borderRadius: radius.sm,
    marginTop: 4,
    ...shadow.sm,
  },
  suggestionItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.05)',
  },
  cascadeSummaryBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: radius.sm,
    padding: spacing.sm,
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  cascadeItem: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#0F172A',
    borderRadius: radius.sm,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
