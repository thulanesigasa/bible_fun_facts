import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';
import { spacing } from '../theme';
import { Text } from './Typography';
import {
  DiscoverSvg,
  WotdSvg,
  ScripturesSvg,
  SearchSvg,
  FavoritesSvg,
} from './SvgIcons';

const { width } = Dimensions.get('window');
const TAB_COUNT = 5;
const TAB_WIDTH = width / TAB_COUNT;

const getTabSvg = (routeName: string, isFocused: boolean) => {
  const size = 22;
  const color = isFocused ? colors.accent : colors.textSecondary;
  const fill = isFocused ? (routeName === 'Favorites' ? colors.accent : colors.accentSoft) : 'none';

  switch (routeName) {
    case 'Discover':
      return <DiscoverSvg size={size} color={color} fill={fill} />;
    case 'WOTD':
      return <WotdSvg size={size} color={color} fill={fill} />;
    case 'Scriptures':
      return <ScripturesSvg size={size} color={color} fill={fill} />;
    case 'Search':
      return <SearchSvg size={size} color={color} />;
    case 'Favorites':
      return <FavoritesSvg size={size} color={color} fill={isFocused ? colors.accent : 'none'} />;
    default:
      return <ScripturesSvg size={size} color={color} fill={fill} />;
  }
};

export const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const animatedIndex = React.useRef(new Animated.Value(state.index)).current;

  React.useEffect(() => {
    Animated.spring(animatedIndex, {
      toValue: state.index,
      useNativeDriver: true,
      stiffness: 280,
      damping: 28,
      mass: 0.8,
    }).start();
  }, [state.index]);

  const pillTranslateX = animatedIndex.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: [0, TAB_WIDTH, TAB_WIDTH * 2, TAB_WIDTH * 3, TAB_WIDTH * 4],
  });

  // Rule 15: Tab content 56px + platform navigation chrome (Android gesture 48px or safe inset / iOS home indicator 34px or safe inset)
  const bottomInset = Math.max(
    insets.bottom,
    Platform.OS === 'ios' ? 34 : (Platform.OS === 'android' ? 16 : 8)
  );

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: bottomInset,
          height: 56 + bottomInset,
        },
      ]}
    >
      {/* Top accent sliding bar */}
      <Animated.View
        style={[
          styles.indicator,
          {
            transform: [{ translateX: pillTranslateX }],
            width: TAB_WIDTH,
          },
        ]}
      >
        <View style={styles.pill} />
      </Animated.View>

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = (options.tabBarLabel ?? route.name) as string;
        const isFocused = state.index === index;

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
            style={styles.tab}
            activeOpacity={0.7}
          >
            <View style={styles.iconWrapper}>
              {getTabSvg(route.name, isFocused)}
            </View>
            <Text
              variant="label"
              style={[
                styles.label,
                { color: isFocused ? colors.accent : colors.textSecondary },
              ]}
              weight={isFocused ? '800' : '600'}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm, // 8px
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    height: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pill: {
    width: 32, // Multiple of 8
    height: 3,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
    backgroundColor: colors.accent,
  },
  tab: {
    flex: 1,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  iconWrapper: {
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
