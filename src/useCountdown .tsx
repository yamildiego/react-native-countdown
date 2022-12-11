import { useEffect, useState } from "react";

const useCountdown = (p_milliseconds_from: number, p_milliseconds_to: number): number => {
  const [currentMilliseconds, setCurrentMilliseconds] = useState(p_milliseconds_from);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentMilliseconds > p_milliseconds_to) {
        setCurrentMilliseconds(currentMilliseconds - 1000);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentMilliseconds]);

  return currentMilliseconds;
};

export { useCountdown };
