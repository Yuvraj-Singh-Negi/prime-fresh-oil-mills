"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Easing } from "framer-motion";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function RevealOnScroll({
  children,
  className,
  delay = 0,
  once = true,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;
  const prefersReduced = reducedMotion;

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry?.isIntersecting) {
        setIsVisible(true);
        if (once) observerRef.current?.disconnect();
      } else if (!once) {
        setIsVisible(false);
      }
    },
    [once]
  );

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold: 0.12,
      rootMargin: "0px 0px -10% 0px",
    });
    observerRef.current.observe(element);
    return () => observerRef.current?.disconnect();
  }, [handleObserver]);

  // When reduced motion is preferred, reveal immediately so content is never hidden.
  const shouldReveal = prefersReduced ? true : isVisible;

  const revealVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as Easing,
        delay,
      },
    },
  };

  return (
    <div className={className} ref={ref}>
      <motion.div
        initial={{ opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 12 }}
        animate={shouldReveal ? "visible" : "hidden"}
        variants={revealVariants}
      >
        {children}
      </motion.div>
    </div>
  );
}
