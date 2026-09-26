import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import {
  HeartSvg,
  PhoneSvg,
  QuoteSvg,
} from '../components/SvgIcons';
import {
  PastoralCareService,
  CrisisContact,
  ComfortingScripture,
} from '../services/pastoralCareService';

export default function PastoralCareScreen() {
  const contacts: CrisisContact[] = PastoralCareService.getCrisisContacts();
  const scriptures: ComfortingScripture[] = PastoralCareService.getComfortingScriptures();
  const [selectedScriptureIndex, setSelectedScriptureIndex] = useState<number>(0);

  const activeScripture = scriptures[selectedScriptureIndex % scriptures.length];

  const handleCall = (phone?: string) => {
    if (!phone) return;
    Linking.openURL(`tel:${phone}`).catch((err) =>
      console.warn('Unable to open phone dialer:', err)
    );
  };

  const handleSms = (sms?: string) => {
    if (!sms) return;
    const url = Platform.OS === 'ios' ? `sms:${sms}` : `sms:${sms}?body=`;
    Linking.openURL(url).catch((err) =>
      console.warn('Unable to open SMS app:', err)
    );
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
            <HeartSvg size={36} color="#0F172A" />
          </View>
        </View>

        {/* Intro Header */}
        <View style={styles.introHeader}>
          <Text variant="h2" weight="800" color={colors.textPrimary} style={styles.mainTitle}>
            You Are Never Alone in Christ
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.leadParagraph}>
            In moments of distress, grief, overwhelming anxiety, or isolation, Christ's Church and professional care partners stand ready to walk beside you. These confidential lifelines are free and available 24/7.
          </Text>
        </View>

        {/* Comforting Scripture Promise Card */}
        <View style={styles.bodySection}>
          <View style={styles.sectionHeaderRow}>
            <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
              COMFORT FROM SACRED SCRIPTURE
            </Text>
            <TouchableOpacity
              onPress={() => setSelectedScriptureIndex((prev) => (prev + 1) % scriptures.length)}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Show next comforting scripture"
            >
              <Text variant="caption" weight="700" color={colors.textSecondary}>
                Next Promise ›
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.scriptureCard, shadow.sm]}>
            <View style={styles.quoteIconBadge}>
              <QuoteSvg size={20} color={colors.accent} />
            </View>
            <Text variant="h3" weight="700" color={colors.textPrimary} style={styles.verseReference}>
              {activeScripture.reference}
            </Text>
            <Text variant="body" color={colors.textPrimary} style={styles.verseText}>
              "{activeScripture.text}"
            </Text>
            <View style={styles.devotionalDivider} />
            <Text variant="caption" color={colors.textSecondary} style={styles.devotionalNote}>
              Spiritual Assurance • {activeScripture.theme}
            </Text>
          </View>
        </View>

        {/* 24/7 Crisis Helplines */}
        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            CONFIDENTIAL 24/7 HELPLINES & CRISIS CARE
          </Text>

          {contacts.map((contact, index) => (
            <View key={contact.id || index} style={[styles.contactCard, shadow.sm]}>
              <View style={styles.contactHeader}>
                <View style={styles.contactTitleBox}>
                  <Text variant="h3" weight="700" color={colors.textPrimary} style={styles.contactName}>
                    {contact.name}
                  </Text>
                  <Text variant="caption" color={colors.textSecondary} style={styles.contactAvailability}>
                    {contact.is24x7 ? '24/7 Crisis Support' : 'Support Line'} • {contact.region}
                  </Text>
                </View>
              </View>

              <Text variant="body" color={colors.textSecondary} style={styles.contactDesc}>
                {contact.description}
              </Text>

              <View style={styles.actionsRow}>
                {contact.phone && (
                  <TouchableOpacity
                    style={[styles.primaryCallBtn, shadow.sm]}
                    onPress={() => handleCall(contact.phone)}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityLabel={`Call ${contact.name} at ${contact.phone}`}
                  >
                    <PhoneSvg size={16} color="#FFFFFF" strokeWidth={2} />
                    <Text variant="caption" weight="700" color="#FFFFFF" style={styles.btnText}>
                      Call {contact.phone}
                    </Text>
                  </TouchableOpacity>
                )}

                {contact.sms && (
                  <TouchableOpacity
                    style={[styles.secondarySmsBtn, shadow.sm]}
                    onPress={() => handleSms(contact.sms)}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityLabel={`Send SMS to ${contact.name} at ${contact.sms}`}
                  >
                    <Text variant="caption" weight="700" color={colors.textPrimary} style={styles.btnText}>
                      SMS {contact.sms}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Pastoral Benediction Card */}
        <View style={[styles.bodySection, { borderBottomWidth: 0 }]}>
          <View style={[styles.prayerCard, shadow.sm]}>
            <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.prayerTitle}>
              A Pastoral Prayer of Blessing
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.prayerBody}>
              "The Lord bless you and keep you; the Lord make His face shine upon you and be gracious to you; the Lord lift up His countenance upon you and give you peace."
            </Text>
            <Text variant="caption" weight="700" color={colors.textTertiary} style={styles.prayerRef}>
              Numbers 6:24–26
            </Text>
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
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  sectionHeader: {
    fontSize: 10,
    letterSpacing: 0.6,
  },
  scriptureCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  quoteIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(253, 210, 35, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  verseReference: {
    fontSize: 15,
    marginBottom: 6,
  },
  verseText: {
    fontSize: 14,
    lineHeight: 21,
    fontStyle: 'italic',
    marginBottom: spacing.sm,
  },
  devotionalDivider: {
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
    marginVertical: 4,
  },
  devotionalNote: {
    fontSize: 12,
    lineHeight: 17,
  },
  contactCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    marginBottom: spacing.sm,
  },
  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  contactTitleBox: {
    flex: 1,
  },
  contactName: {
    fontSize: 14,
  },
  contactAvailability: {
    fontSize: 11,
    marginTop: 2,
  },
  contactDesc: {
    fontSize: 12.5,
    lineHeight: 18,
    marginVertical: 4,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  primaryCallBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#0F172A', // 10% Primary Accent
    paddingVertical: 10,
    borderRadius: radius.sm,
  },
  secondarySmsBtn: {
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.16)',
    borderRadius: radius.sm,
  },
  btnText: {
    fontSize: 12,
  },
  prayerCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    alignItems: 'center',
  },
  prayerTitle: {
    fontSize: 14,
    marginBottom: 6,
    textAlign: 'center',
  },
  prayerBody: {
    fontSize: 13,
    lineHeight: 19,
    fontStyle: 'italic',
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  prayerRef: {
    fontSize: 11,
  },
});
