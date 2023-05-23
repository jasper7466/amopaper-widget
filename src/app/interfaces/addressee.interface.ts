export enum ADDRESSEE_ID_TYPE {
    Phone = 0,
    VatId = 1,
}

export interface IAddressee {
    idType: ADDRESSEE_ID_TYPE;
    idValue: string;
    name: string;
}
