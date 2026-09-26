import React from 'react';
import {
  View,
  Text,
  Platform,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer, DefaultTheme, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  DiscoverSvg,
  WotdSvg,
  HistorySvg,
  SearchSvg,
  ProfileSvg,
  BellSvg,
} from '../components/SvgIcons';

import DiscoverScreen from '../screens/DiscoverScreen';
import WOTDScreen from '../screens/WOTDScreen';
import HistoryScreen from '../screens/HistoryScreen';
import WriterDetailsScreen from '../screens/WriterDetailsScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import UnfoldedScreen from '../screens/UnfoldedScreen';
import DownloadedVersesScreen from '../screens/DownloadedVersesScreen';
import AchievementsScreen from '../screens/AchievementsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FactDetailsScreen from '../screens/FactDetailsScreen';
import ScriptureDetailsScreen from '../screens/ScriptureDetailsScreen';
import WOTDDetailsScreen from '../screens/WOTDDetailsScreen';
import BlockedUsersScreen from '../screens/BlockedUsersScreen';
import BiometricLockOverlay from '../components/BiometricLockOverlay';
import AppSwitcherShield from '../components/AppSwitcherShield';
import { Fact, Scripture, WOTDEntry } from '../data/mockDatabase';
import { BiblicalWriter } from '../data/biblicalWriters';
import { colors } from '../theme/colors';
import { useApp } from '../context/UserContext';
import AuthScreen from '../screens/AuthScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import TermsOfServiceScreen from '../screens/TermsOfServiceScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';

