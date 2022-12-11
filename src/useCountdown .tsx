import { useEffect, useState } from "react";

const useCountdown = (p_milliseconds_from?: number, p_milliseconds_to?: number, isRunning?: boolean): number => {
  const [currentMilliseconds, setCurrentMilliseconds] = useState(p_milliseconds_from == undefined ? 10000 : p_milliseconds_from);
  const [millisecondsTo, setMillisecondsTo] = useState(p_milliseconds_to == undefined ? 0 : p_milliseconds_to);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        if (currentMilliseconds > millisecondsTo) setCurrentMilliseconds(currentMilliseconds - 1000);
      } else clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentMilliseconds, isRunning]);

  return currentMilliseconds;
};

export { useCountdown };
