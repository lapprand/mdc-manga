import { newItemNode } from "./src/ts/new-item-node";
import { newLoader } from "./src/ts/loader-component";
import { Item } from "./src/ts/item";
import "@babel/polyfill";
import axios from "axios";
import "lazysizes";
import "./src/media/favicon.ico";

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
                grid.appendChild(newItemNode(item))
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