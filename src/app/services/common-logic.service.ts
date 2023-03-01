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
import { PostMessageTransportService } from './transport/post-message-transport.service';

@Injectable()
export class CommonLogicService {
  constructor(
    private store: Store,
    private crmService: CrmService,
    private crmTokenService: CrmTokenService,
    private crmJsonStorageService: CrmJsonStorageService,
    private nopaperService: NopaperService,
    private routingService: RoutingService,
    private windowService: WindowService,
    private postMessageTransport: PostMessageTransportService
  ) {}

  /**
   * Первичная инициализация.
   * Получение контекста запуска виджета, токенов
   * и других необходимых данных для дальнейшей работы.
   * Редирект на лендинг, если запуск вне фрейма.
   */
  public init(): void {
    if (!this.windowService.isFramed()) {
      this.routingService.goLandingPage();
      return;
    }

    interface IPayload {
      url: string;
      requestOptions: RequestInit;
    }

    this.routingService.goStartupPage();

    this.crmService
      .getCrmContext()
      .pipe(
        switchMap(() => this.crmTokenService.getAmoAccessToken()),
        switchMap(() => this.crmJsonStorageService.init())
      )
      .subscribe({
        next: () => this.routingService.goPacketsListPage(),
        // error: (err) => console.log(err),
      });
  }

  /**
   * Создаёт черновик и прикрепляет его к текущей сделке.
   * @returns Идентификатор созданного пакета документов.
   */
  public createPacketDraft(): Observable<number> {
    let justCreatedPacketId: number;

    return this.nopaperService.postPacket().pipe(
      tap((packet) => (justCreatedPacketId = packet.id)),
      switchMap((packet) => this.crmService.attachPacketToLead(packet.id)),
      map(() => justCreatedPacketId)
    );
  }

  /**
   * Подтверждает сохранённый черновик пакета документов.
   * @param packetId Идентификатор пакета документов.
   * @returns Переданный на вход идентификатор пакета документов.
   */
  public submitPacketDraft(packetId: number): Observable<number> {
    return this.nopaperService.submitDraft(packetId).pipe(map(() => packetId));
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

  public submitPreview(packetId: number) {
    return this.nopaperService.submitPreview(packetId);
  }

  /**
   * Удаляет пакет документов и открепляет его от текущей сделки.
   * @param packetId Идентификатор пакета документов.
   * @returns
   */
  public deletePacket(packetId: number): Observable<any> {
    return this.nopaperService
      .deletePacket(packetId)
      .pipe(switchMap(() => this.crmService.detachPacketFromLead(packetId)));
  }

  /**
   * Отзывает пакет документов и открепляет его от текущей сделки.
   * @param packetId Идентификатор пакета документов.
   * @returns
   */
  public revokePacket(packetId: number): Observable<any> {
    return this.nopaperService
      .revokePacket(packetId)
      .pipe(switchMap(() => this.crmService.detachPacketFromLead(packetId)));
  }

  public getPacketFiles(packetId: number): Observable<any> {
    return this.nopaperService.getPacketFilesIds(packetId).pipe(
      switchMap(() => this.store.select(filesIdsOriginalsSelector)),
      take(1),
      switchMap((identifiers) =>
        this.nopaperService.getFilesByIds(identifiers.map((item) => item.id))
      )
    );
  }
}
