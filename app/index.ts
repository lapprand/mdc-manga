import { newCardCellNode } from "./src/ts/new-card-cell-node";
import { newLoader } from "./src/ts/loader-component";
import { Item } from "./src/ts/item";
import "@babel/polyfill";

let html = document.querySelector("html");

var fetching = false;
let page = 1;

async function fetchMoreItems() {
    fetching = true;
    let loader = newLoader();
    grid.appendChild(loader);
    
    let params = new URLSearchParams({
        term: "HorribleSubs",
        n: page.toString(),
        filter: "2"
    });

    let requestInit = {
        method: "GET"
    }

    let request = new Request("/.netlify/functions/proxy?" + params, requestInit);

    fetch(request).then(function (response) {
        if (response.ok) {
            response.json().then(function (json) {
                grid.removeChild(loader);
                json.forEach((item: Item) => {
                    console.log(item);
                    innerDiv.appendChild(newCardCellNode(item))
                });
                page++;
            });
        } else {
            console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
        }
        fetching = false;
    });
}


// get node where items will be placed
let grid = document.querySelector("#grid") as HTMLElement;

// add layout-grid inner for cell wrapping
let innerDiv = document.createElement("div");
innerDiv.classList.add("mdc-layout-grid__inner");
grid.appendChild(innerDiv);

function checkForNextPage () {
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