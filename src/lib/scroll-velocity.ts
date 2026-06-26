/** Scroll velocity in px/s, derived from Lenis scroll deltas. */

let scrollVelocity = 0;
let smoothedVelocity = 0;
let lastUpdate = 0;

export function setScrollVelocity(value: number) {
  scrollVelocity = Math.abs(value);
  lastUpdate = performance.now();
}

export function getScrollVelocity() {
  return smoothedVelocity;
}

export function updateScrollVelocity(delta: number) {
  const age = performance.now() - lastUpdate;
  let target = 0;

  if (age <= 320) {
    const t = Math.min(age / 320, 1);
    const fade = Math.cos(t * Math.PI * 0.5);
    target = scrollVelocity * fade;
  }

  const blend = 1 - Math.exp(-7 * delta);
  smoothedVelocity += (target - smoothedVelocity) * blend;

  if (smoothedVelocity < 0.25) smoothedVelocity = 0;
}
