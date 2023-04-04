import { setNewPacketIdAction } from './../../store/misc/actions';
import { setPacketDetailsAction } from '../../store/packets/actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  filter,
  Observable,
  of,
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
import { setSignaturesAction } from '../../store/signatures/actions';
import { NopaperApiService } from '../api/nopaper-api/nopaper-api.service';
import { setShareLinkAction } from 'src/app/store/misc/actions';
import {
  setFilesIdentifiersAction,
  setOriginalsFilesAction,
} from 'src/app/store/files-processed/actions';
import { IPacketFilesInfo } from 'src/app/interfaces/packet-files-info.interface';
import { IFileInfo } from 'src/app/interfaces/file-info.interface';
import { IPacketCreateData } from 'src/app/interfaces/packet-create-data.interface';
import { IFileSignatures } from 'src/app/interfaces/file-signatures.interface';
import { IPacketDetails } from 'src/app/interfaces/packet-details.interface';
import { IShareLink } from 'src/app/interfaces/share-link.interface';
import { NopaperApiV2Service } from '../api/nopaper-api-v2/nopaper-api-v2.service';

const POLLING_INTERVAL_MS = 3000;

@Injectable()
export class NopaperService {
  private _packetPollingBreakerById = new Subject<number>();
  private _packetPollingBreakerAll = new Subject<void>();

  private _newPacketDataObservables: {
    [K in keyof IPacketCreateData]: Observable<IPacketCreateData[K]>;
  } = {
    addressee: this._store.select(addresseeSelector),
    files: this._store.select(sourceFilesSelector),
    title: this._store.select(newPacketTitleSelector),
  };

  constructor(
    private _store: Store,
    private _nopaperApiService: NopaperApiService,
    private _nopaperApiV2Service: NopaperApiV2Service
  ) {}

  /**
   * Создаёт черновик пакета документов.
   */
  public postPacket(): Observable<Pick<IPacketDetails, 'id'>> {
    return combineLatest(this._newPacketDataObservables).pipe(
      take(1),
      switchMap((data) => this._nopaperApiService.postPacket(data)),
      take(1),
      tap((response) => this._store.dispatch(setNewPacketIdAction(response)))
    );
  }

  /**
   * Подтверждает черновик пакета документов.
   * Используется для пакетов со статусом `new`.
   *
   * Переводит пакет в статус `nopaperPrepareFiles`.
   * @param packetId Идентификатор пакета документов.
   */
  public submitDraft(packetId: number): Observable<void> {
    return this._nopaperApiService.setPacketStepName(
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
   * @deprecated
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public submitPreview(packetId: number): Observable<void> {
    throw new Error('submitPreview() method is deprecated');
    // return this.nopaperApiService.setPacketStepName(
    //   packetId,
    //   'nopaperSenderSign'
    // );
  }

  /**
   * Удаляет пакет документов.
   * Используется для пакетов со статусами `new`, `nopaperPreviewBeforeOferta`,
   * `nopaperPreview`, `nopaperSenderCancel`, `nopaperSenderCancelEnd`.
   *
   * Переводит пакет в статус `nopaperSenderSign`.
   * @param packetId Идентификатор пакета документов.
   * @deprecated
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public deletePacket(packetId: number): Observable<void> {
    throw new Error('deletePacket() method is deprecated');
    // return this.nopaperApiService.setPacketStepName(packetId, 'nopaperDelete');
  }

  /**
   * Отзывает пакет документов.
   * Используется для пакетов со статусами `nopaperReceiverPreviewBeforeOferta`,
   * `nopaperReceiverPreview`, `nopaperOfertaReceiverPreview`.
   *
   * Переводит пакет в статус `nopaperSenderCancel`.
   * @param packetId Идентификатор пакета документов.
   */
  public revokePacket(packetId: number): Observable<void> {
    return this._nopaperApiV2Service.revokePacket(packetId);
  }

  /**
   * Получает текущий статус пакета документов.
   * Используется для пакетов с любым статусом.
   *
   * Результат сохраняется в хранилище.
   * @param packetId Идентификатор пакета документов.
   */
  public getPacketStepName(
    packetId: number
  ): Observable<Pick<IPacketDetails, 'id' | 'status'>> {
    return this._nopaperApiService
      .getPacketStepName(packetId)
      .pipe(
        tap((response) => this._store.dispatch(setPacketStatusAction(response)))
      );
  }

  /**
   * Получает дополнительную информацию о пакете документов.
   * Используется для пакетов с любым статусом.
   *
   * Результат сохраняется в хранилище.
   * @param packetId
   */
  public getPacketDetails(
    packetId: number
  ): Observable<Omit<IPacketDetails, 'status'>> {
    return this._nopaperApiV2Service
      .getPacketDetails(packetId)
      .pipe(
        tap((response) =>
          this._store.dispatch(setPacketDetailsAction(response))
        )
      );
  }

  /**
   * Получает идентификаторы файлов в пакете документов,
   * которые доступны для текущего статуса этого пакета.
   *
   * Результат сохраняется в хранилище.
   * @param packetId Идентификатор пакета документов.
   */
  public getPacketFilesIds(packetId: number): Observable<IPacketFilesInfo> {
    return this._nopaperApiService
      .getPacketFilesIds(packetId)
      .pipe(
        tap((response) =>
          this._store.dispatch(setFilesIdentifiersAction(response))
        )
      );
  }

  /**
   * Получает файлы по их идентификаторам.
   *
   * Результат сохраняется в хранилище.
   * @param filesIds Массив идентификаторов файлов.
   */
  public getFilesByIds(filesIds: number[]): Observable<void> {
    return this._nopaperApiService.getFilesByIds(filesIds).pipe(
      tap((response) =>
        this._store.dispatch(setOriginalsFilesAction({ payload: response }))
      ),
      switchMap(() => of(void 0))
    );
  }

  /**
   * Получает подписи к файлу по его идентификатору.
   *
   * Результат сохраняется в хранилище.
   * @param fileInfo Идентификатор файла.
   */
  public getFileSignature(
    fileInfo: Pick<IFileInfo, 'id'>
  ): Observable<IFileSignatures> {
    return this._nopaperApiService
      .getFileSignatures(fileInfo)
      .pipe(
        tap((response) => this._store.dispatch(setSignaturesAction(response)))
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
          this.getPacketStepName(packetId).pipe(take(1)).subscribe();
          this.getPacketDetails(packetId).pipe(take(1)).subscribe();
        }),
        takeUntil(
          this._packetPollingBreakerById.pipe(filter((id) => id === packetId))
        ),
        takeUntil(this._packetPollingBreakerAll)
      )
      .subscribe();
  }

  /**
   * Останавливает поллинг информации о пакете документов.
   * @param packetId Идентификатор пакета документов.
   */
  public stopPacketPolling(packetId: number): void {
    this._packetPollingBreakerById.next(packetId);
  }

  /**
   * Останавливает все поллинги пакетов, которые были запущены.
   */
  public stopPacketsStepPollingAll(): void {
    this._packetPollingBreakerAll.next();
  }

  /**
   * Получает подписи к файлу по его идентификатору.
   *
   * Результат сохраняется в хранилище.
   * @param fileId Идентификатор файла.
   */

  /**
   * Получение ссылки на подпись.
   */
  public getShareLink(packetId: number): Observable<IShareLink> {
    return this._nopaperApiService.getShareLink(packetId).pipe(
      tap((response) => {
        this._store.dispatch(setShareLinkAction(response));
      })
    );
  }
}
