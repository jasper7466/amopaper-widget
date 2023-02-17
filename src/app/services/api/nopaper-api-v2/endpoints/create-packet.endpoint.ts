import { RecipientInfo, ROUTE_TYPE } from './../nopaper-api-v2-common.types';
import { Observable, map } from 'rxjs';
import { INewPacketIdProps } from './../../../../store/misc/actions';
import { ApiService } from './../../api.service';
import { INewPacketData } from './../../../../store/interfaces';
import { NonEmptyArray, isNonEmptyArray } from 'src/app/types/common';

/** Элемент списка файлов пакета документов. */
type FileInfo = {
  /** Имя файла с расширением. */
  fileNameWithExtension: string;
  /** Файл в формате base64. */
  fileBase64: string;
};

/** Тело запроса на создание пакета документов. */
export interface IPostDraftRequest {
  /** Заголовок пакета документов. */
  title?: string;
  /** Идентификатор пользователя-отправителя документа. Пользователь должен являться сотрудником компании. */
  userGuid?: string;
  /** Массив объектов файлов. */
  fileInfoList: NonEmptyArray<FileInfo>;
  /** Массив объектов участников маршрута (непустой). */
  recipientInfoList: NonEmptyArray<RecipientInfo>;
  /** Тип маршрута документа */
  documentRouteType?: ROUTE_TYPE;
}

export interface IPostDraftResponse {
  documentId: number;
}

const requestAdapter = (data: INewPacketData): IPostDraftRequest | never => {
  const { addressee, files, title } = data;

  const fileInfoList: FileInfo[] = files.map((item) => ({
    fileNameWithExtension: item.file.name,
    fileBase64: item.base64,
  }));

  if (!isNonEmptyArray(fileInfoList)) {
    throw new Error('Empty files list');
  }

  let recipientInfo: RecipientInfo;

  switch (data.addressee.type) {
    case 'phone': {
      if (addressee.phone) {
        recipientInfo = { userPhone: addressee.phone };
      } else {
        throw new Error('Phone is not defined');
      }
      break;
    }
    case 'vatId':
      {
        if (addressee.vatId) {
          recipientInfo = { companyInn: addressee.vatId };
        } else {
          throw new Error('VatId is not defined');
        }
      }
      break;
    default:
      throw new Error('Addressee is not defined');
  }

  return {
    title,
    fileInfoList,
    recipientInfoList: [recipientInfo],
  };
};

const responseAdapter = (response: IPostDraftResponse): INewPacketIdProps => ({
  packetId: response.documentId,
});

export function createPacketEndpoint(
  this: ApiService,
  data: INewPacketData
): Observable<INewPacketIdProps> {
  return this.post<IPostDraftRequest, IPostDraftResponse>(
    'external/document',
    requestAdapter(data)
  ).pipe(map(responseAdapter));
}
