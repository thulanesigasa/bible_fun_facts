import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
  Image,
  Animated,
  TextInput,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { Text } from './Typography';
import { StreakHexagonBadge } from './StreakHexagonBadge';
import { CategoryBadge } from './CategoryBadge';
import {
  STREAK_MILESTONES,
  StreakMilestone,
  getMilestoneForStreak,
  getTierForDays,
  getTierInfoForDays,
} from '../data/streakMilestones';
import {
  AchievementMilestone,
  getAchievementsForCategory,
  getCategoryUnit,
} from '../data/achievements';
import { useUser } from '../context/UserContext';
import {
  CloseSvg,
  CheckSvg,
  LockSvg,
  ShareSvg,
} from './SvgIcons';

export interface StreakMilestoneModalProps {
  visible: boolean;
  streak: number;
  initialMilestoneDays?: number;
  achievement?: AchievementMilestone | null;
  onUpdateStreak?: (newStreak: number) => void;
  onClose: () => void;
}

export const StreakMilestoneModal: React.FC<StreakMilestoneModalProps> = ({
  visible,
  streak,
  initialMilestoneDays,
  achievement,
  onUpdateStreak,
  onClose,
}) => {
  const { incrementSharesCount } = useUser();
  const currentEarnedMilestone = getMilestoneForStreak(streak);

  const [selectedMilestone, setSelectedMilestone] = useState<StreakMilestone>(
    initialMilestoneDays
      ? STREAK_MILESTONES.find((m) => m.days === initialMilestoneDays) || currentEarnedMilestone
      : currentEarnedMilestone
  );

  const [activeAchievement, setActiveAchievement] = useState<AchievementMilestone | null>(
    achievement || null
  );

  const shareCardRef = useRef<any>(null);

  // Smooth entrance scale & fade animation
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      if (achievement) {
        setActiveAchievement(achievement);
      } else {
        setActiveAchievement(null);
        const active = initialMilestoneDays
          ? STREAK_MILESTONES.find((m) => m.days === initialMilestoneDays) || getMilestoneForStreak(streak)
          : getMilestoneForStreak(streak);
        setSelectedMilestone(active);
      }

      scaleAnim.setValue(0.9);
      opacityAnim.setValue(0);
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 60,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, streak, initialMilestoneDays, achievement]);

  // Determine active view metadata
  const isCustom = !!activeAchievement;
  const displayTitle = isCustom ? activeAchievement.title : selectedMilestone.title;
  const displaySubtitle = isCustom ? activeAchievement.subtitle : selectedMilestone.subtitle;
  const displayVerseQuote = isCustom ? activeAchievement.verseQuote : selectedMilestone.verseQuote;
  const displayVerseRef = isCustom ? activeAchievement.verseRef : selectedMilestone.verseRef;
  const badgeLabel = isCustom ? activeAchievement.badgeLabel : 'STREAK';

  // In streak mode, check if user earned it; in custom achievement mode, it is unlocked
  const isUnlocked = isCustom ? true : (streak >= selectedMilestone.days);

  // When inspecting active milestone, badge displays exact user streak count and tier color
  const isViewingActiveStreak = !isCustom && selectedMilestone.days === currentEarnedMilestone.days;
  const displayDays = isCustom
    ? activeAchievement.target
    : (isViewingActiveStreak ? streak : selectedMilestone.days);
  const displayTier = isCustom
    ? activeAchievement.tier
    : (isViewingActiveStreak ? getTierForDays(streak) : selectedMilestone.tier);
  const tierInfo = getTierInfoForDays(displayDays);

  const handleShare = async () => {
    const shareTitle = isCustom
      ? `${displayTitle} - ${badgeLabel} Achievement`
      : `${selectedMilestone.title} - Day ${selectedMilestone.days} Streak`;

    const shareMessage = isCustom
      ? [
          `✦ ${badgeLabel} Achievement: "${displayTitle}"`,
          '',
          displayVerseQuote ? `"${displayVerseQuote}" — ${displayVerseRef}` : displaySubtitle,
          '',
          `Powered by exégeomai • Walking in biblical truth daily.`,
        ].join('\n')
      : [
          `✦ Day ${selectedMilestone.days} Scripture Study Streak`,
          `"${selectedMilestone.title}"`,
          '',
          selectedMilestone.verseQuote
            ? `"${selectedMilestone.verseQuote}" — ${selectedMilestone.verseRef}`
            : selectedMilestone.subtitle,
          '',
          `Powered by exégeomai • Walking in biblical truth daily.`,
        ].join('\n');

    try {
      let SharingModule: any = null;
      try {
        SharingModule = require('expo-sharing');
      } catch (_) {}

      let captureRefFn: any = null;
      let captureScreenFn: any = null;
      try {
        const viewShot = require('react-native-view-shot');
        captureRefFn = viewShot.captureRef;
        captureScreenFn = viewShot.captureScreen;
      } catch (_) {}

      let FileSystem: any = null;
      try {
        FileSystem = require('expo-file-system');
      } catch (_) {}

      if (SharingModule && (await SharingModule.isAvailableAsync().catch(() => false))) {
        let uri: string | null = null;

        // 1. Attempt view capture with solid white background
        if (captureRefFn && shareCardRef.current) {
          try {
            uri = await captureRefFn(shareCardRef.current, {
              format: 'png',
              quality: 1.0,
              result: 'tmpfile',
            });
          } catch (refErr) {
            console.warn('captureRef notice, falling back:', refErr);
          }
        }

        // 2. Verify file exists and is not blank/empty (< 1000 bytes)
        let isFileValid = false;
        if (uri && FileSystem) {
          try {
            const info = await FileSystem.getInfoAsync(uri);
            if (info.exists && info.size > 1000) {
              isFileValid = true;
            }
          } catch (_) {}
        } else if (uri) {
          isFileValid = true;
        }

        // 3. Fallback to captureScreen if ref capture was invalid or empty
        if (!isFileValid && captureScreenFn) {
          try {
            const screenUri = await captureScreenFn({
              format: 'png',
              quality: 0.95,
              result: 'tmpfile',
            });
            if (screenUri) {
              uri = screenUri;
              isFileValid = true;
            }
          } catch (screenErr) {
            console.warn('captureScreen fallback notice:', screenErr);
          }
        }

        // 4. Share the non-blank image
        if (uri && isFileValid) {
          await SharingModule.shareAsync(uri, {
            mimeType: 'image/png',
            UTI: 'public.png',
            dialogTitle: shareTitle,
          });
          incrementSharesCount();
          return;
        }
      }
    } catch (shareErr) {
      console.warn('Native image share not available, falling back to text:', shareErr);
    }

    // 5. Clean text share fallback
    try {
      const res = await Share.share({
        message: shareMessage,
        title: shareTitle,
      });
      if (res.action === Share.sharedAction) {
        incrementSharesCount();
      }
    } catch (err) {
      console.warn('Share error:', err);
    }
  };

  const handleStreakChange = (valStr: string) => {
    const digits = valStr.replace(/[^\d]/g, '');
    const num = parseInt(digits, 10);
    const clamped = isNaN(num) ? 1 : Math.max(1, Math.min(9999, num));
    onUpdateStreak?.(clamped);
    setSelectedMilestone(getMilestoneForStreak(clamped));
  };

  const handleStepStreak = (delta: number) => {
    const next = Math.max(1, Math.min(9999, streak + delta));
    onUpdateStreak?.(next);
    setSelectedMilestone(getMilestoneForStreak(next));
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      hardwareAccelerated={true}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.modalOverlay}>
        <SafeAreaView style={styles.safeArea}>
          {/* Top Bar: Close Button only */}
          <View style={styles.topBar}>
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={onClose}
              activeOpacity={0.75}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              accessibilityRole="button"
              accessibilityLabel="Close achievement modal"
            >
              <CloseSvg size={20} color="#0F172A" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* Shareable card — solid white canvas, no overflow clip for 100% render fidelity */}
            <View
              ref={shareCardRef}
              style={styles.shareCard}
              collapsable={false}
            >
              <View style={styles.shareCardInner} collapsable={false}>
                {/* 3D Multi-Shape Category Badge */}
                <CategoryBadge
                  category={activeAchievement?.category || 'streak'}
                  shape={activeAchievement?.shape || 'hexagon'}
                  days={displayDays}
                  tier={displayTier}
                  size={220}
                  label={badgeLabel}
                />
                {/* Title */}
                <Text variant="h2" style={[styles.milestoneTitle, { marginTop: 12 }]}>
                  {displayTitle}
                </Text>
                {/* Verse */}
                {displayVerseQuote ? (
                  <Text variant="caption" color="#475569" style={[styles.verseQuoteText, { marginTop: 8, textAlign: 'center' }]}>
                    "{displayVerseQuote}"
                  </Text>
                ) : null}
                {/* Powered by footer */}
                <View style={styles.shareCardFooter}>
                  <Image
                    source={require('../../assets/logo-transparent.png')}
                    style={styles.shareCardLogo}
                    resizeMode="contain"
                  />
                  <Text variant="caption" weight="700" color="#0F172A" style={styles.shareCardAppName}>
                    exégeomai
                  </Text>
                </View>
              </View>
            </View>

            {/* Title & Epigram Subtitle */}
            <View style={styles.copyBlock}>
              <Text variant="caption" weight="800" style={[styles.tierHeaderLabel, { color: tierInfo.color }]}>
                {isCustom ? `${badgeLabel} MILESTONE` : tierInfo.badgeLabel}
              </Text>
              <Text variant="h1" style={styles.milestoneTitle}>
                {displayTitle}
              </Text>
              <Text variant="body" color="#64748B" style={styles.milestoneSubtitle}>
                {displaySubtitle}
              </Text>

              {/* Biblical Scripture Grounding */}
              {displayVerseQuote ? (
                <View style={styles.scriptureBlock}>
                  <Text variant="caption" color="#475569" style={styles.verseQuoteText}>
                    "{displayVerseQuote}"
                  </Text>
                  {displayVerseRef ? (
                    <Text variant="caption" weight="700" color={colors.accent} style={styles.verseRefText}>
                      — {displayVerseRef}
                    </Text>
                  ) : null}
                </View>
              ) : null}
            </View>

            {/* Interactive Daily Streak Stepper & Direct Numeric Editor (Only in Streak Mode) */}
            {!isCustom && onUpdateStreak ? (
              <View style={styles.editorSection}>
                <Text variant="caption" weight="700" color="#64748B" style={styles.editorHeading}>
                  EDIT DAILY STREAK COUNT
                </Text>
                <View style={styles.editorRow}>
                  <TouchableOpacity
                    style={styles.stepBtn}
                    onPress={() => handleStepStreak(-1)}
                    activeOpacity={0.7}
                    accessibilityRole="button"
                    accessibilityLabel="Decrease streak day"
                  >
                    <Text variant="h2" color="#0F172A" style={styles.stepBtnText}>−</Text>
                  </TouchableOpacity>

                  <View style={styles.editorInputWrap}>
                    <TextInput
                      style={styles.editorInput}
                      value={String(streak)}
                      onChangeText={handleStreakChange}
                      keyboardType="number-pad"
                      maxLength={4}
                      selectTextOnFocus
                      accessibilityLabel="Directly edit daily streak number"
                    />
                    <Text variant="caption" color="#64748B" style={styles.editorUnitLabel}>
                      {streak === 1 ? 'day' : 'days'}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.stepBtn}
                    onPress={() => handleStepStreak(1)}
                    activeOpacity={0.7}
                    accessibilityRole="button"
                    accessibilityLabel="Increase streak day"
                  >
                    <Text variant="h2" color="#0F172A" style={styles.stepBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
                <Text variant="caption" color="#94A3B8" style={styles.editorHelper}>
                  Updates daily with Scripture reading, or adjust above to test milestone badges.
                </Text>
              </View>
            ) : null}

            {/* Horizontal Milestone Shelf Selector */}
            <View style={styles.shelfSection}>
              <Text variant="caption" weight="700" color="#94A3B8" style={styles.shelfHeading}>
                {isCustom ? `ALL ${badgeLabel} MILESTONES` : 'ALL STREAK MILESTONES'}
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.shelfScroll}
              >
                {isCustom && activeAchievement ? (
                  getAchievementsForCategory(activeAchievement.category).map((m) => {
                    const isSelected = activeAchievement.id === m.id;
                    return (
                      <TouchableOpacity
                        key={m.id}
                        style={[
                          styles.shelfItem,
                          isSelected && styles.shelfItemSelected,
                        ]}
                        onPress={() => setActiveAchievement(m)}
                        activeOpacity={0.8}
                      >
                        <View style={styles.shelfBadgeMini}>
                          <CategoryBadge
                            category={activeAchievement.category}
                            shape={m.shape}
                            days={m.target}
                            tier={m.tier}
                            size={42}
                            label={badgeLabel}
                          />
                        </View>
                        <Text
                          variant="caption"
                          weight={isSelected ? '700' : '600'}
                          color={isSelected ? '#0F172A' : '#64748B'}
                          style={styles.shelfDayText}
                        >
                          {`${m.target} ${getCategoryUnit(m.category, m.target)}`}
                        </Text>
                        <Text
                          variant="caption"
                          color={isSelected ? colors.accent : '#94A3B8'}
                          numberOfLines={1}
                          style={styles.shelfItemTitle}
                        >
                          {m.title}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  STREAK_MILESTONES.map((milestone) => {
                    const isSelected = selectedMilestone.days === milestone.days;
                    const earned = streak >= milestone.days;
                    return (
                      <TouchableOpacity
                        key={milestone.days}
                        style={[
                          styles.shelfItem,
                          isSelected && styles.shelfItemSelected,
                          !earned && styles.shelfItemLocked,
                        ]}
                        onPress={() => setSelectedMilestone(milestone)}
                        activeOpacity={0.8}
                      >
                        <View style={styles.shelfBadgeMini}>
                          <StreakHexagonBadge
                            days={milestone.days}
                            tier={milestone.tier}
                            size={42}
                            label="STREAK"
                          />
                        </View>
                        <Text
                          variant="caption"
                          weight={isSelected ? '700' : '600'}
                          color={isSelected ? '#0F172A' : '#64748B'}
                          style={styles.shelfDayText}
                        >
                          {`Day ${milestone.days}`}
                        </Text>
                        <Text
                          variant="caption"
                          color={isSelected ? colors.accent : '#94A3B8'}
                          numberOfLines={1}
                          style={styles.shelfItemTitle}
                        >
                          {milestone.title}
                        </Text>
                      </TouchableOpacity>
                    );
                  })
                )}
              </ScrollView>
            </View>

            {/* Brand Footer: "Walk in the Word with [logo] exégeomai" */}
            <View style={styles.brandFooter}>
              <Text variant="caption" color="#64748B" style={styles.brandFooterPre}>
                Walk in the Word with
              </Text>
              <Image
                source={require('../../assets/logo-transparent.png')}
                style={styles.brandLogo}
                resizeMode="contain"
              />
              <Text variant="caption" weight="700" color="#0F172A" style={styles.brandFooterName}>
                exégeomai
              </Text>
            </View>

            {/* Actions: Share Badge & Continue */}
            <View style={styles.actionsRow}>
              {isUnlocked && (
                <TouchableOpacity
                  style={styles.shareBtn}
                  onPress={handleShare}
                  activeOpacity={0.85}
                  accessibilityRole="button"
                  accessibilityLabel="Share achievement badge"
                >
                  <ShareSvg size={16} color="#0F172A" strokeWidth={2} />
                  <Text variant="body" weight="700" color="#0F172A" style={styles.shareBtnText}>
                    Share Badge
                  </Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={[styles.continueBtn, !isUnlocked && styles.continueBtnFull]}
                onPress={onClose}
                activeOpacity={0.85}
                accessibilityRole="button"
                accessibilityLabel="Close achievement modal"
              >
                <Text variant="body" weight="700" color="#0F172A">
                  Continue Reading
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  shareCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 20,
  },
  shareCardInner: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  shareCardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 6,
  },
  shareCardLogo: {
    width: 20,
    height: 20,
  },
  shareCardAppName: {
    fontSize: 13,
    letterSpacing: 0.3,
  },
  copyBlock: {
    alignItems: 'center',
    maxWidth: 320,
    marginBottom: 12,
  },
  tierHeaderLabel: {
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 6,
    textAlign: 'center',
  },
  milestoneTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  milestoneSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    color: '#64748B',
  },
  scriptureBlock: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.03)',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  verseQuoteText: {
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 18,
  },
  verseRefText: {
    marginTop: 4,
    fontSize: 12,
    letterSpacing: 0.3,
  },
  editorSection: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  editorHeading: {
    fontSize: 11,
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  editorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  stepBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnText: {
    fontSize: 24,
    lineHeight: 28,
  },
  editorInputWrap: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: colors.accent,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 6,
    minWidth: 100,
    justifyContent: 'center',
  },
  editorInput: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    minWidth: 40,
    padding: 0,
  },
  editorUnitLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  editorHelper: {
    fontSize: 11,
    marginTop: 8,
    textAlign: 'center',
  },
  shelfSection: {
    width: '100%',
    marginBottom: 20,
  },
  shelfHeading: {
    fontSize: 11,
    letterSpacing: 1.5,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  shelfScroll: {
    paddingHorizontal: 4,
    gap: 10,
  },
  shelfItem: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    width: 88,
  },
  shelfItemSelected: {
    borderColor: colors.accent,
    borderWidth: 2,
    backgroundColor: '#FEFCE8',
  },
  shelfItemLocked: {
    opacity: 0.5,
  },
  shelfBadgeMini: {
    marginBottom: 6,
  },
  shelfDayText: {
    fontSize: 11,
    marginBottom: 2,
    textAlign: 'center',
  },
  shelfItemTitle: {
    fontSize: 10,
    textAlign: 'center',
  },
  brandFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 20,
  },
  brandFooterPre: {
    fontSize: 12,
  },
  brandLogo: {
    width: 16,
    height: 16,
  },
  brandFooterName: {
    fontSize: 12,
    letterSpacing: 0.3,
  },
  actionsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  shareBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
  },
  shareBtnText: {
    fontSize: 15,
  },
  continueBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    paddingVertical: 14,
    borderRadius: 14,
  },
  continueBtnFull: {
    flex: 1,
    backgroundColor: colors.accent,
  },
});
