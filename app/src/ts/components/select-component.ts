import { fadeIn } from "../animate"
import { newEl } from "./new-element"

export class Selector {
    
    element: HTMLElement
    selectAnchor: HTMLElement
    selectedTextInput: HTMLInputElement
    menu: HTMLElement
    floatingLabel: HTMLElement
    list: HTMLUListElement
    items: Set<HTMLLIElement> = new Set()
    
    constructor(labelText: string) {
        
        // build element
        this.element = newEl("div", "mdc-select", "select-width", "filter")

        this.selectAnchor = newEl("div", "mdc-select__anchor")
        this.selectAnchor.setAttribute("aria-labelledby", "outlined-select-label")
        // MDCSelect is the single owner of open/close/keyboard state (it manages
        // aria-expanded, mdc-select--activated and mdc-select--focused itself).
        // Note: aria-controls on the anchor would be mistaken for a helper-text
        // pointer by MDCSelect, so it is deliberately omitted here.
        this.selectAnchor.setAttribute("tabindex", "0")
        this.selectAnchor.setAttribute("role", "button")
        this.selectAnchor.setAttribute("aria-haspopup", "listbox")
        this.selectAnchor.setAttribute("aria-expanded", "false")
        this.selectAnchor.appendChild(newEl("span", "mdc-select__ripple"))
        
        this.selectedTextInput = newEl("input", "mdc-select__selected-text") as HTMLInputElement
        this.selectedTextInput.setAttribute("type", "text")
        // readonly (not disabled): a disabled input swallows pointer events, so
        // clicking the visible value would do nothing — only the edges of the
        // control would open the menu. tabindex -1 prevents the input from being
        // a second tab stop; the anchor is the single focus target.
        this.selectedTextInput.setAttribute("readonly", "true")
        this.selectedTextInput.setAttribute("tabindex", "-1")
        this.selectAnchor.appendChild(this.selectedTextInput)
        
        // dropdown icon
        const dropdownIcon = newEl("i", "mdc-select__dropdown-icon")
        dropdownIcon.textContent = "▼"
        this.selectAnchor.appendChild(dropdownIcon)

        this.floatingLabel = newEl("span", "mdc-floating-label")
        this.floatingLabel.setAttribute("id", "outlined-select-label")
        this.floatingLabel.textContent = labelText
        
        this.selectAnchor.appendChild(this.floatingLabel)

        const lineRipple = newEl("span", "mdc-line-ripple")

        this.selectAnchor.appendChild(lineRipple)

        this.element.appendChild(this.selectAnchor)
        
        // menu — MDCSelect positions and shows/hides it; mdc-menu-surface--fullwidth
        // keeps it aligned with the anchor width (MDC writes inline top/left).
        this.menu = newEl("div", "mdc-select__menu", "mdc-menu", "mdc-menu-surface", "mdc-menu-surface--fullwidth", "select-width")
        this.element.appendChild(this.menu)
        
        // menu list
        this.list = newEl("ul", "mdc-list") as HTMLUListElement
        this.list.setAttribute("role", "listbox")
        this.menu.appendChild(this.list)
        
        // add animation
        fadeIn(this.element)
    }
    
    createItem(text: string, dataValue: string): HTMLLIElement {
        const item = newEl("li", "mdc-list-item") as HTMLLIElement
        item.setAttribute("data-value", dataValue)
        item.setAttribute("role", "option")
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

    // Mirrors a selection into the visible input. MDCSelect owns the actual
    // selection state; it writes the selected text via textContent, which
    // <input> elements don't display, so the value is mirrored here instead.
    selectItem(item: HTMLLIElement) {
        this.items.forEach(i => {
            i.classList.remove("mdc-list-item--selected")
            i.removeAttribute("aria-selected")
        })
        item.classList.add("mdc-list-item--selected")
        item.setAttribute("aria-selected", "true")
        this.selectedTextInput.value = item.querySelector(".mdc-list-item__text")?.textContent || ""
        this.floatingLabel.classList.add("mdc-floating-label--float-above")
    }

    setDefaultItem(dataValue: string) {
        for (const item of this.items) {
            if (item.getAttribute("data-value") === dataValue) {
                this.selectItem(item)
                break
            }
        }
    }

    // Called on MDCSelect:change so the visible text follows MDC's selection
    syncValue(dataValue: string) {
        for (const item of this.items) {
            if (item.getAttribute("data-value") === dataValue) {
                this.selectItem(item)
                // Keep focus on the control so keyboard users can immediately reopen
                this.selectAnchor.focus()
                return
            }
        }
    }
}
