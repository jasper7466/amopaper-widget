import { notification } from './../services/notification.service';

export const notifications: { [key: string]: notification } = {
  getCrmContextTimeoutError: {
    type: 'error',
    title: 'Ошибка получения параметров CRM-системы',
    details: 'Истёк таймаут ожидания ответа',
    hint: 'Попробуйте перезагрузить страницу. При повторном возникновении ошибки - обратитесь в техническую поддержку интеграции',
  },
  widgetNotConfiguredAdmin: {
    type: 'info',
    title: 'Виджет не сконфигурирован',
    details: 'Процедура конфигурации виджета не завершена',
    hint: `В аккаунте администратора: \n
    - зайдите в магазин интеграций \n
    - откройте параметры интеграции \n
    - введите недостающие данные \n
    - нажмите на кнопку "Сохранить"`,
  },
  widgetNotConfiguredUser: {
    type: 'info',
    title: 'Виджет не сконфигурирован',
    details: 'Процедура конфигурации виджета не завершена',
    hint: 'Обратитесь к администратору аккаунта',
  },
  nopaperApiRequestFailed: {
    type: 'error',
    title: 'Ошибка nopaper-api',
    details: '',
    hint: '',
  },
};
