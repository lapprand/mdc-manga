export function newError(message: string) {
    let el = document.createElement("div");
    el.classList.add("load-error");
    el.textContent = message;
    return el;
}
