"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MotionSystem() {
  const pathname = usePathname();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let context: gsap.Context | undefined;
    const timer = window.setTimeout(() => {
      context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => gsap.fromTo(element, { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 88%", once: true } }));
        gsap.utils.toArray<HTMLElement>(".image-reveal").forEach((element) => gsap.fromTo(element, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.3, ease: "power4.inOut", scrollTrigger: { trigger: element, start: "top 86%", once: true } }));
      });
    }, 500);
    return () => { window.clearTimeout(timer); context?.revert(); };
  }, [pathname]);
  return null;
}
