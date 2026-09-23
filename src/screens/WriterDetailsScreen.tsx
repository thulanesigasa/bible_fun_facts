import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Share,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme';
import { Text } from '../components/Typography';
import { BiblicalWriter } from '../data/biblicalWriters';
import {
  ScrollSvg,
  FeatherPenSvg,
  LandmarkSvg,
  BookOpenSvg,
  ShareSvg,
} from '../components/SvgIcons';

interface WriterDetailsScreenProps {
  navigation: any;
  route: { params: { writer: BiblicalWriter } };
}

export default function WriterDetailsScreen({ navigation, route }: WriterDetailsScreenProps) {
  const { writer } = route.params;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${writer.name} (${writer.transliteration})\n${writer.role}\nEra: ${writer.era}\nBooks: ${writer.booksWritten.join(', ')}\n\nKey Verse: "${writer.keyVerse.text}" — ${writer.keyVerse.reference}\n\nShared from exégeomai Biblical History`,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      {/* Sheet Drag Handle */}
      <View style={styles.dragHandle} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Navigation Bar */}
        <View style={styles.topHeader}>
          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Close writer details"
          >
            <Text variant="h3" style={styles.doneBtnText}>Done</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconBtn}
            onPress={handleShare}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Share writer biography"
          >
            <ShareSvg size={18} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Writer Identity Header */}
        <View style={styles.identityHeader}>
          <Text variant="caption" weight="700" color={colors.accent} style={{ letterSpacing: 0.5, marginBottom: 4 }}>
            {writer.testament.toUpperCase()} • {writer.category.toUpperCase()}
          </Text>

          <View style={styles.nameRow}>
            <Text variant="h1" style={styles.writerName}>
              {writer.name}
            </Text>
            <Text variant="h2" style={styles.originalScript}>
              {writer.originalName}
            </Text>
          </View>

          <Text variant="caption" color={colors.accent} weight="700" style={styles.transliteration}>
            {writer.transliteration}
          </Text>

          <Text variant="caption" color={colors.textTertiary} style={styles.eraText}>
            {writer.era}
          </Text>
        </View>

        <View style={styles.hairlineDivider} />

        {/* 1. Calling & Role Section (Continuous Body) */}
        <View style={styles.bodySection}>
          <View style={styles.sectionHeaderRow}>
            <FeatherPenSvg size={15} color={colors.accent} />
            <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionTitle}>
              SACRED ROLE & CALLING
            </Text>
          </View>
          <Text variant="body" weight="600" color={colors.textPrimary} style={styles.roleText}>
            {writer.role}
          </Text>
        </View>

        <View style={styles.hairlineDivider} />

        {/* 2. Canonical Books Penned */}
        <View style={styles.bodySection}>
          <View style={styles.sectionHeaderRow}>
            <BookOpenSvg size={15} color={colors.accent} />
            <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionTitle}>
              CANONICAL BOOKS PENNED ({writer.booksWritten.length})
            </Text>
          </View>
          <Text variant="body" color={colors.textPrimary} style={{ marginTop: 4, fontSize: 14, lineHeight: 22 }}>
            {writer.booksWritten.join(' • ')}
          </Text>
          <Text variant="caption" color={colors.textTertiary} style={styles.totalChaptersNote}>
            Total canonical output: {writer.totalChapters} chapters
          </Text>
        </View>

        <View style={styles.hairlineDivider} />

        {/* 3. Key Scripture Quote (Sacred Quote Block) */}
        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeadingLabel}>
            KEY SCRIPTURE
          </Text>
          <View style={styles.quoteBox}>
            <Text variant="body" style={styles.quoteText}>
              "{writer.keyVerse.text}"
            </Text>
            <Text variant="label" align="right" color={colors.textSecondary} style={styles.quoteRef}>
              — {writer.keyVerse.reference}
            </Text>
          </View>
        </View>

        <View style={styles.hairlineDivider} />

        {/* 4. Biography & Historical Context */}
        <View style={styles.bodySection}>
          <View style={styles.sectionHeaderRow}>
            <ScrollSvg size={15} color={colors.accent} />
            <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionTitle}>
              BIOGRAPHICAL HISTORY
            </Text>
          </View>
          <Text variant="body" color={colors.textPrimary} style={styles.bodyParagraph}>
            {writer.biography}
          </Text>
        </View>

        <View style={styles.hairlineDivider} />

        {/* 5. Historical Setting */}
        <View style={styles.bodySection}>
          <View style={styles.sectionHeaderRow}>
            <LandmarkSvg size={15} color={colors.accent} />
            <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionTitle}>
              HISTORICAL & GEO-POLITICAL SETTING
            </Text>
          </View>
          <Text variant="body" color={colors.textSecondary} style={styles.bodyParagraph}>
            {writer.historicalSetting}
          </Text>
        </View>

        <View style={styles.hairlineDivider} />

        {/* 6. Major Theological Themes */}
        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={[styles.sectionTitle, { marginBottom: spacing.sm }]}>
            CORE THEOLOGICAL THEMES
          </Text>
          {writer.theologicalThemes.map((theme, index) => (
            <View key={index} style={styles.themeRow}>
              <View style={styles.bulletDot} />
              <Text variant="body" color={colors.textPrimary} style={styles.themeText}>
                {theme}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.hairlineDivider} />

        {/* 7. Manuscript Scholarship */}
        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionEvidenceLabel}>
            MANUSCRIPT EVIDENCE
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.scholarText}>
            {writer.manuscriptEvidence}
          </Text>
        </View>

        <View style={styles.hairlineDivider} />

        {/* 8. Archaeological Corroboration */}
        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionEvidenceLabel}>
            ARCHAEOLOGICAL DISCOVERIES
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.scholarText}>
            {writer.archaeologicalFinds}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  dragHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 6,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 48,
    backgroundColor: '#FFFFFF',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    marginBottom: 4,
  },
  doneBtn: {
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  doneBtnText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '700',
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  identityHeader: {
    paddingVertical: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  writerName: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  originalScript: {
    fontSize: 22,
    color: colors.accent,
    fontWeight: '700',
  },
  transliteration: {
    fontSize: 14,
    marginTop: 2,
  },
  eraText: {
    fontSize: 12,
    marginTop: 4,
  },

  // Subtle Hairline Divider (like Settings / ProfileScreen)
  hairlineDivider: {
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
    marginVertical: spacing.md,
  },

  // Continuous Body Section
  bodySection: {
    paddingVertical: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  sectionTitle: {
    letterSpacing: 0.5,
  },
  roleText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textPrimary,
  },

  totalChaptersNote: {
    marginTop: 8,
    fontSize: 12,
  },

  // Key Scripture Quote Box
  sectionHeadingLabel: {
    letterSpacing: 0.8,
    fontSize: 10,
    marginBottom: 8,
  },
  quoteBox: {
    backgroundColor: 'rgba(253, 210, 35, 0.08)',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: radius.sm,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  quoteText: {
    fontStyle: 'italic',
    fontSize: 14,
    lineHeight: 22,
    color: colors.textPrimary,
  },
  quoteRef: {
    marginTop: 8,
    fontWeight: '700',
  },

  // Narrative Body Paragraphs
  bodyParagraph: {
    fontSize: 14,
    lineHeight: 22,
    marginTop: 4,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 6,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
    marginTop: 8,
  },
  themeText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },

  // Section Evidence Headings
  sectionEvidenceLabel: {
    letterSpacing: 0.8,
    fontSize: 10,
    marginBottom: 6,
  },
  scholarText: {
    fontSize: 13,
    lineHeight: 21,
  },
});
