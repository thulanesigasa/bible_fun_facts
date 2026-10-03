import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  ScrollView,
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
  downloadTranslation,
  downloadMultipleTranslations,
  subscribeOfflineUpdates,
  subscribeDownloadEvents,
  getActiveDownloadingIds,
  getTranslationDownloadProgress,
  DownloadedTranslationMeta,
  TRANSLATION_SOURCES,
  TranslationSourceConfig,
} from '../services/bibleService';
import { DownloadSvg, TrashSvg, CheckSvg } from '../components/SvgIcons';

interface DownloadedVersesScreenProps {
  navigation: any;
}

export default function DownloadedVersesScreen({ navigation }: DownloadedVersesScreenProps) {
  const [downloaded, setDownloaded] = useState<DownloadedTranslationMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [downloadingIds, setDownloadingIds] = useState<Record<string, boolean>>({});
  const [downloadProgress, setDownloadProgress] = useState<Record<string, number>>({});

  const loadDownloaded = useCallback(async () => {
    try {
      const list = await getDownloadedTranslations();
      setDownloaded(list);
    } catch (e) {
      console.warn('Failed to load downloaded translations:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDownloaded();
    const unsubscribe = subscribeOfflineUpdates(loadDownloaded);

    // Initial sync with active background downloads
    const activeIds = getActiveDownloadingIds();
    if (activeIds.length > 0) {
      const activeMap: Record<string, boolean> = {};
      const progMap: Record<string, number> = {};
      activeIds.forEach((id) => {
        activeMap[id] = true;
        progMap[id] = getTranslationDownloadProgress(id);
      });
      setDownloadingIds((prev) => ({ ...prev, ...activeMap }));
      setDownloadProgress((prev) => ({ ...prev, ...progMap }));
    }

    const unsubEvents = subscribeDownloadEvents((id, pct, isFinished) => {
      if (isFinished) {
        setDownloadingIds((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
        setDownloadProgress((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
        loadDownloaded();
      } else {
        setDownloadingIds((prev) => ({ ...prev, [id]: true }));
        setDownloadProgress((prev) => ({ ...prev, [id]: pct }));
      }
    });

    return () => {
      unsubscribe();
      unsubEvents();
    };
  }, [loadDownloaded]);

  const handleOpen = (item: DownloadedTranslationMeta) => {
    navigation.navigate('WOTD', { translationOverride: item.id });
  };

  const handleDelete = (item: DownloadedTranslationMeta) => {
    const meta = TRANSLATION_SOURCES[item.id];
    const displayName = meta?.name || item.id.toUpperCase();
    Alert.alert(
      'Remove Translation',
      `Remove ${displayName} from offline storage? You can re-download it at any time.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            setDeletingId(item.id);
            try {
              await deleteDownloadedTranslation(item.id);
              setDownloaded((prev) => prev.filter((t) => t.id !== item.id));
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

  const handleDownload = async (source: TranslationSourceConfig) => {
    if (downloadingIds[source.id]) return;
    setDownloadingIds((prev) => ({ ...prev, [source.id]: true }));
    setDownloadProgress((prev) => ({ ...prev, [source.id]: 5 }));

    try {
      await downloadTranslation(source.id, (progressPercent) => {
        setDownloadProgress((prev) => ({ ...prev, [source.id]: progressPercent }));
      });
      await loadDownloaded();
    } catch (err: any) {
      console.warn(`Failed to download ${source.name}:`, err);
      Alert.alert(
        'Download Failed',
        `Unable to download ${source.name}. Please check your internet connection and try again.`
      );
    } finally {
      setDownloadingIds((prev) => {
        const next = { ...prev };
        delete next[source.id];
        return next;
      });
      setDownloadProgress((prev) => {
        const next = { ...prev };
        delete next[source.id];
        return next;
      });
    }
  };

  const handleDownloadAll = async () => {
    const pending = availableTranslations.filter((t) => !downloadingIds[t.id]);
    if (pending.length === 0) return;

    // Launch all available downloads in parallel
    pending.forEach((source) => {
      handleDownload(source);
    });
  };

  const formatSize = (bytes?: number): string => {
    if (!bytes || bytes === 0) return '';
    const mb = bytes / (1024 * 1024);
    return mb >= 1 ? `${mb.toFixed(1)} MB` : `${(bytes / 1024).toFixed(0)} KB`;
  };

  const downloadedIds = useMemo(() => new Set(downloaded.map((d) => d.id)), [downloaded]);

  const availableTranslations = useMemo(() => {
    const all = Object.values(TRANSLATION_SOURCES);
    return all.filter((t) => !downloadedIds.has(t.id));
  }, [downloadedIds]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color={colors.accent} />
          <Text variant="caption" color={colors.textSecondary} style={{ marginTop: spacing.sm }}>
            Loading offline library...
          </Text>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* 1. DOWNLOADED OFFLINE SECTION */}
          {downloaded.length > 0 && (
            <View style={styles.sectionWrap}>
              <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
                OFFLINE READY ({downloaded.length})
              </Text>
              <View style={styles.cardContainer}>
                {downloaded.map((item, index) => {
                  const meta = TRANSLATION_SOURCES[item.id];
                  const isLast = index === downloaded.length - 1;
                  const isDeleting = deletingId === item.id;

                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={[styles.row, !isLast && styles.rowDivider]}
                      activeOpacity={0.75}
                      onPress={() => handleOpen(item)}
                      accessibilityRole="button"
                      accessibilityLabel={`Open ${meta?.name || item.id} in Bible reader`}
                    >
                      <View style={styles.rowLeft}>
                        <Text variant="h3" style={styles.translationAbbr}>
                          {meta?.abbreviation || item.id.toUpperCase()}
                        </Text>
                        <Text
                          variant="body"
                          weight="600"
                          color={colors.textPrimary}
                          style={styles.translationName}
                        >
                          {meta?.name || item.id.toUpperCase()}
                        </Text>
                        <Text variant="caption" color={colors.textSecondary} style={styles.descText}>
                          {meta?.description || 'Full Bible'}
                          {item.sizeBytes ? ` - ${formatSize(item.sizeBytes)}` : ''}
                        </Text>
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
                })}
              </View>
            </View>
          )}

          {/* 2. AVAILABLE TRANSLATIONS (PLAIN UNIFIED LIST) */}
          {availableTranslations.length > 0 && (
            <View style={styles.sectionWrap}>
              <View style={styles.sectionHeaderRow}>
                <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
                  AVAILABLE TRANSLATIONS ({availableTranslations.length})
                </Text>
                {availableTranslations.length > 1 && (
                  <TouchableOpacity
                    style={styles.downloadAllBtn}
                    onPress={handleDownloadAll}
                    activeOpacity={0.7}
                    accessibilityRole="button"
                    accessibilityLabel="Download all available translations simultaneously"
                  >
                    <DownloadSvg size={12} color="#0F172A" strokeWidth={2} />
                    <Text variant="caption" weight="700" color="#0F172A" style={styles.downloadAllBtnText}>
                      Download All
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.cardContainer}>
                {availableTranslations.map((source, index) => {
                  const isLast = index === availableTranslations.length - 1;
                  const isDownloading = Boolean(downloadingIds[source.id]);
                  const progress = downloadProgress[source.id] || 0;

                  return (
                    <View key={source.id} style={[styles.row, !isLast && styles.rowDivider]}>
                      <View style={styles.rowLeft}>
                        <Text variant="h3" style={styles.translationAbbr}>
                          {source.abbreviation}
                        </Text>
                        <Text
                          variant="body"
                          weight="600"
                          color={colors.textPrimary}
                          style={styles.translationName}
                        >
                          {source.name}
                        </Text>
                        <Text variant="caption" color={colors.textSecondary} style={styles.descText}>
                          {source.description} - {source.sizeEstimate}
                        </Text>

                        {/* Live download progress bar */}
                        {isDownloading && (
                          <View style={styles.progressWrap}>
                            <View style={styles.progressBarTrack}>
                              <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                            </View>
                            <Text variant="caption" color={colors.textSecondary} style={styles.progressText}>
                              Downloading 66 books... {progress}%
                            </Text>
                          </View>
                        )}
                      </View>

                      {/* Download CTA Button */}
                      <TouchableOpacity
                        style={[styles.downloadBtn, isDownloading && styles.downloadBtnDisabled]}
                        onPress={() => handleDownload(source)}
                        disabled={isDownloading}
                        activeOpacity={0.8}
                        accessibilityRole="button"
                        accessibilityLabel={`Download ${source.name} for offline reading`}
                      >
                        {isDownloading ? (
                          <View style={styles.downloadingBtnContent}>
                            <ActivityIndicator size="small" color="#0F172A" />
                            <Text variant="caption" weight="700" color="#0F172A">
                              {progress}%
                            </Text>
                          </View>
                        ) : (
                          <>
                            <DownloadSvg size={14} color="#0F172A" strokeWidth={2} />
                            <Text variant="caption" weight="700" color="#0F172A">
                              Download
                            </Text>
                          </>
                        )}
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 96,
    paddingTop: 4,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  sectionWrap: {
    marginTop: spacing.md,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: 4,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  downloadAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(253, 210, 35, 0.25)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radius.full,
  },
  downloadAllBtnText: {
    fontSize: 11,
  },
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: '#FFFFFF',
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  rowLeft: {
    flex: 1,
    paddingRight: spacing.md,
  },
  translationAbbr: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  translationName: {
    fontSize: 13.5,
    marginTop: 1,
    marginBottom: 2,
  },
  descText: {
    fontSize: 12,
    lineHeight: 17,
  },
  deleteBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(15, 23, 42, 0.04)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.full,
    gap: 5,
  },
  downloadBtnDisabled: {
    opacity: 0.7,
  },
  progressWrap: {
    marginTop: 8,
  },
  progressBarTrack: {
    height: 4,
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 4,
    backgroundColor: colors.accent,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 11,
    marginTop: 4,
  },
  downloadingBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
