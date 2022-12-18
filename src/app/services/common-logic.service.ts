import { filesIdentifiersSelector } from './../store/signatures/selectors';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap, map, Observable, take } from 'rxjs';
import { NopaperService } from './sub-services/nopaper.service';
import { CrmService } from 'src/app/services/sub-services/crm.service';
import { RoutingService } from './sub-services/routing.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonLogicService {
  constructor(
    private route: ActivatedRoute,
    private routingService: RoutingService,
    private store: Store,
    private crmService: CrmService,
    private nopaperService: NopaperService
  ) {}

  /**
   * Первичная инициализация.
   * Получение контекста запуска виджета, токенов
   * и других необходимых данных для дальнейшей работы.
   * Редирект на лендинг, если запуск вне фрейма.
   */
  public init(): void {
    if (window.location === window.parent.location) {
      this.routingService.goLandingPage();
      return;
    }

    this.crmService
      .getCrmContext()
      .pipe(
        switchMap(() => this.nopaperService.getAmoAccessToken()),
        switchMap(() => this.crmService.getPacketsFieldId())
      )
      .subscribe({
        next: () => this.routingService.goPacketsListPage(),
        error: (err) => console.log(err),
      });
  }

  /**
   * Создаёт черновик и прикрепляет его к текущей сделке.
   * @returns Идентификатор созданного пакета документов.
   */
  public createPacketDraft(): Observable<number> {
    let justCreatedPacketId: number;

    return this.nopaperService.postPacket().pipe(
      tap((packetId) => (justCreatedPacketId = packetId)),
      switchMap((packetId) => this.crmService.attachPacketToLead(packetId)),
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

  public getPacketFiles(packetId: number): Observable<any> {
    return this.nopaperService.getPacketFilesIds(packetId).pipe(
      switchMap(() => this.store.select(filesIdentifiersSelector)),
      take(1),
      switchMap((identifiers) => this.nopaperService.getFilesByIds(identifiers))
    );
  }
}
