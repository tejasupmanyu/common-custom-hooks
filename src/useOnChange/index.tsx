import * as React from "react";
import usePrevious from "../usePrevious";

function isEqual(a: any, b: any) {
  return a === b;
}

export default function useChange(
  value: any,
  callback: Function,
  comparator = isEqual
) {
  const previous = usePrevious(value);

  React.useEffect(() => {
    if (typeof callback !== "function") {
      console.error(
        `A non-function callback was passed to the useChange hook. callback must be a function.`
      );
      throw new Error(
        `A non-function callback was passed to the useChange hook. callback must be a function.`
      );
    }

    if (typeof callback === "function") {
      if (!comparator(previous, value)) {
        callback(previous, value);
      }
    }
  }, [value, previous, comparator, callback]);
}
