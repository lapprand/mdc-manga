import "@babel/polyfill";
import "./src/ts/rss-parser";
import "./src/ts/axios-client";

window.onload = (_) : void => {
    (document.querySelector("#loader") as HTMLElement).style.display = "none";
    (document.querySelector("#content") as HTMLElement).style.display = "grid";
};