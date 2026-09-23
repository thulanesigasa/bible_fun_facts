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
import { Scripture } from '../data/mockDatabase';
import { useUser } from '../context/UserContext';
import {
  LandmarkSvg,
  UsersSvg,
  FavoritesSvg,
  ShareSvg,
  StrongsIconSvg,
  getGenreSvg,
} from '../components/SvgIcons';

interface ScriptureDetailsScreenProps {
  navigation: any;
  route: { params: { scripture: Scripture } };
}

export default function ScriptureDetailsScreen({ navigation, route }: ScriptureDetailsScreenProps) {
  const { scripture } = route.params;
  const { toggleFavoriteScripture, isScriptureFavorited, incrementSharesCount } = useUser();
  const isFavorited = isScriptureFavorited(scripture.id);

  const handleShare = async () => {
    try {
      const res = await Share.share({
        message: `"${scripture.text}" - ${scripture.reference}\n\nShared from exégeomai`,
      });
      if (res.action === Share.sharedAction) {
        incrementSharesCount();
      }
    } catch {}
  };

  return (
    <View style={styles.container}>
      {/* Drag Handle for Sheet presentation */}
      <View style={styles.dragHandle} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Actions */}
        <View style={styles.topHeader}>
          <TouchableOpacity
            style={styles.doneBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Done"
          >
            <Text variant="h3" style={styles.doneBtnText}>Done</Text>
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => toggleFavoriteScripture(scripture)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Bookmark scripture"
            >
              <FavoritesSvg
                size={20}
                color={colors.accent}
                fill={isFavorited ? colors.accent : 'none'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={handleShare}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Share scripture"
            >
              <ShareSvg size={20} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.metaRow}>
            <View style={styles.genreIconRow}>
              {getGenreSvg(scripture.genre, 14, colors.accent)}
            </View>
            <Text variant="caption" weight="700" color={colors.accent}>
              {scripture.testament.toUpperCase()} • {scripture.genre}
            </Text>
          </View>

          <Text variant="h1" style={styles.scriptureRef}>{scripture.reference}</Text>

          {/* Scripture Quote (Flat Quote Block with Accent Left-Border) */}
          <View style={styles.quoteBox}>
            <Text variant="body" style={styles.quoteText}>"{scripture.text}"</Text>
            <Text variant="label" align="right" style={styles.quoteRef}>— {scripture.reference}</Text>
          </View>

          <View style={styles.hairlineDivider} />

          {/* Historical Context Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <LandmarkSvg size={18} color={colors.accent} />
              <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionLabel}>
                HISTORICAL CONTEXT
              </Text>
            </View>
            <Text variant="body" color={colors.textSecondary} style={styles.bodyText}>
              {scripture.historical_context}
            </Text>
          </View>

          <View style={styles.hairlineDivider} />

          {/* Cultural Practice Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <UsersSvg size={18} color={colors.accent} />
              <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionLabel}>
                CULTURAL PRACTICE
              </Text>
            </View>
            <Text variant="body" color={colors.textSecondary} style={styles.bodyText}>
              {scripture.cultural_practice}
            </Text>
          </View>

          {/* Strong's Concordance Details */}
          {scripture.strongs_word ? (
            <>
              <View style={styles.hairlineDivider} />
              <View style={styles.strongsSection}>
                <View style={styles.strongsHeader}>
                  <StrongsIconSvg size={18} color={colors.accent} />
                  <Text variant="label" weight="800" color={colors.textTertiary} style={styles.strongsHeaderTitle}>
                    KEY ORIGINAL LANGUAGE WORD
                  </Text>
                </View>

                <View style={styles.strongsRow}>
                  <View>
                    <Text variant="h1" style={styles.strongsWord}>{scripture.strongs_word}</Text>
                    {scripture.strongs_transliteration ? (
                      <Text variant="body" style={styles.strongsTrans}>{scripture.strongs_transliteration}</Text>
                    ) : null}
                  </View>
                  {scripture.strongs_number ? (
                    <Text variant="body" weight="700" color={colors.accent}>{scripture.strongs_number}</Text>
                  ) : null}
                </View>

                {scripture.strongs_definition ? (
                  <View style={styles.definitionBox}>
                    <Text variant="label" color={colors.textTertiary} style={{ marginBottom: 4, fontSize: 10, letterSpacing: 0.8 }}>
                      LEXICAL DEFINITION
                    </Text>
                    <Text variant="body" color={colors.textPrimary} style={styles.definitionText}>
                      {scripture.strongs_definition}
                    </Text>
                  </View>
                ) : null}
              </View>
            </>
          ) : null}
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
    backgroundColor: '#CBD5E1',
    borderRadius: 2,
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
    justifyContent: 'space-between',
    alignItems: 'center',
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
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    marginTop: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  genreIconRow: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scriptureRef: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 14,
  },
  quoteBox: {
    backgroundColor: 'rgba(253, 210, 35, 0.08)',
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
    borderRadius: radius.sm,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  quoteText: {
    fontStyle: 'italic',
    fontSize: 15,
    lineHeight: 22,
    color: colors.textPrimary,
  },
  quoteRef: {
    color: colors.textSecondary,
    marginTop: spacing.sm,
    fontWeight: '600',
  },
  hairlineDivider: {
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
    marginVertical: spacing.md,
  },
  section: {
    paddingVertical: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  sectionLabel: {
    letterSpacing: 0.5,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  strongsSection: {
    paddingVertical: 2,
  },
  strongsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  strongsHeaderTitle: {
    letterSpacing: 0.5,
  },
  strongsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  strongsWord: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  strongsTrans: {
    fontSize: 15,
    fontStyle: 'italic',
    color: colors.accent,
    marginTop: 2,
  },
  definitionBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: radius.sm,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  definitionText: {
    lineHeight: 21,
    fontSize: 14,
  },
});
