import { IGetAmoAccessTokenResponse } from './../api/access-token-api/access-token-api.types';
import {
  IPostStepNameResponse,
  IGetFileSignatureResponse,
  IGetPacketDetailsResponse,
} from './../api/nopaper-api/nopaper-api.types';
import { setPacketDetailsAction } from '../../store/packets/actions';
import { updateAccessTokenAction } from '../../store/access-token/actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  filter,
  first,
  map,
  Observable,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { addresseeSelector } from '../../store/addressee/selectors';
import { filesSelector } from '../../store/files/selectors';
import { packetTitleSelector } from '../../store/misc/selectors';
import { setPacketStepAction } from '../../store/packets/actions';
import {
  setRawFilesAction,
  setFilesIdentifiersAction,
  setFileSignatureAction,
} from '../../store/signatures/actions';
import { NopaperApiService } from '../api/nopaper-api/nopaper-api.service';
import {
  IGetFilesByIdsResponse,
  IGetFilesIdsResponse,
  IGetStepNameResponse,
  IPostDraftRequest,
  PostDraftRequestFileItem,
} from '../api/nopaper-api/nopaper-api.types';
import { filesIdentifiersSelector } from '../../store/signatures/selectors';
import { AccessTokenApiService } from '../api/access-token-api/access-token-api.service';

const POLLING_INTERVAL_MS = 3000;

@Injectable()
export class NopaperService {
  private packetPollingBreakerById = new Subject<number>();
  private packetPollingBreakerAll = new Subject<void>();

  private addressee$ = this.store.select(addresseeSelector);
  private uploadedFiles$ = this.store.select(filesSelector);
  private packetTitle$ = this.store.select(packetTitleSelector);

  constructor(
    private store: Store,
    private nopaperApiService: NopaperApiService,
    private accessTokenApiService: AccessTokenApiService
  ) {}

  /**
   * Получает токен доступа для amoCRM.
   *
   * Результат сохраняется в хранилище.
   * @returns
   */
  public getAmoAccessToken(): Observable<IGetAmoAccessTokenResponse> {
    return this.accessTokenApiService
      .getAmoAccessToken()
      .pipe(
        tap(({ accessToken }) =>
          this.store.dispatch(updateAccessTokenAction({ token: accessToken }))
        )
      );
  }

  /**
   * Создаёт черновик пакета документов.
   * @returns
   */
  public postPacket(): Observable<number> {
    const packetBody = this.composePostDraftRequestBody();

    return this.nopaperApiService
      .postPacket(packetBody)
      .pipe(map((response) => parseInt(response.documentId)));
  }

  /**
   * Подтверждает черновик пакета документов.
   * Используется для пакетов со статусом `new`.
   *
   * Переводит пакет в статус `nopaperPrepareFiles`.
   * @param packetId Идентификатор пакета документов.
   * @returns
   */
  public submitDraft(packetId: number): Observable<IPostStepNameResponse> {
    return this.nopaperApiService.setPacketStepName(
      packetId,
      'nopaperPrepareFiles'
    );
  }

  /**
   * Отправляет пакет документов для подписи отправителем.
   * Используется для пакетов со статусами `nopaperPreview`, `nopaperPreviewBeforeOferta`,
   * `nopaperOfertaSenderPreview`.
   *
   * Переводит пакет в статус `nopaperSenderSign`.
   * @param packetId Идентификатор пакета документов.
   * @returns
   */
  public submitPreview(packetId: number): Observable<IPostStepNameResponse> {
    return this.nopaperApiService.setPacketStepName(
      packetId,
      'nopaperSenderSign'
    );
  }

  /**
   * Удаляет пакет документов.
   * Используется для пакетов со статусами `new`, `nopaperPreviewBeforeOferta`,
   * `nopaperPreview`, `nopaperSenderCancel`, `nopaperSenderCancelEnd`.
   * Переводит пакет в статус `nopaperSenderSign`.
   * @param packetId Идентификатор пакета документов.
   * @returns
   */
  public deletePacket(packetId: number): Observable<IPostStepNameResponse> {
    return this.nopaperApiService.setPacketStepName(packetId, 'nopaperDelete');
  }

