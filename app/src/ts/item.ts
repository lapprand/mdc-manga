export interface Item {
    label: string;
    name: string;
    fileSize: string;
    leechers: string;
    seeders: string;
    nbDownload: string;
    timestamp: string;
    links: {
        file: string,
        magnet: string,
        page: string
    }
}