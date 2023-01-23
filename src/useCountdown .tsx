import { useEffect, useState } from "react";

const useCountdown = (p_callback: () => void, p_milliseconds_from: number, p_milliseconds_to: number, isRunning: boolean): number => {
  const [originalFromMilliseconds, setOriginalFromMilliseconds] = useState(p_milliseconds_from);
  const [currentMilliseconds, setCurrentMilliseconds] = useState(p_milliseconds_from);
  const [millisecondsTo, setMillisecondsTo] = useState(p_milliseconds_to);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        let nextMilliseconds = currentMilliseconds - 1000;

        if (originalFromMilliseconds !== p_milliseconds_from) {
          nextMilliseconds = p_milliseconds_from;
          setOriginalFromMilliseconds(p_milliseconds_from);
        }

        if (nextMilliseconds <= millisecondsTo) {
          p_callback();
          clearInterval(interval);
        }

        if (currentMilliseconds > millisecondsTo) setCurrentMilliseconds(nextMilliseconds);
      } else clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentMilliseconds, isRunning, p_milliseconds_from]);

  return currentMilliseconds;
};

export { useCountdown };