  /**
   * Получает текущий статус пакета документов.
   * Используется для пакетов с любым статусом.
   *
   * Результат сохраняется в хранилище.
   * @param packetId Идентификатор пакета документов.
   * @returns
   */
  private getPacketStepName(
    packetId: number
  ): Observable<IGetStepNameResponse> {
    return this.nopaperApiService
      .getPacketStepName(packetId)
      .pipe(
        tap((response) =>
          this.store.dispatch(setPacketStepAction({ ...response, packetId }))
        )
      );
  }

  /**
   * Получает дополнительную информацию о пакете документов.
   * Используется для пакетов с любым статусом.
   *
   * Результат сохраняется в хранилище.
   * @param packetId
   * @returns
   */
  public getPacketDetails(
    packetId: number
  ): Observable<IGetPacketDetailsResponse> {
    return this.nopaperApiService.getPacketDetails(packetId).pipe(
      tap((response) =>
        this.store.dispatch(
          setPacketDetailsAction({
            packetId: packetId,
            title: response.title,
            creationDate: response.dateCreate,
          })
        )
      )
    );
  }

  /**
   * Получает идентификаторы файлов в пакете документов,
   * которые доступны для текущего статуса этого пакета.
   *
   * Результат сохраняется в хранилище.
   * @param packetId Идентификатор пакета документов.
   * @returns
   */
  public getPacketFilesIds(packetId: number): Observable<IGetFilesIdsResponse> {
    return this.nopaperApiService
      .getFilesIdentifiers(packetId)
      .pipe(
        tap((response) =>
          this.store.dispatch(setFilesIdentifiersAction(response))
        )
      );
  }

  /**
   * Получает файлы по их идентификаторам.
   *
   * Результат сохраняется в хранилище.
   * @param filesIds Массив идентификаторов файлов.
   * @returns
   */
  public getFilesByIds(filesIds: number[]): Observable<IGetFilesByIdsResponse> {
    return this.nopaperApiService
      .getFilesByIds(filesIds)
      .pipe(
        tap((response) =>
          this.store.dispatch(setRawFilesAction({ payload: response }))
        )
      );
  }

  /**
   * Получает подписи к файлу по его идентификатору.
   *
   * Результат сохраняется в хранилище.
   * @param fileId Идентификатор файла.
   * @returns
   */
  public getFileSignature(
    fileId: number
  ): Observable<IGetFileSignatureResponse> {
    return this.nopaperApiService
      .getFileSignatures(fileId)
      .pipe(
        tap((response) => this.store.dispatch(setFileSignatureAction(response)))
      );
  }

  /**
   * Запускает поллинг информации о пакете документов.
   * @param packetId Идентификатор пакета документов.
   */
  public startPacketPolling(packetId: number): void {
    this.stopPacketPolling(packetId);
    timer(1, POLLING_INTERVAL_MS)
      .pipe(
        tap(() => {
          this.getPacketStepName(packetId).subscribe();
          this.getPacketDetails(packetId).subscribe();
        }),
        takeUntil(
          this.packetPollingBreakerById.pipe(filter((id) => id === packetId))
        ),
        takeUntil(this.packetPollingBreakerAll)
      )
      .subscribe();
  }

  /**
   * Останавливает поллинг информации о пакете документов.
   * @param packetId Идентификатор пакета документов.
   */
  public stopPacketPolling(packetId: number): void {
    this.packetPollingBreakerById.next(packetId);
  }

  /**
   * Останавливает все поллинги пакетов, которые были запущены.
   */
  public stopPacketsStepPollingAll(): void {
    this.packetPollingBreakerAll.next();
  }

  /**
   * Формирует тело запроса на создание пакета документов.
   * @returns
   */
  private composePostDraftRequestBody(): IPostDraftRequest {
    let contact = {};
    let files: PostDraftRequestFileItem[] = [];
    let title = '';

    this.addressee$
      .pipe(
        first(),
        map((addressee) => {
          switch (addressee.type) {
            case 'phone':
              return { clientFlPhoneNumber: addressee.phone };
            case 'vatId':
              return { clientUlInn: addressee.vatId };
            default:
              throw new Error('Addressee is not defined');
          }
        })
      )
      .subscribe((result) => (contact = result));

    this.uploadedFiles$
      .pipe(
        first(),
        map((files) =>
          files.map((file) => ({
            fileName: file.file.name,
            filebase64: file.base64,
          }))
        )
      )
      .subscribe((result) => (files = result));

    this.packetTitle$.pipe(first()).subscribe((value) => (title = value));

    return {
      title: title,
      files: files,
      ...contact,
    };
  }
}
