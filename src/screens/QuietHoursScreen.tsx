import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import {
  MoonSvg,
  CheckSvg,
  ClockSvg,
} from '../components/SvgIcons';
import { UiverseSwitch } from '../components/UiverseSwitch';
import {
  SabbathConfig,
  SabbathScheduleMode,
  SabbathService,
  DEFAULT_SABBATH_CONFIG,
} from '../services/sabbathService';

const SCHEDULE_MODES: { mode: SabbathScheduleMode; label: string; desc: string }[] = [
  {
    mode: 'sunday',
    label: "The Lord's Day",
    desc: 'Sunday 00:00 – 23:59. Consecrate the first day of the week.',
  },
  {
    mode: 'saturday',
    label: 'Traditional Sabbath',
    desc: 'Friday 18:00 – Saturday 18:00. Seventh-day scriptural rest.',
  },
  {
    mode: 'weekend',
    label: 'Full Weekend Rest',
    desc: 'Friday 18:00 – Sunday 23:59. Unhurried weekend contemplation.',
  },
  {
    mode: 'nightly',
    label: 'Nightly Quiet Hours',
    desc: '21:00 – 07:00 every evening. Peaceful sleep and evening devotion.',
  },
  {
    mode: 'custom',
    label: 'Custom Consecrated Days',
    desc: 'Select individual days to pause non-essential notifications.',
  },
];

const DAYS_OF_WEEK = [
  { day: 0, label: 'Sun' },
  { day: 1, label: 'Mon' },
  { day: 2, label: 'Tue' },
  { day: 3, label: 'Wed' },
  { day: 4, label: 'Thu' },
  { day: 5, label: 'Fri' },
  { day: 6, label: 'Sat' },
];

