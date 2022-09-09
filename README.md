# AmopaperWidget

## Назначение

SPA-виджет для интеграции сервиса Nopaper в интерфейс amoCRM. Работает в паре с [обёрткой](https://github.com/jasper7466/Boilerplate-amoCRM-Widget)

## Режим разработки

- В директории `./auth-dev-server` скопировать и переименовать файл `example.secrets.json` -> `secrets.json`

- Заполнить параметры в соответствии с используемым амо-аккаунтом и приватной интеграцией:

  `accountDomain` - домен аккаунта

  `subdomain` - поддомен аккаунта

  `code` - временный ключ интеграции для получения первой пары токенов

  `x_api_key` - nopaper-api-key

  `client_id` - id интеграции

  `client_secret` - секрет интеграции

  `redirect_uri` - адрес для веб-хука о подключении интеграции

- В корне проекта скопировать и переименовать файл `example.proxy.config.json` -> `proxy.config.json`
- Заполнить параметр `target` в соответствии с используемым амо-аккаунтом

- Запустить локальный сервер авторизации:

        npm run auth-dev-server

- Запустить приложение:

        npm start
