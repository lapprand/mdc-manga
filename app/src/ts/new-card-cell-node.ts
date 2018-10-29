import { addHover } from "./mdc-hover";
import { Item } from "./item";
import { newDiv } from "./div-component";

export function newCardCellNode(item: Item) {

    // instantiate elements

    let gridCell = newDiv(
        "mdc-layout-grid__cell",
        "mdc-layout-grid__cell--span-4-desktop",
        "mdc-layout-grid__cell--align-top"
    );

    let card = newDiv("mdc-card", "mdc-card--outlined");

    let hoverWrapper = newDiv("hover", "mdc-elevation-transition", "mdc-elevation--z8");
    addHover(hoverWrapper, "mdc-elevation--z8", "mdc-elevation--z1");
    
    let cardMedia = newDiv("mdc-card__media");
    
    let image = document.createElement("img") as HTMLImageElement;
    image.classList.add("lazyload");
    image.setAttribute("data-sizes", "auto");
    image.setAttribute("data-optimumx", "1.0");
    image.setAttribute("data-src", item.image_url);

    // card with manga name
    let cardPrimary = newDiv("mdc-card__primary");
    let cardTitle = newDiv("card-title", "mdc-typography--headline6");
    let title = document.createTextNode(item.title);

    // set actions which will hold icons
    let cardActions = newDiv("mdc-card__actions");
    let cardActionIcons = newDiv("mdc-card__action-icons");

    // set icon with link to manga details
    let anchor = document.createElement("a") as HTMLAnchorElement;
    anchor.setAttribute("href", item.url);

    let iconButton = document.createElement("button") as HTMLButtonElement;
    iconButton.classList.add("mdc-icon-button", "material-icons", "mdc-card__action", "mdc-card__action--icon");
    iconButton.setAttribute("aria-pressed", "false");
    iconButton.setAttribute("aria-label", "Open in new tab");
    iconButton.textContent = "open_in_new";

    anchor.appendChild(iconButton);
    cardActionIcons.appendChild(anchor);
    cardActions.appendChild(cardActionIcons);
    cardTitle.appendChild(title);
    cardPrimary.appendChild(cardTitle);
    cardMedia.appendChild(image);
    hoverWrapper.appendChild(cardMedia);
    hoverWrapper.appendChild(cardPrimary);
    hoverWrapper.appendChild(cardActions);
    card.appendChild(hoverWrapper);
    gridCell.appendChild(card);

    return gridCell;
};