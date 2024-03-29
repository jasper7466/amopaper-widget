import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CrmService } from 'src/app/services/sub-services/crm.service';
import { RoutingService } from 'src/app/services/sub-services/routing.service';
import { leadIdSelector } from 'src/app/store/crm-context/selectors';
import {
    packetsIsTouchedSelector,
    packetsSelector,
} from 'src/app/store/packets/selectors';

@Component({
    selector: 'app-widget-page-list',
    templateUrl: './widget-page-list.component.html',
    styleUrls: ['./widget-page-list.component.css'],
})
export class WidgetPageListComponent implements OnInit, OnDestroy {
    protected leadId$ = this._store$.select(leadIdSelector);
    protected packets$ = this._store$.select(packetsSelector);
    protected isPacketsIdsTouched$ = this._store$.select(packetsIsTouchedSelector);

    constructor(
        private _store$: Store,
        private _crmService: CrmService,
        private _routingService: RoutingService,
    ) {}

    public ngOnInit(): void {
        this._crmService.startJsonStoragePolling();
    }

    public ngOnDestroy(): void {
        this._crmService.stopJsonStoragePolling();
    }

    protected clickCreateNewButtonHandler(): void {
        this._routingService.goCreatePage();
    }
}
