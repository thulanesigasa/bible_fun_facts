import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from './Typography';
import {
  XCloseSvg,
  MoonSvg,
  CheckSvg,
  ClockSvg,
} from './SvgIcons';
import { UiverseSwitch } from './UiverseSwitch';
import {
  SabbathConfig,
  SabbathScheduleMode,
  SabbathService,
  DEFAULT_SABBATH_CONFIG,
} from '../services/sabbathService';

interface SabbathModalProps {
  visible: boolean;
  onClose: () => void;
  onConfigUpdated?: (config: SabbathConfig) => void;
}

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

export const SabbathModal: React.FC<SabbathModalProps> = ({
  visible,
  onClose,
  onConfigUpdated,
}) => {
  const [config, setConfig] = useState<SabbathConfig>(DEFAULT_SABBATH_CONFIG);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (visible) {
      loadConfig();
    }
  }, [visible]);

  const loadConfig = async () => {
    const loaded = await SabbathService.getConfig();
    setConfig(loaded);
  };

  const handleToggleEnabled = (val: boolean) => {
    setConfig((prev) => ({ ...prev, isEnabled: val }));
  };

  const handleSelectMode = (mode: SabbathScheduleMode) => {
    setConfig((prev) => ({ ...prev, mode }));
  };

  const handleToggleDay = (day: number) => {
    setConfig((prev) => {
      const exists = prev.customDays.includes(day);
      const customDays = exists
        ? prev.customDays.filter((d) => d !== day)
        : [...prev.customDays, day];
      return { ...prev, customDays };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    await SabbathService.saveConfig(config);
    if (onConfigUpdated) {
      onConfigUpdated(config);
    }
    setSaving(false);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalCard, shadow.lg]}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <View style={styles.iconCircle}>
                <MoonSvg size={20} color="#0F172A" />
              </View>
              <View>
                <Text variant="h3" style={styles.titleText}>
                  Digital Sabbath
                </Text>
                <Text variant="caption" color={colors.textSecondary}>
                  Consecrated rest & quiet hours
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={onClose}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Close Digital Sabbath modal"
            >
              <XCloseSvg size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Master Toggle */}
            <View style={styles.toggleRow}>
              <View style={styles.toggleTextWrap}>
                <Text variant="body" weight="700" color="#0F172A">
                  Enable Digital Sabbath
                </Text>
                <Text variant="caption" color={colors.textSecondary} style={{ marginTop: 2 }}>
                  Silences non-essential push alerts during chosen rest hours
                </Text>
              </View>
              <UiverseSwitch
                value={config.isEnabled}
                onValueChange={handleToggleEnabled}
              />
            </View>

            {config.isEnabled && (
              <>
                <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.sectionHeader}>
                  SELECT REST SCHEDULE
                </Text>

                {SCHEDULE_MODES.map((item) => {
                  const isSelected = config.mode === item.mode;
                  return (
                    <TouchableOpacity
                      key={item.mode}
                      style={[styles.modeCard, isSelected && styles.modeCardActive]}
                      onPress={() => handleSelectMode(item.mode)}
                      activeOpacity={0.8}
                    >
                      <View style={styles.modeCardLeft}>
                        <View style={[styles.radioCircle, isSelected && styles.radioCircleActive]}>
                          {isSelected && <View style={styles.radioDot} />}
                        </View>
                        <View style={styles.modeTextWrap}>
                          <Text variant="body" weight="700" color="#0F172A">
                            {item.label}
                          </Text>
                          <Text variant="caption" color={colors.textSecondary} style={{ marginTop: 2 }}>
                            {item.desc}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                })}

                {/* Custom Days Picker */}
                {config.mode === 'custom' && (
                  <View style={styles.customDaysContainer}>
                    <Text variant="caption" weight="700" color={colors.textSecondary} style={{ marginBottom: 8 }}>
                      SELECT DAYS OF REST:
                    </Text>
                    <View style={styles.daysRow}>
                      {DAYS_OF_WEEK.map((d) => {
                        const isDaySelected = config.customDays.includes(d.day);
                        return (
                          <TouchableOpacity
                            key={d.day}
                            style={[styles.dayChip, isDaySelected && styles.dayChipActive]}
                            onPress={() => handleToggleDay(d.day)}
                            activeOpacity={0.7}
                          >
                            <Text
                              variant="caption"
                              weight="700"
                              color={isDaySelected ? '#0F172A' : colors.textSecondary}
                            >
                              {d.label}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                )}

                {/* Scripture Blessing */}
                <View style={styles.scriptureCard}>
                  <Text variant="caption" weight="700" color="#0F172A" style={{ marginBottom: 4 }}>
                    Genesis 2:2–3
                  </Text>
                  <Text variant="caption" color={colors.textSecondary} style={styles.verseQuote}>
                    "By the seventh day God had finished the work He had been doing; so on the seventh day He rested from all His work. And God blessed the seventh day and made it holy."
                  </Text>
                </View>
              </>
            )}
          </ScrollView>

          {/* Footer Save Action */}
          <View style={styles.footerRow}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text variant="caption" weight="700" color={colors.textSecondary}>
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleSave}
              disabled={saving}
              activeOpacity={0.85}
            >
              <Text variant="body" weight="800" color="#0F172A">
                {saving ? 'Saving...' : 'Save Rest Window'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)', // 60-30-10 dark backdrop
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '85%',
    backgroundColor: '#FFFFFF', // 30% Panel Surface
    borderRadius: radius.xl,
    padding: spacing.lg,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.08)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  titleText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    maxHeight: 460,
  },
  scrollContent: {
    paddingVertical: spacing.md,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    padding: spacing.md,
    borderRadius: radius.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  toggleTextWrap: {
    flex: 1,
    paddingRight: 12,
  },
  sectionHeader: {
    fontSize: 10,
    letterSpacing: 1.2,
    marginBottom: 8,
    marginTop: 6,
  },
  modeCard: {
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    marginBottom: 8,
  },
  modeCardActive: {
    borderColor: '#0F172A',
    backgroundColor: '#F8FAFC',
  },
  modeCardLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  radioCircleActive: {
    borderColor: '#0F172A',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0F172A',
  },
  modeTextWrap: {
    flex: 1,
  },
  customDaysContainer: {
    marginTop: 8,
    marginBottom: 12,
    padding: spacing.md,
    backgroundColor: '#F8FAFC',
    borderRadius: radius.md,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
  },
  dayChip: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayChipActive: {
    backgroundColor: '#FDD223',
    borderColor: '#FDD223',
  },
  scriptureCard: {
    backgroundColor: '#FEFCE8',
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(253, 210, 35, 0.3)',
  },
  verseQuote: {
    fontStyle: 'italic',
    lineHeight: 18,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.08)',
  },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  saveBtn: {
    backgroundColor: '#FDD223', // 10% Accent
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: radius.md,
    minWidth: 130,
    alignItems: 'center',
  },
});
