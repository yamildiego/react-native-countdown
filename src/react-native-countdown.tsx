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
  const [running, setRunning] = useState(props.isRunning == undefined ? false : props.isRunning);
  const [formatString, setFormatString] = useState(props.format == undefined ? "{i}:{s}" : props.format);
  const styleMerge: ViewStyle = props.style !== undefined ? { ...props.style } : {};
  const styleTextMerge: TextStyle = props.styleText !== undefined ? { ...props.styleText } : {};
  const currentMilliseconds = useCountdown(props.callback !== undefined ? props.callback : () => {}, props.from, props.to, running);
  const lastSecondsWEffect = props.lastSecondsWithEffect !== undefined ? props.lastSecondsWithEffect : 10000;

  useEffect(() => setRunning(props.isRunning == undefined ? false : props.isRunning), [props.isRunning]);

  const slideUpValue = new Animated.Value(0);

  if (props.beatEffectAtTheEnd) {
    Animated.loop(
      Animated.sequence([
        Animated.timing(slideUpValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(slideUpValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(slideUpValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }

  return (
    <>
      {props.beatEffectAtTheEnd && lastSecondsWEffect >= currentMilliseconds && (
        <Animated.View
          style={{
            transform: [
              {
                scale: slideUpValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.2],
                }),
              },
            ],
          }}
        >
          <Text style={[styles.text, styleTextMerge]}>{new TimeLib(currentMilliseconds).format(formatString)}</Text>
        </Animated.View>
      )}

      {(props.beatEffectAtTheEnd !== true || lastSecondsWEffect < currentMilliseconds) && (
        <View style={[styles.container, styleMerge]}>
          <Text style={[styles.text, styleTextMerge]}>{new TimeLib(currentMilliseconds).format(formatString)}</Text>
        </View>
      )}
    </>
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
