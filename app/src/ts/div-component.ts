export function newDiv(...tokens: string[]) {
    let div = document.createElement("div") as HTMLDivElement;
    tokens.forEach(token => { div.classList.add(token); });
    return div;
};