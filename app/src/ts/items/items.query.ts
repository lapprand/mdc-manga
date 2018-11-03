import { QueryEntity } from "@datorama/akita";
import { ItemsStore, ItemsState } from "./items.store";
import { Item } from "./item.model";

export class ItemsQuery extends QueryEntity<ItemsState, Item> {
    constructor(protected store: ItemsStore) {
        super(store);
    }
}