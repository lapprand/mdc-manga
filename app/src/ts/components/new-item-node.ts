import { Item } from "../items/item.model";
import { addHover } from "../mdc-hover";
import { newEl } from "./new-element";
import { fadeIn } from "../animate";

export function newItemNode(item: Item) {

    // item wrapper
    let listItem = newEl(
        "li",
        "mdc-image-list__item",
        "my-image-list__item"
    );
    addHover(listItem, 1, 8);

    // image aspect ratio container
    let aspectRatioContainer = newEl(
        "div",
        "mdc-image-list__image-aspect-container"
    );
    listItem.appendChild(aspectRatioContainer);

    // image
    let listItemImage = newEl(
        "img",
        "lazyload",
        "mdc-image-list__image"
    );
    listItemImage.setAttribute("data-sizes", "auto");
    listItemImage.setAttribute("data-optimumx", "1.0");
    listItemImage.setAttribute("data-src", item.image_url);
    aspectRatioContainer.appendChild(listItemImage);

    // item details
    let listItemContent = newEl(
        "div",
        "list-item-content"
    );
    listItem.appendChild(listItemContent);

    let listItemTitle = newEl("div", "list-item-title", "mdc-typography--subtitle2");
    listItemTitle.textContent = (item.name_kanji) ? `${item.title} (${item.name_kanji})` : item.title;
    listItemContent.appendChild(listItemTitle);

    if (item.rank) {
        let listItemRank = newEl("div", "list-item-rank", "mdc-typography--caption");
        listItemRank.textContent = `Rank: #${item.rank}`;
        listItemContent.appendChild(listItemRank);
    }

    if (item.birthday) {
        let listItemBirthday = newEl("div", "list-item-birthday", "mdc-typography--caption");
        listItemBirthday.textContent = `Birthday: ${item.birthday.toLocaleDateString()}`;
        listItemContent.appendChild(listItemBirthday);
    }

    if (item.score) {
        let listItemScore = newEl("div", "list-item-score", "mdc-typography--caption");
        listItemScore.textContent = `Rating: ${item.score}`;
        listItemContent.appendChild(listItemScore);
    }

    if (item.favorites) {
        let listItemFavorites = newEl("div", "list-item-favorites", "mdc-typography--caption");
        listItemFavorites.textContent = `Favorites: ${item.favorites}`;
        listItemContent.appendChild(listItemFavorites);
    }

    if (item.start_date) {
        let listItemStartDate = newEl("div", "list-item-start-date", "mdc-typography--caption");
        listItemStartDate.textContent = `Published: ${item.start_date}`;
        listItemContent.appendChild(listItemStartDate);
    }

    // set icon with link to manga details
    let anchor = newEl("a", "list-item-anchor");
    anchor.setAttribute("href", item.url);
    anchor.setAttribute("target", "_blank");
    anchor.setAttribute("rel", "noopener noreferrer");
    listItemContent.appendChild(anchor);

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

    // animate
    fadeIn(listItem);
    fadeIn(listItemImage);

    return listItem;

    // let title = (item.name_kanji) ? `${item.title} (${item.name_kanji})` : item.title;

    // let rank = item.rank
    //     ? `<div class="list-item-rank mdc-typography--caption">Rank: #${item.rank}</div>`
    //     : "";

    // let birthday = item.birthday
    //     ? `<div class="list-item-birthday mdc-typography--caption">Birthday: ${item.birthday.toLocaleDateString()}</div>`
    //     : "";

    // let content =
    //     `<li class="mdc-image-list__item my-image-list__item">
    //         <div class="mdc-image-list__image-aspect-container">
    //             <img class="mdc-image-list__image lazyload" data-sizes="auto" data-src=${item.image_url}></img>
    //         </div>
    //         <div class="list-item-content">
    //             <div class="list-item-title mdc-typography--subtitle2">${title}</div>
    //             ${rank}
    //             ${birthday}
    //             <div class="list-item-caption mdc-typography--caption">Rating: ${item.score}</div>
    //             <div class="list-item-favorites mdc-typography--caption">Favorites: ${item.favorites}</div>
    //             <div class="list-item-start-date mdc-typography--caption">Published: ${item.start_date}</div>
    //             <a class="list-item-anchor" href=${item.url} target="_blank" rel="noopener noreferrer">
    //                 <button
    //                  class="mdc-icon-button material-icons mdc-card__action mdc-card__action--icon"
    //                  aria-pressed="false"
    //                  aria-label="Open in new tab">open_in_new</button>
    //             </a>
    //         </div>
    //     </li>`;

    // return content;

};