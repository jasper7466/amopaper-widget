import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatestWith, pipe, Subscription, switchMap, tap } from 'rxjs';
import { NopaperService } from 'src/app/services/nopaper.service';
import { RoutingService } from 'src/app/services/routing.service';
import { isAddresseeAddedSelector } from 'src/app/store/addressee/selectors';
import { isCompleteSelector } from 'src/app/store/files/selectors';

@Component({
  selector: 'app-widget-page-new',
  templateUrl: './widget-page-new.component.html',
  styleUrls: ['./widget-page-new.component.css'],
})
export class WidgetPageNewComponent implements OnInit, OnDestroy {
  isAddresseeAdded$ = this.store.select(isAddresseeAddedSelector);
  isAllFilesLoaded$ = this.store.select(isCompleteSelector);

  isControlsEnabled: boolean = false;
  isAwaiting: boolean = false;

  subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private nopaperService: NopaperService,
    private routingService: RoutingService
  ) {}

  public saveDraftButtonHandler(): void {
    this.isAwaiting = true;
    this.isControlsEnabled = false;

    this.nopaperService.postDraft().subscribe(() => {
      this.isAwaiting = false;
      this.routingService.goPacketsListPage();
    });
  }

  public submitDraftButtonHandler(): void {
    let packetId = 0;

    this.isAwaiting = true;
    this.isControlsEnabled = false;

    this.nopaperService
      .postDraft()
      .pipe(
        tap((result) => (packetId = result.packetId)),
        switchMap(({ packetId }) => this.nopaperService.submitDraft(packetId))
      )
      .subscribe(() => {
        this.routingService.goPacketPage(packetId);
      });
  }

  public cancelButtonHandler(): void {
    this.routingService.goPacketsListPage();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.isAddresseeAdded$
        .pipe(combineLatestWith(this.isAllFilesLoaded$))
        .subscribe(([isAddresseeAdded, isAllFilesLoaded]) => {
          this.isControlsEnabled = isAddresseeAdded && isAllFilesLoaded;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
