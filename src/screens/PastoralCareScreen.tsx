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
import { spacing, radius } from '../theme';
import { Text } from '../components/Typography';
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
        {/* Intro Header - Clean Body Canvas (Zero Icons, Zero Outer Divs) */}
        <View style={styles.introHeader}>
          <Text variant="h2" weight="800" color={colors.textPrimary} style={styles.mainTitle}>
            You Are Never Alone in Christ
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.leadParagraph}>
            In moments of distress, grief, overwhelming anxiety, or spiritual burden, professional crisis workers and pastoral partners stand ready to walk beside you. These confidential lifelines are free and available 24/7.
          </Text>
        </View>

        {/* Comforting Scripture - Seamless Body Typography */}
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

          <View style={styles.scriptureBody}>
            <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.verseReference}>
              {activeScripture.reference}
            </Text>
            <Text variant="body" color={colors.textPrimary} style={styles.verseText}>
              "{activeScripture.text}"
            </Text>
            <Text variant="caption" color={colors.textSecondary} style={styles.devotionalNote}>
              Spiritual Assurance • {activeScripture.theme}
            </Text>
          </View>
        </View>

        {/* 24/7 Crisis Helplines - Part of the Body (No Card Divs, Zero Icons) */}
        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            CONFIDENTIAL 24/7 HELPLINES & CRISIS CARE
          </Text>

          {contacts.map((contact, index) => (
            <View key={contact.id || index} style={styles.contactItem}>
              <View style={styles.contactHeader}>
                <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.contactName}>
                  {contact.name}
                </Text>
                <Text variant="caption" color={colors.textSecondary} style={styles.contactAvailability}>
                  {contact.is24x7 ? '24/7 Support' : 'Support Line'} • {contact.region}
                </Text>
              </View>

              <Text variant="body" color={colors.textSecondary} style={styles.contactDesc}>
                {contact.description}
              </Text>

              <View style={styles.actionsRow}>
                {contact.phone && (
                  <TouchableOpacity
                    style={styles.callBtn}
                    onPress={() => handleCall(contact.phone)}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityLabel={`Call ${contact.name} at ${contact.phone}`}
                  >
                    <Text variant="caption" weight="800" color="#FFFFFF" style={styles.callBtnText}>
                      Call {contact.phone}
                    </Text>
                  </TouchableOpacity>
                )}

                {contact.sms && (
                  <TouchableOpacity
                    style={styles.smsBtn}
                    onPress={() => handleSms(contact.sms)}
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityLabel={`Send SMS to ${contact.name} at ${contact.sms}`}
                  >
                    <Text variant="caption" weight="700" color={colors.textPrimary} style={styles.smsBtnText}>
                      SMS {contact.sms}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {index < contacts.length - 1 && <View style={styles.contactDivider} />}
            </View>
          ))}
        </View>

        {/* Pastoral Benediction - Part of the Body */}
        <View style={[styles.bodySection, { borderBottomWidth: 0 }]}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            A PASTORAL BLESSING
          </Text>
          <View style={styles.prayerBodyBlock}>
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
    paddingHorizontal: spacing.md, // 16px
    paddingTop: spacing.lg,        // 24px
    paddingBottom: 48,
  },
  introHeader: {
    marginBottom: spacing.lg,
  },
  mainTitle: {
    fontSize: 22,
    lineHeight: 28,
    marginBottom: 6,
  },
  leadParagraph: {
    fontSize: 13,
    lineHeight: 20,
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
    letterSpacing: 1.2,
    marginBottom: spacing.sm,
  },
  scriptureBody: {
    paddingVertical: 4,
  },
  verseReference: {
    fontSize: 15,
    marginBottom: 4,
  },
  verseText: {
    fontSize: 14,
    lineHeight: 22,
    fontStyle: 'italic',
    marginBottom: 6,
  },
  devotionalNote: {
    fontSize: 12,
  },
  contactItem: {
    paddingVertical: 10,
  },
  contactHeader: {
    marginBottom: 4,
  },
  contactName: {
    fontSize: 15,
    lineHeight: 20,
  },
  contactAvailability: {
    fontSize: 11,
    marginTop: 2,
  },
  contactDesc: {
    fontSize: 12.5,
    lineHeight: 18,
    marginVertical: 6,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: 6,
  },
  callBtn: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: radius.sm,
    backgroundColor: '#0F172A', // 10% Accent
    alignItems: 'center',
    justifyContent: 'center',
  },
  callBtnText: {
    fontSize: 12,
    letterSpacing: 0.3,
  },
  smsBtn: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: radius.sm,
    backgroundColor: '#FFFFFF', // 30% Surface
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  smsBtnText: {
    fontSize: 12,
  },
  contactDivider: {
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.05)',
    marginTop: 14,
  },
  prayerBodyBlock: {
    paddingVertical: 4,
  },
  prayerBody: {
    fontSize: 13,
    lineHeight: 20,
    fontStyle: 'italic',
    marginBottom: 6,
  },
  prayerRef: {
    fontSize: 11,
  },
});
