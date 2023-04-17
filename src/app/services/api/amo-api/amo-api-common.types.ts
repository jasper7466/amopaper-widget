export type TLinks = {
    self: {
        href: string;
    };
    next?: {
        href: string;
    };
    last?: {
        href: string;
    };
};

export interface IEmbeddedItem {
    _links: TLinks;
}

export interface IAmoBaseResponse<PayloadType> {
    _total_items: number;
    _page: number;
    _page_count: number;
    _links: TLinks;
    _embedded: PayloadType;
}
