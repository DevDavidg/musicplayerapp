import React, { useRef, useEffect } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Image,
  Easing,
  StyleProp,
  ViewStyle,
} from 'react-native';

export interface DiscProps {
  url: string;
  height?: number;
  width?: number;
  style?: any;
  playing?: boolean;
}

const Disc = ({ url, height, width, style, playing }: DiscProps) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const lastRotation = useRef(0);
  const lastVelocity = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newRotation = lastRotation.current + gestureState.dx * 2;
        spinValue.setValue(newRotation / 360);
        lastVelocity.current = gestureState.vx;
      },
      onPanResponderRelease: () => {
        const additionalRotation = lastVelocity.current * 500;
        const finalValue = lastRotation.current + additionalRotation;
        Animated.timing(spinValue, {
          toValue: finalValue / 360,
          duration: 3000,
          useNativeDriver: true,
        }).start(() => {
          lastRotation.current = finalValue;
        });
      },
    })
  ).current;

  useEffect(() => {
    if (playing) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 10000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinValue.stopAnimation();
    }
  }, [playing]);

  const spin = spinValue.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-360deg', '360deg'],
  });

  const spinStyle = {
    transform: [{ rotate: spin }],
    borderRadius: 100,
    cursor: 'pointer',
  };

  const centerCircleStyle: StyleProp<ViewStyle> = {
    position: 'absolute',
    right: '50%',
    top: '50%',
    width: 15,
    height: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    transform: 'translate(50%, -50%)',
  };

  return (
    <View
      style={[
        {
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          ...style,
        },
      ]}
      {...panResponder.panHandlers}
    >
      <Animated.Image
        source={{ uri: url }}
        style={[{ height, width }, spinStyle]}
      />
      <View style={centerCircleStyle} />
    </View>
  );
};

export default Disc;
