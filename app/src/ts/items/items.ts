import { Item } from "./item.model";
import { itemsService, itemsStore } from "../../../config";
import { fadeOut } from "../animate";
import { newLoader } from "../components/loader-component";
import { newItemNode } from "../components/new-item-node";
import { newError } from "../components/error-component";
import { fetchTopPage, TopType } from "./top-source";

const MAX_AUTOFILL_PAGES = 3;

export class Items {

    grid: HTMLElement;
    loader: HTMLElement;
    errorEl: HTMLElement;
    fetching: boolean;
    private pendingRefresh: boolean;
    private page: number;
    private done: boolean;
    private autoFillDepth: number;
    private _itemType: string;
    private rendered: Set<string>;

    constructor() {
        this.fetching = false;
        this.pendingRefresh = false;
        this.page = 1;
        this.done = false;
        this.autoFillDepth = 0;
        this.rendered = new Set();
        this.grid = document.querySelector("#grid");
    }

    public get itemType(): string {
        return this._itemType;
    }

    public set itemType(value: string) {
        this._itemType = value;
    }

    public clearGrid() {
        this.page = 1;
        this.done = false;
        this.autoFillDepth = 0;
        this.rendered.clear();
        itemsStore.reset();
        this.removeError();
        this.grid.textContent = "";
    }

    public async fetchMoreItems() {
        if (this.done) return;
        if (this.fetching) {
            // A type change or scroll arrived while a page is in flight;
            // re-run as soon as the current request settles.
            this.pendingRefresh = true;
            return;
        }
        this.fetching = true;
        const requestType = this.itemType;
        const requestPage = this.page;
        const loader = newLoader();
        this.loader = loader;
        this.grid.appendChild(loader);

        try {
            const result = await fetchTopPage(requestType as TopType, requestPage);
            await fadeOut([loader]);
            if (loader.parentNode) this.grid.removeChild(loader);
            if (this.itemType !== requestType || this.page !== requestPage) return;
            this.removeError();
            this.storeItems(result.items);
            if (result.hasNextPage) {
                this.page++;
                this.autoFillDepth++;
                if (this.autoFillDepth < MAX_AUTOFILL_PAGES && this.needsMoreContent()) {
                    setTimeout(() => this.fetchMoreItems(), 600);
                }
            } else {
                this.done = true;
            }
        } catch (err) {
            console.log(err);
            await fadeOut([loader]);
            if (loader.parentNode) this.grid.removeChild(loader);
            if (this.itemType !== requestType || this.page !== requestPage) return;
            this.showError(`Couldn't load page ${requestPage}. Check your connection and scroll to retry.`);
        } finally {
            this.fetching = false;
            if (this.pendingRefresh) {
                this.pendingRefresh = false;
                this.fetchMoreItems();
            }
        }
    }

    onTypeChange() {
        this.clearGrid();
        this.fetchMoreItems();
    }

    storeItems = (items: Item[]) => {
        for (let item of items) {
            item.birthday = item.birthday ? new Date(item.birthday) : undefined;
            itemsService.addItem(item);
        }
    }

    addItems(...items: Item[]) {
        for (let item of items) {
            if (this.rendered.has(String(item.mal_id))) continue;
            this.rendered.add(String(item.mal_id));
            this.grid.appendChild(newItemNode(item));
        }
    }

    private needsMoreContent(): boolean {
        const doc = document.documentElement;
        return doc.scrollHeight <= window.innerHeight + 400;
    }

    private showError(message: string) {
        this.removeError();
        this.errorEl = newError(message);
        this.grid.appendChild(this.errorEl);
    }

    private removeError() {
        if (this.errorEl && this.errorEl.parentNode) {
            this.errorEl.parentNode.removeChild(this.errorEl);
        }
        this.errorEl = undefined;
    }
}
