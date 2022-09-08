export const WIDGET_CONTEXT_KEY = 'widgetContext';

export interface IAddresseeState {
  isAdded: boolean;
  isExists: boolean;
  name: string;
  vatId: string | null;
  phone: string | null;
}

export const initialState: IAddresseeState = {
  isAdded: false,
  isExists: false,
  name: 'Получатель',
  vatId: null,
  phone: null,
};
