/**
 * Ministry Detail & Branch Directory Screen
 *
 * Flat body-canvas architecture — zero cards, zero pills, zero badge divs.
 * Filter tabs are plain text labels.
 * Branch list renders as clean editorial rows with hairline dividers.
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Linking,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing } from '../theme';
import { Text } from '../components/Typography';
import { BranchRadarMap } from '../components/BranchRadarMap';
import {
  getMinistryById,
  getBranchesByMinistry,
  Ministry,
  Branch,
  BranchType,
  getBranchTypeLabel,
} from '../services/ministryService';
import {
  CloseSvg,
  SearchSvg,
} from '../components/SvgIcons';

type StructureTab = 'all' | BranchType;

const STRUCTURE_TABS: { key: StructureTab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'branch', label: 'Branches' },
  { key: 'homecell', label: 'Homecells' },
  { key: 'cell_branch', label: 'Cell Branches' },
  { key: 'sub_cluster', label: 'Sub-Clusters' },
  { key: 'cluster', label: 'Clusters' },
];

export default function MinistryDetailScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const { ministryId } = route.params;

  const [ministry, setMinistry] = useState<Ministry | null>(null);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [activeTab, setActiveTab] = useState<StructureTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  const loadData = async () => {
    const min = await getMinistryById(ministryId);
    setMinistry(min);
    const branchList = await getBranchesByMinistry(ministryId);
    setBranches(branchList);
    if (branchList.length > 0) {
      setSelectedBranch(branchList[0]);
    }
  };

  useEffect(() => {
    loadData();
    const unsubscribe = navigation.addListener('focus', () => {
      loadData();
    });
    return unsubscribe;
  }, [ministryId, navigation]);

  const filteredBranches = useMemo(() => {
    let list = branches;
    if (activeTab !== 'all') {
      list = list.filter((b) => b.type === activeTab);
    }
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.leaderName.toLowerCase().includes(q) ||
          b.town.toLowerCase().includes(q) ||
          b.province.toLowerCase().includes(q) ||
          b.country.toLowerCase().includes(q)
      );
    }
    return list;
  }, [branches, activeTab, searchQuery]);

  const handleOpenDirections = (b: Branch) => {
    const query = encodeURIComponent(`${b.name}, ${b.address}, ${b.town}, ${b.country}`);
    const url =
      Platform.select({
        ios: `maps:0,0?q=${query}`,
        android: `geo:0,0?q=${query}`,
      }) || `https://www.google.com/maps/search/?api=1&query=${query}`;
    Linking.openURL(url).catch(() => {
      Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${query}`);
    });
  };

  if (!ministry) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeBtn}>
            <CloseSvg size={20} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text variant="h3" color={colors.textPrimary}>Ministry Details</Text>
          <View style={{ width: 36 }} />
        </View>
        <View style={styles.loadingRow}>
          <Text variant="body" color={colors.textSecondary}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeBtn}
          accessibilityRole="button"
          accessibilityLabel="Back"
        >
          <CloseSvg size={20} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text variant="h3" color={colors.textPrimary} style={styles.headerTitle} numberOfLines={1}>
          {ministry.name}
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* — Ministry overview — */}
        <View style={styles.overviewSection}>
          <Text variant="h2" color={colors.textPrimary} style={styles.ministryName}>
            {ministry.name}
          </Text>

          <Text variant="body" color={colors.textSecondary} style={styles.founderLine}>
            {ministry.founder}
          </Text>

          <Text variant="caption" color={colors.textTertiary} style={styles.hqLine}>
            {ministry.headquarters}, {ministry.headquartersCountry}
          </Text>

          <Text variant="body" color={colors.textSecondary} style={styles.descriptionText}>
            {ministry.description}
          </Text>
        </View>

        {/* — Action links — */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('RegisterBranch', {
                ministryId: ministry.id,
                ministryName: ministry.name,
              })
            }
            activeOpacity={0.7}
          >
            <Text variant="caption" weight="700" style={styles.actionLink}>
              + Register Campus or Cell
            </Text>
          </TouchableOpacity>

          <Text variant="caption" color={colors.textTertiary}> · </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BranchMap', { ministryId: ministry.id })
            }
            activeOpacity={0.7}
          >
            <Text variant="caption" weight="700" style={styles.actionLinkSecondary}>
              Full Map View
            </Text>
          </TouchableOpacity>
        </View>

        {/* — Radar map — */}
        <View style={styles.mapSection}>
          <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.sectionLabel}>
            CAMPUS MAP LOCATIONS
          </Text>
          <BranchRadarMap
            branches={branches}
            selectedBranchId={selectedBranch?.id}
            onSelectBranch={setSelectedBranch}
            height={240}
            showFooter={false}
          />
          {branches.length > 0 && (
            <Text variant="caption" color={colors.textTertiary} style={styles.radarCaption}>
              {branches.length} location{branches.length !== 1 ? 's' : ''} plotted
            </Text>
          )}
        </View>

        {/* — Filter: plain text tabs — */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsScroll}
          contentContainerStyle={styles.tabsContainer}
        >
          {STRUCTURE_TABS.map((tab) => {
            const isSelected = activeTab === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                activeOpacity={0.6}
                style={styles.tabTouchable}
              >
                <Text
                  variant="caption"
                  weight={isSelected ? '800' : '500'}
                  color={isSelected ? colors.textPrimary : colors.textTertiary}
                  style={isSelected ? styles.tabLabelActive : styles.tabLabel}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* — Search — */}
        <View style={styles.searchBar}>
          <SearchSvg size={14} color={colors.textTertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search locations, leaders, towns..."
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* — Branch rows — */}
        <View style={styles.branchesList}>
          {filteredBranches.length === 0 ? (
            <View style={styles.emptySection}>
              <Text variant="body" weight="700" color={colors.textPrimary}>
                No locations found
              </Text>
              <Text variant="caption" color={colors.textSecondary} style={{ marginTop: 4 }}>
                Is your campus or cell not listed? Register it to appear in the global directory.
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('RegisterBranch', {
                    ministryId: ministry.id,
                    ministryName: ministry.name,
                  })
                }
                style={{ marginTop: spacing.sm }}
              >
                <Text variant="caption" weight="700" style={styles.actionLink}>
                  + Register Your Branch
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            filteredBranches.map((b, index) => (
              <View key={b.id} style={[styles.branchRow, index === 0 && styles.branchRowFirst]}>
                {/* Type label as plain text, not a pill */}
                <Text variant="caption" weight="700" color={colors.accent} style={styles.branchTypeText}>
                  {getBranchTypeLabel(b.type).toUpperCase()}
                </Text>

                <Text variant="h3" color={colors.textPrimary} style={styles.branchName}>
                  {b.name}
                </Text>

                <Text variant="caption" color={colors.textSecondary} style={styles.branchMeta}>
                  {b.town}, {b.province}
                </Text>

                <Text variant="caption" color={colors.textSecondary} style={styles.branchMeta}>
                  Leader: <Text variant="caption" weight="700" color={colors.textPrimary}>{b.leaderName}</Text>
                  {'  ·  '}
                  <Text variant="caption" weight="700" color={colors.textPrimary}>{b.contactNumber}</Text>
                </Text>

                <Text variant="caption" color={colors.textSecondary} style={styles.branchMeta}>
                  {b.meetingTimes}
                </Text>

                <Text variant="caption" color={colors.textTertiary} style={styles.branchAddress}>
                  {b.address}
                </Text>

                <TouchableOpacity
                  onPress={() => handleOpenDirections(b)}
                  activeOpacity={0.7}
                  style={styles.directionsLink}
                >
                  <Text variant="caption" weight="700" style={styles.directionsLinkText}>
                    Directions & Map
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* — Footer CTA — */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('RegisterBranch', {
              ministryId: ministry.id,
              ministryName: ministry.name,
            })
          }
          activeOpacity={0.7}
          style={styles.footerCta}
        >
          <Text variant="caption" weight="700" color={colors.textTertiary}>
            LEADING A NEW CELL OR CAMPUS?
          </Text>
          <Text variant="body" weight="700" color={colors.textPrimary} style={{ marginTop: 2 }}>
            Register and appear in the global directory
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.08)',
    backgroundColor: '#FFFFFF',
  },
  closeBtn: {
    padding: spacing.xs,
  },
  headerTitle: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  loadingRow: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: spacing.xxl + spacing.nav,
  },

  // Overview
  overviewSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  categoryLabel: {
    fontSize: 10,
    letterSpacing: 0.6,
    marginBottom: spacing.xs,
  },
  ministryName: {
    fontSize: 22,
    marginBottom: 4,
  },
  founderLine: {
    fontSize: 14,
    marginBottom: 2,
  },
  hqLine: {
    fontSize: 12,
    marginBottom: spacing.sm,
  },
  descriptionText: {
    fontSize: 13,
    lineHeight: 20,
  },

  // Action links
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  actionLink: {
    fontSize: 12,
    color: '#0F172A',
    textDecorationLine: 'underline',
  },
  actionLinkSecondary: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  // Radar map
  mapSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  sectionLabel: {
    fontSize: 10,
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  radarCaption: {
    fontSize: 11,
    marginTop: spacing.xs,
  },

  // Filter tabs
  tabsScroll: {
    flexGrow: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  tabTouchable: {},
  tabLabel: {
    fontSize: 12,
  },
  tabLabelActive: {
    fontSize: 12,
    borderBottomWidth: 1.5,
    borderBottomColor: '#0F172A',
    paddingBottom: 1,
  },

  // Search
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
    paddingVertical: 4,
  },

  // Branch rows
  branchesList: {},
  branchRowFirst: {
    borderTopWidth: 0,
  },
  branchRow: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.06)',
  },
  branchTypeText: {
    fontSize: 9,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  branchName: {
    fontSize: 15,
    marginBottom: 4,
  },
  branchMeta: {
    fontSize: 12,
    marginTop: 2,
  },
  branchAddress: {
    fontSize: 11,
    marginTop: 4,
    fontStyle: 'italic',
  },
  directionsLink: {
    marginTop: spacing.sm,
    alignSelf: 'flex-start',
  },
  directionsLinkText: {
    fontSize: 11,
    color: '#0F172A',
    textDecorationLine: 'underline',
  },

  // Empty state
  emptySection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },

  // Footer
  footerCta: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.06)',
    marginTop: spacing.md,
  },
});
