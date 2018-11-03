// type and factory function to build initial state
export type Filter = {
    itemType: string;
}

export function createFilter({
    itemType = ""
}: Partial<Filter>) {
    return {
        itemType
    }
}