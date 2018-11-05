import { Item } from "./item.model";
import { itemsService } from "../../../config";
import { fadeOut } from "../animate";
import { newLoader } from "../components/loader-component";
import { newItemNode } from "../components/new-item-node";
const jikan = require("jikanjs");

export class Items {

    grid: HTMLElement;
    loader: HTMLElement;
    items: Item[];
    fetching: boolean;
    private page: number;
    private _itemType: string;

    constructor() {
        this.fetching = false;
        this.page = 1;
        this.grid = document.querySelector("#grid");
    }

    public get itemType(): string {
        return this._itemType;
    }

    public set itemType(value: string) {
        this._itemType = value;
    }

    private async clearGrid() {
        this.page = 1;
        let items = document.querySelectorAll(".my-image-list__item");
        items.forEach(async item => {
            await fadeOut([item as HTMLElement]);
            item.remove();
        });
    }

    fetchMoreItems() {
        this.fetching = true;
        this.loader = newLoader();
        this.grid.appendChild(this.loader);
        jikan.loadTop(this.itemType, this.page)
            .then(async (response: any) => {
                console.log(response);
                await fadeOut([this.loader]);
                this.grid.removeChild(this.loader);
                this.addItems(response.top);
                this.fetching = false;
                this.page++;
            })
            .catch(async (error: any) => {
                console.log(error);
                await fadeOut([this.loader]);
                this.grid.removeChild(this.loader);
                // fetchMoreItems();
                this.fetching = false;
            });
    }

    onTypeChange() {
        this.clearGrid();
        this.fetchMoreItems();
    }

    addItems = (items: Item[]) => {
        for (let item of items) {
            item.birthday = item.birthday ? new Date(item.birthday) : undefined;
            itemsService.addItem(item);
            this.grid.appendChild(newItemNode(item));
        }
    }
}