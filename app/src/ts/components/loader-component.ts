import { fadeIn } from "../animate";
import { newEl } from "./new-element";

export function newLoader() {
    
    // build element
    let loader = newEl("div");
    loader.setAttribute("id", "loader");

    let progressBar = newEl("div", "mdc-linear-progress", "mdc-linear-progress--indeterminate");
    progressBar.setAttribute("role", "progressbar");

    var progressBarInner = (): HTMLSpanElement => {
        let pbInner = document.createElement("span") as HTMLSpanElement;
        pbInner.classList.add("mdc-linear-progress__bar-inner")
        return pbInner;
    };

    progressBar.appendChild(newEl("div", "mdc-linear-progress__buffering-dots"));
    progressBar.appendChild(newEl("div", "mdc-linear-progress__buffer"));
    progressBar.appendChild(newEl("div", "mdc-linear-progress__bar", "mdc-linear-progress__primary-bar"));
    progressBar.lastChild.appendChild(progressBarInner());
    progressBar.appendChild(newEl("div", "mdc-linear-progress__bar", "mdc-linear-progress__primary-bar"));
    progressBar.lastChild.appendChild(progressBarInner());

    loader.appendChild(progressBar);

    // add animation
    fadeIn(loader);

    return loader;
}