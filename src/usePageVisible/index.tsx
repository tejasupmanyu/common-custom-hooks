import * as React from "react";

/**
 * returns boolean value representing the visiblity state of a document.
 *
 * W3C spec around pageVisibility is kinda incomplete and vague, leaving implementation upon browsers.
 * Which leads to different results and behaviours on different browsers.
 * Here is something on the 'hidden' attribute -
 * On getting, the hidden attribute MUST return true -
 * if the Document contained by the top level browsing context (root window in the browser’s viewport) [HTML5] is not visible at all.
 *
 * The attribute MUST return false if the Document contained by the top level browsing context is at least partially visible on at least one screen.
 * If the defaultView of the Document is null, on getting, the hidden attribute MUST return true.
 * To accommodate accessibility tools that are typically full screen but still show a view of the page.
 * When applicable, this attribute MAY return false when the User Agent is not minimized but is fully obscured by other applications.
 */
export const usePageVisible = () => {
  // State and setters for page visibility.
  const [isPageVisible, setIsPageVisible] = React.useState(false);

  function getBrowserVisibilityEvent() {
    if (typeof document.hidden !== "undefined") {
      return "visibilitychange"; // Opera 12.10 and Firefox 18 and later support
    } else if (typeof document["webkitHidden"] !== "undefined") {
      return "webkitvisibilitychange";
    }
    return "visibilitychange";
  }
  function getBrowserDocumentHiddenProp() {
    if (typeof document.hidden !== "undefined") {
      return "hidden";
    } else if (typeof document["webkitHidden"] !== "undefined") {
      return "webkitHidden";
    }
    return "hidden";
  }

  const onFocus = () => setIsPageVisible(true);
  const onBlur = () => setIsPageVisible(false);
  const onVisibilityChange = () => {
    const isDocumentVisible = !document[getBrowserDocumentHiddenProp()];
    setIsPageVisible(isDocumentVisible);
  };
  const eventName = getBrowserVisibilityEvent();

  React.useEffect(() => {
    window.addEventListener(eventName, onVisibilityChange);
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener(eventName, onVisibilityChange);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, []);

  return isPageVisible;
};
