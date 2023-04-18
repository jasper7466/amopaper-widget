import { IFileSignatures } from 'src/app/interfaces/file-signatures.interface';
import { signaturesKey } from './index';
import { createAction, props } from '@ngrx/store';

export const setSignaturesAction = createAction(
    `[${signaturesKey}] set signatures list`,
    props<IFileSignatures>(),
);

export const clearSignaturesAction = createAction(
    `[${signaturesKey}] clear signatures action`,
);
