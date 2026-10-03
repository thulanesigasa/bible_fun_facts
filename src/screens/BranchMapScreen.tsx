/**
 * Branch & Homecell Directory Screen
 *
 * Converted from tile-canvas map view to a clean, editorial flat directory.
 * Zero card wrappers · Zero external map API calls · Zero pills or badges.
 * Ministries and structure-type filters via plain text tabs.
 * Each row: type label, name, town/province, leader, contact, meeting times,
 * street address, and a 1-tap native Directions link (Google Maps / Apple Maps / Geo URI).
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing } from '../theme';
import { Text } from '../components/Typography';
import {
  getAllBranches,
  getAllMinistries,
  Ministry,
  Branch,
  BranchType,
  getBranchTypeLabel,
} from '../services/ministryService';
import { CloseSvg, ChevronRightSvg } from '../components/SvgIcons';

export default function BranchMapScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const initialMinistryId = route.params?.ministryId || 'all';

  const [ministries, setMinistries] = useState<Ministry[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedMinistryId, setSelectedMinistryId] = useState<string>(initialMinistryId);
  const [selectedType, setSelectedType] = useState<BranchType | 'all'>('all');

  useEffect(() => {
    Promise.all([getAllMinistries(), getAllBranches()]).then(([minList, branchList]) => {
      setMinistries(minList);
      setBranches(branchList);
    });
  }, []);

  const filteredBranches = useMemo(() => {
    let list = branches;
    if (selectedMinistryId !== 'all') {
      list = list.filter((b) => b.ministryId === selectedMinistryId);
    }
    if (selectedType !== 'all') {
      list = list.filter((b) => b.type === selectedType);
    }
    return list;
  }, [branches, selectedMinistryId, selectedType]);

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

  const TYPE_FILTERS: { key: BranchType | 'all'; label: string }[] = [
    { key: 'all', label: 'All Structures' },
    { key: 'branch', label: 'Main Branches' },
    { key: 'homecell', label: 'Homecells' },
    { key: 'cell_branch', label: 'Cell Branches' },
    { key: 'sub_cluster', label: 'Sub-Clusters' },
    { key: 'cluster', label: 'Clusters' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeBtn}
          accessibilityRole="button"
          accessibilityLabel="Back to previous screen"
        >
          <CloseSvg size={20} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text variant="h3" color={colors.textPrimary} style={styles.headerTitle}>
          Branch Directory
        </Text>
        <TouchableOpacity
          style={styles.registerHeaderBtn}
          onPress={() => navigation.navigate('RegisterBranch', {})}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Register Branch or Cell"
        >
          <Text style={styles.registerHeaderBtnText}>+ Register</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Ministry Filter — plain text tabs */}
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>MINISTRIES</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.textFilterContainer}
          >
            <TouchableOpacity
              style={styles.textFilterItem}
              onPress={() => setSelectedMinistryId('all')}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedMinistryId === 'all' && styles.filterTextActive,
                ]}
              >
                All Churches ({branches.length})
              </Text>
              {selectedMinistryId === 'all' && <View style={styles.activeUnderline} />}
            </TouchableOpacity>

            {ministries.map((m) => {
              const isSelected = m.id === selectedMinistryId;
              const count = branches.filter((b) => b.ministryId === m.id).length;
              return (
                <TouchableOpacity
                  key={m.id}
                  style={styles.textFilterItem}
                  onPress={() => setSelectedMinistryId(m.id)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.filterText,
                      isSelected && styles.filterTextActive,
                    ]}
                  >
                    {m.name} ({count})
                  </Text>
                  {isSelected && <View style={styles.activeUnderline} />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Structure Type Filter — plain text tabs */}
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>STRUCTURE TYPE</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.textFilterContainer}
          >
            {TYPE_FILTERS.map(({ key, label }) => {
              const isSelected = selectedType === key;
              return (
                <TouchableOpacity
                  key={key}
                  style={styles.textFilterItem}
                  onPress={() => setSelectedType(key)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.filterText,
                      isSelected && styles.filterTextActive,
                    ]}
                  >
                    {label}
                  </Text>
                  {isSelected && <View style={styles.activeUnderline} />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Results meta */}
        <View style={styles.resultsMetaRow}>
          <Text style={styles.resultsMetaText}>
            {filteredBranches.length} location{filteredBranches.length !== 1 ? 's' : ''} found
          </Text>
        </View>

        {/* Directory List */}
        {filteredBranches.length === 0 ? (
          <View style={styles.emptySection}>
            <Text variant="body" weight="700" color={colors.textPrimary}>
              No locations found
            </Text>
            <Text variant="caption" color={colors.textSecondary} style={{ marginTop: 4 }}>
              Is your branch or cell not listed? Register it to appear in the global directory.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('RegisterBranch', {})}
              style={{ marginTop: spacing.sm }}
            >
              <Text variant="caption" weight="700" style={styles.actionLink}>
                + Register Branch or Cell
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredBranches.map((b, index) => (
            <View
              key={b.id}
              style={[styles.branchRow, index === 0 && styles.branchRowFirst]}
            >
              {/* Type label — plain text, not a pill */}
              <Text variant="caption" weight="700" color={colors.accent} style={styles.branchTypeText}>
                {getBranchTypeLabel(b.type).toUpperCase()}
              </Text>

              <Text variant="h3" color={colors.textPrimary} style={styles.branchName}>
                {b.name}
              </Text>

              <Text variant="caption" color={colors.textSecondary} style={styles.branchMeta}>
                {b.town}, {b.province}{b.country ? ` · ${b.country}` : ''}
              </Text>

              <Text variant="caption" color={colors.textSecondary} style={styles.branchMeta}>
                Leader:{' '}
                <Text variant="caption" weight="700" color={colors.textPrimary}>
                  {b.leaderName}
                </Text>
                {'  ·  '}
                <Text variant="caption" weight="700" color={colors.textPrimary}>
                  {b.contactNumber}
                </Text>
              </Text>

              {b.meetingTimes ? (
                <Text variant="caption" color={colors.textSecondary} style={styles.branchMeta}>
                  {b.meetingTimes}
                </Text>
              ) : null}

              <Text variant="caption" color={colors.textTertiary} style={styles.branchAddress}>
                {b.address}
              </Text>

              <View style={styles.branchActions}>
                <TouchableOpacity
                  onPress={() => handleOpenDirections(b)}
                  activeOpacity={0.7}
                >
                  <Text variant="caption" weight="700" style={styles.directionsLinkText}>
                    Directions &amp; Map {'>'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('RegisterBranch', {
                      ministryId: b.ministryId,
                    })
                  }
                  activeOpacity={0.7}
                >
                  <Text variant="caption" color={colors.textTertiary} style={styles.registerNearbyText}>
                    + Register Branch or Cell
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        {/* Footer CTA */}
        <TouchableOpacity
          onPress={() => navigation.navigate('RegisterBranch', {})}
          activeOpacity={0.7}
          style={styles.footerCta}
          accessibilityRole="button"
          accessibilityLabel="Register a new branch or cell"
        >
          <Text variant="caption" weight="700" color={colors.textTertiary}>
            LEADING A NEW BRANCH OR CELL?
          </Text>
          <View style={styles.footerCtaLinkRow}>
            <Text variant="body" weight="700" color={colors.textPrimary}>
              Register and appear in the global directory
            </Text>
            <ChevronRightSvg size={16} color={colors.textPrimary} />
          </View>
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
    fontWeight: '700',
  },
  registerHeaderBtn: {
    paddingVertical: 4,
    paddingHorizontal: spacing.sm,
  },
  registerHeaderBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    textDecorationLine: 'underline',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: spacing.xxl + spacing.nav,
  },

  // Filters
  filterSection: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  filterSectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  textFilterContainer: {
    gap: 20,
    paddingBottom: 4,
  },
  textFilterItem: {
    paddingVertical: 2,
    alignItems: 'flex-start',
  },
  filterText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#0F172A',
    fontWeight: '800',
  },
  activeUnderline: {
    height: 2,
    backgroundColor: '#0F172A',
    width: '100%',
    marginTop: 3,
    borderRadius: 1,
  },

  // Results meta
  resultsMetaRow: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
  },
  resultsMetaText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },

  // Branch rows
  branchRow: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.06)',
  },
  branchRowFirst: {
    borderTopWidth: 0,
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
  branchActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.05)',
  },
  directionsLinkText: {
    fontSize: 12,
    color: '#0F172A',
    textDecorationLine: 'underline',
  },
  registerNearbyText: {
    fontSize: 11,
  },

  // Empty
  emptySection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  actionLink: {
    fontSize: 12,
    color: '#0F172A',
    textDecorationLine: 'underline',
  },

  // Footer
  footerCta: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.06)',
    marginTop: spacing.md,
  },
  footerCtaLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
});

