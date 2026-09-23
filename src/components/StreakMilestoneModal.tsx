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
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { colors } from '../theme/colors';
import { Text } from './Typography';
import { StreakHexagonBadge } from './StreakHexagonBadge';
import {
  STREAK_MILESTONES,
  StreakMilestone,
  getMilestoneForStreak,
  getTierForDays,
  getTierInfoForDays,
} from '../data/streakMilestones';
import {
  CloseSvg,
  CheckSvg,
  LockSvg,
  ShareSvg,
  ShieldCheckSvg,
} from './SvgIcons';

export interface StreakMilestoneModalProps {
  visible: boolean;
  streak: number;
  initialMilestoneDays?: number;
  onUpdateStreak?: (newStreak: number) => void;
  onClose: () => void;
}

export const StreakMilestoneModal: React.FC<StreakMilestoneModalProps> = ({
  visible,
  streak,
  initialMilestoneDays,
  onUpdateStreak,
  onClose,
}) => {
  const currentEarnedMilestone = getMilestoneForStreak(streak);
  const [selectedMilestone, setSelectedMilestone] = useState<StreakMilestone>(
    initialMilestoneDays
      ? STREAK_MILESTONES.find((m) => m.days === initialMilestoneDays) || currentEarnedMilestone
      : currentEarnedMilestone
  );

  // Smooth entrance scale & fade animation
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      const active = initialMilestoneDays
        ? STREAK_MILESTONES.find((m) => m.days === initialMilestoneDays) || getMilestoneForStreak(streak)
        : getMilestoneForStreak(streak);
      setSelectedMilestone(active);

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
  }, [visible, streak, initialMilestoneDays]);

  const isUnlocked = streak >= selectedMilestone.days;

  const handleShare = async () => {
    try {
      const shareMessage = `✦ ${selectedMilestone.days}-Day Scripture Study Streak: "${selectedMilestone.title}"!\n\n"${selectedMilestone.subtitle}"\n\n${selectedMilestone.verseQuote ? `"${selectedMilestone.verseQuote}" (${selectedMilestone.verseRef})\n\n` : ''}Studying daily on exégeomai • Walking in biblical truth.`;
      await Share.share({
        message: shareMessage,
        title: `${selectedMilestone.title} - ${selectedMilestone.days} Day Streak`,
      });
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

  // When inspecting active milestone, badge displays exact user streak count and tier color
  const isViewingActiveStreak = selectedMilestone.days === currentEarnedMilestone.days;
  const displayDays = isViewingActiveStreak ? streak : selectedMilestone.days;
  const displayTier = isViewingActiveStreak ? getTierForDays(streak) : selectedMilestone.tier;
  const tierInfo = getTierInfoForDays(displayDays);

  const activeGradient = isViewingActiveStreak
    ? tierInfo.bgGradient
    : selectedMilestone.bgGradientStart;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.modalOverlay}>
        {/* Full-bleed Top-Down Dynamic Tier Gradient */}
        <View style={StyleSheet.absoluteFill}>
          <Svg width="100%" height="100%">
            <Defs>
              <LinearGradient id="modalBgGrad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={activeGradient} stopOpacity="1" />
                <Stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0.85" />
                <Stop offset="0.8" stopColor="#FFFFFF" stopOpacity="1" />
                <Stop offset="1" stopColor="#FFFFFF" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#modalBgGrad)" />
          </Svg>
        </View>

        <SafeAreaView style={styles.safeArea}>
          {/* Top Bar: Close Button & Active Streak Indicator */}
          <View style={styles.topBar}>
            <View style={styles.userStreakPill}>
              <ShieldCheckSvg size={15} color={colors.accent} strokeWidth={2} />
              <Text variant="caption" weight="700" color="#0F172A" style={styles.userStreakText}>
                Active: {streak} {streak === 1 ? 'Day' : 'Days'}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={onClose}
              activeOpacity={0.75}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              accessibilityRole="button"
              accessibilityLabel="Close streak badge modal"
            >
              <CloseSvg size={20} color="#0F172A" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* Centered 3D Hexagonal Shield Badge (100% Vector & Fire-Free) */}
            <Animated.View
              style={[
                styles.badgeWrapper,
                {
                  transform: [{ scale: scaleAnim }],
                  opacity: opacityAnim,
                },
              ]}
            >
              <StreakHexagonBadge
                days={displayDays}
                tier={displayTier}
                size={220}
              />
            </Animated.View>

            {/* Title & Epigram Subtitle */}
            <View style={styles.copyBlock}>
              <Text variant="caption" weight="800" style={[styles.tierHeaderLabel, { color: tierInfo.color }]}>
                {tierInfo.badgeLabel}
              </Text>
              <Text variant="h1" style={styles.milestoneTitle}>
                {selectedMilestone.title}
              </Text>
              <Text variant="body" color="#64748B" style={styles.milestoneSubtitle}>
                {selectedMilestone.subtitle}
              </Text>

              {/* Biblical Scripture Grounding */}
              {selectedMilestone.verseQuote ? (
                <View style={styles.scriptureBlock}>
                  <Text variant="caption" color="#475569" style={styles.verseQuoteText}>
                    "{selectedMilestone.verseQuote}"
                  </Text>
                  <Text variant="caption" weight="700" color={colors.accent} style={styles.verseRefText}>
                    — {selectedMilestone.verseRef}
                  </Text>
                </View>
              ) : null}
            </View>

            {/* Unlock Status Row */}
            <View style={styles.statusSection}>
              {isUnlocked ? (
                <View style={styles.statusUnlockedPill}>
                  <CheckSvg size={16} color="#059669" strokeWidth={2.5} />
                  <Text variant="body" weight="700" color="#059669" style={styles.statusUnlockedLabel}>
                    Badge Unlocked
                  </Text>
                </View>
              ) : (
                <View style={styles.statusLockedPill}>
                  <LockSvg size={15} color="#64748B" strokeWidth={2} />
                  <Text variant="body" weight="600" color="#64748B" style={styles.statusLockedLabel}>
                    Locked • {selectedMilestone.days - streak} {selectedMilestone.days - streak === 1 ? 'day' : 'days'} remaining
                  </Text>
                </View>
              )}
            </View>

            {/* Interactive Daily Streak Stepper & Direct Numeric Editor */}
            {onUpdateStreak ? (
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
                ALL STREAK MILESTONES
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.shelfScroll}
              >
                {STREAK_MILESTONES.map((milestone) => {
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
                        />
                      </View>
                      <Text
                        variant="caption"
                        weight={isSelected ? '700' : '600'}
                        color={isSelected ? '#0F172A' : '#64748B'}
                        style={styles.shelfDayText}
                      >
                        {milestone.days}d
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
                })}
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
                  accessibilityLabel="Share streak badge"
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
                accessibilityLabel="Continue daily exegesis"
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
  userStreakPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  userStreakText: {
    marginLeft: 6,
    fontSize: 12,
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
  badgeWrapper: {
    marginTop: 12,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#475569',
  },
  verseRefText: {
    marginTop: 4,
    fontSize: 12,
  },
  statusSection: {
    marginVertical: 10,
    alignItems: 'center',
  },
  statusUnlockedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#ECFDF5',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  statusUnlockedLabel: {
    marginLeft: 6,
    fontSize: 13,
  },
  statusLockedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  statusLockedLabel: {
    marginLeft: 6,
    fontSize: 13,
  },
  // Streak Editor Stepper Styles
  editorSection: {
    width: '100%',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    alignItems: 'center',
    marginVertical: 10,
  },
  editorHeading: {
    fontSize: 11,
    letterSpacing: 0.8,
    marginBottom: 8,
  },
  editorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stepBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnText: {
    fontSize: 20,
    lineHeight: 22,
    textAlign: 'center',
  },
  editorInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: colors.accent,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 110,
    justifyContent: 'center',
  },
  editorInput: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    minWidth: 44,
    padding: 0,
  },
  editorUnitLabel: {
    marginLeft: 4,
    fontSize: 12,
  },
  editorHelper: {
    fontSize: 11,
    marginTop: 6,
    textAlign: 'center',
  },
  shelfSection: {
    width: '100%',
    marginTop: 12,
    marginBottom: 16,
  },
  shelfHeading: {
    fontSize: 11,
    letterSpacing: 1.2,
    marginBottom: 8,
    textAlign: 'left',
    paddingHorizontal: 4,
  },
  shelfScroll: {
    paddingVertical: 4,
    paddingHorizontal: 2,
    gap: 10,
  },
  shelfItem: {
    width: 82,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  shelfItemSelected: {
    borderColor: colors.accent,
    backgroundColor: '#FFFDF0',
  },
  shelfItemLocked: {
    opacity: 0.65,
  },
  shelfBadgeMini: {
    width: 42,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  shelfDayText: {
    fontSize: 12,
  },
  shelfItemTitle: {
    fontSize: 10,
    marginTop: 2,
    textAlign: 'center',
  },
  brandFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  brandFooterPre: {
    fontSize: 13,
    marginRight: 6,
  },
  brandLogo: {
    width: 24,
    height: 24,
    borderRadius: 5,
    marginRight: 6,
  },
  brandFooterName: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
  },
  actionsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
    marginTop: 4,
  },
  shareBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  shareBtnText: {
    marginLeft: 8,
    fontSize: 14,
  },
  continueBtn: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    borderRadius: 14,
    paddingVertical: 14,
  },
  continueBtnFull: {
    flex: 1,
  },
});
