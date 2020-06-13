import { fadeIn } from "../animate"
import { newEl } from "./new-element"

export class Selector {
    
    element: HTMLElement
    list: HTMLUListElement
    items: Set<HTMLLIElement> = new Set()
    
    constructor(labelText: string) {
        
        // build element
        this.element = newEl("div", "mdc-select", "select-width", "filter")

        const selectAnchor = newEl("div", "mdc-select__anchor")
        selectAnchor.setAttribute("aria-labelledby", "outlined-select-label")
        selectAnchor.appendChild(newEl("span", "mdc-select__ripple"))
        
        const input = newEl("input", "mdc-select__selected-text")
        input.setAttribute("type", "text")
        input.setAttribute("disabled", "true")
        input.setAttribute("readonly", "true")
        selectAnchor.appendChild(input)
        
        // dropdown icon
        selectAnchor.appendChild(newEl("i", "mdc-select__dropdown-icon"))

        const floatingLabel = newEl("span", "mdc-floating-label")
        floatingLabel.setAttribute("id", "outlined-select-label")
        floatingLabel.textContent = labelText
        
        selectAnchor.appendChild(floatingLabel)

        const lineRipple = newEl("span", "mdc-line-ripple")

        selectAnchor.appendChild(lineRipple)

        this.element.appendChild(selectAnchor)
        
        // menu
        const menu = newEl("div", "mdc-select__menu", "mdc-menu", "mdc-menu-surface", "select-width")
        menu.style.width = "100%"
        this.element.appendChild(menu)
        
        // menu list
        this.list = newEl("ul", "mdc-list") as HTMLUListElement
        this.element.lastChild.appendChild(this.list)
        
        // this.element.appendChild(newEl("div", "mdc-line-ripple"))
        // add animation
        fadeIn(this.element)
    }
    
    createItem(text: string, dataValue: string): HTMLLIElement {
        const item = newEl("li", "mdc-list-item") as HTMLLIElement
        item.setAttribute("data-value", dataValue)
        const itemTextEl = newEl("span", "mdc-list-item__text")
        itemTextEl.textContent = text
        item.appendChild(itemTextEl)
        return item
    }

    addItem(item: HTMLLIElement) {
        this.items.add(item)
        this.list.appendChild(item)
    }

    removeItem(item: HTMLLIElement) {
        this.items.delete(item)
        item.remove()
    }
}
