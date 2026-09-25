import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import { useUser } from '../context/UserContext';
import { CommunityUser } from '../data/mockUsers';
import { supabase } from '../services/supabase';
import { SafetyService } from '../services/safetyService';
import {
  SearchSvg,
  UsersSvg,
  CheckSvg,
  XCloseSvg,
  FlameSvg,
  BookOpenSvg,
  QuoteSvg,
  ChevronRightSvg,
  FlagSvg,
  BlockSvg,
} from '../components/SvgIcons';

type FilterCategory = 'All' | 'Scholars' | 'Pastors' | 'Exegesis' | 'Linguistics';

const FILTER_CATEGORIES: FilterCategory[] = ['All', 'Scholars', 'Pastors', 'Exegesis', 'Linguistics'];

export default function SearchScreen({ navigation }: { navigation?: any }) {
  const [searchText, setSearchText] = useState('');
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const [selectedUser, setSelectedUser] = useState<CommunityUser | null>(null);
  const [liveUsers, setLiveUsers] = useState<CommunityUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [reportingUser, setReportingUser] = useState<CommunityUser | null>(null);
  const [selectedReportReason, setSelectedReportReason] = useState<'harassment' | 'inappropriate' | 'spam' | 'impersonation' | 'other'>('harassment');

  const { userProfile, isUserFollowed, toggleFollowUser, blockedUserIds, blockUser } = useUser();

  const fetchLiveProfiles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && !error) {
        // Exclude current logged-in user
        const otherProfiles = data.filter(
          (p: any) =>
            p.username !== userProfile?.username &&
            (!userProfile?.email || p.email !== userProfile?.email)
        );

        const mapped: CommunityUser[] = otherProfiles.map((p: any) => ({
          id: p.id,
          name: p.full_name || `${p.first_name || ''} ${p.last_name || ''}`.trim() || 'Fellow Disciple',
          username: p.username || 'believer',
          role: p.knowledge_level || 'Growing Disciple',
          theologicalFocus: p.study_focus || "Original Languages & Strong's",
          bio: `Study focus: ${p.study_focus || 'Biblical Exegesis'}. Translation: ${p.preferred_translation || 'ESV'}. Daily goal: ${p.daily_goal || '15 mins/day'}.`,
          joinedDate: new Date(p.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          followersCount: 0,
          followingCount: 0,
          streak: 1,
          versesExplored: 0,
          tags: [p.study_focus || 'Exegesis', p.preferred_translation || 'ESV', p.knowledge_level || 'Disciple'].filter(Boolean),
          favoriteVerse: {
            reference: 'John 3:16',
            text: 'For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.',
            note: 'Foundational scripture of divine grace and eternal life.',
          },
        }));

        setLiveUsers(mapped);
      }
    } catch (err) {
      console.warn('Live profiles fetch notice:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveProfiles();
  }, [userProfile?.username, userProfile?.email]);

  const REPORT_REASONS = [
    { key: 'harassment', label: 'Harassment or Bullying' },
    { key: 'inappropriate', label: 'Inappropriate Content' },
    { key: 'spam', label: 'Spam or Commercial Solicitation' },
    { key: 'impersonation', label: 'Doctrinal Misrepresentation / Impersonation' },
    { key: 'other', label: 'Other Safety Concern' },
  ];

  const handleBlockUser = (user: CommunityUser) => {
    Alert.alert(
      'Block Scholar',
      `Are you sure you want to block ${user.name} (@${user.username})? They will be hidden from your search, fellowship, and study reflections.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Block',
          style: 'destructive',
          onPress: async () => {
            await blockUser(user.id);
            setSelectedUser(null);
            Alert.alert('Scholar Blocked', `${user.name} has been blocked and removed from your fellowship view.`);
          },
        },
      ]
    );
  };

  const handleOpenReport = (user: CommunityUser) => {
    setReportingUser(user);
    setSelectedReportReason('harassment');
  };

  const handleSubmitReport = async () => {
    if (!reportingUser) return;
    await SafetyService.submitReport(
      reportingUser.id,
      'scholar',
      selectedReportReason,
      reportingUser.name
    );
    const target = reportingUser;
    setReportingUser(null);
    Alert.alert(
      'Report Submitted',
      `Thank you for helping keep the exégeomai fellowship safe and edifying. We will review @${target.username}'s contributions. Would you also like to block this account?`,
      [
        { text: 'No, Keep Visible', style: 'cancel' },
        {
          text: 'Block Account',
          style: 'destructive',
          onPress: async () => {
            await blockUser(target.id);
            setSelectedUser(null);
          },
        },
      ]
    );
  };

  const filteredUsers = useMemo(() => {
    return liveUsers.filter((user) => {
      if (blockedUserIds.includes(user.id)) return false;
      const q = searchText.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        user.name.toLowerCase().includes(q) ||
        user.username.toLowerCase().includes(q) ||
        user.role.toLowerCase().includes(q) ||
        user.theologicalFocus.toLowerCase().includes(q) ||
        user.bio.toLowerCase().includes(q) ||
        user.tags.some((t) => t.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (activeCategory === 'All') return true;
      if (activeCategory === 'Scholars') return user.role.toLowerCase().includes('scholar') || user.role.toLowerCase().includes('lexicographer');
      if (activeCategory === 'Pastors') return user.role.toLowerCase().includes('pastor') || user.role.toLowerCase().includes('minister');
      if (activeCategory === 'Exegesis') return user.tags.some((t) => ['exegesis', 'hermeneutics', 'romans', 'genesis', 'revelation'].includes(t.toLowerCase()));
      if (activeCategory === 'Linguistics') return user.theologicalFocus.toLowerCase().includes('greek') || user.theologicalFocus.toLowerCase().includes('hebrew');

      return true;
    });
  }, [liveUsers, searchText, activeCategory, blockedUserIds]);

  const getInitials = (name: string) => {
    const parts = name.replace(/^(Dr\.|Prof\.|Pastor)\s+/i, '').split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return (parts[0] ? parts[0].slice(0, 2) : 'US').toUpperCase();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.searchIconCircle}>
            <UsersSvg size={22} color={colors.accent} />
          </View>
          <View style={styles.headerTextWrap}>
            <Text variant="h2" style={styles.title}>Believers & Scholars</Text>
            <Text variant="body" color={colors.textSecondary} style={styles.subtitle}>
              Search, follow, and discover students of the Word
            </Text>
          </View>
        </View>

        {/* Search Input Box */}
        <View style={[styles.searchContainer, shadow.sm]}>
          <SearchSvg size={18} color={colors.accent} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search scholars, @handles, Greek, Hebrew..."
            placeholderTextColor={colors.textTertiary}
            value={searchText}
            onChangeText={setSearchText}
            clearButtonMode="while-editing"
          />
        </View>

        {/* Filter Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterTabsScroll}
          style={styles.filterRow}
        >
          {FILTER_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.filterTab, isActive && styles.filterTabActive]}
                onPress={() => setActiveCategory(cat)}
                activeOpacity={0.8}
              >
                <Text
                  variant="caption"
                  weight={isActive ? '700' : '500'}
                  style={[styles.filterTabText, isActive && styles.filterTabTextActive]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Results Counter */}
        {!loading && filteredUsers.length > 0 && (
          <View style={styles.resultsMetaRow}>
            <Text variant="caption" color={colors.textSecondary}>
              {filteredUsers.length} community believer{filteredUsers.length !== 1 ? 's' : ''} found
            </Text>
          </View>
        )}

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color={colors.accent} />
            <Text variant="caption" color={colors.textSecondary} style={{ marginTop: spacing.sm }}>
              Connecting to live believer network...
            </Text>
          </View>
        ) : filteredUsers.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyCircle}>
              <UsersSvg size={36} color={colors.accent} />
            </View>
            <Text variant="h2" style={styles.emptyTitle}>
              {searchText ? 'No Matching Believers' : "No Other Believers Yet"}
            </Text>
            <Text variant="body" color={colors.textSecondary} align="center" style={styles.emptySub}>
              {searchText
                ? 'Try searching with a different name, @handle, or study topic.'
                : 'You are currently the only believer registered in the live database. When new disciples sign up, they will automatically appear here in real time.'}
            </Text>
          </View>
        ) : (
          /* Users List */
          <View style={styles.usersList}>
            {filteredUsers.map((user) => {
              const isFollowed = isUserFollowed(user.id);
              const totalFollowers = user.followersCount + (isFollowed ? 1 : 0);

              return (
                <TouchableOpacity
                  key={user.id}
                  activeOpacity={0.9}
                  style={[styles.userCard, shadow.sm]}
                  onPress={() => setSelectedUser(user)}
                >
                  <View style={styles.userCardTop}>
                    {/* Avatar Initials */}
                    <View style={styles.avatarCircle}>
                      <Text variant="body" weight="700" color={colors.accent}>
                        {getInitials(user.name)}
                      </Text>
                    </View>

                    {/* User Info */}
                    <View style={styles.userInfoWrap}>
                      <View style={styles.userNameRow}>
                        <Text variant="h3" style={styles.userName} numberOfLines={1}>
                          {user.name}
                        </Text>
                        {user.isVerified && (
                          <View style={styles.verifiedDot}>
                            <CheckSvg size={10} color="#FFFFFF" strokeWidth={3} />
                          </View>
                        )}
                      </View>
                      <Text variant="caption" color={colors.textTertiary}>
                        @{user.username} • {user.role}
                      </Text>
                    </View>

                    {/* Follow Button */}
                    <TouchableOpacity
                      style={[
                        styles.followBtn,
                        isFollowed ? styles.followingBtn : styles.unfollowedBtn,
                      ]}
                      onPress={() => toggleFollowUser(user.id)}
                      activeOpacity={0.8}
                    >
                      {isFollowed ? (
                        <View style={styles.followingBtnContent}>
                          <CheckSvg size={12} color={colors.textSecondary} strokeWidth={2.5} />
                          <Text variant="caption" weight="600" color={colors.textSecondary}>
                            Following
                          </Text>
                        </View>
                      ) : (
                        <Text variant="caption" weight="700" color="#0F172A">
                          + Follow
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>

                  {/* Bio snippet */}
                  <Text
                    variant="body"
                    color={colors.textPrimary}
                    numberOfLines={2}
                    style={styles.bioSnippet}
                  >
                    {user.bio}
                  </Text>

                  {/* Tags row */}
                  <View style={styles.tagsRow}>
                    <Text variant="caption" color={colors.accent} style={styles.tagText}>
                      {user.tags.slice(0, 3).map((t) => `#${t}`).join('  ')}
                    </Text>
                    <View style={styles.statsSummary}>
                      <Text variant="caption" color={colors.textTertiary}>
                        {totalFollowers.toLocaleString()} followers • {user.streak}d streak
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* Slide-Up Profile Inspection Modal */}
      <Modal
        visible={!!selectedUser}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setSelectedUser(null)}
      >
        {selectedUser && (
          <SafeAreaView style={styles.profileModalSafeArea}>
            <View style={styles.profileModalHeader}>
              <View style={styles.profileModalHeaderLeft}>
                <Text variant="h3" style={{ color: colors.textPrimary }}>Scholar Profile</Text>
              </View>
              <TouchableOpacity
                onPress={() => setSelectedUser(null)}
                style={styles.modalCloseBtn}
              >
                <XCloseSvg size={22} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.profileModalScroll}
              contentContainerStyle={styles.profileModalContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Profile Card Header */}
              <View style={styles.profileHero}>
                <View style={styles.profileLargeAvatar}>
                  <Text variant="h1" color={colors.accent}>
                    {getInitials(selectedUser.name)}
                  </Text>
                </View>
                <View style={styles.profileNameWrap}>
                  <View style={styles.modalNameRow}>
                    <Text variant="h2" style={styles.profileModalName}>
                      {selectedUser.name}
                    </Text>
                    {selectedUser.isVerified && (
                      <View style={styles.verifiedDot}>
                        <CheckSvg size={10} color="#FFFFFF" strokeWidth={3} />
                      </View>
                    )}
                  </View>
                  <Text variant="body" color={colors.accent} weight="600">
                    @{selectedUser.username}
                  </Text>
                  <Text variant="caption" color={colors.textSecondary} style={{ marginTop: 2 }}>
                    {selectedUser.role} • Joined {selectedUser.joinedDate}
                  </Text>
                </View>
              </View>

              {/* Stats Bar */}
              <View style={[styles.profileStatsRow, shadow.sm]}>
                <View style={styles.profileStatCol}>
                  <Text variant="h3" color={colors.textPrimary}>
                    {(selectedUser.followersCount + (isUserFollowed(selectedUser.id) ? 1 : 0)).toLocaleString()}
                  </Text>
                  <Text variant="caption" color={colors.textSecondary}>Followers</Text>
                </View>
                <View style={styles.profileStatDivider} />
                <View style={styles.profileStatCol}>
                  <Text variant="h3" color={colors.textPrimary}>
                    {selectedUser.followingCount}
                  </Text>
                  <Text variant="caption" color={colors.textSecondary}>Following</Text>
                </View>
                <View style={styles.profileStatDivider} />
                <View style={styles.profileStatCol}>
                  <Text variant="h3" color={colors.accent}>
                    {selectedUser.streak}d
                  </Text>
                  <Text variant="caption" color={colors.textSecondary}>Streak</Text>
                </View>
                <View style={styles.profileStatDivider} />
                <View style={styles.profileStatCol}>
                  <Text variant="h3" color={colors.textPrimary}>
                    {selectedUser.versesExplored}
                  </Text>
                  <Text variant="caption" color={colors.textSecondary}>Verses</Text>
                </View>
              </View>

              {/* Follow Button in Modal */}
              <TouchableOpacity
                style={[
                  styles.modalBigFollowBtn,
                  isUserFollowed(selectedUser.id) ? styles.modalFollowingBtn : styles.modalFollowBtn,
                ]}
                onPress={() => toggleFollowUser(selectedUser.id)}
                activeOpacity={0.8}
              >
                {isUserFollowed(selectedUser.id) ? (
                  <View style={styles.followingBtnContent}>
                    <CheckSvg size={16} color={colors.textSecondary} strokeWidth={2.5} />
                    <Text variant="body" weight="600" color={colors.textSecondary}>
                      Following Scholar
                    </Text>
                  </View>
                ) : (
                  <Text variant="body" weight="700" color="#0F172A">
                    + Follow Scholar
                  </Text>
                )}
              </TouchableOpacity>

              {/* Theological Focus Section */}
              <View style={styles.sectionBlock}>
                <Text variant="label" color={colors.textTertiary} style={styles.sectionHeading}>
                  THEOLOGICAL SPECIALTY & FOCUS
                </Text>
                <View style={styles.focusCard}>
                  <Text variant="body" weight="600" color={colors.accent}>
                    {selectedUser.theologicalFocus}
                  </Text>
                </View>
              </View>

              {/* Bio Section */}
              <View style={styles.sectionBlock}>
                <Text variant="label" color={colors.textTertiary} style={styles.sectionHeading}>
                  ABOUT
                </Text>
                <Text variant="body" color={colors.textPrimary} style={styles.fullBioText}>
                  {selectedUser.bio}
                </Text>
              </View>

              {/* Topics / Tags */}
              <View style={styles.sectionBlock}>
                <Text variant="label" color={colors.textTertiary} style={styles.sectionHeading}>
                  TOPICS & KEY THEMES
                </Text>
                <View style={styles.modalTagsRow}>
                  <Text variant="body" weight="600" color={colors.accent}>
                    {selectedUser.tags.map((tag) => `#${tag}`).join('   ')}
                  </Text>
                </View>
              </View>

              {/* Favorite Scripture Reflection */}
              <View style={styles.sectionBlock}>
                <Text variant="label" color={colors.textTertiary} style={styles.sectionHeading}>
                  FAVORITE SCRIPTURE REFLECTION
                </Text>
                <View style={styles.reflectionCard}>
                  <View style={styles.reflectionHeader}>
                    <QuoteSvg size={16} color={colors.accent} />
                    <Text variant="h3" color={colors.accent}>
                      {selectedUser.favoriteVerse.reference}
                    </Text>
                  </View>
                  <Text variant="body" style={styles.reflectionVerseText}>
                    "{selectedUser.favoriteVerse.text}"
                  </Text>
                  <View style={styles.reflectionDivider} />
                  <Text variant="caption" color={colors.textSecondary} style={styles.reflectionNote}>
                    {selectedUser.favoriteVerse.note}
                  </Text>
                </View>
              </View>

              {/* Community Safety & Moderation Actions */}
              <View style={styles.safetyFooter}>
                <View style={styles.safetyActionsRow}>
                  <TouchableOpacity
                    style={styles.safetyBtn}
                    onPress={() => handleOpenReport(selectedUser)}
                    activeOpacity={0.7}
                    accessibilityRole="button"
                    accessibilityLabel="Report this scholar account"
                  >
                    <FlagSvg size={14} color="#64748B" strokeWidth={2} />
                    <Text variant="caption" weight="600" color="#64748B">
                      Report Account
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.safetyVerticalDivider} />

                  <TouchableOpacity
                    style={styles.safetyBtn}
                    onPress={() => handleBlockUser(selectedUser)}
                    activeOpacity={0.7}
                    accessibilityRole="button"
                    accessibilityLabel="Block this scholar"
                  >
                    <BlockSvg size={14} color="#64748B" strokeWidth={2} />
                    <Text variant="caption" weight="600" color="#64748B">
                      Block Scholar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        )}
      </Modal>

      {/* Report Account Safety Modal */}
      <Modal
        visible={reportingUser !== null}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setReportingUser(null)}
      >
        <View style={styles.reportModalOverlay}>
          <View style={styles.reportModalCard}>
            <View style={styles.reportModalHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <FlagSvg size={18} color="#0F172A" strokeWidth={2.2} />
                <Text variant="h3" weight="800" color="#0F172A">
                  Report Account
                </Text>
              </View>
              <TouchableOpacity onPress={() => setReportingUser(null)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <XCloseSvg size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <Text variant="caption" color="#64748B" style={{ marginBottom: 14, lineHeight: 18 }}>
              {`Select a reason for reporting @${reportingUser?.username}. Reports protect fellowship integrity and are reviewed with reverence.`}
            </Text>

            {REPORT_REASONS.map((r) => (
              <TouchableOpacity
                key={r.key}
                style={[
                  styles.reportOptionBtn,
                  selectedReportReason === r.key && styles.reportOptionBtnSelected,
                ]}
                onPress={() => setSelectedReportReason(r.key as any)}
                activeOpacity={0.8}
              >
                <Text
                  variant="body"
                  weight={selectedReportReason === r.key ? '700' : '500'}
                  color={selectedReportReason === r.key ? '#0F172A' : '#64748B'}
                >
                  {r.label}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.submitReportBtn}
              onPress={handleSubmitReport}
              activeOpacity={0.85}
            >
              <Text variant="body" weight="800" color="#0F172A">
                Submit Report
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: 110,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: 12,
  },
  searchIconCircle: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextWrap: {
    flex: 1,
  },
  title: {
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    gap: 10,
    marginBottom: spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    padding: 0,
  },
  filterRow: {
    marginBottom: spacing.md,
  },
  filterTabsScroll: {
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.full,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  filterTabActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  filterTabText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  filterTabTextActive: {
    color: '#0F172A',
  },
  resultsMetaRow: {
    marginBottom: spacing.sm,
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
  },
  emptyCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  emptyTitle: {
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptySub: {
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 13,
  },
  usersList: {
    gap: 12,
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  userCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: radius.full,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(253, 210, 35, 0.2)',
  },
  userInfoWrap: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userName: {
    color: colors.textPrimary,
    fontSize: 15,
  },
  verifiedDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.full,
  },
  unfollowedBtn: {
    backgroundColor: colors.accent,
  },
  followingBtn: {
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.1)',
  },
  followingBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bioSnippet: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: spacing.sm,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.04)',
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statsSummary: {
    flex: 1,
    alignItems: 'flex-end',
  },

  // Modal Profile Styles
  profileModalSafeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  profileModalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalCloseBtn: {
    padding: 6,
  },
  profileModalScroll: {
    flex: 1,
  },
  profileModalContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 60,
  },
  profileHero: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  profileLargeAvatar: {
    width: 80,
    height: 80,
    borderRadius: radius.full,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.accent,
    marginBottom: spacing.md,
  },
  profileNameWrap: {
    alignItems: 'center',
  },
  modalNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  profileModalName: {
    color: colors.textPrimary,
  },
  profileStatsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
  profileStatCol: {
    alignItems: 'center',
  },
  profileStatDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(15, 23, 42, 0.08)',
  },
  modalBigFollowBtn: {
    paddingVertical: 12,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  modalFollowBtn: {
    backgroundColor: colors.accent,
  },
  modalFollowingBtn: {
    backgroundColor: 'rgba(15, 23, 42, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
  },
  sectionBlock: {
    marginBottom: spacing.lg,
  },
  sectionHeading: {
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  focusCard: {
    backgroundColor: colors.accentSoft,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(253, 210, 35, 0.2)',
  },
  fullBioText: {
    lineHeight: 22,
    color: colors.textPrimary,
  },
  modalTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  reflectionCard: {
    backgroundColor: '#FFFFFF',
    padding: spacing.md,
  },
  reflectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  reflectionVerseText: {
    fontStyle: 'italic',
    lineHeight: 22,
    color: colors.textPrimary,
    marginVertical: 4,
  },
  reflectionDivider: {
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
    marginVertical: spacing.sm,
  },
  reflectionNote: {
    lineHeight: 18,
  },
  safetyFooter: {
    marginTop: 20,
    marginBottom: 40,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.06)',
  },
  safetyActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  safetyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  safetyVerticalDivider: {
    width: 1,
    height: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.08)',
  },
  reportModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  reportModalCard: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  reportModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  reportOptionBtn: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  reportOptionBtnSelected: {
    backgroundColor: 'rgba(253, 210, 35, 0.15)',
    borderColor: '#FDD223',
  },
  submitReportBtn: {
    marginTop: 10,
    backgroundColor: '#FDD223',
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
