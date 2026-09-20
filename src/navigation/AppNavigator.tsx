import React from 'react';
import {
  View,
  Text,
  Platform,
  useWindowDimensions,
  Image,
} from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  BookOpen,
  Calendar,
  Scroll,
  Search,
  Bookmark,
} from 'lucide-react-native';

import DiscoverScreen from '../screens/DiscoverScreen';
import WOTDScreen from '../screens/WOTDScreen';
import ScripturesScreen from '../screens/ScripturesScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FactDetailsScreen from '../screens/FactDetailsScreen';
import ScriptureDetailsScreen from '../screens/ScriptureDetailsScreen';
import WOTDDetailsScreen from '../screens/WOTDDetailsScreen';
import { Fact, Scripture, WOTDEntry } from '../data/mockDatabase';
import { colors } from '../theme/colors';
import { useApp } from '../context/UserContext';
import AuthScreen from '../screens/AuthScreen';

export type RootStackParamList = {
  Auth: undefined;
  DiscoverMain: undefined;
  FactDetails: { fact: Fact };
  ScripturesMain: undefined;
  ScriptureDetails: { scripture: Scripture };
  SearchMain: undefined;
  WOTDDetails: { wotd: WOTDEntry };
  FavoritesMain: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function DiscoverStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DiscoverMain" component={DiscoverScreen} />
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

function ScripturesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ScripturesMain" component={ScripturesScreen} />
      <Stack.Screen
        name="ScriptureDetails"
        component={ScriptureDetailsScreen}
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

function FavoritesStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FavoritesMain" component={FavoritesScreen} />
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
  const { userProfile, hideTabBar, accent } = useApp();
  const { width } = useWindowDimensions();
  const horizontalPadding = (width - 280) / 2;

  return (
    <NavigationContainer theme={navTheme}>
      {!userProfile ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthScreen} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: accent,
            tabBarInactiveTintColor: '#94A3B8',
            tabBarStyle: {
              display: hideTabBar ? 'none' : 'flex',
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
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#0F172A',
              fontSize: 18,
              fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
            },
            tabBarLabel: ({ focused, children }) => (
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
            ),
          }}
        >
          <Tab.Screen
            name="Discover"
            component={DiscoverStack}
            options={{
              title: 'Feed',
              tabBarIcon: ({ color }) => <BookOpen size={16} color={color} />,
              headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../../assets/icon.png')}
                    style={{ width: 24, height: 24, marginRight: 8, borderRadius: 5 }}
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
            }}
          />
          <Tab.Screen
            name="WOTD"
            component={WOTDScreen}
            options={{
              title: 'Word',
              tabBarIcon: ({ color }) => <Calendar size={16} color={color} />,
              headerTitle: 'Word of the Day',
            }}
          />
          <Tab.Screen
            name="Scriptures"
            component={ScripturesStack}
            options={{
              title: 'Verses',
              tabBarIcon: ({ color }) => <Scroll size={16} color={color} />,
              headerTitle: 'Scripture Library',
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchStack}
            options={{
              title: 'Search',
              tabBarIcon: ({ color }) => <Search size={16} color={color} />,
              headerTitle: 'Search & Explore',
            }}
          />
          <Tab.Screen
            name="Favorites"
            component={FavoritesStack}
            options={{
              title: 'Saved',
              tabBarIcon: ({ color }) => <Bookmark size={16} color={color} />,
              headerTitle: 'Saved Collection',
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
