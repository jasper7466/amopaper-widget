import { resetFilesListAction } from './../../../store/files/actions';
import { resetAddresseeAction } from './../../../store/addressee/actions';
import { Router } from '@angular/router';
import { CommonLogicService } from '../../../services/common-logic.service';
import { Component, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatestWith, Subscription, take, takeUntil } from 'rxjs';
import { RoutingService } from 'src/app/services/sub-services/routing.service';
import { isAddresseeAddedSelector } from 'src/app/store/addressee/selectors';
import { isCompleteSelector } from 'src/app/store/files/selectors';
import {
  resetNewPacketTitleAction,
  setNewPacketTitleAction,
} from 'src/app/store/misc/actions';

@Component({
  selector: 'app-widget-page-new',
  templateUrl: './widget-page-new.component.html',
  styleUrls: ['./widget-page-new.component.css'],
})
export class WidgetPageNewComponent implements OnInit, OnDestroy {
  private onDestroyEmitter = new EventEmitter<void>();

  protected isAddresseeAdded$ = this.store.select(isAddresseeAddedSelector);
  protected isAllFilesLoaded$ = this.store.select(isCompleteSelector);

  protected isControlsEnabled: boolean = false;
  protected isAwaiting: boolean = false;

  constructor(
    private store: Store,
    private commonLogicService: CommonLogicService,
    private routingService: RoutingService
  ) {}

  public ngOnInit(): void {
    this.isAddresseeAdded$
      .pipe(
        combineLatestWith(this.isAllFilesLoaded$),
        takeUntil(this.onDestroyEmitter)
      )
      .subscribe(([isAddresseeAdded, isAllFilesLoaded]) => {
        this.isControlsEnabled = isAddresseeAdded && isAllFilesLoaded;
      });
  }

  public ngOnDestroy(): void {
    this.store.dispatch(resetAddresseeAction());
    this.store.dispatch(resetFilesListAction());
    this.store.dispatch(resetNewPacketTitleAction());
    this.onDestroyEmitter.emit();
  }

  protected titleInputKeyUpHandler(value: string): void {
    this.store.dispatch(setNewPacketTitleAction({ packetTitle: value }));
  }

  protected saveButtonHandler(): void {
    this.isAwaiting = true;
    this.isControlsEnabled = false;

    this.commonLogicService
      .createPacketDraft()
      .pipe(takeUntil(this.onDestroyEmitter))
      .subscribe(() => {
        this.isAwaiting = false;
        this.routingService.goPacketsListPage();
      });
  }

  protected nextButtonHandler(): void {
    this.isAwaiting = true;
    this.isControlsEnabled = false;

    this.commonLogicService
      .createAndSubmitPacketDraft()
      .pipe(takeUntil(this.onDestroyEmitter))
      .subscribe((packetId) => {
        this.routingService.goPacketPage(packetId);
      });
  }

  protected cancelButtonHandler(): void {
    this.routingService.goPacketsListPage();
  }
}
