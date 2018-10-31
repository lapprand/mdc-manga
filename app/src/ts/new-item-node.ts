import { addHover } from "./mdc-hover";
import { newEl } from "./new-element";
import { fadeIn } from "./animate";
import { Item } from "./item";

export function newItemNode(item: Item) {

    // item wrapper
    let listItem = newEl(
        "li",
        "mdc-image-list__item",
        "my-image-list__item"
    );
    addHover(listItem, 1, 16);

    // image aspect ratio container
    let aspectRatioContainer = newEl(
        "div",
        "mdc-image-list__image-aspect-container"
    );
    
    // image
    let listItemImage = newEl(
        "img",
        "mdc-image-list__image"
    );
    listItemImage.classList.add("lazyload");
    listItemImage.classList.add("mdc-image-list__image");
    listItemImage.setAttribute("data-sizes", "auto");
    listItemImage.setAttribute("data-optimumx", "1.0");
    listItemImage.setAttribute("data-src", item.image_url);

    // item details
    let listItemContent = newEl(
        "div",
        "list-item-content"
    );

    let listItemTitle = newEl(
        "div",
        "list-item-title",
        "mdc-typography--subtitle2"
    );
    listItemTitle.textContent = item.title;

    let listItemRank = newEl(
        "div",
        "list-item-rank",
        "mdc-typography--caption"
    );
    listItemRank.textContent = "Rank: #" + item.rank;

    let listItemStartDate = newEl(
        "div",
        "list-item-start-date",
        "mdc-typography--caption"
    );
    listItemStartDate.textContent = "Published: " + item.start_date;

    let listItemScore = newEl(
        "div",
        "list-item-score",
        "mdc-typography--caption"
    );
    listItemScore.textContent = "Rating: " + item.score;

    // let card = newEl(
    //     "div",
    //     "mdc-card",
    //     "mdc-card--outlined"
    // );

    // card with manga name
    // let cardPrimary = newEl("mdc-card__primary");
    // let cardTitle = newEl("card-title", "mdc-typography--headline6");
    // let title = document.createTextNode(item.title);

    // // set actions which will hold icons
    // let cardActions = newEl("mdc-card__actions");
    // let cardActionIcons = newEl("mdc-card__action-icons");

    // set icon with link to manga details
    let anchor = newEl(
        "a", 
        "list-item-anchor"
    );
    anchor.setAttribute("href", item.url);
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("rel", "noopener noreferrer");

    let iconButton = newEl(
        "button", 
        "mdc-icon-button", 
        "material-icons", 
        "mdc-card__action", 
        "mdc-card__action--icon"
    );
    iconButton.setAttribute("aria-pressed", "false");
    iconButton.setAttribute("aria-label", "Open in new tab");
    iconButton.textContent = "open_in_new";
    anchor.appendChild(iconButton);

    listItem.appendChild(aspectRatioContainer);
    aspectRatioContainer.appendChild(listItemImage);
    listItem.appendChild(listItemContent);
    listItemContent.appendChild(listItemTitle);
    listItemContent.appendChild(listItemRank);
    listItemContent.appendChild(listItemScore);
    listItemContent.appendChild(listItemStartDate);
    listItemContent.appendChild(anchor);

    // animate
    fadeIn(listItem);
    fadeIn(listItemImage);

    return listItem;
};