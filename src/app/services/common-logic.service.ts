import { Store } from '@ngrx/store';
import { switchMap, tap, map, Observable, take } from 'rxjs';
import { NopaperService } from './sub-services/nopaper.service';
import { CrmService } from 'src/app/services/sub-services/crm.service';
import { RoutingService } from './sub-services/routing.service';
import { Injectable } from '@angular/core';
import { filesIdsOriginalsSelector } from '../store/files-processed/selectors';
import { WindowService } from './sub-services/window.service';
import { CrmTokenService } from './sub-services/crm-token.service';
import { CrmJsonStorageService } from './sub-services/crm-json-storage.service';

@Injectable()
export class CommonLogicService {
  constructor(
    private _store: Store,
    private _crmService: CrmService,
    private _crmTokenService: CrmTokenService,
    private _crmJsonStorageService: CrmJsonStorageService,
    private _nopaperService: NopaperService,
    private _routingService: RoutingService,
    private _windowService: WindowService
  ) {}

  /**
   * Первичная инициализация.
   * Получение контекста запуска виджета, токенов
   * и других необходимых данных для дальнейшей работы.
   * Редирект на лендинг, если запуск вне фрейма.
   */
  public init(): void {
    if (!this._windowService.isFramed()) {
      this._routingService.goLandingPage();
      return;
    }

    this._crmService
      .getCrmContext()
      .pipe(
        switchMap(() => this._crmTokenService.getAmoAccessToken()),
        switchMap(() => this._crmJsonStorageService.init()),
        take(1)
      )
      .subscribe({
        next: () => {
          this._crmService.checkWidgetStatus();
          this._routingService.goPacketsListPage();
        },
        error: (error) => console.log(error),
      });
  }

  /**
   * Создаёт черновик и прикрепляет его к текущей сделке.
   * @returns Идентификатор созданного пакета документов.
   */
  public createPacketDraft(): Observable<number> {
    let justCreatedPacketId: number;

    return this._nopaperService.postPacket().pipe(
      tap((packet) => (justCreatedPacketId = packet.id)),
      switchMap((packet) => this._crmService.attachPacketToLead(packet.id)),
      map(() => justCreatedPacketId)
    );
  }

  /**
   * Подтверждает сохранённый черновик пакета документов.
   * @param packetId Идентификатор пакета документов.
   * @returns Переданный на вход идентификатор пакета документов.
   */
  public submitPacketDraft(packetId: number): Observable<number> {
    return this._nopaperService.submitDraft(packetId).pipe(map(() => packetId));
  }

  /**
   * Создаёт черновик пакета документов с последующим его подтверждением.
   * @returns Идентификатор созданного пакета документов.
   */
  public createAndSubmitPacketDraft(): Observable<number> {
    return this.createPacketDraft().pipe(
      switchMap((packetId) => this.submitPacketDraft(packetId))
    );
  }

  /** @deprecated */
  public submitPreview(packetId: number): Observable<void> {
    return this._nopaperService.submitPreview(packetId);
  }

  /**
   * Удаляет пакет документов и открепляет его от текущей сделки.
   * @param packetId Идентификатор пакета документов.
   * @returns
   */
  public deletePacket(packetId: number): Observable<void> {
    return this._nopaperService
      .deletePacket(packetId)
      .pipe(switchMap(() => this._crmService.detachPacketFromLead(packetId)));
  }

  /**
   * Отзывает пакет документов и открепляет его от текущей сделки.
   * @param packetId Идентификатор пакета документов.
   * @returns
   */
  public revokePacket(packetId: number): Observable<void> {
    return this._nopaperService
      .revokePacket(packetId)
      .pipe(switchMap(() => this._crmService.detachPacketFromLead(packetId)));
  }

  public getPacketFiles(packetId: number): Observable<void> {
    return this._nopaperService.getPacketFilesIds(packetId).pipe(
      switchMap(() => this._store.select(filesIdsOriginalsSelector)),
      take(1),
      switchMap((identifiers) =>
        this._nopaperService.getFilesByIds(identifiers.map((item) => item.id))
      )
    );
  }
}
