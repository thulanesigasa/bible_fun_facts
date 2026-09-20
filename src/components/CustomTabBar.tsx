import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors } from '../theme/colors';
import { Text } from './Typography';
import {
  BookOpen,
  Calendar,
  Scroll,
  Search,
  Bookmark,
} from 'lucide-react-native';
import { useApp } from '../context/UserContext';

const getTabLucideIcon = (routeName: string, color: string) => {
  switch (routeName) {
    case 'Discover':
      return <BookOpen size={16} color={color} />;
    case 'WOTD':
      return <Calendar size={16} color={color} />;
    case 'Scriptures':
      return <Scroll size={16} color={color} />;
    case 'Search':
      return <Search size={16} color={color} />;
    case 'Favorites':
      return <Bookmark size={16} color={color} />;
    default:
      return <BookOpen size={16} color={color} />;
  }
};

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { hideTabBar, accent } = useApp();
  const { width } = useWindowDimensions();
  const horizontalPadding = (width - 280) / 2;

  if (hideTabBar) return null;

  return (
    <View
      style={[
        styles.pillContainer,
        {
          marginHorizontal: horizontalPadding,
          bottom: Platform.OS === 'ios' ? 28 : 24,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? (options.tabBarLabel as string)
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const color = isFocused ? accent : '#94A3B8';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabItem}
            activeOpacity={0.7}
          >
            {getTabLucideIcon(route.name, color)}
            <View style={styles.labelWrapper}>
              <Text
                style={{
                  fontSize: 8.5,
                  fontWeight: isFocused ? '700' : '500',
                  color: isFocused ? accent : '#64748B',
                  marginTop: 1,
                }}
              >
                {label}
              </Text>
              {isFocused && (
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
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    position: 'absolute',
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    height: 50,
    paddingTop: 4,
    paddingBottom: 4,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    borderTopWidth: 0,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
