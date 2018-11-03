import { Store, StoreConfig } from "@datorama/akita";

export interface FilterState {
    itemType: string;
 }
 ​
 export function createInitialState(): FilterState {
   return {
     itemType: ""
   };
 }
 ​
 @StoreConfig({ name: 'filter' })
 export class FilterStore extends Store<FilterState> {
   constructor() {
     super(createInitialState());
   }
 }