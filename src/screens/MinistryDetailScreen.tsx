/**
 * Ministry Detail & Branch Directory Screen
 *
 * Displays detailed ministry vision, leadership, and hierarchical directory
 * of Main Branches, Homecells, Cell Branches, Clusters, and Sub-Clusters.
 * Includes interactive radar vector map and instant CTA to register new branches.
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
import { spacing, radius, shadow } from '../theme';
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
  ChevronRightSvg,
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

  const countsByType = useMemo(() => {
    const counts: Record<string, number> = {
      all: branches.length,
      branch: 0,
      homecell: 0,
      cell_branch: 0,
      sub_cluster: 0,
      cluster: 0,
    };
    branches.forEach((b) => {
      if (counts[b.type] !== undefined) {
        counts[b.type] += 1;
      }
    });
    return counts;
  }, [branches]);

  const handleOpenDirections = (b: Branch) => {
    const query = encodeURIComponent(`${b.name}, ${b.address}, ${b.town}, ${b.country}`);
    const url = Platform.select({
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
          <Text variant="h3" color={colors.textPrimary}>
            Ministry Details
          </Text>
          <View style={{ width: 36 }} />
        </View>
        <View style={styles.emptyContainer}>
          <Text variant="body" color={colors.textSecondary}>
            Loading ministry information...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeBtn}
          accessibilityRole="button"
          accessibilityLabel="Back to search"
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
        {/* Ministry Hero Overview */}
        <View style={styles.heroCard}>
          <View style={styles.categoryBadge}>
            <Text variant="caption" weight="700" style={styles.categoryBadgeText}>
              {ministry.category.toUpperCase()}
            </Text>
          </View>

          <Text variant="h2" color={colors.textPrimary} style={styles.ministryName}>
            {ministry.name}
          </Text>

          <Text variant="body" weight="700" color="#B45309" style={styles.founderText}>
            Senior Pastor / Founder: {ministry.founder}
          </Text>

          <Text variant="caption" color={colors.textSecondary} style={styles.hqText}>
            Headquarters: {ministry.headquarters} ({ministry.headquartersCountry})
          </Text>

          <Text variant="body" color={colors.textSecondary} style={styles.descriptionText}>
            {ministry.description}
          </Text>

          {/* Action Row */}
          <View style={styles.heroActionRow}>
            <TouchableOpacity
              style={styles.primaryActionBtn}
              onPress={() =>
                navigation.navigate('RegisterBranch', {
                  ministryId: ministry.id,
                  ministryName: ministry.name,
                })
              }
              activeOpacity={0.8}
            >
              <Text variant="caption" weight="700" style={styles.primaryActionBtnText}>
                + REGISTER BRANCH / CELL
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryActionBtn}
              onPress={() =>
                navigation.navigate('BranchMap', {
                  ministryId: ministry.id,
                })
              }
              activeOpacity={0.8}
            >
              <Text variant="caption" weight="700" style={styles.secondaryActionBtnText}>
                FULL MAP VIEW
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Embedded Interactive Radar Vector Map */}
        <View style={styles.mapCard}>
          <View style={styles.sectionHeader}>
            <Text variant="caption" weight="700" color={colors.textSecondary}>
              CAMPUS & HOMECELL RADAR LOCATIONS
            </Text>
            <Text variant="caption" color={colors.textSecondary}>
              {branches.length} Locations Plotted
            </Text>
          </View>

          <BranchRadarMap
            branches={branches}
            selectedBranchId={selectedBranch?.id}
            onSelectBranch={setSelectedBranch}
            height={240}
          />
        </View>

        {/* Hierarchical Structure Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsScroll}
          contentContainerStyle={styles.tabsContainer}
        >
          {STRUCTURE_TABS.map((tab) => {
            const isSelected = activeTab === tab.key;
            const count = countsByType[tab.key] || 0;
            return (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tabButton, isSelected && styles.tabButtonActive]}
                onPress={() => setActiveTab(tab.key)}
                activeOpacity={0.7}
              >
                <Text
                  variant="caption"
                  weight={isSelected ? '800' : '600'}
                  color={isSelected ? '#0F172A' : colors.textSecondary}
                >
                  {tab.label} ({count})
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Search Input for Branches */}
        <View style={styles.searchBarWrapper}>
          <SearchSvg size={16} color={colors.textSecondary} />
          <TextInput
            style={styles.searchTextInput}
            placeholder={`Search ${ministry.name} branches, cells, towns...`}
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Branches and Homecells List */}
        <View style={styles.branchesList}>
          {filteredBranches.length === 0 ? (
            <View style={styles.emptyCard}>
              <Text variant="body" weight="700" color={colors.textPrimary}>
                No Locations Found in This Category
              </Text>
              <Text variant="caption" color={colors.textSecondary} style={{ textAlign: 'center' }}>
                Is your campus, homecell, or cluster not listed yet? Register it now to appear in the global directory.
              </Text>
              <TouchableOpacity
                style={styles.registerHereBtn}
                onPress={() =>
                  navigation.navigate('RegisterBranch', {
                    ministryId: ministry.id,
                    ministryName: ministry.name,
                  })
                }
              >
                <Text variant="caption" weight="700" style={styles.registerHereBtnText}>
                  + REGISTER YOUR BRANCH
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            filteredBranches.map((b) => (
              <View key={b.id} style={styles.branchCard}>
                <View style={styles.branchCardHeader}>
                  <View
                    style={[
                      styles.typeBadge,
                      b.type === 'homecell' && styles.homecellBadge,
                      b.type === 'cluster' && styles.clusterBadge,
                    ]}
                  >
                    <Text variant="caption" weight="700" style={styles.typeBadgeText}>
                      {getBranchTypeLabel(b.type).toUpperCase()}
                    </Text>
                  </View>
                  <Text variant="caption" color={colors.textSecondary}>
                    {b.town}, {b.province}
                  </Text>
                </View>

                <Text variant="h3" color={colors.textPrimary} style={styles.branchCardTitle}>
                  {b.name}
                </Text>

                <Text variant="caption" color={colors.textSecondary} style={styles.branchMeta}>
                  Leader: <Text variant="caption" weight="700" color={colors.textPrimary}>{b.leaderName}</Text> • Tel: <Text variant="caption" weight="700" color={colors.textPrimary}>{b.contactNumber}</Text>
                </Text>

                <Text variant="caption" color={colors.textSecondary} style={styles.branchMeta}>
                  Schedule: {b.meetingTimes}
                </Text>

                <Text variant="caption" color={colors.textTertiary} style={styles.branchAddress}>
                  {b.address} ({b.postalCode}, {b.country})
                </Text>

                <View style={styles.branchFooter}>
                  <TouchableOpacity
                    style={styles.directionsAction}
                    onPress={() => handleOpenDirections(b)}
                    activeOpacity={0.7}
                  >
                    <Text variant="caption" weight="700" style={styles.directionsActionText}>
                      DIRECTIONS & MAP
                    </Text>
                    <ChevronRightSvg size={14} color="#0F172A" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>

        {/* Global Footer CTA */}
        <TouchableOpacity
          style={styles.bottomCtaBanner}
          onPress={() =>
            navigation.navigate('RegisterBranch', {
              ministryId: ministry.id,
              ministryName: ministry.name,
            })
          }
          activeOpacity={0.8}
        >
          <Text variant="caption" weight="700" color="#B45309">
            ARE YOU LEADING A NEW CELL OR CAMPUS?
          </Text>
          <Text variant="body" weight="700" color={colors.textPrimary}>
            Tap here to register and pinpoint your location
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
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    ...shadow.sm,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(253, 210, 35, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: spacing.xs,
  },
  categoryBadgeText: {
    fontSize: 10,
    color: '#B45309',
  },
  ministryName: {
    fontSize: 22,
    marginBottom: 4,
  },
  founderText: {
    fontSize: 14,
    marginBottom: 2,
  },
  hqText: {
    fontSize: 12,
    marginBottom: spacing.sm,
  },
  descriptionText: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: spacing.md,
  },
  heroActionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  primaryActionBtn: {
    flex: 1,
    backgroundColor: '#FDD223',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryActionBtnText: {
    fontSize: 11,
    color: '#0F172A',
  },
  secondaryActionBtn: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryActionBtnText: {
    fontSize: 11,
    color: '#FFFFFF',
  },
  mapCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    ...shadow.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  tabsScroll: {
    flexGrow: 0,
  },
  tabsContainer: {
    gap: 8,
    paddingVertical: 4,
  },
  tabButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  tabButtonActive: {
    backgroundColor: '#FDD223',
    borderColor: '#FDD223',
  },
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
  },
  searchTextInput: {
    flex: 1,
    paddingVertical: spacing.sm,
    fontSize: 13,
    color: colors.textPrimary,
  },
  branchesList: {
    gap: spacing.sm,
  },
  branchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    ...shadow.sm,
  },
  branchCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  typeBadge: {
    backgroundColor: 'rgba(180, 83, 9, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  homecellBadge: {
    backgroundColor: 'rgba(56, 189, 248, 0.15)',
  },
  clusterBadge: {
    backgroundColor: 'rgba(168, 85, 247, 0.15)',
  },
  typeBadgeText: {
    fontSize: 9,
    color: '#B45309',
  },
  branchCardTitle: {
    fontSize: 15,
    marginVertical: 2,
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
  branchFooter: {
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.05)',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  directionsAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FDD223',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  directionsActionText: {
    fontSize: 10,
    color: '#0F172A',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
  },
  registerHereBtn: {
    backgroundColor: '#FDD223',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 4,
  },
  registerHereBtnText: {
    fontSize: 11,
    color: '#0F172A',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomCtaBanner: {
    backgroundColor: 'rgba(253, 210, 35, 0.2)',
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(180, 83, 9, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    marginBottom: spacing.xl,
  },
});
