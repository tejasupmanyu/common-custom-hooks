import * as React from "react";

/**
 * Declarative hook for setInterval.
 * @param callback function to be executed after passed 'delay' ms.
 * @param delay number of ms after which the callback function is to be called.
 */
export const useInterval = (callback: any, delay: number) => {
  const savedCallback = React.useRef<any>();

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
};
