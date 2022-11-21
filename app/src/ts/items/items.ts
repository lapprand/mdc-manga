import { Item } from "./item.model";
import { itemsService, itemsQuery } from "../../../config";
import { fadeOut } from "../animate";
import { newLoader } from "../components/loader-component";
import { newItemNode } from "../components/new-item-node";
import { Observable } from "rxjs";
import axios from "axios"

export class Items {

    grid: HTMLElement;
    loader: HTMLElement;
    fetching: boolean;
    private page: number;
    private _itemType: string;
    private io: IntersectionObserver;

    constructor() {
        this.fetching = false;
        this.page = 1;
        this.grid = document.querySelector("#grid");
        this.io = new IntersectionObserver(
            entries => {
                // entries.map(entry => console.log(entry.target));
            },
            {
                /* Using default options. */
            }
        );
    }

    public get itemType(): string {
        return this._itemType;
    }

    public set itemType(value: string) {
        this._itemType = value;
    }

    private async clearGrid() {
        this.page = 1;
        this.grid.textContent = "";
    }

    fetchMoreItems() {
        this.fetching = true;
        this.loader = newLoader();
        this.grid.appendChild(this.loader);
        axios.get(`https://api.jikan.moe/v4/top/${this.itemType}?page=${this.page}`)
            .then(async (response: any) => {
                // console.log(response);
                await fadeOut([this.loader]);
                this.grid.removeChild(this.loader);
                const items = response.data.data?.map((item: any) => ({
                    ...item,
                    title: item.title || item.name,
                    image_url: item.images.webp?.image_url || item.images.jpg?.image_url
                }))
                this.storeItems(items);
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

    storeItems = (items: Item[]) => {
        for (let item of items) {
            item.birthday = item.birthday ? new Date(item.birthday) : undefined;
            itemsService.addItem(item);
            // itemsService.getItems();
            let itemNode = newItemNode(item);
            this.io.observe(itemNode);
            // this.grid.appendChild(itemNode);
        }
    }

    addItems(...items: Item[]) {
        if (items.length > 0) {
            for (let item of items) {
                this.grid.appendChild(newItemNode(item));
            }
        }
    }
}