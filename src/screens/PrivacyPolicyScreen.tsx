import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme';
import { Text } from '../components/Typography';

export default function PrivacyPolicyScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      {/* Main Scroll Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Document Intro */}
        <View style={styles.introHeader}>
          <Text variant="caption" color={colors.textSecondary} style={styles.lastUpdated}>
            Effective Date: September 20, 2026 • Version 1.0.1
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.leadParagraph}>
            Your spiritual journey, personal study reflections, and privacy are sacred to us. This Privacy Policy details the exact nature of data we collect, how it is safeguarded across our secure Supabase infrastructure, and your absolute rights regarding your personal information.
          </Text>
        </View>

        {/* Section 1 */}
        <View style={styles.sectionBlock}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            1. Our Foundational Privacy Pledge
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            At exégeomai, we believe your walk in Scripture should be completely free from commercial exploitation, intrusive behavioural tracking, and invasive advertising algorithms. We make three unconditional pledges to every student of the Word:
          </Text>
          <View style={styles.bulletList}>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Zero Advertising Trackers:</Text> We do not integrate commercial ad networks, third-party data brokers, or monetization surveillance scripts.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>We Never Sell Your Data:</Text> Your personal identification, spiritual cadence, study notes, and reading history are never sold, rented, or bartered to any entity under any circumstances.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Strict Data Minimization:</Text> We only request and retain information directly necessary to provide your personalized study experience and secure account sync.
            </Text>
          </View>
        </View>

        {/* Section 2 */}
        <View style={styles.sectionBlock}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            2. Categories of Information We Collect
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            Depending on your level of interaction with the application, we collect the following limited categories of data:
          </Text>
          <View style={styles.bulletList}>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Account Credentials:</Text> Email address, hashed password (processed exclusively through Supabase Auth cryptographic salt hashing; we never see or store plain-text passwords), first name, surname, and chosen username handle.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Study Journey Preferences:</Text> Preferred Bible translation (e.g. ESV, KJV, NASB, NIV, CSB), theological study focus area (e.g. Original Languages, Historical Context, Daily Devotions), study stage, and daily commitment cadence.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Engagement & Synchronization Data:</Text> Favorited biblical facts, saved scripture verses, completed Word of the Day (WOTD) devotionals, and current daily study streak count.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Profile Avatars:</Text> User-selected profile pictures, compressed locally into high-efficiency AVIF format (`image/avif`) before transmission to private Supabase Storage buckets.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Device Notification Tokens:</Text> Expo Push Notification tokens generated when you explicitly opt-in to receive daily morning verse alerts and study streak reminders.
            </Text>
          </View>
        </View>

        {/* Section 3 */}
        <View style={styles.sectionBlock}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            3. How We Process & Utilize Your Information
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            All processed data directly serves the spiritual study functionality of the application:
          </Text>
          <View style={styles.bulletList}>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • Authenticating your identity and maintaining your active login session across app reloads.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • Synchronizing your bookmarks, streaks, and favorites across multiple devices.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • Tailoring the discovery feed to your preferred translation and theological study priorities.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • Dispatching punctual, non-intrusive devotional notifications at your designated daily study hour.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • Delivering Over-the-Air application updates, bug fixes, and critical security patches.
            </Text>
          </View>
        </View>

        {/* Section 4 */}
        <View style={styles.sectionBlock}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            4. Image & Media Handling (AVIF Avatar Pipeline)
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            When you update your profile photo:
          </Text>
          <View style={styles.bulletList}>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • We request standard system camera roll access strictly for selecting the photo you designate. We never scan, analyze, or harvest unselected photos or metadata from your device library.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • Selected images are immediately resized and transcoded directly on your device via `expo-image-manipulator` into compressed AVIF format (`image/avif`) under 50KB.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • Transcoded avatars are uploaded to the dedicated Supabase Storage bucket ('avatars') scoped strictly to your unique authenticated user UUID ('user_id/avatar_timestamp.avif').
            </Text>
          </View>
        </View>

        {/* Section 5 */}
        <View style={styles.sectionBlock}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            5. Database Security & Row-Level Security (RLS)
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            Our cloud persistence architecture is hosted on enterprise-grade Supabase infrastructure (AWS Frankfurt, EU Central):
          </Text>
          <View style={styles.bulletList}>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Row-Level Security (RLS):</Text> Every database table containing personal information (`profiles`, `user_favorites`, `user_wotd_completions`, `user_study_streaks`) enforces strict PostgreSQL Row Level Security policies. Users can only query, insert, or modify rows matching their own verified authenticated UID (`auth.uid() = user_id`).
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Encryption in Transit & at Rest:</Text> All data in transit is encrypted using Transport Layer Security (TLS 1.3 / HTTPS). Database volumes and storage buckets are encrypted at rest using AES-256 standards.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Local Storage Security:</Text> Client-side cache utilizes React Native `AsyncStorage` scoped exclusively to the application sandbox on your physical device.
            </Text>
          </View>
        </View>

        {/* Section 6 */}
        <View style={styles.sectionBlock}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            6. Push Notification Governance
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            Daily study reminders and Word of the Day alerts require your explicit permission:
          </Text>
          <View style={styles.bulletList}>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • Notification permissions are requested via the standard operating system prompt upon registration or within the Profile tab.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • You may toggle notification delivery on or off at any moment directly from your Profile settings or within your device operating system settings.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • Notifications are strictly devotional and educational; we never broadcast commercial solicitations or marketing sponsor messages.
            </Text>
          </View>
        </View>

        {/* Section 7 */}
        <View style={styles.sectionBlock}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            7. Third-Party Service Providers
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            We partner with a limited number of trusted, privacy-compliant infrastructure providers to operate the application:
          </Text>
          <View style={styles.bulletList}>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Supabase Inc.:</Text> Provides managed PostgreSQL database, authentication services, and secure object storage under SOC2 Type II compliance standards.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Expo / 650 Industries:</Text> Powers our Over-the-Air (OTA) update delivery and push notification gateway infrastructure.
            </Text>
          </View>
        </View>

        {/* Section 8 */}
        <View style={styles.sectionBlock}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            8. Your Rights: Access, Portability & Deletion
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            In compliance with global data privacy regulations (including GDPR, UK GDPR, and CCPA/CPRA), you maintain complete sovereign control over your personal data:
          </Text>
          <View style={styles.bulletList}>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Right to Access:</Text> You may request a complete export of all data associated with your profile at any time.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Right to Rectification:</Text> You can modify your name, username, study preferences, and avatar directly from the Profile tab.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Right to Erasure (Forget Me):</Text> You have the right to permanent deletion of your account. Tapping "Delete Account" in the Profile tab or submitting a request permanently expunges your authentication record, profile entries, favorites, study streaks, and avatar media across all active database tables and storage buckets within 30 days.
            </Text>
          </View>
        </View>

        {/* Section 9 */}
        <View style={styles.sectionBlock}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            9. Protection of Children's Privacy
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            exégeomai does not knowingly collect or solicit personal identifiable information from children under 13 years of age. If we discover that personal data of a minor under 13 has been collected without verifiable parental consent, we will promptly excise such records from our database servers.
          </Text>
        </View>

        {/* Section 10 */}
        <View style={styles.sectionBlock}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            10. Policy Evolution & Notifications
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            As our biblical exegesis features, lexical resources, and language tools expand, we may update this Privacy Policy to reflect technical enhancements. Changes will be published within the app with an updated "Effective Date." Substantial changes impacting how your data is handled will be accompanied by explicit in-app notification before taking effect.
          </Text>
        </View>

        {/* Section 11: Contact */}
        <View style={[styles.sectionBlock, styles.contactCard]}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            11. Data Protection Officer & Privacy Inquiries
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            For any questions, data export requests, privacy concerns, or GDPR/CCPA inquiries, please contact our dedicated Data Protection Officer:
          </Text>
          <View style={styles.contactDetails}>
            <Text variant="body" weight="700" color={colors.textPrimary}>
              exégeomai Privacy & Data Protection Office
            </Text>
            <Text variant="body" color={colors.textSecondary}>
              Email: privacy@exegeomai.org • dpo@exegeomai.org
            </Text>
            <Text variant="body" color={colors.textSecondary}>
              Web: https://github.com/thulanesigasa/bible_fun_facts
            </Text>
          </View>
        </View>

        {/* Section 12: Ministerial & Church Leadership Data Governance */}
        <View style={styles.sectionBlock}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            12. Ministerial &amp; Church Leadership Data Governance
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            The exégeomai application includes a global church and assembly directory feature that allows ordained leaders, church administrators, and their authorized representatives to register their ministry headquarters, branch locations, homecells, and cell clusters in our fellowship database. This section governs the collection, processing, and display of all ministerial and ecclesiastical identity information.
          </Text>

          <Text variant="body" weight="700" color={colors.textPrimary} style={[styles.sectionBody, { marginTop: 12 }]}>
            12.1 Categories of Ministerial Data Collected
          </Text>
          <View style={styles.bulletList}>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Pastor &amp; Clergy Identity:</Text> First and last names of branch leaders, elders, cell group overseers, and their designated pastoral representatives as voluntarily submitted.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Official Contact Numbers:</Text> Mobile and landline telephone numbers of branch leadership for pastoral care and assembly coordination purposes.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Email Addresses:</Text> Pastoral and administrative email addresses of church leadership where voluntarily provided.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Physical Assembly Locations:</Text> Street addresses, building names, town/city, province/state, country, and postal codes of church premises, campuses, branch venues, and homecell meeting points.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>GPS Coordinates:</Text> Latitude/longitude coordinates associated with registered church locations, used to power native device map navigation (Google Maps, Apple Maps) — never stored as background telemetry.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Service Times &amp; Meeting Schedules:</Text> Days of the week, service hours, and gathering frequencies for each registered assembly or cell group.
            </Text>
          </View>

          <Text variant="body" weight="700" color={colors.textPrimary} style={[styles.sectionBody, { marginTop: 12 }]}>
            12.2 Purpose of Processing Church &amp; Leadership Data
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            All ministerial data is collected and processed exclusively for the following legitimate faith-community purposes:
          </Text>
          <View style={styles.bulletList}>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Fellowship Discovery:</Text> Enabling believers to locate churches, branches, and homecells in their geographical area for the purpose of fellowship, worship, and communal Scripture study.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Pastoral Care Access:</Text> Connecting individuals seeking spiritual counselling, prayer support, or pastoral guidance with verified local church leadership.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Turn-by-Turn Navigation:</Text> Passing verified location coordinates to your device's native mapping application (Google Maps, Apple Maps, or equivalent) to provide accurate physical directions to church premises. We do not retain navigation session data.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Global Directory Transparency:</Text> Providing the global body of Christ with an open, searchable, and verifiable record of active churches and assemblies for cross-denominational awareness.
            </Text>
          </View>

          <Text variant="body" weight="700" color={colors.textPrimary} style={[styles.sectionBody, { marginTop: 12 }]}>
            12.3 Lawful Basis for Processing
          </Text>
          <View style={styles.bulletList}>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>GDPR (EU/EEA):</Text> Processing is based on Article 6(1)(a) — Consent of the data subject (the leader or administrator who voluntarily submits the registration) and Article 6(1)(f) — Legitimate Interests, being the legitimate interest of the faith community in locating and connecting with verified local assemblies.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>POPIA (South Africa):</Text> Processing is lawful under Section 11 of the Protection of Personal Information Act 4 of 2013 on the basis of (a) consent of the data subject and (f) the legitimate interests of the responsible party (exégeomai) or the third-party community beneficiaries, where such interests are not overridden by the data subject's rights.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Representation Authority:</Text> By submitting a church or branch registration, the submitting individual warrants and represents that they have the authority, mandate, or delegation of their church leadership to provide the information submitted and consent to its display in the exégeomai directory.
            </Text>
          </View>

          <Text variant="body" weight="700" color={colors.textPrimary} style={[styles.sectionBody, { marginTop: 12 }]}>
            12.4 Rights of Church Leadership &amp; Administrators
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            Pastors, elders, church administrators, and any person whose identity appears in the exégeomai assembly directory have the following enforceable rights, exercisable at any time without penalty:
          </Text>
          <View style={styles.bulletList}>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Right to Rectification:</Text> You may request the immediate correction of any inaccurate church name, address, leader name, contact number, email address, service times, or GPS location data associated with your assembly.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Right to Erasure (Delisting):</Text> Any registered church, branch, homecell, or cell cluster may be permanently removed from the exégeomai directory upon written request. Delisting will be processed within 72 hours of receipt and verification of authority.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Right to Access:</Text> You may request a complete export of all data held about your ministry or assembly in the exégeomai database.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Right to Object:</Text> You may object to the display of your personal clerical identity or contact information at any time without requiring justification.
            </Text>
          </View>

          <Text variant="body" color={colors.textSecondary} style={[styles.sectionBody, { marginTop: 8 }]}>
            To exercise any of these rights, please contact our Ministry Care team directly:
          </Text>
          <View style={styles.contactDetails}>
            <Text variant="body" weight="700" color={colors.textPrimary}>
              Ministry Care &amp; Directory Rights
            </Text>
            <Text variant="body" color={colors.textSecondary}>
              Email: ministry-care@exegeomai.org
            </Text>
            <Text variant="body" color={colors.textSecondary}>
              Data Protection: dpo@exegeomai.org
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
    backgroundColor: colors.background, // 60% dominant background (#F8FAFC)
  },
  scrollContent: {
    paddingHorizontal: spacing.lg, // 24px
    paddingTop: spacing.lg, // 24px
    paddingBottom: spacing.xxl, // 48px
  },
  introHeader: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  lastUpdated: {
    fontSize: 12,
    marginBottom: spacing.md,
    letterSpacing: 0.4,
  },
  leadParagraph: {
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
  },
  sectionBlock: {
    marginBottom: spacing.xl, // 32px
  },
  sectionHeading: {
    fontSize: 16,
    marginBottom: spacing.sm, // 8px
    letterSpacing: -0.2,
  },
  sectionBody: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: spacing.sm, // 8px
  },
  bulletList: {
    marginTop: 4,
    paddingLeft: spacing.sm,
  },
  bulletItem: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: spacing.sm, // 8px
  },
  contactCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: spacing.sm,
  },
  contactDetails: {
    marginTop: spacing.sm,
    gap: 4,
  },
});
