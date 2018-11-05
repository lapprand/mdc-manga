export function newEl(el: string, ...tokens: string[]) {
    let div = document.createElement(el) as HTMLElement;
    tokens.forEach(token => { div.classList.add(token); });
    return div;
};