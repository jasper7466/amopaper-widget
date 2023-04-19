import { PostMessageTransportService } from './../../transport/post-message-transport.service';
import { PostMessageXhr } from './../../../classes/post-message-xhr';
import { NgModule, InjectionToken, EnvironmentInjector } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    HTTP_INTERCEPTORS,
    HttpClient,
    HttpXhrBackend,
    ɵHttpInterceptorHandler,
} from '@angular/common/http';
import { HttpErrorHandlingInterceptor } from 'src/app/interceptors/http-error-handling.interceptor';
import { environment } from 'src/environments/environment';

export const postMessageHttpClientToken = new InjectionToken<HttpClient>(
    'POST MESSAGE HTTP CLIENT TOKEN',
);

/**
 * Использование модифицированного http-клиента обусловлено невозможностью
 * выполнения прямых http-запросов к amoCRM-API из SPA-виджета на клиенте с
 * другого источника (блокируются политиками CORS).
 *
 * Одно из изначальных требований: реализовать всё по-максимуму на клиенте, без
 * необходимости делать дополнительный backend.
 *
 * Единственный видимый лайфхак - делегировать http-запросы виджету-обёртке,
 * который живёт на своём домашнем домене и не подвержен блокировке CORS.
 *
 * В данном случае подменяется xhr-фабрика, которая отдаёт вместо нативного
 * браузерного объекта XMLHttpRequest - модифицированный. Он в достаточной
 * степени эмулирует функционал нативного объекта, но сетевого запроса не делает.
 * Вместо этого происходит postMessage-запрос к виджету-обёртке в определённом формате.
 *
 * Виджет-обёртка обрабатывает эти сообщения, формирует и выполняет сетевые запросы.
 * Обратными сообщениями возвращается тело ответа/ошибки, прогресс выполнения запроса
 * и прочий контекст.
 *
 * Для клиентского кода такая подмена выглядит незаметной, можно писать методы запросов
 * к API как обычно. Интерцепторы тоже срабатывают.
 */
const postMessageHttpClientFactory = (
    transport: PostMessageTransportService,
    injector: EnvironmentInjector,
    regularHttpClient: HttpClient,
): HttpClient => {
    if (environment.isAmoDevProxy) {
        return regularHttpClient;
    }

    const backend = new HttpXhrBackend({
        build: () => new PostMessageXhr(transport),
    });

    const handler = new ɵHttpInterceptorHandler(backend, injector);

    return new HttpClient(handler);
};

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorHandlingInterceptor,
            multi: true,
        },
        {
            provide: postMessageHttpClientToken,
            useFactory: postMessageHttpClientFactory,
            deps: [
                PostMessageTransportService,
                EnvironmentInjector,
                HttpClient,
            ],
        },
    ],
})
export class AmoApiModule {}
