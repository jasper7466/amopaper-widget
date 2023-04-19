import { takeUntil, tap, switchMap, filter } from 'rxjs';
import { Component, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NopaperService } from 'src/app/services/sub-services/nopaper.service';
import { RoutingService } from 'src/app/services/sub-services/routing.service';
import { packetStepNameSelector } from 'src/app/store/packets/selectors';
import { TPacketStatus } from 'src/app/interfaces/packet-status.type';

@Component({
    selector: 'app-widget-page-packet',
    templateUrl: './widget-page-packet.component.html',
    styleUrls: ['./widget-page-packet.component.css'],
})
export class WidgetPagePacketComponent implements OnInit, OnDestroy {
    private _onDestroyEmitter = new EventEmitter<void>();
    protected packetId: number;
    protected stepName: TPacketStatus | undefined;

    constructor(
        private _store$: Store,
        private _route: ActivatedRoute,
        private _router: Router,
        private _routingService: RoutingService,
        private _nopaperService: NopaperService,
    ) {}

    public ngOnInit(): void {
        this.backNavigationHandlingStart();
        this.sameRouteNavigationHandlingStart();
        this.packetStatusHandlingStart();
    }

    public ngOnDestroy(): void {
        this._nopaperService.stopPacketsStepPollingAll();
        this._onDestroyEmitter.emit();
    }

    /**
     * Инициирует наблюдение и обработку браузерного события навигации "назад".
     * Предотвращает "зацикливание" на данной ветке роутов при использовании
     * браузерной навигации.
     */
    private backNavigationHandlingStart(): void {
        this._router.events
            .pipe(
                filter(
                    event =>
                        event instanceof NavigationStart &&
                        event.navigationTrigger === 'popstate',
                ),
                tap(() => this._routingService.goPacketsListPage()),
                takeUntil(this._onDestroyEmitter),
            )
            .subscribe();
    }

    /**
     * Инициирует наблюдение и обработку всех событий навигации внутри данной ветки роутов.
     * Восстановить роутинг дочерних компонентов в случае обновления страницы или навигации
     * по тому же роуту.
     */
    private sameRouteNavigationHandlingStart(): void {
        this._router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                tap(() => {
                    this._routingService.goMatchedStepPacketPage(
                        this.stepName,
                        this.packetId,
                    );
                }),
                takeUntil(this._onDestroyEmitter),
            )
            .subscribe();
    }

    /**
     * Инициирует наблюдение и обработку парамеров роута и активного пакета документов.
     * Осуществляет автоматическую навигацию по страницам, соответствующим статусу
     * пакета документов.
     */
    private packetStatusHandlingStart(): void {
        this._route.params
            .pipe(
                tap(parameters => {
                    this.packetId = parseInt(parameters['id']);
                    this._nopaperService.startPacketPolling(this.packetId);
                }),
                switchMap(() => this._nopaperService.getPacketStepName$(this.packetId)),
                switchMap(() =>
                    this._store$.select(packetStepNameSelector(this.packetId)),
                ),
                tap(stepName => {
                    this.stepName = stepName;
                    this._routingService.goMatchedStepPacketPage(
                        this.stepName,
                        this.packetId,
                    );
                }),
                takeUntil(this._onDestroyEmitter),
            )
            .subscribe();
    }
}
