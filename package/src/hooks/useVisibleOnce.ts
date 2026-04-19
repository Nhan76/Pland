"use client";

import { useEffect, useRef, useState } from "react";

type UseVisibleOnceOptions = {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
  freezeOnceVisible?: boolean;
};

export function useVisibleOnce<T extends HTMLElement = HTMLDivElement>({
  root = null,
  rootMargin = "0px 0px -12% 0px",
  threshold = 0.25,
  freezeOnceVisible = true,
}: UseVisibleOnceOptions = {}) {
  const ref = useRef<T | null>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    if (freezeOnceVisible && hasEnteredView) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setHasEnteredView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setHasEnteredView(true);

        if (freezeOnceVisible) {
          observer.disconnect();
        }
      },
      {
        root,
        rootMargin,
        threshold,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [freezeOnceVisible, hasEnteredView, root, rootMargin, threshold]);

  return { ref, hasEnteredView };
}
