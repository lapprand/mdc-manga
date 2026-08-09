import { filterService } from "../../config"
import { Selector } from "./components/select-component"
import { MDCSelect } from '@material/select'

let filter = document.querySelector("#filters") as HTMLElement

let selector = new Selector("Subtype")
selector.addItem(selector.createItem("Manga", "manga"))
selector.addItem(selector.createItem("Anime", "anime"))
selector.addItem(selector.createItem("People", "people"))
selector.addItem(selector.createItem("Characters", "characters"))

// Set default selected item
selector.setDefaultItem("manga")

filter.appendChild(selector.element)

const select = new MDCSelect(selector.element)

// Tell MDC which item is selected so it floats the label and tracks its own
// selectedIndex (the visible input text was already set by setDefaultItem).
select.value = "manga"

select.listen("MDCSelect:change", () => {
    filterService.updateItemType(select.value)
    // MDC writes the selected text via textContent, which <input> elements
    // don't display — mirror it into the visible input here.
    selector.syncValue(select.value)
})
