/**
 * Register Church Ministry Screen
 *
 * Allows users to register a new church or ministry if their organization
 * is not yet listed in the pre-added directory.
 * Upon successful creation, the user is navigated directly to RegisterBranchScreen
 * with their new ministry pre-selected to add their branches and homecells.
 */

import React, { useState } from 'react';
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
import { registerMinistry } from '../services/ministryService';
import { CloseSvg } from '../components/SvgIcons';

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

  const [name, setName] = useState('');
  const [founder, setFounder] = useState('');
  const [headquarters, setHeadquarters] = useState('');
  const [headquartersCountry, setHeadquartersCountry] = useState('South Africa');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_OPTIONS[0]);
  const [website, setWebsite] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      showAlert({
        title: 'Ministry Name Required',
        message: 'Please enter the name of your church or ministry organization.',
        buttons: [{ text: 'OK' }],
      });
      return;
    }

    if (!founder.trim()) {
      showAlert({
        title: 'Founder / Pastor Required',
        message: 'Please specify the founder or senior pastor leading the ministry.',
        buttons: [{ text: 'OK' }],
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const created = await registerMinistry({
        name,
        founder,
        headquarters: headquarters || 'Johannesburg',
        headquartersCountry: headquartersCountry || 'South Africa',
        description: description || `Global Christian ministry founded by ${founder}.`,
        category: selectedCategory,
        website,
        contactEmail,
        contactPhone,
      });

      setIsSubmitting(false);

      showAlert({
        title: 'Ministry Registered',
        message: `${created.name} is now registered in the global directory. Let's add your first campus branch or homecell.`,
        buttons: [
          {
            text: 'Add Branch / Homecell',
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeBtn}
          accessibilityRole="button"
          accessibilityLabel="Close register ministry screen"
        >
          <CloseSvg size={20} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text variant="h3" color={colors.textPrimary} style={styles.headerTitle}>
          Register Your Ministry
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
          <View style={styles.introCard}>
            <Text variant="body" color={colors.textSecondary}>
              Connect your church family, campuses, and homecell networks across cities and nations.
            </Text>
          </View>

          {/* Section 1: Basic Identity */}
          <View style={styles.card}>
            <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.cardSectionLabel}>
              MINISTRY IDENTITY
            </Text>

            <View style={styles.inputGroup}>
              <Text variant="caption" weight="700" color={colors.textSecondary}>
                Ministry / Church Name *
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Grace Fellowship International"
                placeholderTextColor={colors.textTertiary}
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text variant="caption" weight="700" color={colors.textSecondary}>
                Founder / Senior Pastor *
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g. Pastor John Doe"
                placeholderTextColor={colors.textTertiary}
                value={founder}
                onChangeText={setFounder}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text variant="caption" weight="700" color={colors.textSecondary}>
                Ministry Vision & Description
              </Text>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Describe your ministry's core vision, spiritual focus, and mission..."
                placeholderTextColor={colors.textTertiary}
                multiline
                numberOfLines={3}
                value={description}
                onChangeText={setDescription}
              />
            </View>
          </View>

          {/* Section 2: Theological Focus & Category */}
          <View style={styles.card}>
            <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.cardSectionLabel}>
              THEOLOGICAL FOCUS / CATEGORY
            </Text>
            <View style={styles.categoryGrid}>
              {CATEGORY_OPTIONS.map((cat) => {
                const isSelected = cat === selectedCategory;
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[styles.categoryPill, isSelected && styles.categoryPillActive]}
                    onPress={() => setSelectedCategory(cat)}
                    activeOpacity={0.7}
                  >
                    <Text
                      variant="caption"
                      weight={isSelected ? '700' : '500'}
                      color={isSelected ? '#0F172A' : colors.textSecondary}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Section 3: Headquarters & Contact */}
          <View style={styles.card}>
            <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.cardSectionLabel}>
              HEADQUARTERS & CONTACT
            </Text>

            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text variant="caption" weight="700" color={colors.textSecondary}>
                  Headquarters City
                </Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. Johannesburg"
                  placeholderTextColor={colors.textTertiary}
                  value={headquarters}
                  onChangeText={setHeadquarters}
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text variant="caption" weight="700" color={colors.textSecondary}>
                  Country
                </Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. South Africa"
                  placeholderTextColor={colors.textTertiary}
                  value={headquartersCountry}
                  onChangeText={setHeadquartersCountry}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text variant="caption" weight="700" color={colors.textSecondary}>
                Official Website (Optional)
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="https://yourchurch.org"
                placeholderTextColor={colors.textTertiary}
                autoCapitalize="none"
                keyboardType="url"
                value={website}
                onChangeText={setWebsite}
              />
            </View>

            <View style={styles.rowInputs}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text variant="caption" weight="700" color={colors.textSecondary}>
                  Contact Phone
                </Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="+27 11 000 0000"
                  placeholderTextColor={colors.textTertiary}
                  keyboardType="phone-pad"
                  value={contactPhone}
                  onChangeText={setContactPhone}
                />
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text variant="caption" weight="700" color={colors.textSecondary}>
                  Official Email
                </Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="office@yourchurch.org"
                  placeholderTextColor={colors.textTertiary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={contactEmail}
                  onChangeText={setContactEmail}
                />
              </View>
            </View>
          </View>

          {/* Submit CTA */}
          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Register Ministry"
          >
            <Text variant="body" weight="700" style={styles.submitButtonText}>
              {isSubmitting ? 'REGISTERING...' : 'REGISTER & PROCEED TO ADD BRANCH'}
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
  introCard: {
    backgroundColor: 'rgba(253, 210, 35, 0.15)',
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(180, 83, 9, 0.15)',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    ...shadow.sm,
  },
  cardSectionLabel: {
    fontSize: 11,
    marginBottom: spacing.xs,
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
  textArea: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: spacing.xs,
  },
  categoryPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  categoryPillActive: {
    backgroundColor: '#FDD223',
  },
  submitButton: {
    backgroundColor: '#FDD223',
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
    ...shadow.sm,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#0F172A',
    letterSpacing: 0.5,
  },
});
