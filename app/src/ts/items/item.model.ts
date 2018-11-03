// type and factory function to build initial state
export type Item = {
    end_date: string;
    image_url: string;
    mal_id: string;
    members: string;
    rank: string;
    score: string;
    start_date: string;
    title: string;
    type: string;
    url: string;
    volumes: string;
    favorites: string;
    name_kanji: string;
    birthday: Date;
}

export function createFilter({
    end_date = "",
    image_url = "",
    mal_id = "",
    members = "",
    rank = "",
    score = "",
    start_date = "",
    title = "",
    type = "",
    url = "",
    volumes = "",
    favorites = "",
    name_kanji = "",
    birthday = null
}: Partial<Item>) {
    return {
        end_date,
        image_url,
        mal_id,
        members,
        rank,
        score,
        start_date,
        title,
        type,
        url,
        volumes,
        favorites,
        name_kanji,
        birthday
    }
}