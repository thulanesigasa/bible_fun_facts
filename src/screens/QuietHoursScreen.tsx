import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme';
import { Text } from '../components/Typography';
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
  const [, setSaving] = useState(false);

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
        {/* Intro Header - Seamless Body Canvas */}
        <View style={styles.headerBlock}>
          <Text variant="h2" weight="800" color={colors.textPrimary} style={styles.title}>
            Quiet Hours & Sacred Rest
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
            Consecrate peaceful quiet hours by automatically muting daily push reminders, study streak alerts, and background notifications during designated rest windows.
          </Text>
        </View>

        {/* Master Toggle Section */}
        <View style={styles.sectionBlock}>
          <View style={styles.actionRow}>
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Quiet Hours Silence
              </Text>
              <Text variant="caption" color={colors.textSecondary} style={styles.rowDescription}>
                {config.isEnabled
                  ? 'Active • Push notifications are muted during rest windows'
                  : 'Disabled • All scheduled devotions deliver normally'}
              </Text>
            </View>
            <UiverseSwitch
              value={config.isEnabled}
              onValueChange={handleToggleEnabled}
            />
          </View>
        </View>

        {/* Schedule Modes Section */}
        <View style={styles.sectionBlock}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            SCHEDULE REST WINDOW
          </Text>

          {SCHEDULE_MODES.map((item, index) => {
            const isSelected = config.mode === item.mode;
            return (
              <View key={item.mode}>
                <TouchableOpacity
                  style={styles.selectableRow}
                  onPress={() => handleSelectMode(item.mode)}
                  activeOpacity={0.75}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                  accessibilityLabel={`${item.label}. ${item.desc}`}
                >
                  <View style={styles.rowTitleBox}>
                    <Text
                      variant="h3"
                      weight={isSelected ? '800' : '700'}
                      color={colors.textPrimary}
                      style={styles.rowTitle}
                    >
                      {item.label}
                    </Text>
                    <Text variant="caption" color={colors.textSecondary} style={styles.rowDescription}>
                      {item.desc}
                    </Text>
                  </View>
                  <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
                    {isSelected && <View style={styles.radioInnerDot} />}
                  </View>
                </TouchableOpacity>

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

                {index < SCHEDULE_MODES.length - 1 && <View style={styles.rowDivider} />}
              </View>
            );
          })}
        </View>

        {/* Nightly Time Window Detail */}
        {config.mode === 'nightly' && (
          <View style={styles.sectionBlock}>
            <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
              NIGHTLY WINDOW HOURS
            </Text>
            <View style={styles.specRow}>
              <Text variant="caption" weight="700" color={colors.textPrimary} style={styles.specLabel}>
                Silence Window
              </Text>
              <Text variant="caption" weight="800" color={colors.textPrimary} style={styles.specValue}>
                {formatTime(config.startHour, config.startMinute)} – {formatTime(config.endHour, config.endMinute)}
              </Text>
            </View>
            <Text variant="caption" color={colors.textSecondary} style={styles.specNote}>
              Notifications scheduled during this nightly window will be quietly queued.
            </Text>
          </View>
        )}

        {/* Safety & Pastoral Exemption */}
        <View style={[styles.sectionBlock, { borderBottomWidth: 0 }]}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            SAFETY & EMERGENCY EXEMPTIONS
          </Text>

          <View style={styles.actionRow}>
            <View style={styles.rowTitleBox}>
              <Text variant="h3" style={styles.rowTitle}>
                Allow Pastoral & Crisis Alerts
              </Text>
              <Text variant="caption" color={colors.textSecondary} style={styles.rowDescription}>
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
    paddingHorizontal: spacing.md, // 16px
    paddingTop: spacing.lg,        // 24px
    paddingBottom: 48,
  },
  headerBlock: {
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 19,
  },
  sectionBlock: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
    paddingBottom: spacing.lg,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    letterSpacing: 1.2,
    marginBottom: spacing.md,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  rowTitleBox: {
    flex: 1,
    paddingRight: spacing.md,
  },
  rowTitle: {
    color: colors.textPrimary,
    marginBottom: 3,
  },
  rowDescription: {
    fontSize: 12,
    lineHeight: 17,
  },
  selectableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: '#0F172A',
  },
  radioInnerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0F172A',
  },
  rowDivider: {
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.05)',
  },
  customDaysContainer: {
    paddingBottom: spacing.sm,
    paddingTop: 4,
  },
  customDaysPrompt: {
    fontSize: 11,
    marginBottom: 8,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  },
  dayPill: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.1)',
  },
  dayPillActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  dayLabel: {
    fontSize: 11,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
  },
  specLabel: {
    fontSize: 12,
  },
  specValue: {
    fontSize: 12,
  },
  specNote: {
    fontSize: 11,
    marginTop: 4,
    lineHeight: 16,
  },
});
