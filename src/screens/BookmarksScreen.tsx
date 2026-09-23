import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme';
import { Text } from '../components/Typography';
import { useUser } from '../context/UserContext';
import { Scripture } from '../data/mockDatabase';
import { BookmarkSvg, BookOpenSvg, CloseSvg } from '../components/SvgIcons';

interface BookmarksScreenProps {
  navigation: any;
}

export default function BookmarksScreen({ navigation }: BookmarksScreenProps) {
  const { favoritesScriptures, toggleFavoriteScripture } = useUser();

  const handleOpenInWord = (item: Scripture) => {
    const firstVerse = item.verse_range
      ? parseInt(item.verse_range.split('-')[0], 10) || 1
      : 1;

    navigation.navigate('WOTD', {
      book: item.book,
      chapter: item.chapter,
      verse: firstVerse,
    });
  };

  const renderBookmarkRow = ({ item, index }: { item: Scripture; index: number }) => {
    return (
      <TouchableOpacity
        style={[
          styles.bookmarkRow,
          index < favoritesScriptures.length - 1 && styles.rowDivider,
        ]}
        activeOpacity={0.75}
        onPress={() => handleOpenInWord(item)}
        accessibilityRole="button"
        accessibilityLabel={`View bookmarked verse ${item.reference} in Bible reader`}
      >
        {/* Row Header: Reference & Remove Button */}
        <View style={styles.rowHeader}>
          <Text variant="h3" style={styles.verseReference}>
            {item.reference}
          </Text>

          <TouchableOpacity
            style={styles.removeBtn}
            onPress={(e) => {
              e.stopPropagation();
              toggleFavoriteScripture(item);
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityRole="button"
            accessibilityLabel={`Remove bookmark for ${item.reference}`}
          >
            <CloseSvg size={14} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Verse Text with Sacred Dotted Underline */}
        <Text style={styles.verseBodyText}>
          "{item.text.trim()}"
        </Text>

        {/* Action Cue */}
        <View style={styles.actionFooter}>
          <View style={styles.openInReaderRow}>
            <BookOpenSvg size={12} color={colors.accent} />
            <Text variant="caption" weight="700" color={colors.accent} style={styles.openInReaderText}>
              Open in Word Reader ›
            </Text>
          </View>
          <Text variant="caption" color={colors.textTertiary}>
            Chapter {item.chapter}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={favoritesScriptures}
        keyExtractor={(item) => item.id}
        renderItem={renderBookmarkRow}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconWrap}>
              <BookmarkSvg size={36} color={colors.accent} strokeWidth={1.5} />
            </View>
            <Text variant="h3" style={styles.emptyTitle}>
              No Bookmarked Verses Yet
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.emptyMessage}>
              While reading Scripture under the Word tab, tap any verse and select Bookmark to save it here.
            </Text>
            <TouchableOpacity
              style={styles.openReaderBtn}
              onPress={() => navigation.navigate('WOTD')}
              activeOpacity={0.8}
            >
              <Text variant="caption" weight="700" color="#0F172A">
                Open Bible Reader
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Continuous flat 30% panel body surface
  },
  listContent: {
    paddingBottom: 96,
  },

  // Continuous body row styling (no card divs)
  bookmarkRow: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: '#FFFFFF',
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  verseReference: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  removeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(15, 23, 42, 0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Verse quotation with dotted underline
  verseBodyText: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.textPrimary,
    fontStyle: 'italic',
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
    textDecorationColor: colors.accent,
    marginVertical: 4,
  },

  actionFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  openInReaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  openInReaderText: {
    fontSize: 12,
  },

  // Empty state
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: 80,
    gap: 12,
  },
  emptyIconWrap: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emptyMessage: {
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    maxWidth: 280,
  },
  openReaderBtn: {
    backgroundColor: colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: radius.full,
    marginTop: 8,
  },
});
