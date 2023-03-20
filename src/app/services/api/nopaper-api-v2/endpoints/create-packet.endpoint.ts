import { TRecipientInfo, ROUTE_TYPE } from './../nopaper-api-v2-common.types';
import { Observable, map } from 'rxjs';
import { ApiService } from './../../api.service';
import { NonEmptyArray, isNonEmptyArray } from 'src/app/types/common';
import { IPacketCreateData } from 'src/app/interfaces/packet-create-data.interface';
import { ADDRESSEE_ID_TYPE } from 'src/app/interfaces/addressee.interface';
import { IPacketDetails } from 'src/app/interfaces/packet-details.interface';

/** Элемент списка файлов пакета документов. */
type FileInfo = {
  /** Имя файла с расширением. */
  fileNameWithExtension: string;
  /** Файл в формате base64. */
  fileBase64: string;
};

/** Тело запроса на создание пакета документов. */
interface IPostDraftRequest {
  /** Заголовок пакета документов. */
  title?: string;
  /** Идентификатор пользователя-отправителя документа. Пользователь должен являться сотрудником компании. */
  userGuid?: string;
  /** Массив объектов файлов. */
  fileInfoList: NonEmptyArray<FileInfo>;
  /** Массив объектов участников маршрута (непустой). */
  recipientInfoList: NonEmptyArray<TRecipientInfo>;
  /** Тип маршрута документа */
  documentRouteType?: ROUTE_TYPE;
}

interface IPostDraftResponse {
  documentId: number;
}

const requestAdapter = (data: IPacketCreateData): IPostDraftRequest | never => {
  const { addressee, files, title } = data;

  const fileInfoList: FileInfo[] = files.map((item) => ({
    fileNameWithExtension: item.name,
    fileBase64: item.base64,
  }));

  if (!isNonEmptyArray(fileInfoList)) {
    throw new Error('Empty files list');
  }

  let recipientInfo: TRecipientInfo;

  switch (data.addressee.idType) {
    case ADDRESSEE_ID_TYPE.Phone: {
      recipientInfo = { userPhone: addressee.idValue };
      break;
    }
    case ADDRESSEE_ID_TYPE.VatId: {
      recipientInfo = { companyInn: addressee.idValue };
      break;
    }
    default:
      throw new Error('Unexpected addressee id type.');
  }

  return {
    title,
    fileInfoList,
    recipientInfoList: [recipientInfo],
  };
};

const responseAdapter = (
  response: IPostDraftResponse
): Pick<IPacketDetails, 'id'> => ({
  id: response.documentId,
});

export function createPacketEndpoint(
  this: ApiService,
  data: IPacketCreateData
): Observable<Pick<IPacketDetails, 'id'>> {
  return this.post<IPostDraftRequest, IPostDraftResponse>(
    '/document',
    requestAdapter(data)
  ).pipe(map(responseAdapter));
}
