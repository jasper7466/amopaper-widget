export const ADDRESSEE_KEY = 'addressee';

export type AddresseeType = 'phone' | 'vatId' | null;

export interface IAddresseeState {
  isExists: boolean | null;
  type: AddresseeType;
  name: string;
  vatId: string | null;
  phone: string | null;
}

export const initialState: IAddresseeState = {
  isExists: null,
  type: null,
  name: 'Получатель',
  vatId: null,
  phone: null,
};
