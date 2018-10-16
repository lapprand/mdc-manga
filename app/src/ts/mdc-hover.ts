export function addHover(el: HTMLElement, initialElevation: string, endElevation: string) {
  el.addEventListener("mouseenter", function () {
    this.classList.remove(initialElevation);
    this.classList.add(endElevation);
  });
  el.addEventListener("mouseleave", function () {
    this.classList.remove(endElevation);
    this.classList.add(initialElevation);
  });
}