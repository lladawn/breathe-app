// hooks/useScrollShadows.ts
import { useEffect, useState, RefObject } from "react";

export default function useScrollShadows(
  ref: RefObject<HTMLElement>,
  dependency?: any
) {
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const checkShadows = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      setShowTopShadow(scrollTop > 0);
      setShowBottomShadow(scrollTop + clientHeight < scrollHeight);
    };

    checkShadows();
    el.addEventListener("scroll", checkShadows);

    const observer = new MutationObserver(checkShadows);
    observer.observe(el, { childList: true, subtree: true });

    return () => {
      el.removeEventListener("scroll", checkShadows);
      observer.disconnect();
    };
  }, [ref, dependency]);

  return { showTopShadow, showBottomShadow };
}
