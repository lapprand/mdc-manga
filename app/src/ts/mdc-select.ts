import { filterService } from "../../config"
import { Selector } from "./components/select-component"
import { MDCSelect } from '@material/select'

let filter = document.querySelector("#filters") as HTMLElement

let selector = new Selector("Subtype")
let selected = selector.createItem("Manga", "manga")
selected.classList.add("mdc-list-item--selected")
selected.setAttribute("aria-selected", "true")

selector.addItem(selector.createItem("Anime", "anime"))
selector.addItem(selected)
selector.addItem(selector.createItem("People", "people"))
selector.addItem(selector.createItem("Characters", "characters"))
filter.appendChild(selector.element)

const select = new MDCSelect(selector.element)

select.listen("MDCSelect:change", () => {
    filterService.updateItemType(select.value)
})
