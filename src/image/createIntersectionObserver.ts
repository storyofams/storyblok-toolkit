// These match the thresholds used in Chrome's native lazy loading
// @see https://web.dev/browser-level-image-lazy-loading/#distance-from-viewport-thresholds
const FAST_CONNECTION_THRESHOLD = `1250px`;
const SLOW_CONNECTION_THRESHOLD = `2500px`;

export const createIntersectionObserver = async (
  el: HTMLElement,
  cb: () => void,
) => {
  const connection =
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection;

  if (!window.IntersectionObserver) {
    await import('intersection-observer');
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (el === entry.target) {
          // Check if element is within viewport, remove listener, destroy observer, and run link callback.
          // MSEdge doesn't currently support isIntersecting, so also test for  an intersectionRatio > 0
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            io.unobserve(el);
            io.disconnect();
            cb();
          }
        }
      });
    },
    {
      rootMargin:
        connection?.effectiveType === `4g` && !connection?.saveData
          ? FAST_CONNECTION_THRESHOLD
          : SLOW_CONNECTION_THRESHOLD,
    },
  );

  // Add element to the observer
  io.observe(el);

  return io;
};
