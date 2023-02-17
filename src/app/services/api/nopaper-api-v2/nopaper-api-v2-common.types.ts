import { ExactlyOneKeyOf } from 'src/app/types/common';

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

/** Статус пакета документов. */
export enum DOCUMENT_STATUS {
  /** Черновик. */
  Draft = 1,
  /** В работе. */
  InProgress = 2,
  /** Подписан/согласован всеми участниками маршрута. */
  Complete = 3,
  /** Отозван отправителем. */
  Revoked = 4,
  /** Ошибка. */
  Error = 5,
  /** Отклонён одним из участников маршрута. */
  Rejected = 6,
}

/** Тип маршрута документа. */
export enum ROUTE_TYPE {
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
export type RecipientInfo = ExactlyOneKeyOf<RecipientDeterminant> & {
  /** Тип действия участника маршрута документа. По умолчанию - подписание ЮЛ. */
  actionType?: ACTION_TYPE;
  /** Тип подписания участника маршрута. По умолчанию - НЭП.*/
  signType?: SIGN_TYPE;
};
