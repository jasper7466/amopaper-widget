import { Router } from '@angular/router';
import { CommonLogicService } from '../../../services/common-logic.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatestWith, Subscription } from 'rxjs';
import { RoutingService } from 'src/app/services/sub-services/routing.service';
import { isAddresseeAddedSelector } from 'src/app/store/addressee/selectors';
import { isCompleteSelector } from 'src/app/store/files/selectors';
import { setNewPacketTitleAction } from 'src/app/store/misc/actions';

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
    private commonLogicService: CommonLogicService,
    private routingService: RoutingService,
    private router: Router
  ) {}

  protected saveButtonHandler(): void {
    this.isAwaiting = true;
    this.isControlsEnabled = false;

    this.commonLogicService.createPacketDraft().subscribe(() => {
      this.isAwaiting = false;
      this.routingService.goPacketsListPage();
    });
  }

  protected nextButtonHandler(): void {
    this.isAwaiting = true;
    this.isControlsEnabled = false;

    this.commonLogicService
      .createAndSubmitPacketDraft()
      .subscribe((packetId) => {
        this.routingService.goPacketPage(packetId);
      });
  }

  protected cancelButtonHandler(): void {
    this.routingService.goPacketsListPage();
  }

  protected titleInputKeyUpHandler(value: string): void {
    this.store.dispatch(setNewPacketTitleAction({ packetTitle: value }));
  }

  public ngOnInit(): void {
    console.log(this.router.url);
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
