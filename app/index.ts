import { newItemNode } from "./src/ts/new-item-node";
import { newLoader } from "./src/ts/loader-component";
import { Item } from "./src/ts/item";
import { fadeOut } from "./src/ts/animate";
import "./src/media/favicon.ico";
import "@babel/polyfill";
import "lazysizes";

const jikan = require("jikanjs");
var fetching = false;
let page = 1;

function fetchMoreItems() {
    fetching = true;
    let loader = newLoader();
    grid.appendChild(loader);

    jikan.loadTop("manga", page)
        .then(function (response: any) {
            // console.log(response);
            fadeOut([loader], () => {
                grid.removeChild(loader);
                let items: Item[] = response.top;
                for (let item of items) {
                    grid.appendChild(newItemNode(item))
                }
                page++;
            });
        })
        .catch(function (error: any) {
            console.log(error);
        })
        .then(() => {
            fetching = false;
        });

}


// get node where items will be placed
let grid = document.querySelector("#grid") as HTMLElement;


let scrollHeight, scrollTop, clientHeight;
function checkForNextPage() {
    scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
    scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    clientHeight = window.innerHeight;
    // console.log(scrollTop + "+" + clientHeight + " = " + (scrollTop + clientHeight) + " = " + scrollHeight);
    if (scrollTop + clientHeight >= scrollHeight - 400 && !fetching) {
        fetchMoreItems();
    }
}

window.addEventListener("scroll", checkForNextPage);
window.addEventListener("touchmove", checkForNextPage);

// load first items
fetchMoreItems();