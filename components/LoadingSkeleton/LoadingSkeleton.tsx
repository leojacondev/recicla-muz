import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface LoadingSkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

/**
 * LoadingSkeleton Component
 *
 * Displays an animated skeleton placeholder while content is loading.
 * Provides visual feedback to users during data fetching operations.
 *
 * @param width - Width of skeleton (default: '100%')
 * @param height - Height of skeleton (default: 20)
 * @param borderRadius - Border radius (default: 4)
 * @param style - Additional custom styles
 *
 * Usage:
 * ```tsx
 * <LoadingSkeleton width={200} height={40} />
 * <LoadingSkeleton width="100%" height={100} borderRadius={12} />
 * ```
 */
const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
  style
}) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          width,
          height,
          borderRadius,
          opacity,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#e0e0e0',
  },
});

export default LoadingSkeleton;
