import React, { useState, useLayoutEffect, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import {
  LexiconEntry,
  getAdjacentLexiconEntries,
  getLexiconEntryByStrongs,
} from '../data/lexiconData';
import { getEffectivePronunciation } from '../services/greekPronunciationService';
import { Text } from '../components/Typography';
import { colors, spacing } from '../theme';

type StrongsDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'StrongsDetail'>;

export default function StrongsDetailScreen({
  route,
  navigation,
}: StrongsDetailScreenProps) {
  const initialEntry = route.params.entry;
  const [currentEntry, setCurrentEntry] = useState<LexiconEntry>(initialEntry);

  // Stepper: get previous and next entries
  const { prev: prevEntry, next: nextEntry } = useMemo(() => {
    return getAdjacentLexiconEntries(currentEntry.strongsNumber);
  }, [currentEntry.strongsNumber]);

  // Authentic phonetic pronunciation resolution
  const effectivePronunciation = useMemo(() => {
    return getEffectivePronunciation(currentEntry);
  }, [currentEntry]);

  // Set screen title dynamically in native header (Unified Dictionary title)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Strong's: ${currentEntry.strongsNumber}. ${currentEntry.originalScript} (${currentEntry.transliteration})`,
      headerRight: () => (
        <TouchableOpacity
          onPress={handleShare}
          style={styles.headerShareBtn}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Share Strong's study"
        >
          <Text variant="caption" weight="800" color="#B45309" style={styles.headerShareText}>
            Share
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, currentEntry, effectivePronunciation]);

  const handleShare = async () => {
    try {
      const title = `Strong's ${currentEntry.strongsNumber}: ${currentEntry.transliteration} (${currentEntry.originalScript})`;
      const message =
        `${title}\n` +
        `English: ${currentEntry.englishWord || currentEntry.transliteration}\n` +
        `Definition: ${currentEntry.shortDefinition}\n\n` +
        `Part of Speech: ${currentEntry.partOfSpeech}\n` +
        `Pronunciation: /${effectivePronunciation}/ ${currentEntry.phoneticSpelling || ''}\n` +
        (currentEntry.kjvTranslations ? `KJV Translations: ${currentEntry.kjvTranslations}\n` : '') +
        (currentEntry.nasbTranslations ? `NASB Translations: ${currentEntry.nasbTranslations}\n` : '') +
        `\nExhaustive Concordance:\n${currentEntry.exhaustiveDefinition}\n\n` +
        `Theological Exegesis:\n${currentEntry.theologicalSignificance}\n\n` +
        `Scripture: "${currentEntry.keyScripture.snippet}" — ${currentEntry.keyScripture.reference}\n\n` +
        `Studied in exégeomai (ἐξηγέομαι) — Complete Biblical Lexicon`;

      await Share.share({
        message,
        title,
      });
    } catch {
      // User cancelled
    }
  };

  const handleOpenScripture = () => {
    if (currentEntry.keyScripture?.book && currentEntry.keyScripture?.chapter) {
      (navigation as any).navigate('WOTD', {
        book: currentEntry.keyScripture.book,
        chapter: currentEntry.keyScripture.chapter,
        verse: currentEntry.keyScripture.verse || 1,
      });
    }
  };

  const handleSelectRelated = (strongsNum: string) => {
    const entry = getLexiconEntryByStrongs(strongsNum);
    if (entry) {
      setCurrentEntry(entry);
    }
  };

  // Generate clean usage outline items if not explicitly provided
  const usageItems = useMemo(() => {
    if (currentEntry.outlineOfBiblicalUsage && currentEntry.outlineOfBiblicalUsage.length > 0) {
      return currentEntry.outlineOfBiblicalUsage;
    }
    // Synthesize from short and exhaustive definitions
    const parts = currentEntry.exhaustiveDefinition
      .split(/(?:;|\.)\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 5);

    if (parts.length > 1) {
      return parts.slice(0, 3).map((p, idx) => `${idx + 1}. ${p}`);
    }
    return [
      `1. ${currentEntry.shortDefinition}`,
      `2. of literal or figurative biblical usage across canon`,
    ];
  }, [currentEntry]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Scripture Navigation Bar (Clean Editorial Text) */}
        <View style={styles.scriptureBar}>
          <View style={styles.scriptureBarLeft}>
            <Text variant="caption" weight="800" color="#0F172A">
              {currentEntry.keyScripture.reference}
            </Text>
            <Text variant="caption" color={colors.textTertiary}>
              {' • Bible Canon'}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.textLinkBtn}
            onPress={handleOpenScripture}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={`Open ${currentEntry.keyScripture.reference} in Word Reader`}
          >
            <Text variant="caption" weight="800" color="#B45309">
              Open in Reader ›
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stepper Bar: ‹ 2198. zaó › (Clean Text Navigation) */}
        <View style={styles.stepperContainer}>
          {prevEntry ? (
            <TouchableOpacity
              style={styles.stepperNavTextBtn}
              onPress={() => setCurrentEntry(prevEntry)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={`Previous Strong's: ${prevEntry.strongsNumber} ${prevEntry.transliteration}`}
            >
              <Text variant="caption" weight="800" color="#B45309" style={styles.stepperBtnText}>
                {`‹ ${prevEntry.strongsNumber.replace(/^[HG]/, '')}`}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.stepperNavDisabled} />
          )}

          <View style={styles.stepperCenter}>
            <Text variant="h3" weight="800" color="#0F172A" style={styles.stepperCenterText}>
              {`${currentEntry.strongsNumber.replace(/^[HG]/, '')}. ${currentEntry.transliteration}`}
            </Text>
          </View>

          {nextEntry ? (
            <TouchableOpacity
              style={styles.stepperNavTextBtn}
              onPress={() => setCurrentEntry(nextEntry)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel={`Next Strong's: ${nextEntry.strongsNumber} ${nextEntry.transliteration}`}
            >
              <Text variant="caption" weight="800" color="#B45309" style={styles.stepperBtnText}>
                {`${nextEntry.strongsNumber.replace(/^[HG]/, '')} ›`}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.stepperNavDisabled} />
          )}
        </View>

        {/* Section 1: Lexical Summary (Yellow Banner) */}
        <View style={styles.sectionHeaderBanner}>
          <Text variant="caption" weight="800" style={styles.sectionBannerText}>
            Lexical Summary
          </Text>
        </View>

        <View style={styles.sectionBody}>
          <Text variant="h2" weight="800" color="#0F172A" style={styles.headwordText}>
            {`${currentEntry.transliteration}: ${currentEntry.shortDefinition}`}
          </Text>

          {/* Key-Value Linguistic Properties */}
          <View style={styles.fieldGrid}>
            <View style={styles.fieldRow}>
              <Text variant="body" weight="700" style={styles.fieldLabel}>
                Original Word:
              </Text>
              <Text style={styles.originalWordValue}>{currentEntry.originalScript}</Text>
            </View>

            <View style={styles.fieldRow}>
              <Text variant="body" weight="700" style={styles.fieldLabel}>
                Part of Speech:
              </Text>
              <Text variant="body" weight="600" color="#0F172A" style={styles.fieldValue}>
                {currentEntry.partOfSpeech}
              </Text>
            </View>

            <View style={styles.fieldRow}>
              <Text variant="body" weight="700" style={styles.fieldLabel}>
                Transliteration:
              </Text>
              <Text variant="body" weight="700" color="#0F172A" style={styles.fieldValue}>
                {currentEntry.transliteration}
              </Text>
            </View>

            {effectivePronunciation ? (
              <View style={styles.fieldRow}>
                <Text variant="body" weight="700" style={styles.fieldLabel}>
                  Pronunciation:
                </Text>
                <Text variant="body" weight="600" color="#0F172A" style={styles.fieldValue}>
                  {effectivePronunciation}
                </Text>
              </View>
            ) : null}

            {currentEntry.phoneticSpelling ? (
              <View style={styles.fieldRow}>
                <Text variant="body" weight="700" style={styles.fieldLabel}>
                  Phonetic Spelling:
                </Text>
                <Text variant="body" weight="600" color="#0F172A" style={styles.fieldValue}>
                  {currentEntry.phoneticSpelling}
                </Text>
              </View>
            ) : null}

            {currentEntry.kjvTranslations ? (
              <View style={styles.fieldRow}>
                <Text variant="body" weight="700" style={styles.fieldLabel}>
                  KJV:
                </Text>
                <Text variant="body" weight="600" color="#0F172A" style={styles.fieldValue}>
                  {currentEntry.kjvTranslations}
                </Text>
              </View>
            ) : null}

            {currentEntry.nasbTranslations ? (
              <View style={styles.fieldRow}>
                <Text variant="body" weight="700" style={styles.fieldLabel}>
                  NASB:
                </Text>
                <Text variant="body" weight="600" color="#0F172A" style={styles.fieldValue}>
                  {currentEntry.nasbTranslations}
                </Text>
              </View>
            ) : null}

            {currentEntry.rootOrigin ? (
              <View style={styles.fieldRow}>
                <Text variant="body" weight="700" style={styles.fieldLabel}>
                  Word Origin:
                </Text>
                <Text variant="body" weight="600" color="#0F172A" style={styles.fieldValue}>
                  {`[${currentEntry.rootOrigin}]`}
                </Text>
              </View>
            ) : null}
          </View>

          {/* Outline of Usage */}
          <View style={styles.usageContainer}>
            {usageItems.map((item, idx) => (
              <Text key={idx} style={styles.usageItemText}>
                {item}
              </Text>
            ))}
          </View>
        </View>

        {/* Section 2: Strong's Exhaustive Concordance */}
        <View style={styles.sectionHeaderBanner}>
          <Text variant="caption" weight="800" style={styles.sectionBannerText}>
            Strong's Exhaustive Concordance
          </Text>
        </View>

        <View style={styles.sectionBody}>
          <Text variant="body" weight="700" color="#0F172A" style={styles.concordanceSummaryText}>
            {currentEntry.shortDefinition}
          </Text>
          <Text style={styles.concordanceFullText}>
            {currentEntry.exhaustiveDefinition}
          </Text>
        </View>

        {/* Section 3: HELPS Word-studies */}
        <View style={styles.sectionHeaderBanner}>
          <Text variant="caption" weight="800" style={styles.sectionBannerText}>
            HELPS Word-studies & Exegesis
          </Text>
        </View>

        <View style={styles.sectionBody}>
          <Text style={styles.helpsWordText}>
            {currentEntry.helpsWordStudies ? (
              currentEntry.helpsWordStudies
            ) : (
              <Text>
                <Text weight="800">
                  {`Cognate: ${currentEntry.strongsNumber.replace(/^[HG]/, '')} ${currentEntry.transliteration} — `}
                </Text>
                {currentEntry.theologicalSignificance}
              </Text>
            )}
          </Text>

          {/* Clickable Related Strong's Cognates (Pure Text Links) */}
          {currentEntry.relatedStrongs && currentEntry.relatedStrongs.length > 0 && (
            <View style={styles.cognatesContainer}>
              <Text variant="caption" weight="800" color="#854D0E" style={styles.cognateHeading}>
                CROSS-REFERENCE COGNATES:
              </Text>
              <View style={styles.cognateLinksRow}>
                {currentEntry.relatedStrongs.map((relStrongs) => {
                  const relEntry = getLexiconEntryByStrongs(relStrongs);
                  const label = relEntry
                    ? `See ${relStrongs.replace(/^[HG]/, '')} (${relEntry.transliteration}) ›`
                    : `See ${relStrongs} ›`;

                  return (
                    <TouchableOpacity
                      key={relStrongs}
                      style={styles.cognateTextBtn}
                      onPress={() => handleSelectRelated(relStrongs)}
                      activeOpacity={0.7}
                      accessibilityRole="button"
                      accessibilityLabel={`Jump to Strong's ${relStrongs}`}
                    >
                      <Text variant="caption" weight="800" color="#B45309" style={styles.cognateLinkText}>
                        {label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
        </View>

        {/* Section 4: Key Scripture Exegesis Context */}
        <View style={styles.sectionHeaderBanner}>
          <Text variant="caption" weight="800" style={styles.sectionBannerText}>
            Key Canonical Scripture
          </Text>
        </View>

        <View style={styles.sectionBody}>
          <Text style={styles.scriptureQuoteText}>
            "{currentEntry.keyScripture.snippet}"
          </Text>

          <TouchableOpacity
            style={styles.scriptureJumpRow}
            onPress={handleOpenScripture}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={`Open ${currentEntry.keyScripture.reference} in Word Reader`}
          >
            <Text variant="caption" weight="800" color="#B45309" style={styles.scriptureJumpText}>
              {`${currentEntry.keyScripture.reference} • Read Full Chapter in Canon ›`}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingBottom: 64,
  },
  headerShareBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 4,
  },
  headerShareText: {
    fontSize: 13,
  },

  // Quick Scripture & Version Bar (Clean Editorial Text)
  scriptureBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  scriptureBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  textLinkBtn: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },

  // Stepper Bar: ‹ 2198. zaó › (Clean Text Navigation)
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  stepperNavTextBtn: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  stepperBtnText: {
    fontSize: 14,
  },
  stepperNavDisabled: {
    width: 48,
  },
  stepperCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperCenterText: {
    fontSize: 17,
  },

  // Section Header Banner (Signature Yellow Banner per user request)
  sectionHeaderBanner: {
    backgroundColor: '#FEF9C3',
    paddingVertical: 7,
    paddingHorizontal: spacing.lg,
    marginTop: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  sectionBannerText: {
    fontSize: 12.5,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: '#78350F',
    fontWeight: '800',
  },

  // Section Body
  sectionBody: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.04)',
  },
  headwordText: {
    fontSize: 16.5,
    marginBottom: 14,
    lineHeight: 22,
  },

  // Key-Value Grid
  fieldGrid: {
    gap: 9,
    marginBottom: 14,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
  },
  fieldLabel: {
    width: 145,
    fontSize: 14,
    color: '#B45309',
    fontWeight: '700',
  },
  fieldValue: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  originalWordValue: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 32,
  },

  // Outline of Usage
  usageContainer: {
    marginTop: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.05)',
    gap: 6,
  },
  usageItemText: {
    fontSize: 14.5,
    lineHeight: 22,
    color: '#0F172A',
  },

  // Exhaustive Concordance
  concordanceSummaryText: {
    fontSize: 14.5,
    lineHeight: 21,
    marginBottom: 8,
  },
  concordanceFullText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#334155',
  },

  // HELPS Word Studies
  helpsWordText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#1E293B',
  },
  cognatesContainer: {
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.05)',
  },
  cognateHeading: {
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  cognateLinksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  cognateTextBtn: {
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  cognateLinkText: {
    fontSize: 13,
  },

  // Key Scripture Exegesis Context
  scriptureQuoteText: {
    fontSize: 14.5,
    fontStyle: 'italic',
    lineHeight: 22,
    color: '#1E293B',
    marginBottom: 8,
  },
  scriptureJumpRow: {
    paddingVertical: 6,
    paddingHorizontal: 2,
  },
  scriptureJumpText: {
    fontSize: 13,
  },
});
