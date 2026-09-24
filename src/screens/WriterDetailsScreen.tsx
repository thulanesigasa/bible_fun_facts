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
import { useUser } from '../context/UserContext';
import { BiblicalWriter } from '../data/biblicalWriters';
import {
  ScrollSvg,
  FeatherPenSvg,
  LandmarkSvg,
  BookOpenSvg,
  ShareSvg,
  LightbulbSvg,
  ChristianCrossSvg,
  QuoteSvg,
  UsersSvg,
  StrongsIconSvg,
  MilestoneClockSvg,
} from '../components/SvgIcons';

interface WriterDetailsScreenProps {
  navigation: any;
  route: { params: { writer: BiblicalWriter } };
}

export default function WriterDetailsScreen({ navigation, route }: WriterDetailsScreenProps) {
  const { writer } = route.params;
  const { incrementSharesCount } = useUser();

  const handleShare = async () => {
    try {
      const res = await Share.share({
        message: `${writer.name} (${writer.transliteration})\n${writer.role}\nEra: ${writer.era}\nBooks: ${writer.booksWritten.join(', ')}\n\nKey Verse: "${writer.keyVerse.text}" — ${writer.keyVerse.reference}\n\nShared from exégeomai Biblical History`,
      });
      if (res.action === Share.sharedAction) {
        incrementSharesCount();
      }
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

        {/* 1. Strong's Concordance Linguistic Profile */}
        {writer.linguisticProfile && (
          <>
            <View style={styles.hairlineDivider} />
            <View style={styles.bodySection}>
              <View style={styles.sectionHeaderRow}>
                <StrongsIconSvg size={15} color={colors.accent} />
                <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionTitle}>
                  STRONG'S LINGUISTIC PROFILE
                </Text>
              </View>
              <View style={styles.linguisticCard}>
                <View style={styles.linguisticTopRow}>
                  <View style={styles.linguisticCol}>
                    <Text variant="caption" color={colors.textTertiary} weight="700">ROOT WORD & SCRIPT</Text>
                    <Text variant="h2" color={colors.accent} weight="800" style={{ marginTop: 2 }}>
                      {writer.linguisticProfile.rootWord}
                    </Text>
                    <Text variant="caption" color={colors.textSecondary} style={{ marginTop: 2, fontSize: 13 }}>
                      {writer.linguisticProfile.originalScript}
                    </Text>
                  </View>
                  <View style={styles.linguisticColRight}>
                    <Text variant="caption" color={colors.textTertiary} weight="700">STRONG'S NUMBER</Text>
                    <View style={styles.strongsPill}>
                      <Text variant="label" weight="800" color={colors.textPrimary}>
                        {writer.linguisticProfile.strongsRef}
                      </Text>
                    </View>
                    <Text variant="caption" color={colors.textTertiary} style={{ marginTop: 4 }}>
                      {writer.testament === 'Old Testament' ? 'Biblical Hebrew' : 'Koine Greek'}
                    </Text>
                  </View>
                </View>

                <View style={styles.innerDivider} />

                <View style={{ marginBottom: 10 }}>
                  <Text variant="caption" color={colors.textTertiary} weight="700">LITERAL ROOT MEANING</Text>
                  <Text variant="body" weight="700" color={colors.textPrimary} style={{ marginTop: 2 }}>
                    "{writer.linguisticProfile.literalMeaning}"
                  </Text>
                </View>

                <View>
                  <Text variant="caption" color={colors.textTertiary} weight="700">THEOLOGICAL SIGNIFICANCE</Text>
                  <Text variant="body" color={colors.textSecondary} style={styles.scholarText}>
                    {writer.linguisticProfile.theologicalSignificance}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}

        <View style={styles.hairlineDivider} />

        {/* 2. Calling & Sacred Role */}
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

        {/* 3. Chronological Life Milestones Timeline */}
        {writer.timeline && writer.timeline.length > 0 && (
          <>
            <View style={styles.hairlineDivider} />
            <View style={styles.bodySection}>
              <View style={styles.sectionHeaderRow}>
                <MilestoneClockSvg size={15} color={colors.accent} />
                <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionTitle}>
                  CHRONOLOGICAL LIFE MILESTONES
                </Text>
              </View>
              <View style={styles.timelineContainer}>
                {writer.timeline.map((milestone, idx) => {
                  const isLast = idx === writer.timeline!.length - 1;
                  return (
                    <View key={idx} style={styles.timelineItem}>
                      <View style={styles.timelineLeftTrack}>
                        <View style={styles.timelineDot} />
                        {!isLast && <View style={styles.timelineLine} />}
                      </View>
                      <View style={[styles.timelineContent, isLast && { paddingBottom: 0 }]}>
                        <View style={styles.timelinePeriodRow}>
                          <Text variant="caption" weight="800" color={colors.accent}>
                            {milestone.period}
                          </Text>
                          {milestone.scriptureRef && (
                            <Text variant="caption" weight="700" color={colors.textTertiary}>
                              {milestone.scriptureRef}
                            </Text>
                          )}
                        </View>
                        <Text variant="body" weight="700" color={colors.textPrimary} style={{ marginTop: 2 }}>
                          {milestone.title}
                        </Text>
                        <Text variant="body" color={colors.textSecondary} style={styles.bodyParagraph}>
                          {milestone.description}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </>
        )}

        <View style={styles.hairlineDivider} />

        {/* 4. Canonical Books Penned */}
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

        {/* 5. Key Scripture Quote (Sacred Quote Box) */}
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

        {/* 6. Biography & Historical Context */}
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

        {/* 7. Historical & Geopolitical Setting */}
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

        {/* 8. Contemporary Monarchs, Prophets & Companions */}
        {writer.contemporaries && writer.contemporaries.length > 0 && (
          <>
            <View style={styles.hairlineDivider} />
            <View style={styles.bodySection}>
              <View style={styles.sectionHeaderRow}>
                <UsersSvg size={15} color={colors.accent} />
                <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionTitle}>
                  HISTORICAL CONTEMPORARIES & COMPANIONS ({writer.contemporaries.length})
                </Text>
              </View>
              <View style={styles.contemporariesGrid}>
                {writer.contemporaries.map((c, idx) => (
                  <View key={idx} style={styles.contemporaryCard}>
                    <View style={styles.contemporaryHeader}>
                      <Text variant="body" weight="800" color={colors.textPrimary}>
                        {c.name}
                      </Text>
                      <View style={styles.roleTag}>
                        <Text variant="caption" weight="700" color={colors.textTertiary} style={{ fontSize: 11 }}>
                          {c.role}
                        </Text>
                      </View>
                    </View>
                    <Text variant="caption" color={colors.textSecondary} style={{ marginTop: 4, lineHeight: 18 }}>
                      {c.relationship}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        {/* 9. Literary Genres & Rhetorical Style */}
        {writer.literaryStyle && (
          <>
            <View style={styles.hairlineDivider} />
            <View style={styles.bodySection}>
              <View style={styles.sectionHeaderRow}>
                <FeatherPenSvg size={15} color={colors.accent} />
                <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionTitle}>
                  LITERARY GENRES & RHETORICAL STYLE
                </Text>
              </View>
              <View style={styles.styleCard}>
                <View style={{ marginBottom: 10 }}>
                  <Text variant="caption" color={colors.textTertiary} weight="700">CANONICAL GENRES</Text>
                  <View style={styles.devicesRow}>
                    {writer.literaryStyle.genres.map((genre, idx) => (
                      <View key={idx} style={styles.deviceChip}>
                        <Text variant="caption" weight="700" color={colors.textPrimary} style={{ fontSize: 11 }}>
                          {genre}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={{ marginBottom: 10 }}>
                  <Text variant="caption" color={colors.textTertiary} weight="700">DISTINCTIVE RHETORICAL TRAITS</Text>
                  <Text variant="body" color={colors.textSecondary} style={styles.scholarText}>
                    {writer.literaryStyle.distinctiveTraits}
                  </Text>
                </View>

                <View>
                  <Text variant="caption" color={colors.textTertiary} weight="700">VOCABULARY FOCUS & REGISTER</Text>
                  <Text variant="body" color={colors.textSecondary} style={styles.scholarText}>
                    {writer.literaryStyle.vocabularyFocus}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}

        <View style={styles.hairlineDivider} />

        {/* 10. Major Theological Themes */}
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

        {/* 11. Christological Foretelling & Fulfillment */}
        {writer.christologicalFulfillment ? (
          <>
            <View style={styles.hairlineDivider} />
            <View style={styles.bodySection}>
              <View style={styles.sectionHeaderRow}>
                <ChristianCrossSvg size={15} color={colors.accent} />
                <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionTitle}>
                  CHRISTOLOGICAL FORETELLING & FULFILLMENT
                </Text>
              </View>
              <View style={styles.christologyCard}>
                <Text variant="body" color={colors.textPrimary} style={styles.bodyParagraph}>
                  {writer.christologicalFulfillment}
                </Text>
              </View>
            </View>
          </>
        ) : null}

        {/* 12. Notable Canonical Sayings */}
        {writer.notableSayings && writer.notableSayings.length > 0 && (
          <>
            <View style={styles.hairlineDivider} />
            <View style={styles.bodySection}>
              <View style={styles.sectionHeaderRow}>
                <QuoteSvg size={15} color={colors.accent} />
                <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionTitle}>
                  NOTABLE CANONICAL SAYINGS ({writer.notableSayings.length})
                </Text>
              </View>
              {writer.notableSayings.map((saying, idx) => (
                <View key={idx} style={[styles.sayingBox, idx > 0 && { marginTop: 10 }]}>
                  <Text variant="body" style={styles.sayingQuote}>
                    "{saying.quote}"
                  </Text>
                  <View style={styles.sayingFooter}>
                    <Text variant="caption" color={colors.textTertiary} style={{ flex: 1, marginRight: 8 }}>
                      {saying.context}
                    </Text>
                    <Text variant="label" weight="800" color={colors.accent}>
                      {saying.reference}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}

        <View style={styles.hairlineDivider} />

        {/* 13. Manuscript Scholarship */}
        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionEvidenceLabel}>
            MANUSCRIPT EVIDENCE
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.scholarText}>
            {writer.manuscriptEvidence}
          </Text>
        </View>

        <View style={styles.hairlineDivider} />

        {/* 14. Archaeological Corroboration */}
        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionEvidenceLabel}>
            ARCHAEOLOGICAL DISCOVERIES
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.scholarText}>
            {writer.archaeologicalFinds}
          </Text>
        </View>

        {/* 15. Fascinating Cultural & Historical Fun Facts */}
        {writer.fascinatingFacts && writer.fascinatingFacts.length > 0 && (
          <>
            <View style={styles.hairlineDivider} />
            <View style={styles.bodySection}>
              <View style={styles.sectionHeaderRow}>
                <LightbulbSvg size={16} color={colors.accent} />
                <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionTitle}>
                  FASCINATING HISTORICAL & CULTURAL FACTS ({writer.fascinatingFacts.length})
                </Text>
              </View>
              {writer.fascinatingFacts.map((fact, idx) => (
                <View key={idx} style={styles.factRow}>
                  <View style={styles.factNumberCircle}>
                    <Text variant="caption" weight="800" color={colors.textPrimary} style={{ fontSize: 10 }}>
                      {idx + 1}
                    </Text>
                  </View>
                  <Text variant="body" color={colors.textPrimary} style={styles.factText}>
                    {fact}
                  </Text>
                </View>
              ))}
            </View>
          </>
        )}
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

  // Strong's Concordance Linguistic Profile Card
  linguisticCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    marginTop: 6,
  },
  linguisticTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  linguisticCol: {
    flex: 1,
  },
  linguisticColRight: {
    alignItems: 'flex-end',
  },
  strongsPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    marginTop: 2,
  },
  innerDivider: {
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
    marginVertical: 10,
  },

  // Chronological Timeline
  timelineContainer: {
    marginTop: 6,
  },
  timelineItem: {
    flexDirection: 'row',
  },
  timelineLeftTrack: {
    alignItems: 'center',
    width: 20,
    marginRight: 10,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent,
    marginTop: 4,
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: 'rgba(15, 23, 42, 0.08)',
    marginVertical: 4,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 16,
  },
  timelinePeriodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },

  // Historical Contemporaries
  contemporariesGrid: {
    marginTop: 6,
    gap: 8,
  },
  contemporaryCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  contemporaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roleTag: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },

  // Literary Style Card
  styleCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
    marginTop: 6,
  },
  devicesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  deviceChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },

  // Christological Card
  christologyCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(217, 119, 6, 0.2)',
    marginTop: 6,
  },
  christologyHeader: {
    marginBottom: 8,
  },
  versePairRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  versePairBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: 'rgba(217, 119, 6, 0.15)',
  },

  // Notable Sayings
  sayingBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  sayingQuote: {
    fontStyle: 'italic',
    fontSize: 13.5,
    lineHeight: 21,
    color: colors.textPrimary,
  },
  sayingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },

  // Fascinating Facts
  factRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  factNumberCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FEF08A',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  factText: {
    flex: 1,
    fontSize: 13.5,
    lineHeight: 21,
  },
});

