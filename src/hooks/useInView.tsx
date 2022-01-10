import { useEffect, useRef, useState } from "react";

interface Options extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

const useInView = ({
  triggerOnce = false,
  threshold = 0,
  root = null,
  rootMargin = "0%",
}: Options = {}) => {
  const ref = useRef<any>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref?.current; // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || !node) return;

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          setInView(entry.isIntersecting);
          // after inView and triggeronce disconnect
          if (entry.isIntersecting && triggerOnce) {
            observer.disconnect();
          }
        });
      },
      { root, rootMargin, threshold }
    );

    observer.observe(node);

    return () => observer.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
};

export default useInView;
