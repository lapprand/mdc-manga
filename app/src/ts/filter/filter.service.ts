import { FilterStore } from "./filter.store";

export class FilterService {

    constructor(private filterStore: FilterStore) { }

    updateItemType(type: string) {
        this.filterStore.update({ itemType: type });
    }
}