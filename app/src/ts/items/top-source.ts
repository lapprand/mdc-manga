import { Item } from "./item.model";
import axios from "axios";

const API = "https://graphql.anilist.co";
const PER_PAGE = 25;
const MAX_RETRIES = 2;
const TIMEOUT_MS = 10000;

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export type TopType = "manga" | "anime" | "characters" | "people";

export interface TopPage {
    items: Item[];
    hasNextPage: boolean;
}

const QUERIES: { [key in TopType]: string } = {
    anime: `query ($page: Int) { Page(page: $page, perPage: ${PER_PAGE}) { pageInfo { hasNextPage } media(type: ANIME, sort: SCORE_DESC) { id title { romaji english } coverImage { extraLarge large } averageScore favourites popularity startDate { year month day } } } }`,
    manga: `query ($page: Int) { Page(page: $page, perPage: ${PER_PAGE}) { pageInfo { hasNextPage } media(type: MANGA, sort: SCORE_DESC) { id title { romaji english } coverImage { extraLarge large } averageScore favourites popularity startDate { year month day } } } }`,
    characters: `query ($page: Int) { Page(page: $page, perPage: ${PER_PAGE}) { pageInfo { hasNextPage } characters(sort: FAVOURITES_DESC) { id name { full native } image { large } favourites dateOfBirth { year month day } } } }`,
    people: `query ($page: Int) { Page(page: $page, perPage: ${PER_PAGE}) { pageInfo { hasNextPage } staff(sort: FAVOURITES_DESC) { id name { full native } image { large } favourites dateOfBirth { year month day } } } }`
};

function pad(n: number): string {
    return n < 10 ? `0${n}` : String(n);
}

function toBirthday(birth: any): Date {
    if (!birth || !birth.month || !birth.day) {
        return undefined;
    }
    // Year is unknown for many characters/staff; use 2000 as a sentinel
    // and let the renderer print month/day only.
    return new Date(birth.year || 2000, birth.month - 1, birth.day);
}

function mapItem(raw: any, type: TopType, page: number, index: number): Item {
    const rank = String((page - 1) * PER_PAGE + index + 1);
    const favorites = raw.favourites != null ? String(raw.favourites) : undefined;

    if (type === "manga" || type === "anime") {
        const title = raw.title ? (raw.title.romaji || raw.title.english || "Untitled") : "Untitled";
        const image = raw.coverImage ? (raw.coverImage.extraLarge || raw.coverImage.large) : undefined;
        const score = raw.averageScore != null ? (raw.averageScore / 10).toFixed(1) : undefined;
        const start =
            raw.startDate && raw.startDate.year
                ? (raw.startDate.month && raw.startDate.day
                    ? `${raw.startDate.year}-${pad(raw.startDate.month)}-${pad(raw.startDate.day)}`
                    : String(raw.startDate.year))
                : undefined;
        return {
            mal_id: String(raw.id),
            title,
            image_url: image,
            url: `https://anilist.co/${type}/${raw.id}`,
            rank,
            score,
            favorites,
            members: raw.popularity != null ? String(raw.popularity) : undefined,
            start_date: start,
            end_date: undefined,
            type,
            volumes: undefined,
            name_kanji: undefined,
            birthday: undefined
        };
    }

    const name = raw.name ? (raw.name.full || raw.name.native || "Unknown") : "Unknown";
    return {
        mal_id: String(raw.id),
        title: name,
        image_url: raw.image ? raw.image.large : undefined,
        url: `https://anilist.co/${type === "people" ? "staff" : "character"}/${raw.id}`,
        rank,
        score: undefined,
        favorites,
        members: undefined,
        start_date: undefined,
        end_date: undefined,
        type,
        volumes: undefined,
        name_kanji: raw.name ? raw.name.native : undefined,
        birthday: toBirthday(raw.dateOfBirth)
    };
}

export async function fetchTopPage(type: TopType, page: number, retries: number = MAX_RETRIES): Promise<TopPage> {
    try {
        const response: any = await axios.post(
            API,
            { query: QUERIES[type], variables: { page } },
            { headers: { "Content-Type": "application/json", "Accept": "application/json" }, timeout: TIMEOUT_MS }
        );
        const pageData = response.data && response.data.data && response.data.data.Page;
        if (!pageData) {
            throw new Error("Unexpected API response");
        }
        const listKey: string = type === "people" ? "staff" : type === "characters" ? "characters" : "media";
        const list = pageData[listKey] || [];
        const items: Item[] = list.map((raw: any, i: number) => mapItem(raw, type, page, i));
        return {
            items,
            hasNextPage: !!(pageData.pageInfo && pageData.pageInfo.hasNextPage)
        };
    } catch (err: any) {
        const status: number = err && err.response ? err.response.status : 0;
        const retriable = !status || status === 429 || status >= 500;
        if (retriable && retries > 0) {
            const retryAfter: number = parseInt((err.response && err.response.headers && err.response.headers["retry-after"]) || "", 10);
            const delay = isNaN(retryAfter) ? Math.min(1000 * Math.pow(2, MAX_RETRIES - retries + 1), 8000) : retryAfter * 1000;
            await sleep(delay);
            return fetchTopPage(type, page, retries - 1);
        }
        throw err;
    }
}
