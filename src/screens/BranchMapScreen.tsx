/**
 * Global Branch & Homecell Radar Map Screen
 *
 * Full-screen interactive vector map plotting churches, branches, homecells,
 * and clusters globally with ministry filtering and 1-tap native map navigation.
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { Text } from '../components/Typography';
import { BranchRadarMap } from '../components/BranchRadarMap';
import {
  getAllBranches,
  getAllMinistries,
  Ministry,
  Branch,
  BranchType,
} from '../services/ministryService';
import { CloseSvg } from '../components/SvgIcons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

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
  const [activeBranch, setActiveBranch] = useState<Branch | null>(null);

  useEffect(() => {
    Promise.all([getAllMinistries(), getAllBranches()]).then(([minList, branchList]) => {
      setMinistries(minList);
      setBranches(branchList);
      if (branchList.length > 0) {
        setActiveBranch(branchList[0]);
      }
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

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
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
          Church & Campus Radar Map
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Ministry Filter Selector */}
        <View style={styles.filterSection}>
          <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.filterLabel}>
            SELECT MINISTRY
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            <TouchableOpacity
              style={[
                styles.filterPill,
                selectedMinistryId === 'all' && styles.filterPillActive,
              ]}
              onPress={() => setSelectedMinistryId('all')}
              activeOpacity={0.7}
            >
              <Text
                variant="caption"
                weight={selectedMinistryId === 'all' ? '800' : '600'}
                color={selectedMinistryId === 'all' ? '#0F172A' : colors.textSecondary}
              >
                All Churches ({branches.length})
              </Text>
            </TouchableOpacity>

            {ministries.map((m) => {
              const isSelected = m.id === selectedMinistryId;
              const count = branches.filter((b) => b.ministryId === m.id).length;
              return (
                <TouchableOpacity
                  key={m.id}
                  style={[styles.filterPill, isSelected && styles.filterPillActive]}
                  onPress={() => setSelectedMinistryId(m.id)}
                  activeOpacity={0.7}
                >
                  <Text
                    variant="caption"
                    weight={isSelected ? '800' : '600'}
                    color={isSelected ? '#0F172A' : colors.textSecondary}
                  >
                    {m.name} ({count})
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Structure Type Filter */}
        <View style={styles.filterSection}>
          <Text variant="caption" weight="700" color={colors.textSecondary} style={styles.filterLabel}>
            LOCATION TYPE
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {(['all', 'branch', 'homecell', 'cell_branch', 'sub_cluster', 'cluster'] as const).map(
              (type) => {
                const isSelected = selectedType === type;
                const label =
                  type === 'all'
                    ? 'All Structures'
                    : type === 'branch'
                    ? 'Main Branches'
                    : type === 'homecell'
                    ? 'Homecells'
                    : type === 'cell_branch'
                    ? 'Cell Branches'
                    : type === 'sub_cluster'
                    ? 'Sub-Clusters'
                    : 'Clusters';
                return (
                  <TouchableOpacity
                    key={type}
                    style={[styles.typePill, isSelected && styles.typePillActive]}
                    onPress={() => setSelectedType(type)}
                    activeOpacity={0.7}
                  >
                    <Text
                      variant="caption"
                      weight={isSelected ? '800' : '600'}
                      color={isSelected ? '#0F172A' : colors.textSecondary}
                    >
                      {label}
                    </Text>
                  </TouchableOpacity>
                );
              }
            )}
          </ScrollView>
        </View>

        {/* Full-View Interactive Radar Vector Map */}
        <View style={styles.mapCard}>
          <View style={styles.mapHeaderRow}>
            <Text variant="caption" weight="700" color={colors.textSecondary}>
              LIVE GEOGRAPHIC RADAR PROJECTION
            </Text>
            <Text variant="caption" color={colors.textSecondary}>
              {filteredBranches.length} Markers
            </Text>
          </View>

          <BranchRadarMap
            branches={filteredBranches}
            selectedBranchId={activeBranch?.id}
            onSelectBranch={setActiveBranch}
            height={SCREEN_HEIGHT * 0.45}
          />
        </View>

        {/* Fast Action CTA */}
        <TouchableOpacity
          style={styles.registerCta}
          onPress={() => navigation.navigate('RegisterBranch', {})}
          activeOpacity={0.8}
        >
          <Text variant="body" weight="700" style={styles.registerCtaText}>
            + REGISTER A NEW LOCATION ON THIS MAP
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
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  filterSection: {
    marginBottom: spacing.xs,
  },
  filterLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  horizontalScroll: {
    flexDirection: 'row',
  },
  filterPill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  filterPillActive: {
    backgroundColor: '#FDD223',
    borderColor: '#FDD223',
  },
  typePill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginRight: 6,
  },
  typePillActive: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  mapCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    ...shadow.sm,
  },
  mapHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  registerCta: {
    backgroundColor: '#FDD223',
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    ...shadow.sm,
  },
  registerCtaText: {
    color: '#0F172A',
    fontSize: 12,
    letterSpacing: 0.5,
  },
});
