import { EntityState, EntityStore, StoreConfig } from "@datorama/akita";
import { Item } from "./item.model";

export interface ItemsState extends EntityState<Item> { }

@StoreConfig({ name: 'items', idKey: 'mal_id' })
export class ItemsStore extends EntityStore<ItemsState, Item> {
  constructor() {
    super();
  }
}