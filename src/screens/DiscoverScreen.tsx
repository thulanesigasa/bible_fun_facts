import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import { Card } from '../components/Card';
import { facts, Fact } from '../data/mockDatabase';
import { useUser } from '../context/UserContext';
import {
  DiscoverSvg,
  FlameSvg,
  FavoritesSvg,
  LandmarkSvg,
  StrongsIconSvg,
  ChevronRightSvg,
  BookOpenSvg,
  ShareSvg,
  RefreshSvg,
} from '../components/SvgIcons';

interface DiscoverScreenProps {
  navigation: any;
}

export default function DiscoverScreen({ navigation }: DiscoverScreenProps) {
  const [factIndex, setFactIndex] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const {
    streak,
    factsViewedCount,
    incrementFactsViewed,
    userProfile,
    toggleFavoriteFact,
    isFactFavorited,
    lastReadBible,
  } = useUser();

  // Curated list of historical and archaeological discoveries
  const discoveryFacts = useMemo(() => {
    return facts.filter((f) => f.category === 'History' || f.category === 'Customs' || f.category === 'Prophecy');
  }, []);

  // Today's Exegetical Root Word (language category)
  const languageFact: Fact = useMemo(() => {
    const langList = facts.filter((f) => f.category === 'Language');
    return langList[factIndex % langList.length] || facts[0];
  }, [factIndex]);

  // Current Featured Discovery (cycle without scrolling)
  const currentFact: Fact = discoveryFacts[factIndex % discoveryFacts.length] || facts[0];

  const handleNextDiscovery = useCallback(() => {
    setFactIndex((prev) => prev + 1);
    incrementFactsViewed();
  }, [incrementFactsViewed]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      handleNextDiscovery();
      setRefreshing(false);
    }, 300);
  }, [handleNextDiscovery]);

  const onShareCurrentFact = async (fact: Fact) => {
    try {
      const message = `"${fact.fact_title}" (${fact.scripture_ref})\n\n"${fact.verse_text}"\n\nContext:\n${fact.historical_context}`;
      await Share.share({ message });
    } catch (error) {
      console.error(error);
    }
  };

  const isFavorited = isFactFavorited(currentFact.id);

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
            colors={[colors.accent]}
          />
        }
      >
        {/* Header Greeting & Compact Streak Pill */}
        <View style={styles.headerRow}>
          <View style={styles.headerTextWrap}>
            <Text variant="h2" style={styles.headerTitle}>
              {userProfile?.name ? `Shalom, ${userProfile.name}` : 'Daily Discovery'}
            </Text>
            <Text variant="caption" color={colors.textSecondary} style={styles.headerSub}>
              Essential biblical insights & archaeological context
            </Text>
          </View>

          <View style={styles.streakPill}>
            <FlameSvg size={14} color={colors.accent} fill={colors.accent} />
            <Text variant="caption" weight="700" color={colors.accent}>
              {streak}d streak
            </Text>
          </View>
        </View>

        {/* 1. Quick Jump: Continue Scripture Card */}
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={() => navigation.navigate('WOTD')}
          style={[styles.continueCard, shadow.sm]}
        >
          <View style={styles.continueLeft}>
            <View style={styles.continueIconWrap}>
              <BookOpenSvg size={18} color={colors.accent} />
            </View>
            <View style={styles.continueTextWrap}>
              <Text variant="caption" color={colors.accent} weight="700">
                Resume Reading
              </Text>
              <Text variant="h3" style={styles.continueTitle}>
                {lastReadBible.book} Chapter {lastReadBible.chapter}
              </Text>
            </View>
          </View>
          <View style={styles.continueActionBtn}>
            <Text variant="caption" weight="700" color="#FFFFFF">
              Open ›
            </Text>
          </View>
        </TouchableOpacity>

        {/* 2. Today's Original Root Word (Strong's Exegesis) */}
        <Card style={styles.rootCard}>
          <View style={styles.cardSectionHeader}>
            <View style={styles.cardHeaderTitleRow}>
              <StrongsIconSvg size={15} color={colors.accent} />
              <Text variant="h3" color={colors.accent} style={styles.sectionHeaderTitle}>
                Original Language Root
              </Text>
            </View>
            <Text variant="caption" color={colors.textTertiary}>
              {languageFact.scripture_ref}
            </Text>
          </View>

          <View style={styles.rootWordRow}>
            <View style={styles.rootWordLeft}>
              <Text variant="h2" color={colors.accent} style={styles.rootWord}>
                {languageFact.strongs_word}
              </Text>
              <Text variant="caption" color={colors.textSecondary}>
                Strong's {languageFact.strongs_number} • <Text variant="caption" weight="600" color={colors.textPrimary}>{languageFact.strongs_transliteration}</Text>
              </Text>
            </View>
          </View>

          <View style={styles.rootDefBox}>
            <Text variant="body" color={colors.textPrimary} style={styles.rootDefText}>
              "{languageFact.strongs_definition}"
            </Text>
          </View>

          <Text variant="body" color={colors.textSecondary} style={styles.rootContextSnippet}>
            {languageFact.historical_context}
          </Text>
        </Card>

        {/* 3. Archaeological & Historical Discovery Card (With In-Place Shuffle) */}
        <Card style={styles.discoveryCard}>
          <View style={styles.cardSectionHeader}>
            <View style={styles.cardHeaderTitleRow}>
              <LandmarkSvg size={15} color={colors.accent} />
              <Text variant="h3" color={colors.accent} style={styles.sectionHeaderTitle}>
                Archaeology & Customs
              </Text>
            </View>
            <Text variant="caption" color={colors.textTertiary}>
              {currentFact.scripture_ref}
            </Text>
          </View>

          <Text variant="h3" style={styles.discoveryTitle}>
            {currentFact.fact_title}
          </Text>

          <View style={styles.discoveryVerseBox}>
            <Text variant="body" style={styles.discoveryVerseText}>
              "{currentFact.verse_text}"
            </Text>
          </View>

          <Text variant="body" color={colors.textSecondary} style={styles.discoveryContext}>
            {currentFact.historical_context}
          </Text>

          {/* Interactive Card Action Bar: Next Discovery + Save + Share */}
          <View style={styles.cardActionsBar}>
            <TouchableOpacity
              style={styles.nextDiscoveryBtn}
              onPress={handleNextDiscovery}
              activeOpacity={0.8}
            >
              <RefreshSvg size={14} color={colors.accent} />
              <Text variant="caption" weight="700" color={colors.accent}>
                Next Discovery ›
              </Text>
            </TouchableOpacity>

            <View style={styles.actionIconsRight}>
              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => toggleFavoriteFact(currentFact)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <FavoritesSvg
                  size={18}
                  color={colors.accent}
                  fill={isFavorited ? colors.accent : 'none'}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconBtn}
                onPress={() => onShareCurrentFact(currentFact)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <ShareSvg size={18} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 96,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  headerTextWrap: {
    flex: 1,
    marginRight: 10,
  },
  headerTitle: {
    color: colors.textPrimary,
  },
  headerSub: {
    marginTop: 2,
  },
  streakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: colors.accentSoft,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: 'rgba(217, 119, 6, 0.2)',
  },

  // Continue Reading Card
  continueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: colors.accent,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
    marginBottom: spacing.md,
  },
  continueLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  continueIconWrap: {
    width: 34,
    height: 34,
    borderRadius: radius.sm,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueTextWrap: {
    flex: 1,
  },
  continueTag: {
    letterSpacing: 0.8,
    fontSize: 10,
  },
  continueTitle: {
    fontSize: 15,
    marginTop: 1,
  },
  continueActionBtn: {
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.full,
  },

  // Root Word Card
  rootCard: {
    backgroundColor: '#FFFFFF',
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  cardSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionHeaderTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  rootWordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  rootWordLeft: {
    gap: 1,
  },
  rootWord: {
    fontSize: 20,
    fontWeight: '800',
  },
  rootDefBox: {
    backgroundColor: 'rgba(15, 23, 42, 0.02)',
    borderRadius: radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 6,
    borderLeftWidth: 2,
    borderLeftColor: colors.accent,
  },
  rootDefText: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  rootContextSnippet: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },

  // Discovery Card
  discoveryCard: {
    backgroundColor: '#FFFFFF',
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  discoveryTitle: {
    fontSize: 16,
    color: colors.textPrimary,
    marginTop: 4,
    marginBottom: 6,
  },
  discoveryVerseBox: {
    backgroundColor: colors.accentSoft,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.sm,
    marginBottom: 8,
  },
  discoveryVerseText: {
    fontStyle: 'italic',
    fontSize: 12,
    color: colors.textPrimary,
  },
  discoveryContext: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  cardActionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.05)',
  },
  nextDiscoveryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.accentSoft,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.full,
  },
  actionIconsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    padding: 2,
  },
});
