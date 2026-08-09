import { fadeIn } from "../animate";
import { newEl } from "./new-element";

export function newLoader() {

    // build element
    let loader = newEl("div");
    loader.setAttribute("id", "loader");
    loader.setAttribute("role", "status");
    loader.setAttribute("aria-label", "Loading");

    let spinner = newEl("div", "loader-spinner");

    loader.appendChild(spinner);

    // add animation
    fadeIn(loader);

    return loader;
}
