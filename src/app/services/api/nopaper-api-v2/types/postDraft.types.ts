import { ExactlyOneKeyOf, NonEmptyArray } from 'src/app/types/common';

/** Элемент списка файлов пакета документов. */
type FileInfo = {
  /** Имя файла с расширением. */
  fileNameWithExtension: string;
  /** Файл в формате base64. */
  fileBase64: string;
};

/** Тип действия участника маршрута документа. */
enum ACTION_TYPE {
  /** Не назначено. */
  Undefined = 0,
  /** Подписание от имени ФЛ. */
  SignIndividual = 1,
  /** Согласование. */
  Approval = 4,
  /** Подписание от имени ЮЛ. */
  SignCompany = 9,
}

/** Тип подписания участника маршрута. */
enum SIGN_TYPE {
  /** Простая электронная подпись (ПЭП). */
  Simple,
  /** Неквалифицированная электронная подпись (НЭП). */
  Unqualified,
  /** Квалифицированная электронная подпись (КЭП). */
  Qualified,
}

/** Тип маршрута документа. */
enum ROUTE_TYPE {
  /** Последовательный. */
  Serial = 1,
  /** Параллельный. */
  Parallel = 2,
}

/** Определитель участника маршрута */
type RecipientDeterminant = {
  /** Номер телефона ФЛ-участника маршрута. */
  userPhone: string;
  /** ИНН ЮЛ/ИП-участника маршрута. */
  companyInn: string;
  /** КПП ЮЛ-участника маршрута. */
  companyKpp: string;
};

/** Элемент списка участников маршрута пакета документов. */
type RecipientInfo = ExactlyOneKeyOf<RecipientDeterminant> & {
  /** Тип действия участника маршрута документа. По умолчанию - подписание ЮЛ. */
  actionType?: ACTION_TYPE;
  /** Тип подписания участника маршрута. По умолчанию - НЭП.*/
  signType?: SIGN_TYPE;
};

/** Тело запроса на создание пакета документов. */
export interface IPostDraftRequest {
  /** Заголовок пакета документов. */
  title?: string;
  /** Идентификатор пользователя-отправителя документа. Пользователь должен являться сотрудником компании. */
  userGuid?: string;
  /** Массив объектов файлов. */
  fileInfoList: FileInfo[];
  /** Массив объектов участников маршрута (непустой). */
  recipientInfoList: NonEmptyArray<RecipientInfo>;
  /** Тип маршрута документа */
  documentRouteType: ROUTE_TYPE;
}

export interface IPostDraftResponse {
  documentId: number;
}
