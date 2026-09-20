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
import { Card } from '../components/Card';
import { Fact } from '../data/mockDatabase';
import { useUser } from '../context/UserContext';
import {
  LandmarkSvg,
  UsersSvg,
  FavoritesSvg,
  ShareSvg,
  StrongsIconSvg,
} from '../components/SvgIcons';

interface FactDetailsScreenProps {
  navigation: any;
  route: { params: { fact: Fact } };
}

export default function FactDetailsScreen({ navigation, route }: FactDetailsScreenProps) {
  const { fact } = route.params;
  const { toggleFavoriteFact, isFactFavorited } = useUser();
  const isFavorited = isFactFavorited(fact.id);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Did You Know? ${fact.fact_title}\n${fact.scripture_ref}: "${fact.verse_text}"\n\nShared from exégeomai`,
      });
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
          >
            <Text variant="h3" style={styles.doneBtnText}>Done</Text>
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => toggleFavoriteFact(fact)}
              activeOpacity={0.7}
            >
              <FavoritesSvg
                size={22}
                color={colors.accent}
                fill={isFavorited ? colors.accent : 'none'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={handleShare}
              activeOpacity={0.7}
            >
              <ShareSvg size={22} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.mainContent}>
          <Text variant="h1" style={styles.title}>Fact Details</Text>

          <View style={styles.metaRow}>
            <Text variant="caption" weight="700" color={colors.accent} style={{ letterSpacing: 0.5 }}>
              {fact.category.toUpperCase()}
            </Text>
            <Text variant="body" color={colors.textSecondary}>• {fact.scripture_ref}</Text>
          </View>

          <Text variant="h2" style={styles.factTitle}>{fact.fact_title}</Text>

          {/* Scripture Quote */}
          <Card style={styles.quoteCard}>
            <Text variant="body" style={styles.quoteText}>"{fact.verse_text}"</Text>
            <Text variant="label" align="right" style={styles.quoteRef}>- {fact.scripture_ref}</Text>
          </Card>

          {/* Context Sections */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <LandmarkSvg size={20} color={colors.accent} />
              <Text variant="h3" style={styles.sectionLabel}>Historical Context</Text>
            </View>
            <Text variant="body" color={colors.textSecondary} style={styles.bodyText}>
              {fact.historical_context}
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <UsersSvg size={20} color={colors.accent} />
              <Text variant="h3" style={styles.sectionLabel}>Cultural Practice</Text>
            </View>
            <Text variant="body" color={colors.textSecondary} style={styles.bodyText}>
              {fact.cultural_practice}
            </Text>
          </View>

          {/* Strong's Deep Dive Detail Panel */}
          <View style={styles.strongsCard}>
            <View style={styles.strongsHeader}>
              <StrongsIconSvg size={20} color={colors.accent} />
              <Text variant="h3" style={styles.strongsHeaderTitle}>Strong's Deep Dive</Text>
            </View>

            <View style={styles.strongsRow}>
              <View>
                <Text variant="h1" style={styles.strongsWord}>{fact.strongs_word}</Text>
                <Text variant="body" style={styles.strongsTrans}>{fact.strongs_transliteration}</Text>
              </View>
              <Text variant="body" weight="700" color={colors.accent}>{fact.strongs_number}</Text>
            </View>

            <View style={styles.definitionBox}>
              <Text variant="label" color={colors.textTertiary} style={{ marginBottom: spacing.sm }}>
                DEFINITION
              </Text>
              <Text variant="body" color={colors.textPrimary} style={styles.definitionText}>
                {fact.strongs_definition}
              </Text>
            </View>
          </View>
        </View>
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
    width: 40,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: radius.full,
    alignSelf: 'center',
    marginTop: spacing.sm, // 8px
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: spacing.md, // 16px margins
    paddingBottom: spacing.xxl, // 48px
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md, // 16px
    paddingTop: spacing.sm, // 8px
  },
  doneBtn: {
    paddingVertical: spacing.sm, // 8px
    paddingHorizontal: spacing.sm, // 8px
  },
  doneBtnText: {
    color: colors.accent,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    marginTop: spacing.sm, // 8px
  },
  title: {
    fontSize: 28,
    color: colors.textPrimary,
    marginBottom: spacing.md, // 16px
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
    marginBottom: spacing.md, // 16px
  },

  factTitle: {
    fontSize: 24,
    color: colors.textPrimary,
    marginBottom: spacing.md, // 16px
  },
  quoteCard: {
    backgroundColor: colors.surface,
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
    borderRadius: radius.md, // 16px
    padding: spacing.md, // 16px
    marginBottom: spacing.lg, // 24px
  },
  quoteText: {
    fontStyle: 'italic',
    fontSize: 16,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  quoteRef: {
    color: colors.accent,
    marginTop: spacing.sm, // 8px
  },
  section: {
    marginBottom: spacing.lg, // 24px
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
    marginBottom: spacing.sm, // 8px
  },
  sectionLabel: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: '700',
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
  },
  strongsCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl, // 32px
    padding: spacing.lg, // 24px
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: spacing.sm, // 8px
  },
  strongsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm, // 8px
    marginBottom: spacing.md, // 16px
  },
  strongsHeaderTitle: {
    color: colors.accent,
    fontSize: 16,
  },
  strongsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md, // 16px
  },
  strongsWord: {
    fontSize: 32,
    color: colors.textPrimary,
  },
  strongsTrans: {
    fontSize: 16,
    fontStyle: 'italic',
    color: colors.textSecondary,
    marginTop: 4,
  },

  definitionBox: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.md, // 16px
    padding: spacing.md, // 16px
    borderWidth: 1,
    borderColor: colors.border,
  },
  definitionText: {
    lineHeight: 24,
  },
});
