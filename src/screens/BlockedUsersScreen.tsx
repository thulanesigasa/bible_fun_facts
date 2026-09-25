import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing } from '../theme';
import { Text } from '../components/Typography';
import { useUser } from '../context/UserContext';
import { BlockSvg, CheckSvg } from '../components/SvgIcons';

export default function BlockedUsersScreen({ navigation }: { navigation?: any }) {
  const { blockedUserIds, unblockUser } = useUser();
  const [unblockedMap, setUnblockedMap] = useState<Record<string, boolean>>({});

  const handleUnblock = async (id: string) => {
    await unblockUser(id);
    setUnblockedMap((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.introHeader}>
          <Text variant="caption" color={colors.textSecondary} style={styles.lastUpdated}>
            Privacy & Fellowship Safety • exégeomai
          </Text>
          <Text variant="body" color={colors.textSecondary} style={styles.leadParagraph}>
            Blocked accounts are completely hidden from your Search, Fellowship Discovery, and Study reflections. They cannot view your public profile or study contributions.
          </Text>
        </View>

        <View style={styles.bodySection}>
          <Text variant="label" weight="800" color={colors.textTertiary} style={styles.sectionHeader}>
            BLOCKED ACCOUNTS ({blockedUserIds.length})
          </Text>

          {blockedUserIds.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text variant="h3" weight="800" color={colors.textPrimary} style={styles.emptyTitle}>
                No blocked accounts
              </Text>
              <Text variant="body" color={colors.textSecondary} style={styles.emptySubtitle}>
                You have not blocked any disciples or scholars. Your fellowship network is completely open.
              </Text>
            </View>
          ) : (
            blockedUserIds.map((userId, index) => {
              const isUnblocked = unblockedMap[userId];
              return (
                <View key={userId}>
                  <View style={styles.userRow}>
                    <View style={styles.userInfo}>
                      <View style={styles.avatarPlaceholder}>
                        <BlockSvg size={16} color="#64748B" strokeWidth={2} />
                      </View>
                      <View style={styles.nameBlock}>
                        <Text variant="h3" style={styles.userName}>
                          {`Account ID: ${userId.substring(0, 14)}...`}
                        </Text>
                        <Text variant="caption" color={colors.textSecondary}>
                          {isUnblocked ? 'Unblocked' : 'Blocked from interactions'}
                        </Text>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.unblockButton,
                        isUnblocked ? styles.unblockedState : styles.blockedState,
                      ]}
                      onPress={() => !isUnblocked && handleUnblock(userId)}
                      disabled={isUnblocked}
                      activeOpacity={0.8}
                    >
                      {isUnblocked ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                          <CheckSvg size={12} color="#64748B" strokeWidth={2.5} />
                          <Text variant="caption" weight="700" color="#64748B">
                            Unblocked
                          </Text>
                        </View>
                      ) : (
                        <Text variant="caption" weight="700" color="#0F172A">
                          Unblock
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  {index < blockedUserIds.length - 1 && <View style={styles.rowDivider} />}
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF', // 30% Panel Surface
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 48,
  },
  introHeader: {
    paddingBottom: 16,
    marginBottom: 8,
  },
  lastUpdated: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
    fontSize: 11,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
  },
  leadParagraph: {
    fontSize: 13,
    lineHeight: 20,
    color: '#64748B',
  },
  bodySection: {
    marginTop: 8,
  },
  sectionHeader: {
    fontSize: 10.5,
    letterSpacing: 1,
    marginBottom: 12,
  },
  emptyContainer: {
    paddingVertical: 32,
    alignItems: 'flex-start',
  },
  emptyTitle: {
    fontSize: 15,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 13,
    lineHeight: 19,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  avatarPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameBlock: {
    flex: 1,
  },
  userName: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  unblockButton: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockedState: {
    backgroundColor: '#FDD223', // 10% Accent
  },
  unblockedState: {
    backgroundColor: '#F1F5F9',
  },
  rowDivider: {
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
  },
});
