import React, { useEffect } from "react";

export function useOutsideAlerter(ref: React.MutableRefObject<null>, cb: () => void) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if ((ref.current as any)?.contains(event.target)) {
        cb();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line
  }, [ref]);
}
