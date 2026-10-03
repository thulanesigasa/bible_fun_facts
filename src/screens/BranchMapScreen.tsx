/**
 * Global Branch & Homecell Radar Map Screen
 *
 * Full-screen interactive vector map plotting churches, branches, homecells,
 * and clusters globally with ministry filtering and 1-tap native map navigation.
 *
 * Rendered directly on the continuous screen body canvas (zero card divs/boxes/pills).
 * 100% free open-source map tiles and in-memory offline database: ZERO external API key needed.
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing, radius } from '../theme';
import { Text } from '../components/Typography';
import { BranchRadarMap } from '../components/BranchRadarMap';
import {
  getAllBranches,
  getAllMinistries,
  Ministry,
  Branch,
  BranchType,
  getBranchTypeLabel,
} from '../services/ministryService';
import { CloseSvg, MapPinSvg, ChevronRightSvg } from '../components/SvgIcons';

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
          Church & Campus Radar
        </Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Zero-API-Key Informative Meta Bar */}
        <View style={styles.metaInfoRow}>
          <Text style={styles.metaNotice}>
            OPEN-SOURCE VECTOR RADAR • ZERO EXTERNAL API KEYS REQUIRED
          </Text>
          <Text style={styles.metaSubNotice}>
            Uses bundled in-memory database and open OpenStreetMap / CARTO street tiles.
          </Text>
        </View>

        {/* Ministry Text Filter on Screen Body */}
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>MINISTRIES</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
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

        {/* Location Type Filter on Screen Body */}
        <View style={styles.filterSection}>
          <Text style={styles.filterSectionTitle}>STRUCTURE TYPE</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
            contentContainerStyle={styles.textFilterContainer}
          >
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
                    style={styles.textFilterItem}
                    onPress={() => setSelectedType(type)}
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
              }
            )}
          </ScrollView>
        </View>

        {/* Continuous Body Vector Radar Map (Zero Outer Card Wrapper) */}
        <View style={styles.mapCanvasWrapper}>
          <View style={styles.mapCanvasHeader}>
            <Text style={styles.mapCanvasHeaderTitle}>
              GEOGRAPHIC RADAR PROJECTION
            </Text>
            <Text style={styles.mapCanvasHeaderCount}>
              {filteredBranches.length} Markers Plotted
            </Text>
          </View>

          <BranchRadarMap
            branches={filteredBranches}
            selectedBranchId={activeBranch?.id}
            onSelectBranch={setActiveBranch}
            height={SCREEN_HEIGHT * 0.42}
            showFooter={false}
          />
        </View>

        {/* Selected Branch Details Directly on Body Canvas */}
        {activeBranch ? (
          <View style={styles.activeLocationSection}>
            <View style={styles.locationHeaderRow}>
              <Text style={styles.locationTypeLabel}>
                {getBranchTypeLabel(activeBranch.type).toUpperCase()}
              </Text>
              <Text style={styles.locationCityLabel}>
                {activeBranch.town}, {activeBranch.province}
              </Text>
            </View>

            <Text style={styles.locationName}>
              {activeBranch.name}
            </Text>

            <View style={styles.locationMetaRow}>
              <MapPinSvg size={14} color="#64748B" />
              <Text style={styles.locationAddressText}>
                {activeBranch.address || `${activeBranch.town}, ${activeBranch.country} (${activeBranch.postalCode})`}
              </Text>
            </View>

            {activeBranch.leaderName ? (
              <Text style={styles.locationDetailText}>
                Leader in charge: {activeBranch.leaderName}
              </Text>
            ) : null}

            {activeBranch.meetingTimes ? (
              <Text style={styles.locationDetailText}>
                Services: {activeBranch.meetingTimes}
              </Text>
            ) : null}

            {/* Direct Action Links on Body */}
            <View style={styles.locationActionRow}>
              <TouchableOpacity
                style={styles.directionsLink}
                onPress={() => handleOpenDirections(activeBranch)}
                activeOpacity={0.7}
              >
                <Text style={styles.directionsLinkText}>
                  Get Directions in Native Maps ›
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.addHereLink}
                onPress={() =>
                  navigation.navigate('RegisterBranch', {
                    ministryId: activeBranch.ministryId,
                  })
                }
                activeOpacity={0.7}
              >
                <Text style={styles.addHereLinkText}>
                  + Add Nearby Branch
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.noLocationSelected}>
            <Text style={styles.noLocationText}>
              Tap any pin on the map to view campus details and get directions.
            </Text>
          </View>
        )}

        {/* Register New Location Link on Body Canvas */}
        <View style={styles.bottomActionContainer}>
          <TouchableOpacity
            style={styles.registerLocationLink}
            onPress={() => navigation.navigate('RegisterBranch', {})}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Register a new location on this map"
          >
            <Text style={styles.registerLocationPlus}>+</Text>
            <Text style={styles.registerLocationText}>
              Register a New Location on this Map
            </Text>
            <ChevronRightSvg size={14} color="#0F172A" />
          </TouchableOpacity>
        </View>
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
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
    gap: 12,
  },
  metaInfoRow: {
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 23, 42, 0.06)',
    paddingBottom: 8,
  },
  metaNotice: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.accent,
    letterSpacing: 0.5,
  },
  metaSubNotice: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  filterSection: {
    paddingVertical: 2,
  },
  filterSectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  horizontalScroll: {
    flexDirection: 'row',
  },
  textFilterContainer: {
    gap: 16,
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
  mapCanvasWrapper: {
    marginTop: 4,
  },
  mapCanvasHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  mapCanvasHeaderTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  mapCanvasHeaderCount: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  activeLocationSection: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    gap: 4,
  },
  locationHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationTypeLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.accent,
    letterSpacing: 0.4,
  },
  locationCityLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  locationName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  locationMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  locationAddressText: {
    fontSize: 13,
    color: '#475569',
  },
  locationDetailText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  locationActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.05)',
  },
  directionsLink: {
    paddingVertical: 4,
  },
  directionsLinkText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  addHereLink: {
    paddingVertical: 4,
  },
  addHereLinkText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  noLocationSelected: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  noLocationText: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
  bottomActionContainer: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(15, 23, 42, 0.06)',
  },
  registerLocationLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.12)',
    borderRadius: radius.sm,
  },
  registerLocationPlus: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  registerLocationText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: 0.2,
  },
});
