"use client";

import { useEffect } from "react";

/**
 * Efeitos globais de UI, aplicados via DOM após a montagem:
 * - barra de progresso de scroll
 * - reveal-on-scroll (adiciona .is-in)
 * - spotlight seguindo o cursor nos elementos .spot
 * - tilt 3D no bloco #tilt / #tiltInner
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

    // reveal
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // spotlight + tilt (apenas em ponteiro fino)
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

      const tilt = document.getElementById("tilt");
      const inner = document.getElementById("tiltInner");
      if (tilt && inner) {
        const move = (ev: MouseEvent) => {
          const r = tilt.getBoundingClientRect();
          const rx = ((ev.clientY - r.top) / r.height - 0.5) * -8;
          const ry = ((ev.clientX - r.left) / r.width - 0.5) * 10;
          inner.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
          inner.style.setProperty("--mx", ((ev.clientX - r.left) / r.width) * 100 + "%");
          inner.style.setProperty("--my", ((ev.clientY - r.top) / r.height) * 100 + "%");
        };
        const leave = () => {
          inner.style.transform = "";
        };
        tilt.addEventListener("mousemove", move);
        tilt.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          tilt.removeEventListener("mousemove", move);
          tilt.removeEventListener("mouseleave", leave);
        });
      }
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      cleanups.forEach((c) => c());
    };
  }, []);

  return null;
}
