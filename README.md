# React Native Countdown

React Native Countdown is a component that displays countdown for React Native.

## Installation

```sh
npm install yd-react-native-countdown
```

## Getting started with React Native Countdown

Here is an example of a basic app using React Native Countdown:

```js
import Countdown from "yd-react-native-countdown";

// Countdown 50 seconds to 2 seconds
<Countdown from={50000} to-={2000} style={{ backgroundColor: "#ffffff88" }} isRunning={isRunning} />;
```

## React Native Countdown Props

| Props     | Description | isRequire | default   |
| --------- | ----------- | --------- | --------- |
| from      | number      | No        | 10000     |
| to        | number      | No        | 0         |
| isRunning | boolean     | No        | false     |
| format    | string      | No        | "{i}:{s}" |
| style     | ViewStyle   | No        | {}        |
| styleText | TextStyle   | No        | {}        |

## format

To understand the different formats see the documentation for yd-time-lib

https://www.npmjs.com/package/yd-time-lib#format
