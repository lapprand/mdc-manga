import { newLoader } from "./src/ts/loader-component";
import { newCardCellNode } from "./src/ts/new-card-cell-node";
import { Item } from "./src/ts/item";
import "isomorphic-fetch";
import "@babel/polyfill";

fetch('/.netlify/functions/proxy').then(function (response) {
    if (response.ok) {
        response.json().then(function (json) {
            grid.removeChild(loader);
            json.forEach((item: Item) => {
                console.log(item);
                innerDiv.appendChild(newCardCellNode(item))
            });
        });
    } else {
        console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
    }
});

let body = document.querySelector("body");
let loader = newLoader();

// get node where items will be placed
let grid = document.querySelector("#grid") as HTMLElement;
grid.appendChild(loader);

// add layout-grid inner for cell wrapping
let innerDiv = document.createElement("div");
innerDiv.classList.add("mdc-layout-grid__inner");
grid.appendChild(innerDiv);



window.onload = (_): void => {
    // (document.querySelector("#loader") as HTMLElement).style.display = "none";
    // (document.querySelector("#content") as HTMLElement).style.display = "grid";

};