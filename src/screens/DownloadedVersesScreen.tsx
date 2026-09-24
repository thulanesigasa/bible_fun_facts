import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme';
import { Text } from '../components/Typography';
import {
  getDownloadedTranslations,
  deleteDownloadedTranslation,
  subscribeOfflineUpdates,
  DownloadedTranslationMeta,
} from '../services/bibleService';
import { DownloadSvg, TrashSvg, BookOpenSvg } from '../components/SvgIcons';

interface DownloadedVersesScreenProps {
  navigation: any;
}

const TRANSLATION_META: Record<string, { name: string; desc: string; tag: string }> = {
  web:      { name: 'World English Bible',               desc: 'Modern English - Full Bible',          tag: 'MODERN'    },
  kjv:      { name: 'King James Version',                desc: 'Classic 1611 - Full Bible',            tag: 'CLASSIC'   },
  asv:      { name: 'American Standard Version',         desc: 'Literal 1901 - Full Bible',            tag: 'SCHOLARLY' },
  bbe:      { name: 'Bible in Basic English',            desc: 'Simple vocabulary - Full Bible',       tag: 'SIMPLE'    },
  darby:    { name: 'Darby Bible',                       desc: 'Precise 1890 - Full Bible',            tag: 'SCHOLARLY' },
  dra:      { name: 'Douay-Rheims 1899',                 desc: 'Catholic - Full Bible',                tag: 'CLASSIC'   },
  ylt:      { name: "Young's Literal Translation",       desc: 'Very literal - NT only',               tag: 'SCHOLARLY' },
  'oeb-cw': { name: 'Open English Bible (Commonwealth)', desc: 'Modern UK English - Full Bible',       tag: 'MODERN'    },
  webbe:    { name: 'World English Bible (British Ed.)', desc: 'British spelling - Full Bible',        tag: 'MODERN'    },
  'oeb-us': { name: 'Open English Bible (US Edition)',   desc: 'Modern US English - Full Bible',       tag: 'MODERN'    },
};

export default function DownloadedVersesScreen({ navigation }: DownloadedVersesScreenProps) {
  const [translations, setTranslations] = useState<DownloadedTranslationMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadTranslations = useCallback(async () => {
    try {
      const list = await getDownloadedTranslations();
      setTranslations(list);
    } catch (e) {
      console.warn('Failed to load downloaded translations:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTranslations();
    const unsubscribe = subscribeOfflineUpdates(loadTranslations);
    return unsubscribe;
  }, [loadTranslations]);

  const handleOpen = (item: DownloadedTranslationMeta) => {
    navigation.navigate('WOTD', { translationOverride: item.id });
  };

  const handleDelete = (item: DownloadedTranslationMeta) => {
    const meta = TRANSLATION_META[item.id];
    const displayName = meta?.name || item.id.toUpperCase();
    Alert.alert(
      'Remove Translation',
      `Remove ${displayName} from offline storage? You can re-download it from the Word tab at any time.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            setDeletingId(item.id);
            try {
              await deleteDownloadedTranslation(item.id);
              setTranslations(prev => prev.filter(t => t.id !== item.id));
            } catch (err) {
              console.warn('Failed to remove translation:', err);
            } finally {
              setDeletingId(null);
            }
          },
        },
      ]
    );
  };

  const formatSize = (bytes?: number): string => {
    if (!bytes || bytes === 0) return '';
    const mb = bytes / (1024 * 1024);
    return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
  };

  const renderRow = ({ item, index }: { item: DownloadedTranslationMeta; index: number }) => {
    const meta = TRANSLATION_META[item.id];
    const isLast = index === translations.length - 1;
    const isDeleting = deletingId === item.id;

    return (
      <TouchableOpacity
        style={[styles.row, !isLast && styles.rowDivider]}
        activeOpacity={0.75}
        onPress={() => handleOpen(item)}
        accessibilityRole="button"
        accessibilityLabel={`Open ${meta?.name || item.id} in Bible reader`}
      >
        <View style={styles.rowLeft}>
          <View style={styles.rowTopLine}>
            <Text variant="h3" style={styles.translationAbbr}>
              {item.id.toUpperCase()}
            </Text>
            {meta?.tag ? (
              <Text variant="caption" weight="700" style={styles.tagText}>
                {meta.tag}
              </Text>
            ) : null}
          </View>
          <Text variant="body" weight="600" color={colors.textPrimary} style={styles.translationName}>
            {meta?.name || item.id.toUpperCase()}
          </Text>
          <Text variant="caption" color={colors.textSecondary} style={styles.descText}>
            {meta?.desc ?? 'Public domain'}
            {item.sizeBytes ? ` - ${formatSize(item.sizeBytes)}` : ''}
          </Text>
          <View style={styles.openCueRow}>
            <BookOpenSvg size={12} color={colors.accent} />
            <Text variant="caption" weight="700" color={colors.accent} style={styles.openCueText}>
              Open in Word Reader
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => handleDelete(item)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={`Remove ${meta?.name || item.id} offline download`}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <ActivityIndicator size="small" color="#94A3B8" />
          ) : (
            <TrashSvg size={16} color="#94A3B8" />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color={colors.accent} />
          <Text variant="caption" color={colors.textSecondary} style={{ marginTop: spacing.sm }}>
            Loading downloaded translations...
          </Text>
        </View>
      ) : (
        <FlatList
          data={translations}
          keyExtractor={item => item.id}
          renderItem={renderRow}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconWrap}>
                <DownloadSvg size={36} color={colors.accent} strokeWidth={1.5} />
              </View>
              <Text variant="h3" style={styles.emptyTitle}>
                No Translations Downloaded
              </Text>
              <Text variant="body" color={colors.textSecondary} style={styles.emptyMessage}>
                Open the Word tab, tap any translation in reader settings, and tap Download to save a full Bible for offline reading.
              </Text>
              <TouchableOpacity
                style={styles.openReaderBtn}
                onPress={() => navigation.navigate('WOTD')}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Open Bible reader to download translations"
              >
                <Text variant="caption" weight="700" color="#0F172A">
                  Open Word Reader
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:       { flex: 1, backgroundColor: '#FFFFFF' },
  listContent:    { paddingBottom: 96 },
  loaderContainer:{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: '#FFFFFF',
  },
  rowDivider: { borderBottomWidth: 1, borderBottomColor: 'rgba(15, 23, 42, 0.06)' },
  rowLeft:    { flex: 1, paddingRight: spacing.sm },
  rowTopLine: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 },
  translationAbbr: { fontSize: 15, fontWeight: '800', color: colors.textPrimary, letterSpacing: 0.5 },
  tagText: {
    fontSize: 10,
    letterSpacing: 0.8,
    backgroundColor: 'rgba(253, 210, 35, 0.12)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: 'rgba(253, 210, 35, 0.28)',
    overflow: 'hidden',
    color: '#B45309',
  },
  translationName: { fontSize: 13.5, marginBottom: 2 },
  descText:        { fontSize: 12, lineHeight: 17, marginBottom: 6 },
  openCueRow:      { flexDirection: 'row', alignItems: 'center', gap: 4 },
  openCueText:     { fontSize: 12 },
  deleteBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(15, 23, 42, 0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    backgroundColor: 'rgba(253, 210, 35, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  emptyTitle:   { fontSize: 17, fontWeight: '700', color: colors.textPrimary, textAlign: 'center' },
  emptyMessage: { fontSize: 13, lineHeight: 19, textAlign: 'center', maxWidth: 280 },
  openReaderBtn: {
    backgroundColor: colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 99,
    marginTop: 8,
  },
});
