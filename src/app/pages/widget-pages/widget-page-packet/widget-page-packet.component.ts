import { StepName } from 'src/app/services/api/nopaper-api/nopaper-api.types';
import { takeUntil, tap, switchMap, filter } from 'rxjs';
import { Component, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { NopaperService } from 'src/app/services/sub-services/nopaper.service';
import { RoutingService } from 'src/app/services/sub-services/routing.service';
import { packetStepNameSelector } from 'src/app/store/packets/selectors';

@Component({
  selector: 'app-widget-page-packet',
  templateUrl: './widget-page-packet.component.html',
  styleUrls: ['./widget-page-packet.component.css'],
})
export class WidgetPagePacketComponent implements OnInit, OnDestroy {
  private onDestroyEmitter = new EventEmitter<void>();
  protected packetId: number;
  protected stepName: StepName | null;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private routingService: RoutingService,
    private nopaperService: NopaperService
  ) {}

  ngOnInit(): void {
    this.backNavigationHandlingStart();
    this.sameRouteNavigationHandlingStart();
    this.packetStatusHandlingStart();
  }

  ngOnDestroy(): void {
    this.nopaperService.stopPacketsStepPollingAll();
    this.onDestroyEmitter.emit();
  }

  /**
   * Инициирует наблюдение и обработку браузерного события навигации "назад".
   * Предотвращает "зацикливание" на данной ветке роутов при использовании
   * браузерной навигации.
   */
  private backNavigationHandlingStart(): void {
    this.router.events
      .pipe(
        takeUntil(this.onDestroyEmitter),
        filter(
          (event) =>
            event instanceof NavigationStart &&
            event.navigationTrigger === 'popstate'
        ),
        tap(() => this.routingService.goPacketsListPage())
      )
      .subscribe();
  }

  /**
   * Инициирует наблюдение и обработку всех событий навигации внутри данной ветки роутов.
   * Восстановить роутинг дочерних компонентов в случае обновления страницы или навигации
   * по тому же роуту.
   */
  private sameRouteNavigationHandlingStart(): void {
    this.router.events
      .pipe(
        takeUntil(this.onDestroyEmitter),
        filter((event) => event instanceof NavigationEnd),
        tap(() => {
          this.routingService.goMatchedStepPacketPage(
            this.stepName,
            this.packetId
          );
        })
      )
      .subscribe();
  }

  /**
   * Инициирует наблюдение и обработку парамеров роута и активного пакета документов.
   * Осуществляет автоматическую навигацию по страницам, соответствующим статусу
   * пакета документов.
   */
  private packetStatusHandlingStart(): void {
    this.route.params
      .pipe(
        takeUntil(this.onDestroyEmitter),
        tap((params) => {
          this.packetId = params['id'];
          this.nopaperService.startPacketPolling(this.packetId);
        }),
        switchMap(() => this.nopaperService.getPacketStepName(this.packetId)),
        switchMap(() =>
          this.store.select(packetStepNameSelector(this.packetId))
        ),
        takeUntil(this.onDestroyEmitter),
        tap((stepName) => {
          this.stepName = stepName;
          this.routingService.goMatchedStepPacketPage(
            this.stepName,
            this.packetId
          );
        })
      )
      .subscribe();
  }
}
