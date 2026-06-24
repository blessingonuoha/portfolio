/**
 * Tiny coordinator so the Hero plays its intro only once the preloader has
 * lifted. Works for first paint (event) and any later mount (flag).
 */
export const INTRO_EVENT = "app:intro-done";

let done = false;

export function isIntroDone() {
  return done;
}

export function markIntroDone() {
  if (done) return;
  done = true;
  window.dispatchEvent(new Event(INTRO_EVENT));
}
