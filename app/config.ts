import { FilterStore } from "./src/ts/filter/filter.store";
import { FilterQuery } from "./src/ts/filter/filter.query";
import { FilterService } from "./src/ts/filter/filter.service";
import { ItemsStore } from "./src/ts/items/items.store";
import { ItemsQuery } from "./src/ts/items/items.query";
import { ItemsService } from "./src/ts/items/items.service";
import { enableAkitaProdMode } from '@datorama/akita';
​
enableAkitaProdMode();

var filterStore = new FilterStore();
var filterQuery = new FilterQuery(filterStore);
var filterService = new FilterService(filterStore);

var itemsStore = new ItemsStore();
var itemsQuery = new ItemsQuery(itemsStore);
var itemsService = new ItemsService(itemsStore);

export {
    filterStore,
    filterService,
    filterQuery,
    itemsStore,
    itemsService,
    itemsQuery
};