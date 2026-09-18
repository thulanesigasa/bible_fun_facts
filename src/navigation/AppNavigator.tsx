import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DiscoverScreen from '../screens/DiscoverScreen';
import WOTDScreen from '../screens/WOTDScreen';
import ScripturesScreen from '../screens/ScripturesScreen';
import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FactDetailsScreen from '../screens/FactDetailsScreen';
import ScriptureDetailsScreen from '../screens/ScriptureDetailsScreen';
import WOTDDetailsScreen from '../screens/WOTDDetailsScreen';
import { Fact, Scripture, WOTDEntry } from '../data/mockDatabase';
import { CustomTabBar } from '../components/CustomTabBar';
import { colors } from '../theme/colors';
import { useUser } from '../context/UserContext';
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
          contentStyle: { backgroundColor: colors.background }
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
          contentStyle: { backgroundColor: colors.background }
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
          contentStyle: { backgroundColor: colors.background }
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
          contentStyle: { backgroundColor: colors.background }
        }} 
      />
      <Stack.Screen 
        name="ScriptureDetails" 
        component={ScriptureDetailsScreen} 
        options={{ 
          presentation: 'pageSheet', 
          headerShown: false,
          contentStyle: { backgroundColor: colors.background }
        }} 
      />
      <Stack.Screen 
        name="WOTDDetails" 
        component={WOTDDetailsScreen} 
        options={{ 
          presentation: 'pageSheet', 
          headerShown: false,
          contentStyle: { backgroundColor: colors.background }
        }} 
      />
    </Stack.Navigator>
  );
}

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.surface,
    text: colors.textPrimary,
    border: colors.border,
    primary: colors.accent,
  },
};

export default function AppNavigator() {
  const { userProfile } = useUser();

  return (
    <NavigationContainer theme={navTheme}>
      {!userProfile ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthScreen} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          tabBar={(props) => <CustomTabBar {...props} />}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen name="Discover" component={DiscoverStack} />
          <Tab.Screen name="WOTD" component={WOTDScreen} />
          <Tab.Screen name="Scriptures" component={ScripturesStack} />
          <Tab.Screen name="Search" component={SearchStack} />
          <Tab.Screen name="Favorites" component={FavoritesStack} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}
