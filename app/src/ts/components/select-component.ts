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
    isOpen: boolean = false
    
    constructor(labelText: string) {
        
        // build element
        this.element = newEl("div", "mdc-select", "select-width", "filter")

        this.selectAnchor = newEl("div", "mdc-select__anchor")
        this.selectAnchor.setAttribute("aria-labelledby", "outlined-select-label")
        this.selectAnchor.appendChild(newEl("span", "mdc-select__ripple"))
        
        this.selectedTextInput = newEl("input", "mdc-select__selected-text") as HTMLInputElement
        this.selectedTextInput.setAttribute("type", "text")
        this.selectedTextInput.setAttribute("disabled", "true")
        this.selectedTextInput.setAttribute("readonly", "true")
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
        
        // menu
        this.menu = newEl("div", "mdc-select__menu", "mdc-menu", "mdc-menu-surface", "select-width")
        this.menu.style.width = "100%"
        this.element.appendChild(this.menu)
        
        // menu list
        this.list = newEl("ul", "mdc-list") as HTMLUListElement
        this.menu.appendChild(this.list)
        
        // Add click handler to toggle menu on both element and anchor
        const toggleMenu = () => this.toggleMenu()
        this.selectAnchor.addEventListener("click", toggleMenu)
        this.element.addEventListener("click", (e) => {
            if (e.target === this.element) {
                toggleMenu()
            }
        })
        
        // Add keyboard support
        this.element.addEventListener("keydown", (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                this.closeMenu()
            }
        })
        
        // Close menu when clicking outside
        document.addEventListener("click", (e: MouseEvent) => {
            if (!this.element.contains(e.target as Node)) {
                this.closeMenu()
            }
        })
        
        // add animation
        fadeIn(this.element)
    }
    
    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu()
        } else {
            this.openMenu()
        }
    }
    
    openMenu() {
        this.isOpen = true
        this.menu.classList.add("mdc-menu-surface--open")
        this.element.classList.add("mdc-select--activated")
        this.floatingLabel.classList.add("mdc-floating-label--float-above")
    }
    
    closeMenu() {
        this.isOpen = false
        this.menu.classList.remove("mdc-menu-surface--open")
    }
    
    createItem(text: string, dataValue: string): HTMLLIElement {
        const item = newEl("li", "mdc-list-item") as HTMLLIElement
        item.setAttribute("data-value", dataValue)
        item.setAttribute("role", "option")
        const itemTextEl = newEl("span", "mdc-list-item__text")
        itemTextEl.textContent = text
        item.appendChild(itemTextEl)
        
        // Add click handler for selection
        item.addEventListener("click", () => {
            this.selectItem(item, text, dataValue)
        })
        
        return item
    }
    
    selectItem(item: HTMLLIElement, text: string, dataValue: string) {
        // Remove selected class from all items
        this.items.forEach(i => {
            i.classList.remove("mdc-list-item--selected")
            i.removeAttribute("aria-selected")
        })
        
        // Add selected class to clicked item
        item.classList.add("mdc-list-item--selected")
        item.setAttribute("aria-selected", "true")
        
        // Update the input value
        this.selectedTextInput.value = text
        
        // Ensure floating label stays up
        if (text) {
            this.floatingLabel.classList.add("mdc-floating-label--float-above")
        }
        
        // Close menu after selection
        this.closeMenu()
    }

    addItem(item: HTMLLIElement) {
        this.items.add(item)
        this.list.appendChild(item)
    }

    removeItem(item: HTMLLIElement) {
        this.items.delete(item)
        item.remove()
    }

    setDefaultItem(dataValue: string) {
        for (const item of this.items) {
            if (item.getAttribute("data-value") === dataValue) {
                const textElement = item.querySelector(".mdc-list-item__text")
                const text = textElement?.textContent || ""
                this.selectItem(item, text, dataValue)
                break
            }
        }
    }
}
