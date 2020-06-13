export function addHover(el: HTMLElement, initialElevation: number, endElevation: number) {
  el.classList.add("mdc-elevation-transition");
  el.classList.add(`mdc-elevation--z${initialElevation}`);
  el.addEventListener("mouseenter", function () {
    this.classList.remove(`mdc-elevation--z${initialElevation}`);
    this.classList.add(`mdc-elevation--z${endElevation}`);
  });
  el.addEventListener("mouseleave", function () {
    this.classList.remove(`mdc-elevation--z${endElevation}`);
    this.classList.add(`mdc-elevation--z${initialElevation}`);
  });
}