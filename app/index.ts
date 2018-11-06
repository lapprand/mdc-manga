import "intersection-observer";
import { filterService, filterQuery, itemsQuery } from "./config";
import { Items } from "./src/ts/items/items";
import "./src/ts/components/top-app-bar";
import "./src/media/favicon.ico";
import "./src/ts/mdc-select";
import "@babel/polyfill";
import { enableAkitaProdMode } from '@datorama/akita';

enableAkitaProdMode();

declare global {
    interface Window { lazySizesConfig: any; }
}

window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.preloadAfterLoad = true;
window.lazySizesConfig.loadMode = 1;
window.lazySizesConfig.loadHidden = false;
window.lazySizesConfig.expFactor = 4;
require("lazysizes");
require("lazysizes/plugins/unload/ls.unload");

// get node where items will be placed
// let grid = document.querySelector("#grid") as HTMLElement;
let items = new Items();

// default type to list
filterService.updateItemType("manga");

let typeObs$ = filterQuery.select(filter => filter.itemType);
typeObs$.forEach(t => {
    items.itemType = t;
    items.onTypeChange();
});

let items$ = itemsQuery.selectAll();
items$.forEach((its) => {
    if (!itemsQuery.isEmpty()) {
        items.addItems(its.pop());
    };
});

let scrollHeight, scrollTop, clientHeight;
function checkForNextPage() {
    scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
    scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    clientHeight = window.innerHeight;
    // console.log(scrollTop + "+" + clientHeight + " = " + (scrollTop + clientHeight) + " = " + scrollHeight);
    if (scrollTop + clientHeight >= scrollHeight - 400 && !items.fetching) {
        items.fetchMoreItems();
    }
}

window.addEventListener("scroll", checkForNextPage, { passive: true });
window.addEventListener("touchmove", checkForNextPage, { passive: true });