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
  private _onDestroyEmitter = new EventEmitter<void>();

  protected isAddresseeAdded$ = this._store.select(
    isAddresseeSubmittedSelector
  );
  protected isAllFilesLoaded$ = this._store.select(
    isSourceFilesCompleteAllSelector
  );

  protected isControlsEnabled = false;
  protected isAwaiting = false;

  constructor(
    private _store: Store,
    private _commonLogicService: CommonLogicService,
    private _routingService: RoutingService
  ) {}

  ngOnInit(): void {
    this.isAddresseeAdded$
      .pipe(
        combineLatestWith(this.isAllFilesLoaded$),
        takeUntil(this._onDestroyEmitter)
      )
      .subscribe(([isAddresseeAdded, isAllFilesLoaded]) => {
        this.isControlsEnabled = isAddresseeAdded && isAllFilesLoaded;
      });
  }

  ngOnDestroy(): void {
    this._store.dispatch(resetAddresseeAction());
    this._store.dispatch(sourceFilesResetAction());
    this._store.dispatch(resetNewPacketTitleAction());
    this._onDestroyEmitter.emit();
  }

  protected titleInputKeyUpHandler(value: string): void {
    this._store.dispatch(setNewPacketTitleAction({ title: value }));
  }

  protected saveButtonHandler(): void {
    this.isAwaiting = true;
    this.isControlsEnabled = false;

    this._commonLogicService
      .createPacketDraft()
      .pipe(takeUntil(this._onDestroyEmitter))
      .subscribe(() => {
        this.isAwaiting = false;
        this._routingService.goPacketsListPage();
      });
  }

  protected nextButtonHandler(): void {
    this.isAwaiting = true;
    this.isControlsEnabled = false;

    this._commonLogicService
      .createAndSubmitPacketDraft()
      .pipe(takeUntil(this._onDestroyEmitter))
      .subscribe((packetId) => {
        this._routingService.goPacketPage(packetId);
      });
  }

  protected cancelButtonHandler(): void {
    this._routingService.goPacketsListPage();
  }
}
