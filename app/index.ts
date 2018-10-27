import { newCardCellNode } from "./src/ts/new-card-cell-node";
import { newLoader } from "./src/ts/loader-component";
import { Item } from "./src/ts/item";
import "@babel/polyfill";
import axios from "axios";

let html = document.querySelector("html");

var fetching = false;
let page = 1;

function fetchMoreItems() {
    fetching = true;
    let loader = newLoader();
    grid.appendChild(loader);

    // let params = new URLSearchParams({
    //     term: "HorribleSubs",
    //     n: page.toString(),
    //     filter: "2"
    // });

    // var request = new XMLHttpRequest();

    // request.open('GET', '/.netlify/functions/proxy?' + params);

    // request.onreadystatechange = function () {
    //     if (this.readyState === 4) {
    //         // console.log('Body:', this.responseText);
    //         if (this.status === 200) {
    //             JSON.parse(this.responseText).forEach((item: Item) => {
    //                 innerDiv.appendChild(newCardCellNode(item))
    //             });
    //             page++;
    //         }
    //         fetching = false;
    //         grid.removeChild(loader);
    //     }
    // };

    // request.send();

    axios.get('/.netlify/functions/proxy', {
        params: {
            term: "HorribleSubs",
            n: page.toString(),
            filter: "2"
        }
    })
        .then(function (response) {
            console.log(response);
            response.data.forEach((item: Item) => {
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