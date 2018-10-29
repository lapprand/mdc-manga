import { newCardCellNode } from "./src/ts/new-card-cell-node";
import { newLoader } from "./src/ts/loader-component";
import { Item } from "./src/ts/item";
import "@babel/polyfill";
import axios from "axios";
import "lazysizes";

let html = document.querySelector("html");
var fetching = false;
let page = 1;

function fetchMoreItems() {
    fetching = true;
    let loader = newLoader();
    grid.appendChild(loader);

    axios.get("https://api.jikan.moe/v3/top/manga/" + page)
        .then(function (response) {
            console.log(response);
            response.data.top.forEach((item: Item) => {
                innerDiv.appendChild(newCardCellNode(item))
            });
            page++;
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(() => {
            fetching = false;
            grid.removeChild(loader);
        });

}


// get node where items will be placed
let grid = document.querySelector("#grid") as HTMLElement;

// add layout-grid inner for cell wrapping
let innerDiv = document.createElement("div");
innerDiv.classList.add("mdc-layout-grid__inner");
grid.appendChild(innerDiv);

function checkForNextPage() {
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    // console.log(scrollTop + "+" + html.clientHeight + " = " + (scrollTop + html.clientHeight) + " = " + html.scrollHeight);
    if (scrollTop + html.clientHeight >= html.scrollHeight && !fetching) {
        fetchMoreItems();
    }
}

window.addEventListener("scroll", checkForNextPage);
window.addEventListener("touchmove", checkForNextPage);

// load first items
fetchMoreItems();