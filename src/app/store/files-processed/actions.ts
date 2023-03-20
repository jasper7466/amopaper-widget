import { IPacketFilesInfo } from 'src/app/interfaces/packet-files-info.interface';
import { FILES_PROCESSED_KEY } from './index';
import { createAction, props } from '@ngrx/store';
import { IPacketFile } from 'src/app/interfaces/packet-file.interface';

export const setFilesIdentifiersAction = createAction(
  `[${FILES_PROCESSED_KEY}] set processed files identifiers action`,
  props<IPacketFilesInfo>()
);

export const setOriginalsFilesAction = createAction(
  `[${FILES_PROCESSED_KEY}] set original processed files action`,
  props<{ payload: IPacketFile[] }>()
);
