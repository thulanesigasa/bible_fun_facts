import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import {
  ExportJournalSvg,
  ShieldLockSvg,
  CheckSvg,
} from '../components/SvgIcons';
import { useUser } from '../context/UserContext';

export default function ExportJournalScreen() {
  const { exportStudyJournal, favoritesFacts, favoritesScriptures, bibleHighlights, streak } = useUser();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async (encrypted: boolean) => {
    setIsExporting(true);
    try {
      const res = await exportStudyJournal({ encrypted });
      if (res.success) {
        Alert.alert(
          encrypted ? 'Encrypted Journal Exported' : 'Journal Exported',
          encrypted
            ? 'Your sacred study reflections and bookmarks have been encrypted with your device AES-256 key and prepared for sharing.'
            : 'Your study reflections, bookmarks, highlights, and streak data have been prepared in standard JSON format.'
        );
      } else {
        Alert.alert('Export Notice', res.error || 'Unable to prepare export file at this time.');
      }
    } catch (e: any) {
      Alert.alert('Export Error', e?.message || 'Failed to export study data.');
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
        {/* Rule 15/19 Logo Container: 50x50 icon inside 68x68 rounded container */}
        <View style={styles.logoRow}>
          <View style={[styles.logoContainer, shadow.sm]}>
            <ExportJournalSvg size={36} color="#0F172A" />
          </View>
        </View>

        {/* Intro Header */}
        <View style={styles.introHeader}>
          <Text variant="h2" weight="800" color={colors.textPrimary} style={styles.mainTitle}>
            Export Study Journal
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.leadParagraph}>
            Exercise full ownership over your spiritual journey. Export your reflections, highlighted verses, bookmarks, and study streak in encrypted or open formats.
          </Text>
        </View>

        {/* Export Format 1: AES-256 Hardware Encrypted */}
        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            ENCRYPTED HARDWARE BACKUP
          </Text>

          <View style={[styles.formatCard, shadow.sm]}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.iconCircle}>
                <ShieldLockSvg size={20} color="#0F172A" />
              </View>
              <View style={styles.cardTitleBox}>
                <Text variant="h3" weight="700" color={colors.textPrimary} style={styles.cardTitle}>
                  Hardware-Encrypted (AES-256-CBC)
                </Text>
                <Text variant="caption" color={colors.textSecondary} style={styles.cardSubtitle}>
                  FIPS 197 standard • Android Keystore & iOS Keychain
                </Text>
              </View>
            </View>

            <Text variant="body" color={colors.textSecondary} style={styles.cardBody}>
              Generates an encrypted archive using your device's unique hardware master key. Ideal for secure offline vaulting and confidential backups.
            </Text>

            <TouchableOpacity
              style={[styles.exportBtn, shadow.sm]}
              onPress={() => handleExport(true)}
              activeOpacity={0.8}
              disabled={isExporting}
              accessibilityRole="button"
              accessibilityLabel="Export encrypted study journal"
            >
              {isExporting ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text variant="caption" weight="700" color="#FFFFFF" style={styles.exportBtnText}>
                  Export AES-256 Backup
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Export Format 2: Standard JSON */}
        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            PORTABLE OPEN FORMAT
          </Text>

          <View style={[styles.formatCard, shadow.sm]}>
            <View style={styles.cardHeaderRow}>
              <View style={styles.iconCircle}>
                <ExportJournalSvg size={20} color="#0F172A" />
              </View>
              <View style={styles.cardTitleBox}>
                <Text variant="h3" weight="700" color={colors.textPrimary} style={styles.cardTitle}>
                  Standard Portable JSON
                </Text>
                <Text variant="caption" color={colors.textSecondary} style={styles.cardSubtitle}>
                  Open standard • Human-readable scripture data
                </Text>
              </View>
            </View>

            <Text variant="body" color={colors.textSecondary} style={styles.cardBody}>
              Exports your complete study library in clean JSON format, easily imported into personal notes, research spreadsheets, or external biblical tools.
            </Text>

            <TouchableOpacity
              style={[styles.secondaryExportBtn, shadow.sm]}
              onPress={() => handleExport(false)}
              activeOpacity={0.8}
              disabled={isExporting}
              accessibilityRole="button"
              accessibilityLabel="Export standard JSON study journal"
            >
              <Text variant="caption" weight="700" color={colors.textPrimary} style={styles.secondaryExportBtnText}>
                Export Standard JSON
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Archive Manifest Summary */}
        <View style={[styles.bodySection, { borderBottomWidth: 0 }]}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            WHAT IS INCLUDED IN YOUR BACKUP
          </Text>

          <View style={[styles.manifestCard, shadow.sm]}>
            <View style={styles.manifestRow}>
              <View style={styles.checkIcon}>
                <CheckSvg size={12} color="#0F172A" strokeWidth={2.5} />
              </View>
              <Text variant="caption" color={colors.textPrimary} style={styles.manifestText}>
                {bookmarksCount} Bookmarked Verses & Scriptures
              </Text>
            </View>

            <View style={styles.manifestDivider} />

            <View style={styles.manifestRow}>
              <View style={styles.checkIcon}>
                <CheckSvg size={12} color="#0F172A" strokeWidth={2.5} />
              </View>
              <Text variant="caption" color={colors.textPrimary} style={styles.manifestText}>
                {factsCount} Saved Exegesis Insights & Words of the Day
              </Text>
            </View>

            <View style={styles.manifestDivider} />

            <View style={styles.manifestRow}>
              <View style={styles.checkIcon}>
                <CheckSvg size={12} color="#0F172A" strokeWidth={2.5} />
              </View>
              <Text variant="caption" color={colors.textPrimary} style={styles.manifestText}>
                {highlightsCount} Bible Verses with Highlights & Notes
              </Text>
            </View>

            <View style={styles.manifestDivider} />

            <View style={styles.manifestRow}>
              <View style={styles.checkIcon}>
                <CheckSvg size={12} color="#0F172A" strokeWidth={2.5} />
              </View>
              <Text variant="caption" color={colors.textPrimary} style={styles.manifestText}>
                {streak || 1} Day Study Streak & Milestone Achievements
              </Text>
            </View>
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
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: 48,
  },
  logoRow: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  logoContainer: {
    width: 68,
    height: 68,
    borderRadius: 18,
    backgroundColor: colors.surface, // 30% Panel #FFFFFF
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  introHeader: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  mainTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 4,
  },
  leadParagraph: {
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    color: colors.textSecondary,
  },
  bodySection: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
    paddingBottom: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    fontSize: 10,
    letterSpacing: 0.6,
    marginBottom: spacing.sm,
  },
  formatCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  cardTitleBox: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
  },
  cardSubtitle: {
    fontSize: 11,
    marginTop: 2,
  },
  cardBody: {
    fontSize: 12.5,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  exportBtn: {
    backgroundColor: '#0F172A',
    paddingVertical: 11,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exportBtnText: {
    fontSize: 12,
  },
  secondaryExportBtn: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.16)',
    paddingVertical: 11,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryExportBtnText: {
    fontSize: 12,
  },
  manifestCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  manifestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  checkIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  manifestText: {
    fontSize: 12,
    flex: 1,
  },
  manifestDivider: {
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.04)',
  },
});
