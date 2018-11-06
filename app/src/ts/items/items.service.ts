import { ItemsStore } from "./items.store";
import { Item } from "./item.model";

export class ItemsService {

    constructor(private itemsStore: ItemsStore) { }

    addItem(item: Item) {
        this.itemsStore.createOrReplace(item.mal_id, item);
        this.itemsStore.setActive(item.mal_id);
    }
}