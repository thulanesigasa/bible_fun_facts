import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme';
import { Text } from '../components/Typography';
import { useThemedAlert } from '../context/AlertContext';
import { useUser } from '../context/UserContext';

export default function ExportJournalScreen() {
  const { exportStudyJournal, favoritesFacts, favoritesScriptures, bibleHighlights, streak } = useUser();
  const [isExporting, setIsExporting] = useState(false);
  const { showAlert } = useThemedAlert();

  const handleExport = async (encrypted: boolean) => {
    setIsExporting(true);
    try {
      const res = await exportStudyJournal({ encrypted });
      if (res.success) {
        showAlert({
          title: encrypted ? 'Encrypted Journal Exported' : 'Journal Exported',
          message: encrypted
            ? 'Your sacred study reflections and bookmarks have been encrypted with your device AES-256 key and prepared for sharing.'
            : 'Your study reflections, bookmarks, highlights, and streak data have been prepared in standard JSON format.',
          icon: 'success',
        });
      } else {
        showAlert({
          title: 'Export Notice',
          message: res.error || 'Unable to prepare export file at this time.',
          icon: 'warning',
        });
      }
    } catch (e: any) {
      showAlert({
        title: 'Export Error',
        message: e?.message || 'Failed to export study data.',
        icon: 'warning',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const bookmarksCount = favoritesScriptures?.length || 0;
  const factsCount = favoritesFacts?.length || 0;
  const highlightsCount = Object.keys(bibleHighlights || {}).length;

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Intro Header - Seamless Body Canvas */}
        <View style={styles.headerBlock}>
          <Text variant="h2" weight="800" color={colors.textPrimary} style={styles.title}>
            Export Study Journal
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
            Exercise full ownership over your spiritual journey. Export your reflections, highlighted verses, bookmarks, and study streak in encrypted or open formats.
          </Text>
        </View>

        {/* Export Format 1: AES-256 Hardware Encrypted */}
        <View style={styles.sectionBlock}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            ENCRYPTED HARDWARE BACKUP
          </Text>

          <Text variant="h3" weight="700" color={colors.textPrimary} style={styles.optionTitle}>
            Hardware-Encrypted (AES-256-CBC)
          </Text>
          <Text variant="caption" color={colors.textTertiary} style={styles.optionMeta}>
            FIPS 197 standard • Android Keystore & iOS Keychain
          </Text>

          <Text variant="body" color={colors.textSecondary} style={styles.optionDescription}>
            Generates an encrypted archive using your device's unique hardware master key. Ideal for secure offline vaulting and confidential backups.
          </Text>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => handleExport(true)}
            activeOpacity={0.8}
            disabled={isExporting}
            accessibilityRole="button"
            accessibilityLabel="Export AES-256 encrypted backup"
          >
            {isExporting ? (
              <ActivityIndicator size="small" color="#FDD223" />
            ) : (
              <Text variant="caption" weight="700" color="#FDD223" style={styles.primaryBtnText}>
                Export AES-256 Backup
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Export Format 2: Standard JSON */}
        <View style={styles.sectionBlock}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            PORTABLE OPEN FORMAT
          </Text>

          <Text variant="h3" weight="700" color={colors.textPrimary} style={styles.optionTitle}>
            Standard Portable JSON
          </Text>
          <Text variant="caption" color={colors.textTertiary} style={styles.optionMeta}>
            Open standard • Human-readable scripture data
          </Text>

          <Text variant="body" color={colors.textSecondary} style={styles.optionDescription}>
            Exports your complete study library in clean JSON format, easily imported into personal notes, research spreadsheets, or external biblical tools.
          </Text>

          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => handleExport(false)}
            activeOpacity={0.8}
            disabled={isExporting}
            accessibilityRole="button"
            accessibilityLabel="Export standard JSON study journal"
          >
            <Text variant="caption" weight="700" color={colors.textPrimary} style={styles.secondaryBtnText}>
              Export Standard JSON
            </Text>
          </TouchableOpacity>
        </View>

        {/* Archive Manifest Summary */}
        <View style={[styles.sectionBlock, { borderBottomWidth: 0 }]}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            WHAT IS INCLUDED IN YOUR BACKUP
          </Text>

          <View style={styles.manifestRow}>
            <Text variant="caption" color={colors.textPrimary} style={styles.manifestLabel}>
              Bookmarked Verses & Scriptures
            </Text>
            <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.manifestValue}>
              {bookmarksCount} items
            </Text>
          </View>

          <View style={styles.rowDivider} />

          <View style={styles.manifestRow}>
            <Text variant="caption" color={colors.textPrimary} style={styles.manifestLabel}>
              Saved Exegesis Insights & Words of the Day
            </Text>
            <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.manifestValue}>
              {factsCount} items
            </Text>
          </View>

          <View style={styles.rowDivider} />

          <View style={styles.manifestRow}>
            <Text variant="caption" color={colors.textPrimary} style={styles.manifestLabel}>
              Bible Verses with Highlights & Notes
            </Text>
            <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.manifestValue}>
              {highlightsCount} items
            </Text>
          </View>

          <View style={styles.rowDivider} />

          <View style={styles.manifestRow}>
            <Text variant="caption" color={colors.textPrimary} style={styles.manifestLabel}>
              Study Streak & Milestone Achievements
            </Text>
            <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.manifestValue}>
              {streak || 1} Days
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background, // 60% Dominant Canvas #F8FAFC
  },
  scrollContent: {
    paddingHorizontal: spacing.md, // 16px
    paddingTop: spacing.lg,        // 24px
    paddingBottom: 48,
  },
  headerBlock: {
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 19,
  },
  sectionBlock: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
    paddingBottom: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    letterSpacing: 1.2,
    marginBottom: spacing.md,
  },
  optionTitle: {
    marginBottom: 2,
  },
  optionMeta: {
    fontSize: 11,
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: spacing.md,
  },
  primaryBtn: {
    backgroundColor: '#0F172A',
    height: 48,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryBtnText: {
    fontSize: 13,
    letterSpacing: 0.3,
  },
  secondaryBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.14)',
    height: 48,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryBtnText: {
    fontSize: 13,
    letterSpacing: 0.3,
  },
  manifestRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  manifestLabel: {
    fontSize: 13,
    flex: 1,
    paddingRight: spacing.sm,
  },
  manifestValue: {
    fontSize: 12,
  },
  rowDivider: {
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.05)',
  },
});
