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

select.listen("MDCSelect:change", () => {
    filterService.updateItemType(select.value)
})
