import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { shadow } from '../theme';

export interface UiverseSwitchProps {
  value: boolean;
  onValueChange: (val: boolean) => void;
  accessibilityLabel?: string;
}

export const UiverseSwitch: React.FC<UiverseSwitchProps> = ({
  value,
  onValueChange,
  accessibilityLabel,
}) => {
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  const toggle = () => {
    onValueChange(!value);
  };

  // Button width: 52px, Height: 30px, Toggle diameter: 24px, Offset: 3px
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 25],
  });

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#CBD5E1', colors.accent],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={toggle}
      style={styles.switchWrapper}
      accessibilityRole="switch"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ checked: value }}
    >
      <Animated.View style={[styles.uiverseTrack, { backgroundColor }]}>
        <Animated.View
          style={[
            styles.uiverseThumb,
            shadow.sm,
            {
              transform: [{ translateX }],
            },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchWrapper: {
    paddingVertical: 2,
  },
  uiverseTrack: {
    width: 52,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
  },
  uiverseThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
});

export default UiverseSwitch;
