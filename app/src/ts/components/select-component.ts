import { fadeIn } from "../animate";
import { newEl } from "./new-element";

export class Selector {
    
    element: HTMLElement;
    list: HTMLUListElement;
    items: Set<HTMLLIElement> = new Set();
    
    constructor(labelText: string) {
        
        // build element
        this.element = newEl("div", "mdc-select", "select-width", "filter");
        
        let input = newEl("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", "enhanced-select");
        this.element.appendChild(input);
        
        // dropdown icon
        this.element.appendChild(newEl("i", "mdc-select__dropdown-icon"));
        
        // selected text
        this.element.appendChild(newEl("div", "mdc-select__selected-text", "select-width"));
        
        // menu
        this.element.appendChild(newEl("div", "mdc-select__menu", "mdc-menu", "mdc-menu-surface", "select-width"));
        
        // menu list
        this.list = newEl("ul", "mdc-list") as HTMLUListElement;
        this.element.lastChild.appendChild(this.list);
        
        let floatingLabel = newEl("span", "mdc-floating-label");
        floatingLabel.textContent = labelText;
        this.element.appendChild(floatingLabel);
        
        this.element.appendChild(newEl("div", "mdc-line-ripple"));
        // add animation
        fadeIn(this.element);
    }
    
    createItem(text: string, dataValue: string): HTMLLIElement {
        let item = newEl("li", "mdc-list-item") as HTMLLIElement;
        item.setAttribute("data-value", dataValue);
        item.textContent = text;
        return item;
    }

    addItem(item: HTMLLIElement) {
        this.items.add(item);
        this.list.appendChild(item);
    }

    removeItem(item: HTMLLIElement) {
        this.items.delete(item);
        item.remove();
    }
}
