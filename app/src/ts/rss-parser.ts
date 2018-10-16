import { addHover } from "./mdc-hover";

// get node where items will be placed
let grid = document.querySelector("#grid");

// add layout-grid inner for cell wrapping
let innerDiv = document.createElement("div");
innerDiv.classList.add("mdc-layout-grid__inner");
grid.appendChild(innerDiv);

var newDiv = (...tokens: string[]) => {
    let div = document.createElement("div") as HTMLDivElement;
    tokens.forEach(token => { div.classList.add(token); });
    return div;
};

function newCardCellNode(item: any) {
    let gridCell = newDiv("mdc-layout-grid__cell");

    let card = newDiv("mdc-card", "mdc-card--outlined", "mdc-card__media--square");

    let hoverWrapper = newDiv("hover", "mdc-elevation--z0", "mdc-elevation-transition");
    addHover(hoverWrapper, "mdc-elevation--z0", "mdc-elevation--z8");

    let cardPrimary = newDiv("mdc-card__primary");

    let cardTitle = newDiv("card-title");

    let title = document.createTextNode(item.title);

    cardTitle.appendChild(title);
    cardPrimary.appendChild(cardTitle);
    hoverWrapper.appendChild(cardPrimary);
    card.appendChild(hoverWrapper);
    gridCell.appendChild(card);

    return gridCell;
};



let Parser = require("rss-parser");
let parser = new Parser();
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

(async () => {

    let feed = await parser.parseURL(CORS_PROXY + "https://nyaa.si/?page=rss&c=1_2&f=2");

    feed.items.forEach((item: any) => {
        innerDiv.appendChild(newCardCellNode(item));
    });

})();