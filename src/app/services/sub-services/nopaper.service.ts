import { IFileInfo } from './../../store/signatures/index';
import {
  IFilesIdentifiersProps,
  IDecodedFilesProps,
  setOriginalFilesAction,
  IFileSignaturesProps,
} from './../../store/signatures/actions';
import { INewPacketData } from './../../store/interfaces';
import {
  INewPacketIdProps,
  IShareLinkProps,
  setNewPacketIdAction,
} from './../../store/misc/actions';
import {
  IPacketDetailsProps,
  IPacketStatusProps,
} from './../../store/packets/actions';
import { IGetAmoAccessTokenResponse } from './../api/access-token-api/access-token-api.types';
import { setPacketDetailsAction } from '../../store/packets/actions';
import { updateAccessTokenAction } from '../../store/access-token/actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  filter,
  Observable,
  Subject,
  switchMap,
  take,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { addresseeSelector } from '../../store/addressee/selectors';
import { sourceFilesSelector } from '../../store/files-source/selectors';
import { newPacketTitleSelector } from '../../store/misc/selectors';
import { setPacketStatusAction } from '../../store/packets/actions';
import {
  setFilesIdentifiersAction,
  setSignaturesAction,
} from '../../store/signatures/actions';
import { NopaperApiService } from '../api/nopaper-api/nopaper-api.service';
import { AccessTokenApiService } from '../api/access-token-api/access-token-api.service';
import { setShareLinkAction } from 'src/app/store/misc/actions';

const POLLING_INTERVAL_MS = 3000;

@Injectable()
export class NopaperService {
  private packetPollingBreakerById = new Subject<number>();
  private packetPollingBreakerAll = new Subject<void>();

  private newPacketDataObservables: {
    [K in keyof INewPacketData]: Observable<INewPacketData[K]>;
  } = {
    addressee: this.store.select(addresseeSelector),
    files: this.store.select(sourceFilesSelector),
    title: this.store.select(newPacketTitleSelector),
  };

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
  public postPacket(): Observable<INewPacketIdProps> {
    return combineLatest(this.newPacketDataObservables).pipe(
      take(1),
      switchMap((data) => this.nopaperApiService.postPacket(data)),
      take(1),
      tap((response) => this.store.dispatch(setNewPacketIdAction(response)))
    );
  }

  /**
   * Подтверждает черновик пакета документов.
   * Используется для пакетов со статусом `new`.
   *
   * Переводит пакет в статус `nopaperPrepareFiles`.
   * @param packetId Идентификатор пакета документов.
   * @returns
   */
  public submitDraft(packetId: number): Observable<void> {
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
  public submitPreview(packetId: number): Observable<void> {
    return this.nopaperApiService.setPacketStepName(
      packetId,
      'nopaperSenderSign'
    );
  }

  /**
   * Удаляет пакет документов.
   * Используется для пакетов со статусами `new`, `nopaperPreviewBeforeOferta`,
   * `nopaperPreview`, `nopaperSenderCancel`, `nopaperSenderCancelEnd`.
   *
   * Переводит пакет в статус `nopaperSenderSign`.
   * @param packetId Идентификатор пакета документов.
   * @returns
   */
  public deletePacket(packetId: number): Observable<void> {
    return this.nopaperApiService.setPacketStepName(packetId, 'nopaperDelete');
  }

  /**
   * Отзывает пакет документов.
   * Используется для пакетов со статусами `nopaperReceiverPreviewBeforeOferta`,
   * `nopaperReceiverPreview`, `nopaperOfertaReceiverPreview`.
   *
   * Переводит пакет в статус `nopaperSenderCancel`.
   * @param packetId Идентификатор пакета документов.
   * @returns
   */
  public revokePacket(packetId: number): Observable<void> {
    return this.nopaperApiService.setPacketStepName(
      packetId,
      'nopaperSenderCancel'
    );
  }

  /**
   * Получает текущий статус пакета документов.
   * Используется для пакетов с любым статусом.
   *
   * Результат сохраняется в хранилище.
   * @param packetId Идентификатор пакета документов.
   * @returns
   */
  public getPacketStepName(packetId: number): Observable<IPacketStatusProps> {
    return this.nopaperApiService
      .getPacketStepName(packetId)
      .pipe(
        tap((response) => this.store.dispatch(setPacketStatusAction(response)))
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
  public getPacketDetails(packetId: number): Observable<IPacketDetailsProps> {
    return this.nopaperApiService
      .getPacketDetails(packetId)
      .pipe(
        tap((response) => this.store.dispatch(setPacketDetailsAction(response)))
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
  public getPacketFilesIds(
    packetId: number
  ): Observable<IFilesIdentifiersProps> {
    return this.nopaperApiService
      .getPacketFilesIds(packetId)
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
  public getFilesByIds(filesIds: IFileInfo[]): Observable<IDecodedFilesProps> {
    return this.nopaperApiService
      .getFilesByIds(filesIds)
      .pipe(
        tap((response) => this.store.dispatch(setOriginalFilesAction(response)))
      );
  }

  /**
   * Получает подписи к файлу по его идентификатору.
   *
   * Результат сохраняется в хранилище.
   * @param fileId Идентификатор файла.
   * @returns
   */
  public getFileSignature(fileId: IFileInfo): Observable<IFileSignaturesProps> {
    return this.nopaperApiService
      .getFileSignatures(fileId)
      .pipe(
        tap((response) => this.store.dispatch(setSignaturesAction(response)))
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
   * Получает подписи к файлу по его идентификатору.
   *
   * Результат сохраняется в хранилище.
   * @param fileId Идентификатор файла.
   * @returns
   */

  /**
   *
   */
  public getShareLink(packetId: number): Observable<IShareLinkProps> {
    return this.nopaperApiService.getShareLink(packetId).pipe(
      tap((response) => {
        this.store.dispatch(setShareLinkAction(response));
      })
    );
  }
}
