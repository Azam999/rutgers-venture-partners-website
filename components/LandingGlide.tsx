"use client";

import { useEffect, useRef } from "react";

// Makes leaving the landing screen one smooth motion: the first scroll on the crest
// (wheel, trackpad, swipe, arrow keys, space, or the arrow at the bottom) glides the page down to
// the site, and scrolling up from the top of the site glides back to the crest. Below
// the landing everything scrolls natively. With JavaScript off, or with reduced motion
// turned on, the page just scrolls normally.
//
// The crest fading away as the page moves is plain CSS (see `.landing-*` in globals.css).

// Slight ease-in, long soft landing.
const ease = cubicBezier(0.45, 0.05, 0.2, 1);

// Trackpads keep sending momentum events after a flick; ignore them until they pause
// for this long, so the page doesn't sail past the top of the site.
const MOMENTUM_GAP_MS = 180;

// When scrolling stops partway down the landing (e.g. after dragging the scrollbar),
// finish the move after this long.
const SETTLE_DELAY_MS = 220;

export function LandingGlide() {
  const cueRef = useRef<HTMLAnchorElement>(null);
  const glideDownRef = useRef<((focusContent: boolean) => boolean) | null>(null);

  useEffect(() => {
    const landing = cueRef.current?.closest<HTMLElement>("[data-landing]");
    if (!landing) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let frame = 0;
    let gliding = false;
    let ignoreWheelUntil = 0;
    let settleTimer = 0;
    let lastY = window.scrollY;
    let lastDirection = 0;
    let touchStartY: number | null = null;
    let pointerHeld = false;

    // Scroll position at which the landing has fully left and the nav is pinned on top.
    const siteTop = () => Math.round(landing.getBoundingClientRect().bottom + window.scrollY);
    const onLanding = () => window.scrollY < siteTop() - 1;
    const atOrAboveSiteTop = () => window.scrollY > 0 && window.scrollY <= siteTop() + 1;
    const menuOpen = () =>
      document.querySelector('[aria-controls="mobile-menu"]')?.getAttribute("aria-expanded") === "true";
    const enabled = () => !reducedMotion.matches && !menuOpen();

    function glide(to: number, onDone?: () => void) {
      cancelAnimationFrame(frame);
      const from = window.scrollY;
      const distance = Math.abs(to - from);
      if (distance < 2) return;
      const duration = Math.min(1500, Math.max(850, distance * 1.25));
      const start = performance.now();
      let expected = from;
      gliding = true;

      const step = (now: number) => {
        // Someone grabbed the scrollbar mid-glide: let them have it.
        if (Math.abs(window.scrollY - expected) > 3) {
          gliding = false;
          return;
        }
        const t = Math.min(1, (now - start) / duration);
        expected = from + (to - from) * ease(t);
        window.scrollTo({ top: expected, behavior: "instant" });
        if (t < 1) {
          frame = requestAnimationFrame(step);
        } else {
          gliding = false;
          ignoreWheelUntil = performance.now() + MOMENTUM_GAP_MS;
          onDone?.();
        }
      };
      frame = requestAnimationFrame(step);
    }

    // Returns true if it started a glide (so the caller should cancel the native scroll).
    function glideFor(direction: 1 | -1) {
      if (direction > 0 && onLanding()) {
        glide(siteTop());
        return true;
      }
      if (direction < 0 && atOrAboveSiteTop()) {
        glide(0);
        return true;
      }
      return false;
    }

    glideDownRef.current = (focusContent) => {
      if (!enabled()) return false;
      glide(siteTop(), () => {
        if (focusContent) document.getElementById("content")?.focus({ preventScroll: true });
      });
      return true;
    };

    function onWheel(event: WheelEvent) {
      if (!enabled() || event.ctrlKey || event.deltaY === 0) return;
      const now = performance.now();
      if (gliding || now < ignoreWheelUntil) {
        if (now < ignoreWheelUntil) ignoreWheelUntil = now + MOMENTUM_GAP_MS;
        if (gliding || onLanding() || window.scrollY <= siteTop() + 1) event.preventDefault();
        return;
      }
      if (glideFor(event.deltaY > 0 ? 1 : -1)) event.preventDefault();
    }

    function onTouchStart(event: TouchEvent) {
      touchStartY = event.touches.length === 1 ? event.touches[0].clientY : null;
    }

    function onTouchMove(event: TouchEvent) {
      if (!enabled()) return;
      if (gliding) {
        if (event.cancelable) event.preventDefault();
        return;
      }
      if (touchStartY === null || event.touches.length !== 1) return;
      const dragged = touchStartY - event.touches[0].clientY; // > 0: finger moved up
      if (Math.abs(dragged) < 6) {
        // Too small to tell a swipe from a tap; meanwhile don't let the landing drift.
        if (event.cancelable && onLanding()) event.preventDefault();
        return;
      }
      if (glideFor(dragged > 0 ? 1 : -1)) {
        if (event.cancelable) event.preventDefault();
        touchStartY = null;
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (!enabled() || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, button, summary, [contenteditable]")) return;
      const down = event.key === "ArrowDown" || event.key === "PageDown" || (event.key === " " && !event.shiftKey);
      const up = event.key === "ArrowUp" || event.key === "PageUp" || (event.key === " " && event.shiftKey);
      if (!down && !up) return;
      if (gliding || glideFor(down ? 1 : -1)) event.preventDefault();
    }

    // Safety net for anything we don't intercept (scrollbar drags, find-in-page, focus
    // moving into the nav): never leave the page parked halfway down the landing.
    function onScroll() {
      const y = window.scrollY;
      if (y !== lastY) lastDirection = Math.sign(y - lastY);
      lastY = y;
      if (gliding) return;
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        if (gliding || pointerHeld || !enabled() || !onLanding() || window.scrollY <= 0) return;
        const nearerTop = window.scrollY < siteTop() / 2;
        glide(lastDirection < 0 || (lastDirection === 0 && nearerTop) ? 0 : siteTop());
      }, SETTLE_DELAY_MS);
    }

    const onPointerDown = () => (pointerHeld = true);
    const onPointerUp = () => {
      pointerHeld = false;
      onScroll();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      glideDownRef.current = null;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return (
    <a
      ref={cueRef}
      href="#content"
      aria-label="Scroll to content"
      onClick={(event) => {
        // event.detail is 0 for keyboard activation: move focus along like a skip link.
        if (glideDownRef.current?.(event.detail === 0)) event.preventDefault();
      }}
      className="landing-cue absolute bottom-5 left-1/2 -translate-x-1/2 p-4 text-cream/80 transition-colors hover:text-cream sm:bottom-7"
    >
      {/* Slender down arrow; it bobs gently (see .landing-cue-arrow in globals.css). */}
      <svg
        aria-hidden="true"
        viewBox="0 0 16 44"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        className="landing-cue-arrow h-11 w-4"
      >
        <path d="M8 1v41M2 36l6 6 6-6" />
      </svg>
    </a>
  );
}

// CSS-style cubic-bezier easing: solves x(t) = progress with Newton's method.
function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const x = (t: number) => ((ax * t + bx) * t + cx) * t;
  const y = (t: number) => ((ay * t + by) * t + cy) * t;
  const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx;
  return (progress: number) => {
    if (progress <= 0) return 0;
    if (progress >= 1) return 1;
    let t = progress;
    for (let i = 0; i < 8; i++) {
      const error = x(t) - progress;
      if (Math.abs(error) < 1e-6) break;
      t = Math.min(1, Math.max(0, t - error / dx(t)));
    }
    return y(t);
  };
}