export default function QuietHoursScreen() {
  const [config, setConfig] = useState<SabbathConfig>(DEFAULT_SABBATH_CONFIG);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    const loaded = await SabbathService.getConfig();
    setConfig(loaded);
  };

  const updateConfig = async (newConfig: SabbathConfig) => {
    setConfig(newConfig);
    setSaving(true);
    try {
      await SabbathService.saveConfig(newConfig);
    } catch (e) {
      console.warn('Failed to save quiet hours config:', e);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleEnabled = (val: boolean) => {
    updateConfig({ ...config, isEnabled: val });
  };

  const handleSelectMode = (mode: SabbathScheduleMode) => {
    updateConfig({ ...config, mode });
  };

  const handleToggleDay = (day: number) => {
    const exists = config.customDays.includes(day);
    const updated = exists
      ? config.customDays.filter((d) => d !== day)
      : [...config.customDays, day].sort();
    updateConfig({ ...config, customDays: updated });
  };

  const handleToggleEmergencyExemption = (val: boolean) => {
    updateConfig({ ...config, allowUrgentVerses: val });
  };

  const formatTime = (h: number, m: number) => {
    const hh = h.toString().padStart(2, '0');
    const mm = m.toString().padStart(2, '0');
    return `${hh}:${mm}`;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Rule 15/19 Logo Container: 50x50 icon inside 68x68 rounded container */}
        <View style={styles.logoRow}>
          <View style={[styles.logoContainer, shadow.sm]}>
            <MoonSvg size={36} color="#0F172A" />
          </View>
        </View>

        {/* Intro Header */}
        <View style={styles.introHeader}>
          <Text variant="h2" weight="800" color={colors.textPrimary} style={styles.mainTitle}>
            Quiet Hours & Sacred Rest
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.leadParagraph}>
            Consecrate peaceful quiet hours by automatically muting daily push reminders, study streak alerts, and background notifications during designated rest windows.
          </Text>
        </View>

        {/* Master Toggle Section */}
        <View style={styles.bodySection}>
          <View style={[styles.masterCard, shadow.sm]}>
            <View style={styles.masterInfo}>
              <Text variant="h3" weight="700" color={colors.textPrimary} style={styles.masterTitle}>
                Quiet Hours Silence
              </Text>
              <Text variant="caption" color={colors.textSecondary} style={styles.masterDesc}>
                {config.isEnabled
                  ? 'Active • Push notifications are muted during rest'
                  : 'Disabled • All scheduled devotions will deliver normally'}
              </Text>
            </View>
            <UiverseSwitch
              value={config.isEnabled}
              onValueChange={handleToggleEnabled}
            />
          </View>
        </View>

        {/* Schedule Modes Section */}
        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            SCHEDULE REST WINDOW
          </Text>

          {SCHEDULE_MODES.map((item) => {
            const isSelected = config.mode === item.mode;
            return (
              <TouchableOpacity
                key={item.mode}
                style={[
                  styles.modeCard,
                  shadow.sm,
                  isSelected && styles.modeCardSelected,
                ]}
                onPress={() => handleSelectMode(item.mode)}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel={`${item.label}. ${item.desc}`}
              >
                <View style={styles.modeCardContent}>
                  <View style={styles.modeTextCol}>
                    <Text variant="h3" weight={isSelected ? '800' : '700'} color={colors.textPrimary} style={styles.modeLabel}>
                      {item.label}
                    </Text>
                    <Text variant="caption" color={colors.textSecondary} style={styles.modeDesc}>
                      {item.desc}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.checkCircle,
                      isSelected && styles.checkCircleSelected,
                    ]}
                  >
                    {isSelected && <CheckSvg size={13} color="#FFFFFF" strokeWidth={2.5} />}
                  </View>
                </View>

                {/* Day selector for custom mode */}
                {item.mode === 'custom' && isSelected && (
                  <View style={styles.customDaysContainer}>
                    <Text variant="caption" weight="700" color={colors.textTertiary} style={styles.customDaysPrompt}>
                      Tap days to silence:
                    </Text>
                    <View style={styles.daysRow}>
                      {DAYS_OF_WEEK.map(({ day, label }) => {
                        const dayActive = config.customDays.includes(day);
                        return (
                          <TouchableOpacity
                            key={day}
                            style={[
                              styles.dayPill,
                              dayActive && styles.dayPillActive,
                            ]}
                            onPress={() => handleToggleDay(day)}
                            activeOpacity={0.7}
                            accessibilityRole="button"
                            accessibilityLabel={`${label}, ${dayActive ? 'silenced' : 'active'}`}
                          >
                            <Text
                              variant="caption"
                              weight="700"
                              color={dayActive ? '#FFFFFF' : colors.textSecondary}
                              style={styles.dayLabel}
                            >
                              {label}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Nightly Time Window Detail */}
        {config.mode === 'nightly' && (
          <View style={styles.bodySection}>
            <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
              NIGHTLY WINDOW HOURS
            </Text>
            <View style={[styles.timeWindowCard, shadow.sm]}>
              <View style={styles.timeIconBadge}>
                <ClockSvg size={18} color="#0F172A" />
              </View>
              <View style={styles.timeTextBox}>
                <Text variant="h3" weight="700" color={colors.textPrimary} style={styles.timeTitle}>
                  {formatTime(config.startHour, config.startMinute)} to {formatTime(config.endHour, config.endMinute)}
                </Text>
                <Text variant="caption" color={colors.textSecondary} style={styles.timeDesc}>
                  Notifications delivered during this window will be quietly queued.
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Safety & Pastoral Exemption */}
        <View style={[styles.bodySection, { borderBottomWidth: 0 }]}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            SAFETY & EMERGENCY EXEMPTIONS
          </Text>

          <View style={[styles.masterCard, shadow.sm]}>
            <View style={styles.masterInfo}>
              <Text variant="h3" weight="700" color={colors.textPrimary} style={styles.masterTitle}>
                Allow Pastoral & Crisis Alerts
              </Text>
              <Text variant="caption" color={colors.textSecondary} style={styles.masterDesc}>
                Never mute 24/7 emergency support, pastoral care responses, or security alerts.
              </Text>
            </View>
            <UiverseSwitch
              value={config.allowUrgentVerses}
              onValueChange={handleToggleEmergencyExemption}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background, // 60% Dominant Canvas #F8FAFC
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: 48,
  },
  logoRow: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  logoContainer: {
    width: 68,
    height: 68,
    borderRadius: 18,
    backgroundColor: colors.surface, // 30% Panel #FFFFFF
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  introHeader: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  mainTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 4,
  },
  leadParagraph: {
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    color: colors.textSecondary,
  },
  bodySection: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
    paddingBottom: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    fontSize: 10,
    letterSpacing: 0.6,
    marginBottom: spacing.sm,
  },
  masterCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  masterInfo: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  masterTitle: {
    fontSize: 14,
  },
  masterDesc: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  modeCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    marginBottom: spacing.sm,
  },
  modeCardSelected: {
    borderColor: 'rgba(15, 23, 42, 0.35)',
  },
  modeCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modeTextCol: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  modeLabel: {
    fontSize: 14,
  },
  modeDesc: {
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1.5,
    borderColor: 'rgba(15, 23, 42, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkCircleSelected: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  customDaysContainer: {
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.06)',
  },
  customDaysPrompt: {
    fontSize: 11,
    marginBottom: 4,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  },
  dayPill: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  dayPillActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  dayLabel: {
    fontSize: 11,
  },
  timeWindowCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  timeTextBox: {
    flex: 1,
  },
  timeTitle: {
    fontSize: 14,
  },
  timeDesc: {
    fontSize: 11.5,
    marginTop: 2,
  },
});
