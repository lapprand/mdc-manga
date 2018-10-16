import "@babel/polyfill";
import "./src/ts/rss-parser";

window.onload = (_) : void => {
    (document.querySelector("#loader") as HTMLElement).style.display = "none";
    (document.querySelector("#content") as HTMLElement).style.display = "grid";
};