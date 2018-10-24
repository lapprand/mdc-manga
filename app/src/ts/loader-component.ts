import { newDiv } from "./div-component";

export function newLoader() {

    let loader = newDiv();
    loader.setAttribute("id", "loader");

    let progressBar = newDiv("mdc-linear-progress", "mdc-linear-progress--indeterminate");
    progressBar.setAttribute("role", "progressbar");

    var progressBarInner = (): HTMLSpanElement => {
        let pbInner = document.createElement("span") as HTMLSpanElement;
        pbInner.classList.add("mdc-linear-progress__bar-inner")
        return pbInner;
    };

    progressBar.appendChild(newDiv("mdc-linear-progress__buffering-dots"));
    progressBar.appendChild(newDiv("mdc-linear-progress__buffer"));
    progressBar.appendChild(newDiv("mdc-linear-progress__bar", "mdc-linear-progress__primary-bar"));
    progressBar.lastChild.appendChild(progressBarInner());
    progressBar.appendChild(newDiv("mdc-linear-progress__bar", "mdc-linear-progress__primary-bar"));
    progressBar.lastChild.appendChild(progressBarInner());

    loader.appendChild(progressBar);

    return loader;
}