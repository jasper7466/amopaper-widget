import { IPacketFilesInfo } from 'src/app/interfaces/packet-files-info.interface';
import { filesProcessedKey } from './index';
import { createAction, props } from '@ngrx/store';
import { IPacketFile } from 'src/app/interfaces/packet-file.interface';

export const setFilesIdentifiersAction = createAction(
    `[${filesProcessedKey}] set processed files identifiers action`,
    props<IPacketFilesInfo>()
);

export const setOriginalsFilesAction = createAction(
    `[${filesProcessedKey}] set original processed files action`,
    props<{ payload: IPacketFile[] }>()
);
