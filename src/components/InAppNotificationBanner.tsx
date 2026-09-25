import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { Text } from './Typography';
import { colors } from '../theme/colors';
import { spacing, radius, shadow } from '../theme';
import { AwardSvg, CloseSvg } from './SvgIcons';
import { InAppNotificationItem } from '../types/inAppNotifications';

interface InAppNotificationBannerProps {
  alert: InAppNotificationItem | null;
  onPress: () => void;
  onDismiss: () => void;
}

export const InAppNotificationBanner: React.FC<InAppNotificationBannerProps> = ({
  alert,
  onPress,
  onDismiss,
}) => {
  const translateY = useRef(new Animated.Value(-120)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (alert) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        handleDismiss();
      }, 6500);

      return () => clearTimeout(timer);
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -120,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [alert]);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -120,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss();
    });
  };

  if (!alert) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        shadow.md,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.touchable}
        activeOpacity={0.9}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${alert.title}. ${alert.body}. Tap to open notifications.`}
      >
        <View style={styles.iconCircle}>
          <AwardSvg size={20} color={colors.accent} />
        </View>

        <View style={styles.textWrap}>
          <View style={styles.labelRow}>
            <Text variant="caption" weight="800" color={colors.accent} style={styles.labelText}>
              ACHIEVEMENT UNLOCKED
            </Text>
            <View style={styles.unreadDot} />
          </View>
          <Text variant="h3" numberOfLines={1} style={styles.titleText}>
            {alert.title.replace('Achievement Unlocked: ', '')}
          </Text>
          <Text variant="caption" color={colors.textSecondary} numberOfLines={1} style={styles.subText}>
            {alert.body}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.closeBtn}
          onPress={handleDismiss}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Dismiss alert"
        >
          <CloseSvg size={14} color="#94A3B8" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 54 : 16,
    left: spacing.md,
    right: spacing.md,
    zIndex: 9999,
    backgroundColor: '#FFFFFF',
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    overflow: 'hidden',
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    gap: 12,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(253, 210, 35, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(253, 210, 35, 0.25)',
  },
  textWrap: {
    flex: 1,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  labelText: {
    letterSpacing: 0.5,
    fontSize: 9.5,
  },
  unreadDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  titleText: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  subText: {
    fontSize: 11.5,
    marginTop: 1,
  },
  closeBtn: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
