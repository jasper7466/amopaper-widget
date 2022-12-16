import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatestWith, pipe, Subscription, switchMap, tap } from 'rxjs';
import { NopaperService } from 'src/app/services/nopaper.service';
import { RoutingService } from 'src/app/services/routing.service';
import { isAddresseeAddedSelector } from 'src/app/store/addressee/selectors';
import { isCompleteSelector } from 'src/app/store/files/selectors';
import { setPacketTitleAction } from 'src/app/store/misc/actions';

@Component({
  selector: 'app-widget-page-new',
  templateUrl: './widget-page-new.component.html',
  styleUrls: ['./widget-page-new.component.css'],
})
export class WidgetPageNewComponent implements OnInit, OnDestroy {
  protected isAddresseeAdded$ = this.store.select(isAddresseeAddedSelector);
  protected isAllFilesLoaded$ = this.store.select(isCompleteSelector);

  protected isControlsEnabled: boolean = false;
  protected isAwaiting: boolean = false;

  protected subscriptions: Subscription[] = [];

  constructor(
    private store: Store,
    private nopaperService: NopaperService,
    private routingService: RoutingService
  ) {}

  protected saveDraftButtonHandler(): void {
    this.isAwaiting = true;
    this.isControlsEnabled = false;

    this.nopaperService.postDraft().subscribe(() => {
      this.isAwaiting = false;
      this.routingService.goPacketsListPage();
    });
  }

  protected submitDraftButtonHandler(): void {
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

  protected cancelButtonHandler(): void {
    this.routingService.goPacketsListPage();
  }

  protected titleInputKeyUpHandler(value: string): void {
    this.store.dispatch(setPacketTitleAction({ packetTitle: value }));
  }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.isAddresseeAdded$
        .pipe(combineLatestWith(this.isAllFilesLoaded$))
        .subscribe(([isAddresseeAdded, isAllFilesLoaded]) => {
          this.isControlsEnabled = isAddresseeAdded && isAllFilesLoaded;
        })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
