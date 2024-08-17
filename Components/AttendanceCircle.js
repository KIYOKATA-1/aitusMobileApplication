import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AttendanceCircle = ({ attendance, color }) => {
  const radius = 20;
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const progressRef = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressRef, {
      toValue: attendance,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [attendance]);

  const strokeDashoffset = progressRef.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Svg height="50" width="50" viewBox="0 0 50 50">
        <Circle
          cx="25"
          cy="25"
          r={radius}
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx="25"
          cy="25"
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
        />
        <SvgText
          x="20"
          y="30"
          textAnchor="middle"
          fontSize="14"
          fontWeight={700}
          fill={'black'}
        >
        {attendance}%
        </SvgText>
      </Svg>
    </View>
  );
};

export default AttendanceCircle;
