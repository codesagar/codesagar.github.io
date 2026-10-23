/* Independent, accessible photo rotation for each [data-carousel] section. */
(() => {
  'use strict';

  const ROTATION_MS = 3000;
  const init = () => {
    document.querySelectorAll('[data-carousel]').forEach((root) => {
      if (root.dataset.carouselReady === 'true') return;
      const owned = (selector) => [...root.querySelectorAll(selector)]
        .filter((element) => element.closest('[data-carousel]') === root);
      const slides = owned('.carousel-slide');
      if (!slides.length) return;
      root.dataset.carouselReady = 'true';

      const previous = owned('[data-carousel-prev]')[0];
      const next = owned('[data-carousel-next]')[0];
      const toggle = owned('[data-carousel-toggle]')[0];
      const status = owned('[data-carousel-status]')[0];
      const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
      let index = Math.max(0, slides.findIndex((slide) => !slide.hidden));
      let requestedIndex = index;
      let preference = null; // null follows the system; explicit Play can opt in.
      let inView = false;
      let hovered = root.matches(':hover');
      let focused = root.contains(document.activeElement);
      let timer = null;
      let revision = 0;
      let pendingAutomatic = false;
      const primed = new WeakMap();
      const normalize = (value) => (value % slides.length + slides.length) % slides.length;
      const wantsRotation = () => preference === null ? !motion.matches : preference;
      const mayRotate = () => slides.length > 1 && wantsRotation() && inView
        && !hovered && !focused && !document.hidden && root.isConnected;

      root.setAttribute('aria-roledescription', 'carousel');
      // Automatic changes must not interrupt a screen reader's current reading.
      if (status) status.setAttribute('aria-live', 'off');
      slides.forEach((slide, i) => {
        slide.hidden = i !== index;
        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-roledescription', 'slide');
        if (!slide.hasAttribute('aria-label')) slide.setAttribute('aria-label', `Photo ${i + 1} of ${slides.length}`);
      });
      [previous, next, toggle].forEach((button) => {
        if (!button) return;
        button.type = 'button';
        button.disabled = slides.length < 2;
      });

      const stopTimer = () => {
        if (timer !== null) window.clearTimeout(timer);
        timer = null;
      };
      const updateControls = () => {
        if (status) status.textContent = `${index + 1} / ${slides.length}`;
        if (toggle) {
          const playing = wantsRotation() && slides.length > 1;
          toggle.textContent = playing ? 'Pause' : 'Play';
          toggle.setAttribute('aria-label', playing ? 'Pause automatic photo rotation' : 'Play automatic photo rotation');
        }
      };

      // Hidden images may not fetch while marked lazy. Prime only the current
      // and next photo when this carousel enters view; retain the current slide
      // while an uncached requested image loads or decodes.
      const prime = (slide) => {
        if (primed.has(slide)) return primed.get(slide);
        const ready = Promise.all([...slide.querySelectorAll('img')].map((image) => {
          image.loading = 'eager';
          if (typeof image.decode === 'function') return image.decode().catch(() => {});
          if (image.complete) return Promise.resolve();
          return new Promise((resolve) => {
            const finish = () => {
              image.removeEventListener('load', finish);
              image.removeEventListener('error', finish);
              resolve();
            };
            image.addEventListener('load', finish, { once: true });
            image.addEventListener('error', finish, { once: true });
          });
        }));
        primed.set(slide, ready);
        return ready;
      };
      const preloadNext = () => {
        if (!inView) return;
        void prime(slides[index]);
        if (slides.length > 1) void prime(slides[normalize(index + 1)]);
      };
      const schedule = () => {
        stopTimer();
        updateControls();
        preloadNext();
        if (!mayRotate() && pendingAutomatic) {
          revision += 1;
          pendingAutomatic = false;
          requestedIndex = index;
        }
        if (mayRotate()) {
          timer = window.setTimeout(() => {
            timer = null;
            void show(index + 1, false);
          }, ROTATION_MS);
        }
      };
      const show = async (value, manual) => {
        const destination = normalize(value);
        requestedIndex = destination;
        const request = ++revision;
        pendingAutomatic = !manual;
        stopTimer();
        if (destination !== index) await prime(slides[destination]);
        if (request !== revision) return;
        pendingAutomatic = false;
        // A hover, focus, tab switch, or visibility change during loading must
        // cancel an automatic change that has not yet reached the screen.
        if (!manual && !mayRotate()) {
          requestedIndex = index;
          schedule();
          return;
        }
        slides.forEach((slide, i) => { slide.hidden = i !== destination; });
        index = destination;
        requestedIndex = index;
        schedule();
      };

      previous?.addEventListener('click', () => { void show(requestedIndex - 1, true); });
      next?.addEventListener('click', () => { void show(requestedIndex + 1, true); });
      toggle?.addEventListener('click', () => {
        preference = !wantsRotation();
        schedule();
      });
      root.addEventListener('pointerenter', (event) => {
        if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
        hovered = true;
        schedule();
      });
      root.addEventListener('pointerleave', (event) => {
        if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
        hovered = false;
        schedule();
      });
      root.addEventListener('focusin', () => { focused = true; schedule(); });
      root.addEventListener('focusout', () => {
        // focusout fires before activeElement settles on the new control.
        queueMicrotask(() => {
          focused = root.contains(document.activeElement);
          schedule();
        });
      });
      document.addEventListener('visibilitychange', schedule);
      if (motion.addEventListener) motion.addEventListener('change', schedule);
      else motion.addListener(schedule);

      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          const entry = entries[entries.length - 1];
          const visible = entry.isIntersecting && entry.intersectionRatio > 0;
          if (visible !== inView) {
            inView = visible;
            schedule();
          }
        }, { threshold: 0 });
        observer.observe(root);
      } else {
        // Older browsers still pause a carousel scrolled outside the viewport.
        let frame = null;
        const checkVisibility = () => {
          frame = null;
          const rect = root.getBoundingClientRect();
          const visible = rect.width > 0 && rect.height > 0 && rect.bottom > 0
            && rect.right > 0 && rect.top < window.innerHeight && rect.left < window.innerWidth;
          if (visible !== inView) {
            inView = visible;
            schedule();
          }
        };
        const queueCheck = () => {
          if (frame === null) frame = window.requestAnimationFrame(checkVisibility);
        };
        document.addEventListener('scroll', queueCheck, { passive: true, capture: true });
        window.addEventListener('resize', queueCheck, { passive: true });
        checkVisibility();
      }
      schedule();
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
