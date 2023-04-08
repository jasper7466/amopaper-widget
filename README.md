# AmopaperWidget

## Назначение

---

SPA-виджет для интеграции сервиса Nopaper в интерфейс amoCRM. Работает в паре с [обёрткой](https://github.com/jasper7466/Boilerplate-amoCRM-Widget)

## Развёртывание

---

- Установить зависимости:

        npm install

- В директорию `local_modules` поместить исходники пакета `pdf-previewer`
- Установить недостающую зависимость `ng2-pdf-viewer` для локального `pdf-previewer`

        npm install --no-save ng2-pdf-viewer

- Запуск:

        npm start

## Использование прокси

---

Зачем это нужно - [описано тут](./docs/why-use-proxy.doc.md)

- В корне проекта скопировать и переименовать файл `example.proxy.config.json` -> `proxy.config.json`
- Заполнить параметр `target` в соответствии с используемым амо-аккаунтом
- Переменную окружения `isAmoDevProxy` установить в значение `true`
- Для запуска использовать команду

        npm run start-with-proxy

## Использование локального сервера авторизации

---

- Выполнить настройку, как [описано тут](./docs/auth-dev-server.doc.md)
- Переменную окружения `isLocalTokenServer` установить в значение `true`

## Линтинг

---

Некоторые кастомные правила расположены в директории `./eslint-custom-rules`, поэтому для ручного запуска линтера следует использовать вместо `ng lint` команду:

        npm run lint

Или же к `ng lint` добавить флаг `--rulesdir ./eslint-custom-rules`:

        ng lint --rulesdir ./eslint-custom-rules
