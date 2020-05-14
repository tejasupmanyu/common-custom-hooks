import { useWindowSize } from "../useWindowSize";

/**
 * useIsMobile returns if the current screen layout is mobile.
 * @param mobilePxBreakpoint breakpoint for mobile view in pixels, defaults to 992.
 */
export const useIsMobile = (mobilePxBreakpoint?: number) => {
  const { width } = useWindowSize();
  const breakpoint = mobilePxBreakpoint ? mobilePxBreakpoint : 992;
  return width && width < breakpoint ? true : false;
};
