document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter, index) => {
    const target = +counter.getAttribute("data-target");
    const prefix = counter.getAttribute("data-prefix") || "";
    const suffix = counter.getAttribute("data-suffix") || "";
    const duration = +counter.getAttribute("data-duration") || 2000;

    let start = 0;
    const startTime = performance.now();
    const delay = index * 200; // efekt opóźnienia między kartami

    const formatNumber = (num) => {
      return num.toLocaleString("pl-PL"); // formatowanie liczb np. 1 000
    };

    const animate = (time) => {
      const elapsed = time - startTime - delay;
      if (elapsed > 0) {
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        counter.innerText = `${prefix}${formatNumber(current)}${suffix}`;
      }
      if (elapsed < duration) {
        requestAnimationFrame(animate);
      } else {
        counter.innerText = `${prefix}${formatNumber(target)}${suffix}`;
      }
    };

    requestAnimationFrame(animate);
  });
});
