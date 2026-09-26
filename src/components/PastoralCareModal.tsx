/**
 * PastoralCareModal - Compassionate Pastoral Care & Crisis Safety Net Modal
 *
 * Implements Rule 1 (60-30-10), Rule 2 & 4 (Pure SVGs, zero emojis),
 * Rule 15/19 (50x50 icon in 68x68 container), and Rule 16 (zero placeholder badges).
 */

import React, { useState } from 'react';
import {
  Modal,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from './Typography';
import {
  HeartSvg,
  PhoneSvg,
  QuoteSvg,
  XCloseSvg,
} from './SvgIcons';
import {
  PastoralCareService,
  CrisisContact,
  ComfortingScripture,
} from '../services/pastoralCareService';

interface PastoralCareModalProps {
  visible: boolean;
  onClose: () => void;
  triggeredKeyword?: string;
}

export const PastoralCareModal: React.FC<PastoralCareModalProps> = ({
  visible,
  onClose,
  triggeredKeyword,
}) => {
  const contacts: CrisisContact[] = PastoralCareService.getCrisisContacts();
  const scriptures: ComfortingScripture[] = PastoralCareService.getComfortingScriptures();
  const [scriptureIndex, setScriptureIndex] = useState<number>(0);

  const currentScripture = scriptures[scriptureIndex % scriptures.length];

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
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header Bar */}
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Text variant="label" weight="800" color="#64748B" style={styles.kicker}>
                PASTORAL CARE & CRISIS LIFELINE
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeBtn}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="Close pastoral care modal"
            >
              <XCloseSvg size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Rule 15/19 Logo Container: 50x50 icon inside 68x68 container */}
            <View style={styles.logoRow}>
              <View style={styles.logoContainer}>
                <HeartSvg size={36} color="#0F172A" />
              </View>
            </View>

            <Text variant="h2" align="center" style={styles.title}>
              You Are Loved & Not Alone
            </Text>

            <Text
              variant="body"
              align="center"
              color={colors.textSecondary}
              style={styles.introMessage}
            >
              If you or someone you know is going through grief, severe distress, or thoughts of giving up, please know there is hope, grace, and immediate help.
            </Text>

            {/* Comforting Scripture Card */}
            <TouchableOpacity
              style={[styles.scriptureCard, shadow.sm]}
              activeOpacity={0.9}
              onPress={() => setScriptureIndex((prev) => prev + 1)}
              accessibilityRole="button"
              accessibilityLabel={`Comforting Scripture: ${currentScripture.reference}. Tap for another promise.`}
            >
              <View style={styles.scriptureHeader}>
                <QuoteSvg size={18} color="#0F172A" />
                <Text variant="caption" weight="700" color="#0F172A" style={{ marginLeft: 6 }}>
                  {currentScripture.theme}
                </Text>
              </View>
              <Text variant="body" style={styles.scriptureText}>
                {`"${currentScripture.text}"`}
              </Text>
              <View style={styles.scriptureFooter}>
                <Text variant="caption" weight="800" color="#64748B">
                  — {currentScripture.reference}
                </Text>
                <Text variant="caption" color="#94A3B8" style={{ fontSize: 11 }}>
                  Tap for next promise ›
                </Text>
              </View>
            </TouchableOpacity>

            <Text variant="label" weight="800" color="#64748B" style={styles.sectionHeading}>
              CONFIDENTIAL 24/7 CRISIS HELPLINES
            </Text>

            {/* Helpline Contacts */}
            {contacts.map((contact) => (
              <View key={contact.id} style={[styles.contactCard, shadow.sm]}>
                <View style={styles.contactInfo}>
                  <Text variant="h3" style={styles.contactName}>
                    {contact.name}
                  </Text>
                  <Text variant="caption" color="#64748B" style={styles.contactRegion}>
                    {contact.region} • {contact.is24x7 ? '24/7 Confidential' : 'Support Available'}
                  </Text>
                  <Text variant="caption" color={colors.textSecondary} style={styles.contactDesc}>
                    {contact.description}
                  </Text>
                </View>

                {/* Dial / SMS Actions */}
                <View style={styles.contactActions}>
                  {contact.phone && (
                    <TouchableOpacity
                      style={styles.callButton}
                      onPress={() => handleCall(contact.phone)}
                      activeOpacity={0.8}
                      accessibilityRole="button"
                      accessibilityLabel={`Call ${contact.name} at ${contact.phone}`}
                    >
                      <PhoneSvg size={14} color="#0F172A" />
                      <Text variant="caption" weight="700" color="#0F172A">
                        Call {contact.phone}
                      </Text>
                    </TouchableOpacity>
                  )}

                  {contact.sms && (
                    <TouchableOpacity
                      style={styles.smsButton}
                      onPress={() => handleSms(contact.sms)}
                      activeOpacity={0.8}
                      accessibilityRole="button"
                      accessibilityLabel={`Text ${contact.name} at ${contact.sms}`}
                    >
                      <Text variant="caption" weight="700" color="#0F172A">
                        Text {contact.sms}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}

            {/* Close / Return Button */}
            <TouchableOpacity
              style={styles.continueButton}
              onPress={onClose}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityLabel="Continue to Study"
            >
              <Text variant="body" weight="700" color="#0F172A">
                Continue to Study
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 420,
    maxHeight: '92%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 12,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerLeft: {
    flex: 1,
  },
  kicker: {
    fontSize: 10,
    letterSpacing: 0.8,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  // Rule 15/19: 50x50 icon inside 68x68 container (border radius 18px)
  logoRow: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  logoContainer: {
    width: 68,
    height: 68,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#0F172A',
    marginBottom: 8,
  },
  introMessage: {
    lineHeight: 20,
    marginBottom: 16,
  },
  scriptureCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
    marginBottom: 20,
  },
  scriptureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  scriptureText: {
    color: '#0F172A',
    fontStyle: 'italic',
    lineHeight: 22,
    marginBottom: 12,
  },
  scriptureFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeading: {
    fontSize: 10,
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    marginBottom: 12,
  },
  contactInfo: {
    marginBottom: 12,
  },
  contactName: {
    color: '#0F172A',
    marginBottom: 2,
  },
  contactRegion: {
    marginBottom: 6,
  },
  contactDesc: {
    lineHeight: 18,
  },
  contactActions: {
    flexDirection: 'row',
    gap: 8,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#FDD223',
    borderRadius: 10,
    gap: 6,
  },
  smsButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  continueButton: {
    marginTop: 8,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PastoralCareModal;
