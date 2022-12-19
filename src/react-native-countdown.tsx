import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ViewStyle, TextStyle, Animated } from "react-native";
import TimeLib from "yd-time-lib";
import { useCountdown } from "./useCountdown ";

const Countdown = (props: {
  from?: number;
  to?: number;
  isRunning?: boolean;
  format?: string;
  callback?: () => void;
  style?: ViewStyle | undefined;
  styleText?: TextStyle | undefined;
  lastSecondsWithEffect?: number | undefined;
  beatEffectAtTheEnd?: boolean | undefined;
}) => {
  const { to, from, isRunning, format, lastSecondsWithEffect, beatEffectAtTheEnd } = props;
  const [running, setRunning] = useState(isRunning == undefined ? false : isRunning);
  const [formatString, setFormatString] = useState(format == undefined ? "{i}:{s}" : format);
  const [countdownFrom, setCountdownFrom] = useState(from == undefined ? 10000 : from);
  const [countdownTo, setCountdownTo] = useState(to == undefined ? 0 : to);
  const [lastSecondsWEffect, setLastSecondsWEffect] = useState(lastSecondsWithEffect !== undefined ? lastSecondsWithEffect : 10000);
  const currentMilliseconds = useCountdown(props.callback !== undefined ? props.callback : () => {}, countdownFrom, countdownTo, running);
  const styleMerge: ViewStyle = props.style !== undefined ? { ...props.style } : {};
  const styleTextMerge: TextStyle = props.styleText !== undefined ? { ...props.styleText } : {};

  useEffect(() => setRunning(props.isRunning == undefined ? false : props.isRunning), [props.isRunning]);

  const slideUpValue = new Animated.Value(0);

  if (beatEffectAtTheEnd) {
    Animated.loop(
      Animated.sequence([
        Animated.timing(slideUpValue, { toValue: 1, duration: 100, useNativeDriver: false }),
        Animated.timing(slideUpValue, { toValue: 0, duration: 100, useNativeDriver: false }),
        Animated.timing(slideUpValue, { toValue: 1, duration: 100, useNativeDriver: false }),
        Animated.timing(slideUpValue, { toValue: 0, duration: 500, useNativeDriver: false }),
      ])
    ).start();
  }

  return (
    <View style={[styles.container, styleMerge]}>
      {beatEffectAtTheEnd && lastSecondsWEffect >= currentMilliseconds && currentMilliseconds > countdownTo && (
        <Animated.Text style={{ transform: [{ scale: slideUpValue.interpolate({ inputRange: [0, 1], outputRange: [1, 1.2] }) }] }}>
          <Text style={[styles.text, styleTextMerge]}>{new TimeLib(currentMilliseconds).format(formatString)}</Text>
        </Animated.Text>
      )}

      {(beatEffectAtTheEnd !== true || lastSecondsWEffect < currentMilliseconds || currentMilliseconds <= countdownTo) && (
        <Text style={[styles.text, styleTextMerge]}>{new TimeLib(currentMilliseconds).format(formatString)}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
  },
});

module.exports = Countdown;
