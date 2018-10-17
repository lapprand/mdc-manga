import { newCardCellNode } from "./new-card-cell-node";

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
let Parser = require("rss-parser");
let parser = new Parser({
    // customFields: {
    //     item: [
    //         ["nyaa:infoHash", "hash"]
    //     ],
    // }
});

// get node where items will be placed
let grid = document.querySelector("#grid");

// add layout-grid inner for cell wrapping
let innerDiv = document.createElement("div");
innerDiv.classList.add("mdc-layout-grid__inner");
grid.appendChild(innerDiv);


(async () => {

    // let feed = await parser.parseURL(CORS_PROXY + "https://nyaa.si/?page=rss&c=1_2&f=2");
    let feed = await parser.parseURL(CORS_PROXY + "http://www.horriblesubs.info/rss.php?res=720");

    (document.querySelector("#grid") as HTMLElement).style.display = "grid";
    feed.items.forEach((item: any) => {
        innerDiv.appendChild(newCardCellNode(item));
    });

})();