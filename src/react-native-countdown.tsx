import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ViewStyle, TextStyle } from "react-native";
import TimeLib from "yd-time-lib";
// import CountdownLib from "yd-countdown-lib";
import { useCountdown } from "./useCountdown ";

const Countdown = (props: {
  from: number;
  to?: number;
  running: boolean;
  format?: string;
  style?: ViewStyle | undefined;
  styleText?: TextStyle | undefined;
}) => {
  const currentMilliseconds = useCountdown(props.from, props.to == undefined ? 0 : props.to);
  const [formatString, setFormatString] = useState(props.format == undefined ? "{i}:{s}" : props.format);
  const styleMerge: ViewStyle = props.style !== undefined ? { ...props.style } : {};
  const styleTextMerge: TextStyle = props.styleText !== undefined ? { ...props.styleText } : {};

  return (
    <View style={[styles.container, styleMerge]}>
      <Text style={[styles.text, styleTextMerge]}>{new TimeLib(currentMilliseconds).format(formatString)}</Text>
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
