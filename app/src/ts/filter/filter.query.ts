import { Query } from "@datorama/akita";
import { FilterStore } from "./filter.store";
import { Filter } from "./filter.model";

export class FilterQuery extends Query<Filter> {
    constructor(protected store: FilterStore) {
        super(store);
    }
}