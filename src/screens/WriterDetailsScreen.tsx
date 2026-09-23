import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Share,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import { Card } from '../components/Card';
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
            <ShareSvg size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* Writer Identity Header */}
        <View style={styles.identityHeader}>
          <View style={styles.categoryPillRow}>
            <View style={styles.badgePill}>
              <Text variant="caption" weight="700" color={colors.accent}>
                {writer.testament.toUpperCase()}
              </Text>
            </View>
            <View style={styles.secondaryPill}>
              <Text variant="caption" weight="600" color={colors.textSecondary}>
                {writer.category}
              </Text>
            </View>
          </View>

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

        {/* Calling & Role Card */}
        <Card style={styles.roleCard}>
          <View style={styles.roleHeaderRow}>
            <FeatherPenSvg size={16} color={colors.accent} />
            <Text variant="h3" color={colors.accent} style={styles.sectionTitle}>
              Sacred Role & Calling
            </Text>
          </View>
          <Text variant="body" weight="600" color={colors.textPrimary} style={styles.roleText}>
            {writer.role}
          </Text>
        </Card>

        {/* Canonical Books Penned */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeaderRow}>
            <BookOpenSvg size={16} color={colors.accent} />
            <Text variant="h3" style={styles.sectionTitle}>
              Canonical Books Penned ({writer.booksWritten.length})
            </Text>
          </View>
          <View style={styles.booksWrap}>
            {writer.booksWritten.map((book) => (
              <View key={book} style={styles.bookPill}>
                <Text variant="caption" weight="700" color={colors.textPrimary}>
                  {book}
                </Text>
              </View>
            ))}
          </View>
          <Text variant="caption" color={colors.textTertiary} style={styles.totalChaptersNote}>
            Total canonical output: {writer.totalChapters} chapters
          </Text>
        </View>

        {/* Key Scripture Quote Card */}
        <Card style={styles.quoteCard}>
          <Text variant="caption" weight="700" color={colors.accent} style={styles.quoteCardBadge}>
            KEY SCRIPTURE
          </Text>
          <Text variant="body" style={styles.quoteText}>
            "{writer.keyVerse.text}"
          </Text>
          <Text variant="label" align="right" color={colors.textSecondary} style={styles.quoteRef}>
            — {writer.keyVerse.reference}
          </Text>
        </Card>

        {/* Biography & Historical Context */}
        <Card style={styles.narrativeCard}>
          <View style={styles.sectionHeaderRow}>
            <ScrollSvg size={16} color={colors.accent} />
            <Text variant="h3" style={styles.sectionTitle}>
              Biographical History
            </Text>
          </View>
          <Text variant="body" color={colors.textPrimary} style={styles.bodyParagraph}>
            {writer.biography}
          </Text>
        </Card>

        {/* Historical Setting */}
        <Card style={styles.narrativeCard}>
          <View style={styles.sectionHeaderRow}>
            <LandmarkSvg size={16} color={colors.accent} />
            <Text variant="h3" style={styles.sectionTitle}>
              Historical & Geo-Political Setting
            </Text>
          </View>
          <Text variant="body" color={colors.textSecondary} style={styles.bodyParagraph}>
            {writer.historicalSetting}
          </Text>
        </Card>

        {/* Major Theological Themes */}
        <Card style={styles.narrativeCard}>
          <Text variant="h3" style={[styles.sectionTitle, { marginBottom: spacing.sm }]}>
            Core Theological Themes
          </Text>
          {writer.theologicalThemes.map((theme, index) => (
            <View key={index} style={styles.themeRow}>
              <View style={styles.bulletDot} />
              <Text variant="body" color={colors.textPrimary} style={styles.themeText}>
                {theme}
              </Text>
            </View>
          ))}
        </Card>

        {/* Manuscript Scholarship */}
        <Card style={styles.scholarCard}>
          <Text variant="caption" weight="700" color={colors.accent} style={styles.scholarBadge}>
            MANUSCRIPT EVIDENCE
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.scholarText}>
            {writer.manuscriptEvidence}
          </Text>
        </Card>

        {/* Archaeological Corroboration */}
        <Card style={styles.scholarCard}>
          <Text variant="caption" weight="700" color={colors.accent} style={styles.scholarBadge}>
            ARCHAEOLOGICAL DISCOVERIES
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.scholarText}>
            {writer.archaeologicalFinds}
          </Text>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 48,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
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
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  identityHeader: {
    marginBottom: spacing.md,
  },
  categoryPillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  badgePill: {
    backgroundColor: colors.accentSoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'rgba(253, 210, 35, 0.25)',
  },
  secondaryPill: {
    backgroundColor: 'rgba(15, 23, 42, 0.04)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
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

  // Role Card
  roleCard: {
    backgroundColor: '#FFFFFF',
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  roleHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  roleText: {
    fontSize: 15,
    lineHeight: 22,
  },

  // Books Penned
  sectionWrap: {
    marginBottom: spacing.md,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  booksWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  bookPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  totalChaptersNote: {
    marginTop: 6,
    fontSize: 12,
  },

  // Key Scripture Card
  quoteCard: {
    backgroundColor: colors.accentSoft,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  quoteCardBadge: {
    letterSpacing: 0.8,
    fontSize: 10,
    marginBottom: 6,
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

  // Narrative Cards
  narrativeCard: {
    backgroundColor: '#FFFFFF',
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  bodyParagraph: {
    fontSize: 14,
    lineHeight: 22,
    marginTop: 6,
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

  // Scholar Cards
  scholarCard: {
    backgroundColor: '#FFFFFF',
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  scholarBadge: {
    letterSpacing: 0.8,
    fontSize: 10,
    marginBottom: 6,
  },
  scholarText: {
    fontSize: 13,
    lineHeight: 20,
  },
});
