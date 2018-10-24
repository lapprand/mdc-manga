import { addHover } from "./mdc-hover";
import { Item } from "./item";
import { newDiv } from "./div-component";

export function newCardCellNode(item: Item) {

    // instantiate elements
    let gridCell = newDiv("mdc-layout-grid__cell");

    let card = newDiv("mdc-card");

    let hoverWrapper = newDiv("hover", "mdc-elevation-transition");
    addHover(hoverWrapper, "mdc-elevation--z1", "mdc-elevation--z24");

    let cardPrimary = newDiv("mdc-card__primary");

    let cardTitle = newDiv("card-title", "mdc-typography--headline6");

    let title = document.createTextNode(item.name);

    let cardActions = newDiv("mdc-card__actions");
    let cardActionIcons = newDiv("mdc-card__action-icons");

    let anchor = document.createElement("a") as HTMLAnchorElement;
    // anchor.setAttribute("href", "magnet:?xt=urn:btih:" + item.hash);
    anchor.setAttribute("href", item.links.magnet);

    let iconButton = document.createElement("button") as HTMLButtonElement;
    iconButton.classList.add("mdc-icon-button", "mdc-card__action", "mdc-card__action-icon");
    iconButton.setAttribute("aria-pressed", "false");
    iconButton.setAttribute("aria-label", "Magnet link");

    let magnetIcon = document.createElement("i") as HTMLIFrameElement;
    magnetIcon.classList.add("fas", "fa-magnet");

    // append elements in order
    iconButton.appendChild(magnetIcon);
    anchor.appendChild(iconButton);
    cardActionIcons.appendChild(anchor);
    cardActions.appendChild(cardActionIcons);
    cardTitle.appendChild(title);
    cardPrimary.appendChild(cardTitle);
    hoverWrapper.appendChild(cardPrimary);
    hoverWrapper.appendChild(cardActions);
    card.appendChild(hoverWrapper);
    gridCell.appendChild(card);

    return gridCell;
};