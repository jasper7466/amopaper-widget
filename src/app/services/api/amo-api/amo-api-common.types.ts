type TLinks = {
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

interface IEmbeddedItem {
  _links: TLinks;
}

interface IAmoBaseResponse<PayloadType> {
  _total_items: number;
  _page: number;
  _page_count: number;
  _links: TLinks;
  _embedded: PayloadType;
}
