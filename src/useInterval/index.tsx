import * as React from "react";

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