export type AuthStackParamList = {
  Welcome: undefined;
  Auth: { initialMode?: 'login' | 'signup' } | undefined;
  TermsOfService: undefined;
  PrivacyPolicy: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  DiscoverMain: undefined;
  FactDetails: { fact: Fact };
  HistoryMain: undefined;
  WriterDetails: { writer: BiblicalWriter };
  ScripturesMain: undefined;
  ScriptureDetails: { scripture: Scripture };
  SearchMain: undefined;
  WOTDDetails: { wotd: WOTDEntry };
  ProfileMain: undefined;
  Favorites: undefined;
  Bookmarks: undefined;
  Unfolded: undefined;
  DownloadedVerses: undefined;
  Achievements: { category?: 'streak' | 'bookmark' | 'highlight' | 'share'; milestoneId?: string } | undefined;
  Notifications: undefined;
  TermsOfService: undefined;
  PrivacyPolicy: undefined;
  BlockedUsers: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function HeaderBellButton({ navigation }: any) {
  const { unreadNotificationsCount } = useApp();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Discover', { screen: 'Notifications' })}
      style={{ paddingRight: 16, paddingLeft: 8, paddingVertical: 4, position: 'relative' }}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      accessibilityRole="button"
      accessibilityLabel={`Notifications. ${unreadNotificationsCount} unread.`}
    >
      <BellSvg size={20} color="#0F172A" />
      {unreadNotificationsCount > 0 && (
        <View
          style={{
            position: 'absolute',
            top: 2,
            right: 10,
            minWidth: 15,
            height: 15,
            borderRadius: 7.5,
            backgroundColor: '#FDD223',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 2,
            borderWidth: 1.5,
            borderColor: '#FFFFFF',
          }}
        >
          <Text
            style={{
              fontSize: 8.5,
              fontWeight: '800',
              color: '#0F172A',
            }}
          >
            {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

function shouldShowTabHeader(route: any): boolean {
  const routeName = getFocusedRouteNameFromRoute(route);
  if (!routeName) return true;
  const childScreens = [
    'Favorites',
    'Bookmarks',
    'Unfolded',
    'DownloadedVerses',
    'Achievements',
    'Notifications',
    'TermsOfService',
    'PrivacyPolicy',
    'FactDetails',
    'WriterDetails',
    'ScriptureDetails',
    'WOTDDetails',
  ];
  return !childScreens.includes(routeName);
}

function getTabBarVisibility(route: any, hideTabBar: boolean): 'none' | 'flex' {
  if (hideTabBar) return 'none';
  const routeName = getFocusedRouteNameFromRoute(route);
  if (
    routeName === 'TermsOfService' ||
    routeName === 'PrivacyPolicy' ||
    routeName === 'Achievements' ||
    routeName === 'Notifications'
  ) {
    return 'none';
  }
  return 'flex';
}

function DiscoverStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DiscoverMain" component={DiscoverScreen} />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerShown: true,
          title: 'Notifications',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#0F172A',
            fontSize: 18,
            fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
          },
          headerTintColor: '#0F172A',
        }}
      />
      <Stack.Screen
        name="Achievements"
        component={AchievementsScreen}
        options={{
          headerShown: true,
          title: 'Study Achievements',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#0F172A',
            fontSize: 18,
            fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
          },
          headerTintColor: '#0F172A',
        }}
      />
      <Stack.Screen
        name="FactDetails"
        component={FactDetailsScreen}
        options={{
          presentation: 'pageSheet',
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
    </Stack.Navigator>
  );
}

function HistoryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HistoryMain" component={HistoryScreen} />
      <Stack.Screen
        name="WriterDetails"
        component={WriterDetailsScreen}
        options={{
          presentation: 'pageSheet',
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchMain" component={SearchScreen} />
      <Stack.Screen
        name="FactDetails"
        component={FactDetailsScreen}
        options={{
          presentation: 'pageSheet',
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          headerShown: true,
          title: 'Saved Collection',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#0F172A',
            fontSize: 18,
            fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
          },
          headerTintColor: '#0F172A',
        }}
      />
      <Stack.Screen
        name="Bookmarks"
        component={BookmarksScreen}
        options={{
          headerShown: true,
          title: 'Bookmarked Verses',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#0F172A',
            fontSize: 18,
            fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
          },
          headerTintColor: '#0F172A',
        }}
      />
      <Stack.Screen
        name="Unfolded"
        component={UnfoldedScreen}
        options={{
          headerShown: true,
          title: 'Unfolded',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#0F172A',
            fontSize: 18,
            fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
          },
          headerTintColor: '#0F172A',
        }}
      />
      <Stack.Screen
        name="DownloadedVerses"
        component={DownloadedVersesScreen}
        options={{
          headerShown: true,
          title: 'Downloaded Translations',
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#0F172A',
            fontSize: 18,
            fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
          },
          headerTintColor: '#0F172A',
        }}
      />
      <Stack.Screen
        name="Achievements"
        component={AchievementsScreen}
        options={{
          headerShown: true,
          title: 'Study Achievements',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#0F172A',
            fontSize: 18,
            fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
          },
          headerTintColor: '#0F172A',
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerShown: true,
          title: 'Notifications',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#0F172A',
            fontSize: 18,
            fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
          },
          headerTintColor: '#0F172A',
        }}
      />
      <Stack.Screen
        name="FactDetails"
        component={FactDetailsScreen}
        options={{
          presentation: 'pageSheet',
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
      <Stack.Screen
        name="ScriptureDetails"
        component={ScriptureDetailsScreen}
        options={{
          presentation: 'pageSheet',
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
      <Stack.Screen
        name="WOTDDetails"
        component={WOTDDetailsScreen}
        options={{
          presentation: 'pageSheet',
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
      <Stack.Screen
        name="TermsOfService"
        component={TermsOfServiceScreen}
        options={{
          headerShown: true,
          title: 'Terms of Service',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#0F172A',
            fontSize: 18,
            fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
          },
          headerTintColor: '#0F172A',
          contentStyle: { backgroundColor: colors.background },
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{
          headerShown: true,
          title: 'Privacy Policy',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#0F172A',
            fontSize: 18,
            fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
          },
          headerTintColor: '#0F172A',
          contentStyle: { backgroundColor: colors.background },
        }}
      />
      <Stack.Screen
        name="BlockedUsers"
        component={BlockedUsersScreen}
        options={{
          headerShown: true,
          title: 'Blocked Accounts',
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: '#0F172A',
            fontSize: 18,
            fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
          },
          headerTintColor: '#0F172A',
          contentStyle: { backgroundColor: colors.background },
        }}
      />
    </Stack.Navigator>
  );
}

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.surface,
    text: colors.textPrimary,
    border: colors.border,
    primary: colors.accent,
  },
};

