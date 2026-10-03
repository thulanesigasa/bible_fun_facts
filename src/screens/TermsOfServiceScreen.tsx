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

export default function TermsOfServiceScreen() {
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
            Welcome to exégeomai. By downloading, accessing, or using our mobile application, website, and related biblical study services, you acknowledge that you have read, understood, and agree to be bound by the following comprehensive Terms of Service.
          </Text>
        </View>

        {/* Section 1 */}
        <View style={styles.sectionBlock}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            1. Acceptance and Scope of Agreement
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "Student," or "You") and the exégeomai Project ("exégeomai," "We," "Us," or "Our"). These Terms govern your complete access to and utilization of the exégeomai application, including daily biblical insights, Word of the Day (WOTD) devotionals, Greek and Hebrew linguistic lexicons, cross-referenced scripture databases, community profiles, cloud synchronization, and all associated software services.
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            If you do not agree to every provision within these Terms, you must discontinue your access and uninstall the application immediately. Continued use of the platform denotes irrevocable acceptance of all active clauses.
          </Text>
        </View>

        {/* Section 2 */}
        <View style={styles.sectionBlock}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            2. Sacred Mission & Exegetical Integrity Disclaimer
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            exégeomai (from the Greek ἐξηγέομαι: 'to lead out, unfold, declare, and expound') was created to provide scholarly, historical, cultural, and linguistic exposition of biblical texts. While we strive for uncompromising biblical fidelity, historical accuracy, and academic rigor in drawing out original textual meanings:
          </Text>
          <View style={styles.bulletList}>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • Content is intended for educational, devotional, and personal spiritual growth purposes. It is not an infallible substitute for pastoral counseling, church fellowship, or definitive ecclesiastical authority.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • Scripture interpretations present orthodox historical-grammatical exegesis while respecting legitimate diversity in translation traditions across major English translations (ESV, KJV, NASB, NIV, CSB).
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • Lexicon definitions cite historical Greek (Septuagint / Textus Receptus / Nestle-Aland) and Hebrew (Masoretic Text) scholarship via Strong's Concordance and recognized lexical resources.
            </Text>
          </View>
        </View>

        {/* Section 3 */}
        <View style={styles.sectionBlock}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            3. User Accounts, Eligibility & Authentication
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            To access cloud-synchronized study streaks, cross-device favorites, personalized reading plans, and avatar management, users must create a verified account:
          </Text>
          <View style={styles.bulletList}>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Eligibility:</Text> You must be at least 13 years of age (or the minimum legal age for digital consent in your jurisdiction) to create an account.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Credential Security:</Text> You are solely responsible for maintaining the confidentiality of your password and authentication tokens. Any action taken under your account is deemed your personal responsibility.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Accuracy of Details:</Text> You agree to provide true, accurate, current, and complete registration information during the signup wizard and to promptly update profile details upon changes.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Unauthorized Use:</Text> You must notify exégeomai technical support immediately upon suspecting any breach of security, credential compromise, or unauthorized access.
            </Text>
          </View>
        </View>

        {/* Section 4 */}
        <View style={styles.sectionBlock}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            4. Permitted Use & Community Conduct
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            In harmony with Christian fellowship, mutual edification, and ethical digital citizenship, users agree to utilize the platform exclusively for lawful, peaceful, and constructive purposes. You explicitly agree NOT to:
          </Text>
          <View style={styles.bulletList}>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • Reverse-engineer, decompile, disassemble, or extract source code, algorithms, or database schemas from the application binaries or Supabase endpoints.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • Deploy automated scrapers, crawlers, bots, or data-mining utilities to harvest canonical database facts, lexicon datasets, or user account directories.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • Impersonate church leadership, theological institutions, other users, or exégeomai staff.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • Upload or transmit malicious code, viruses, malware, or corrupted media payloads via the profile avatar upload pipeline.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • Engage in abusive, harassing, defaming, profane, or inappropriate conduct within profile handles, usernames, or public community spaces.
            </Text>
          </View>
        </View>

        {/* Section 5 */}
        <View style={styles.sectionBlock}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            5. Intellectual Property & Sacred Text Copyrights
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            All rights, titles, and interests in and to the exégeomai interface design, curated commentaries, original exegetical expositions, UI/UX components, vector illustrations, brand marks, and software codebases are the exclusive intellectual property of the exégeomai Project and its licensors.
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            Scripture quotations incorporated throughout the database are used in conformity with recognized publisher fair-use guidelines and license covenants:
          </Text>
          <View style={styles.bulletList}>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>ESV:</Text> The Holy Bible, English Standard Version® Copyright © 2001 by Crossway Bibles, a publishing ministry of Good News Publishers. Used by permission.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>KJV:</Text> King James Version is in the public domain in most jurisdictions worldwide.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>NASB:</Text> New American Standard Bible® Copyright © 1960, 1971, 1995 by The Lockman Foundation.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Strong's Lexicon:</Text> Public domain lexical designations, Strong's Greek and Hebrew numbering, and morphological databases are utilized for linguistic study.
            </Text>
          </View>
        </View>

        {/* Section 6 */}
        <View style={styles.sectionBlock}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            6. User Content & Cloud Synchronization
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            Users retain personal ownership of any study reflections, bookmarks, favorite tags, and custom notes created within their account. By synchronizing this data to our secure cloud backend:
          </Text>
          <View style={styles.bulletList}>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • You grant exégeomai a non-exclusive, worldwide, royalty-free license to store, process, back up, and transmit your data solely for providing you with seamless cross-device synchronization.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • We will never sell, publish, or commercially exploit your personal study notes or spiritual reflections without your prior written authorization.
            </Text>
          </View>
        </View>

        {/* Section 7 */}
        <View style={styles.sectionBlock}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            7. Over-The-Air Updates & Software Evolution
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            To ensure optimal performance, immediate security remediation, and timely content expansion, exégeomai implements an Over-The-Air (OTA) update architecture via Expo Updates. You acknowledge and accept that:
          </Text>
          <View style={styles.bulletList}>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • Minor updates, lexical improvements, typographical fixes, and UI enhancements may download automatically in the background when connected to network services.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • Significant feature evolutions may prompt an in-app Update Modal giving you the option to apply updates immediately or snooze the prompt for 30 minutes.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • We reserve the right to modify, suspend, or discontinue any feature, endpoint, or dataset with or without prior notice, though we endeavor to preserve study continuity.
            </Text>
          </View>
        </View>

        {/* Section 8 */}
        <View style={styles.sectionBlock}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            8. Disclaimer of Warranties
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            THE APPLICATION AND ALL ASSOCIATED CONTENT, DATASETS, LEXICONS, AND CLOUD SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE UNDER APPLICABLE LAW, EXÉGEOMAI DISCLAIMS ALL WARRANTIES, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR RELIGIOUS OR ACADEMIC PURPOSE, TITLE, AND NON-INFRINGEMENT.
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, COMPLETELY ERROR-FREE, FREE OF DELAYS, OR IMMUNE TO PERIODIC SERVER MAINTENANCE OUTAGES.
          </Text>
        </View>

        {/* Section 9 */}
        <View style={styles.sectionBlock}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            9. Limitation of Liability
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            UNDER NO LEGAL THEORY, WHETHER IN TORT, CONTRACT, STRICT LIABILITY, OR OTHERWISE, SHALL EXÉGEOMAI, ITS AUTHORS, CONTRIBUTORS, CLOUD HOSTS, OR ECCLESIASTICAL ADVISORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF DATA, DEVICE DAMAGE, STUDY NOTES ERASURE, SERVICE INTERRUPTION, OR EMOTIONAL DISTRESS ARISING FROM OR IN CONNECTION WITH YOUR USE OR INABILITY TO USE THE APPLICATION.
          </Text>
        </View>

        {/* Section 10 */}
        <View style={styles.sectionBlock}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            10. Account Termination & Suspension
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            You may terminate your account at any time by navigating to your Profile settings or contacting our support team. Upon termination, your credentials will be deactivated, and your personal profile records will be excised in accordance with our Privacy Policy.
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            exégeomai reserves the right to suspend or permanently ban any account that violates community guidelines, attempts denial-of-service attacks, abuses storage buckets, or compromises system integrity, without obligation for refund or recourse.
          </Text>
        </View>

        {/* Section 11 */}
        <View style={styles.sectionBlock}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            11. Governing Law & Dispute Resolution
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            These Terms shall be interpreted, governed by, and construed in accordance with the laws of the applicable legal jurisdiction, excluding principles of conflicts of law. Before initiating formal legal proceedings, parties agree to seek amicable resolution through good-faith mediation and biblically aligned dispute conciliation (in the spirit of 1 Corinthians 6).
          </Text>
        </View>

        {/* Section 12 */}
        <View style={styles.sectionBlock}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            12. Amendments to Terms
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            We reserve the right to revise or modify these Terms periodically. Notice of substantive amendments will be provided via an in-app announcement banner, Over-The-Air release notes, or email notification. Your continued use of exégeomai subsequent to the posting of modified Terms constitutes binding acceptance of the revisions.
          </Text>
        </View>

        {/* Section 13: Contact */}
        <View style={[styles.sectionBlock, styles.contactCard]}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            13. Contact Information & Legal Inquiries
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            If you have questions, theological inquiries, copyright permissions requests, or legal notices concerning these Terms of Service, please reach our administrative team at:
          </Text>
          <View style={styles.contactDetails}>
            <Text variant="body" weight="700" color={colors.textPrimary}>
              exégeomai Biblical Studies Project
            </Text>
            <Text variant="body" color={colors.textSecondary}>
              Email: legal@exegeomai.org • support@exegeomai.org
            </Text>
            <Text variant="body" color={colors.textSecondary}>
              GitHub: github.com/thulanesigasa/bible_fun_facts
            </Text>
          </View>
        </View>

        {/* Section 14: Church & Assembly Directory Participation */}
        <View style={styles.sectionBlock}>
          <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.sectionHeading}>
            14. Church &amp; Assembly Directory Participation
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            The exégeomai global fellowship directory allows ordained ministers, church elders, and their authorized representatives to register their assemblies, branches, homecells, and cell clusters for discovery within the application community. By submitting any registration to the directory, you agree to be fully bound by the following terms.
          </Text>

          <Text variant="body" weight="700" color={colors.textPrimary} style={[styles.sectionBody, { marginTop: 12 }]}>
            14.1 Authority to Register
          </Text>
          <View style={styles.bulletList}>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Ordained or Delegated Representation:</Text> Only ordained ministers, licensed pastors, appointed elders, church board members, or individuals with explicit written delegation from senior church leadership may submit a church, branch, or homecell registration on behalf of an assembly.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>No Self-Appointment:</Text> Individuals may not register a church, assembly, or ministry under a leader's name without that leader's knowledge, consent, and express authorization.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Personal Accountability:</Text> The individual who submits the registration takes personal responsibility for the accuracy of all information provided, including the leader name, contact details, address, and service times.
            </Text>
          </View>

          <Text variant="body" weight="700" color={colors.textPrimary} style={[styles.sectionBody, { marginTop: 12 }]}>
            14.2 Accuracy of Assembly Information
          </Text>
          <View style={styles.bulletList}>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Truthful Locations:</Text> All submitted street addresses, building names, town/city, province, country, and postal codes must accurately reflect the physical or primary meeting location of the registered assembly.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Current Service Times:</Text> Meeting schedules must reflect the actual current gathering times of the assembly and must be updated promptly if times change.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Valid Contact Information:</Text> All phone numbers and email addresses submitted must be actively monitored and belong to the listed leadership or their authorized administrative team.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>GPS Precision:</Text> Where GPS coordinates are provided or auto-derived from submitted addresses, the submitting party is responsible for verifying their accuracy before submission.
            </Text>
          </View>

          <Text variant="body" weight="700" color={colors.textPrimary} style={[styles.sectionBody, { marginTop: 12 }]}>
            14.3 Prohibited Conduct
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.sectionBody}>
            The following acts constitute serious violations of these Terms and may result in immediate and permanent delisting, account suspension, and referral to relevant authorities:
          </Text>
          <View style={styles.bulletList}>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Fraudulent Church Representations:</Text> Registering a fictitious, dissolved, non-existent, or impersonated church or assembly with the intent to mislead or deceive users of the exégeomai directory.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Unauthorized Clergy Listing:</Text> Publishing the name, photograph, contact number, or email address of any ordained minister or church leader without their explicit written consent or verified delegation.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Defamation of Ministries:</Text> Submitting descriptions, service time details, or location data that contain false, malicious, or defamatory statements about any church, denomination, leader, or member of the body of Christ.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Duplicate Manipulation:</Text> Intentionally registering multiple conflicting records for the same assembly to create confusion, suppress competing listings, or manipulate search results.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Commercial Misuse:</Text> Using the directory listing for the purpose of commercial solicitation, unsolicited marketing, or any non-spiritual commercial activity not disclosed at the time of registration.
            </Text>
          </View>

          <Text variant="body" weight="700" color={colors.textPrimary} style={[styles.sectionBody, { marginTop: 12 }]}>
            14.4 Delisting, Dispute Resolution &amp; Moderation
          </Text>
          <View style={styles.bulletList}>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Right to Delist:</Text> Any registered leader or authorized administrator may request the immediate removal of their assembly's listing by contacting ministry-care@exegeomai.org. Requests will be actioned within 72 hours of receipt and identity verification.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Community Reporting:</Text> Users of the application may report suspected fraudulent, inaccurate, or abusive directory entries through the in-app reporting mechanism. All reports are reviewed by the exégeomai moderation team within 7 business days.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Administrative Moderation:</Text> The exégeomai team reserves the right to temporarily suspend, correct, or permanently remove any directory listing that is reported as inaccurate, violates these Terms, or is reasonably believed to be fraudulent — without prior notice to the submitting party if urgency warrants immediate action.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Dispute Escalation:</Text> Disputes between two parties claiming authority over the same assembly listing will be resolved through the exégeomai moderation team acting as a neutral arbitrator. Both parties will be given equal opportunity to submit supporting documentation before a final listing decision is made.
            </Text>
            <Text variant="body" color={colors.textSecondary} style={styles.bulletItem}>
              • <Text weight="700" color={colors.textPrimary}>Appeals:</Text> Any listing decision may be appealed within 14 calendar days of notification by writing to legal@exegeomai.org with supporting documentation of ecclesiastical authority.
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
