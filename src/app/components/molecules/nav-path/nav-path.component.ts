import {
    TNavigationPart,
    RoutingService,
} from 'src/app/services/sub-services/routing.service';
import { takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-nav-path',
    templateUrl: './nav-path.component.html',
    styleUrls: ['./nav-path.component.css'],
})
export class NavPathComponent implements OnInit, OnDestroy {
    private _onDestroyEmitter = new EventEmitter<void>();
    public navPath: TNavigationPart[] = [];

    constructor(private _routingService: RoutingService) {}

    public ngOnInit(): void {
        this._routingService
            .navParts$()
            .pipe(takeUntil(this._onDestroyEmitter))
            .subscribe((navParts) => (this.navPath = navParts));
    }

    public ngOnDestroy(): void {
        this._onDestroyEmitter.emit();
    }
}
