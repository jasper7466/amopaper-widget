import { sourceFilesResetAction } from '../../../store/files-source/actions';
import { resetAddresseeAction } from './../../../store/addressee/actions';
import { CommonLogicService } from '../../../services/common-logic.service';
import { Component, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatestWith, takeUntil } from 'rxjs';
import { RoutingService } from 'src/app/services/sub-services/routing.service';
import { isAddresseeSubmittedSelector } from 'src/app/store/addressee/selectors';
import { isSourceFilesCompleteAllSelector } from 'src/app/store/files-source/selectors';
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

  protected isAddresseeAdded$ = this.store.select(isAddresseeSubmittedSelector);
  protected isAllFilesLoaded$ = this.store.select(
    isSourceFilesCompleteAllSelector
  );

  protected isControlsEnabled = false;
  protected isAwaiting = false;

  constructor(
    private store: Store,
    private commonLogicService: CommonLogicService,
    private routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.isAddresseeAdded$
      .pipe(
        combineLatestWith(this.isAllFilesLoaded$),
        takeUntil(this.onDestroyEmitter)
      )
      .subscribe(([isAddresseeAdded, isAllFilesLoaded]) => {
        this.isControlsEnabled = isAddresseeAdded && isAllFilesLoaded;
      });
  }

  ngOnDestroy(): void {
    this.store.dispatch(resetAddresseeAction());
    this.store.dispatch(sourceFilesResetAction());
    this.store.dispatch(resetNewPacketTitleAction());
    this.onDestroyEmitter.emit();
  }

  protected titleInputKeyUpHandler(value: string): void {
    this.store.dispatch(setNewPacketTitleAction({ title: value }));
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
