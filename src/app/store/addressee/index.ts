import { IAddresseeExistence } from 'src/app/interfaces/addressee-existence.interface';
import {
  ADDRESSEE_ID_TYPE,
  IAddressee,
} from 'src/app/interfaces/addressee.interface';

export const ADDRESSEE_KEY = 'addressee';

export interface IAddresseeState extends IAddressee, IAddresseeExistence {
  isChecked: boolean;
  isSubmitted: boolean;
}

export const initialState: IAddresseeState = {
  name: 'Получатель',
  idType: ADDRESSEE_ID_TYPE.Phone,
  idValue: '',
  isChecked: false,
  isExists: false,
  isSubmitted: false,
};