export default function AppNavigator() {
  const {
    userProfile,
    hideTabBar,
    accent,
    unreadNotificationsCount,
    isAppLocked,
    biometricType,
    unlockApp,
    isPrivacyShieldEnabled,
  } = useApp();
  const { width } = useWindowDimensions();
  const horizontalPadding = (width - 280) / 2;

  return (
    <NavigationContainer theme={navTheme}>
      <AppSwitcherShield enabled={isPrivacyShieldEnabled} />
      <BiometricLockOverlay
        visible={isAppLocked}
        biometricType={biometricType}
        onUnlock={unlockApp}
      />
      {!userProfile ? (
        <AuthStack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
          <AuthStack.Screen name="Auth" component={AuthScreen} />
          <AuthStack.Screen
            name="TermsOfService"
            component={TermsOfServiceScreen}
            options={{
              headerShown: true,
              title: 'Terms of Service',
              headerStyle: {
                backgroundColor: '#FFFFFF',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: '#0F172A',
                fontSize: 18,
                fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
              },
              headerTintColor: '#0F172A',
            }}
          />
          <AuthStack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicyScreen}
            options={{
              headerShown: true,
              title: 'Privacy Policy',
              headerStyle: {
                backgroundColor: '#FFFFFF',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: '#0F172A',
                fontSize: 18,
                fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
              },
              headerTintColor: '#0F172A',
            }}
          />
        </AuthStack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: shouldShowTabHeader(route),
            tabBarActiveTintColor: accent,
            tabBarInactiveTintColor: '#94A3B8',
            tabBarStyle: {
              display: getTabBarVisibility(route, hideTabBar),
              position: 'absolute',
              bottom: Platform.OS === 'ios' ? 28 : 24,
              marginHorizontal: horizontalPadding,
              width: 280,
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              height: 50,
              paddingBottom: 4,
              paddingTop: 4,
              borderWidth: 1,
              borderColor: 'rgba(15, 23, 42, 0.08)',
              borderTopWidth: 0,
              shadowColor: '#0F172A',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.08,
              shadowRadius: 12,
              elevation: 5,
            },
            headerStyle: {
              backgroundColor: '#FFFFFF',
              shadowColor: 'transparent',
              elevation: 0,
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(15, 23, 42, 0.08)',
            },
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../../assets/logo-transparent.png')}
                  style={{ width: 24, height: 24, marginRight: 8 }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#0F172A',
                    fontSize: 18,
                    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
                  }}
                >
                  exégeomai
                </Text>
              </View>
            ),
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#0F172A',
              fontSize: 18,
              fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
            },
            tabBarLabel: ({ focused, children }) => {
              return (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text
                    style={{
                      fontSize: 8.5,
                      fontWeight: focused ? '700' : '500',
                      color: focused ? accent : '#64748B',
                      marginTop: 1,
                    }}
                  >
                    {children}
                  </Text>
                  {focused && (
                    <View
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: accent,
                        marginTop: 2,
                      }}
                    />
                  )}
                </View>
              );
            },
          })}
        >
          <Tab.Screen
            name="Discover"
            component={DiscoverStack}
            options={({ navigation }) => ({
              title: 'Feed',
              tabBarIcon: ({ color }) => <DiscoverSvg size={16} color={color} strokeWidth={2} />,
              tabBarBadge: unreadNotificationsCount > 0 ? (unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount) : undefined,
              tabBarBadgeStyle: {
                backgroundColor: accent,
                color: '#0F172A',
                fontSize: 8,
                fontWeight: '800',
                minWidth: 14,
                height: 14,
                lineHeight: 14,
                borderRadius: 7,
              },
              headerRight: () => <HeaderBellButton navigation={navigation} />,
            })}
          />
          <Tab.Screen
            name="WOTD"
            component={WOTDScreen}
            options={{
              title: 'Word',
              tabBarIcon: ({ color }) => <WotdSvg size={16} color={color} strokeWidth={2} />,
            }}
          />
          <Tab.Screen
            name="History"
            component={HistoryStack}
            options={{
              title: 'History',
              tabBarIcon: ({ color }) => <HistorySvg size={16} color={color} strokeWidth={2} />,
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchStack}
            options={{
              title: 'Search',
              tabBarIcon: ({ color }) => <SearchSvg size={16} color={color} strokeWidth={2} />,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileStack}
            options={{
              title: 'Profile',
              tabBarIcon: ({ color }) => <ProfileSvg size={16} color={color} strokeWidth={2} />,
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
