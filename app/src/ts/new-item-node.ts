import { addHover } from "./mdc-hover";
import { Item } from "./item";
import { newEl } from "./new-element";

export function newItemNode(item: Item) {

    // instantiate elements
    let listItem = newEl(
        "li",
        "mdc-image-list__item",
    );
    addHover(listItem, 1, 16);

    let aspectRatioContainer = newEl(
        "div",
        "mdc-image-list__image-aspect-container"
    );
    
    let listItemImage = newEl(
        "img",
        "mdc-image-list__image"
    );
    listItemImage.classList.add("lazyload");
    listItemImage.classList.add("mdc-image-list__image");
    listItemImage.setAttribute("data-sizes", "auto");
    listItemImage.setAttribute("data-optimumx", "1.0");
    listItemImage.setAttribute("data-src", item.image_url);

    let listItemContent = newEl(
        "div",
        "mdc-image-list__supporting"
    );

    let listItemLabel = newEl(
        "span",
        "mdc-image-list__label"
    );
    listItemLabel.textContent = item.title;

    // card with manga name
    // let cardPrimary = newEl("mdc-card__primary");
    // let cardTitle = newEl("card-title", "mdc-typography--headline6");
    // let title = document.createTextNode(item.title);

    // // set actions which will hold icons
    // let cardActions = newEl("mdc-card__actions");
    // let cardActionIcons = newEl("mdc-card__action-icons");

    // set icon with link to manga details
    // let anchor = document.createElement("a") as HTMLAnchorElement;
    // anchor.setAttribute("href", item.url);

    // let iconButton = document.createElement("button") as HTMLButtonElement;
    // iconButton.classList.add("mdc-icon-button", "material-icons", "mdc-card__action", "mdc-card__action--icon");
    // iconButton.setAttribute("aria-pressed", "false");
    // iconButton.setAttribute("aria-label", "Open in new tab");
    // iconButton.textContent = "open_in_new";

    listItem.appendChild(aspectRatioContainer);
    aspectRatioContainer.appendChild(listItemImage);
    listItem.appendChild(listItemContent);
    listItemContent.appendChild(listItemLabel);

    return listItem;
};