import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";

const Countdown = (props: number) => {
  // const { style, styleText, from } = props;
  // const [current, setCurrent] = useState(from);
  // const [time, setTime] = useState({});

  // const { style, styleText, running, from, to, format } = props;

  return <View></View>;
};

// <View style={{ ...styles.container, ...style }}>
//   <Text style={{ ...styles.text, ...styleText }}>{new Time(current).format("i:s")}</Text>
// </View>
// useEffect(() => {
//   if (!props.running) {
//   }

// import React, { useState, useEffect } from "react";
// import { Countdown } from "yd-countdown-lib";
// import Time from "yd-time-lib";
//   // const   new Countdown(milliseconds_from: number = 10000, milliseconds_to: number = 0, callback: () => void = () => {});
//   // run();
// }, [props.running, current]);

const styles = StyleSheet.create({
  container: {
    width: 80,
  },
  text: {
    fontSize: 20,
  },
});

export default Countdown;
