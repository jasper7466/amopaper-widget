import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatestWith, Subscription } from 'rxjs';
import { NopaperService } from 'src/app/services/nopaper.service';
import { isAddresseeAddedSelector } from 'src/app/store/addressee/selectors';
import { isCompleteSelector } from 'src/app/store/files/selectors';

@Component({
  selector: 'app-widget-page-new',
  templateUrl: './widget-page-new.component.html',
  styleUrls: ['./widget-page-new.component.css'],
})
export class WidgetPageNewComponent implements OnInit, OnDestroy {
  // isDraft$ = this.store.select(packetsIdsSelector);
  isAddresseeAdded$ = this.store.select(isAddresseeAddedSelector);
  isAllFilesLoaded$ = this.store.select(isCompleteSelector);

  isCreateButtonEnabled: boolean = false;

  subscriptions: Subscription[] = [];

  constructor(private store: Store, private nopaperService: NopaperService) {}

  public createDraft(): void {
    this.nopaperService.createDraft();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.isAddresseeAdded$
        .pipe(combineLatestWith(this.isAllFilesLoaded$))
        .subscribe(([isAddresseeAdded, isAllFilesLoaded]) => {
          this.isCreateButtonEnabled = isAddresseeAdded && isAllFilesLoaded;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
