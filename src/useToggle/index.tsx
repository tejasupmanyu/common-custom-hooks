import * as React from "react";

/**
 * useToggle returns a toggle-able state and corresponding toggler function.
 * @param initialValue for the initial value of toggle.
 */
export const useToggle = (
  initialValue?: boolean
): [boolean, (target?: boolean) => void] => {
  const [value, setValue] = React.useState<boolean>(initialValue || false);

  const toggle: (target?: boolean) => void = (target?: boolean) => {
    if (target !== undefined) {
      setValue(target);
    } else {
      setValue((previous) => !previous);
    }
  };

  return [value, toggle];
};
