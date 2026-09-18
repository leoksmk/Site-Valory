"use client";

import { useEffect } from "react";

/**
 * Efeitos de UI aplicados via DOM:
 * - barra de progresso de scroll
 * - spotlight seguindo o cursor (.spot)
 * - tilt 3D + luz no palco do produto (#stage)
 */
export default function Interactions() {
  useEffect(() => {
    const bar = document.getElementById("scrollbar");
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const fine = window.matchMedia("(pointer:fine)").matches;
    const cleanups: Array<() => void> = [];

    if (fine) {
      document.querySelectorAll<HTMLElement>(".spot").forEach((el) => {
        const move = (ev: MouseEvent) => {
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", ((ev.clientX - r.left) / r.width) * 100 + "%");
          el.style.setProperty("--my", ((ev.clientY - r.top) / r.height) * 100 + "%");
        };
        el.addEventListener("mousemove", move);
        cleanups.push(() => el.removeEventListener("mousemove", move));
      });

      const stage = document.getElementById("stage");
      if (stage) {
        const move = (ev: MouseEvent) => {
          const r = stage.getBoundingClientRect();
          const rx = ((ev.clientY - r.top) / r.height - 0.5) * -5;
          const ry = ((ev.clientX - r.left) / r.width - 0.5) * 6;
          stage.style.transform = `perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg)`;
          stage.style.setProperty("--mx", ((ev.clientX - r.left) / r.width) * 100 + "%");
          stage.style.setProperty("--my", ((ev.clientY - r.top) / r.height) * 100 + "%");
        };
        const leave = () => {
          stage.style.transform = "";
        };
        stage.addEventListener("mousemove", move);
        stage.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          stage.removeEventListener("mousemove", move);
          stage.removeEventListener("mouseleave", leave);
        });
      }
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      cleanups.forEach((c) => c());
    };
  }, []);

  return null;
}
