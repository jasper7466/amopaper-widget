import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatestWith, forkJoin, map, Subscription } from 'rxjs';
import { CrmService } from 'src/app/services/crm.service';
import { NopaperService } from 'src/app/services/nopaper.service';
import { isAddresseeAddedSelector } from 'src/app/store/addressee/selectors';
import { isCompleteSelector } from 'src/app/store/files/selectors';
import { packetIdSelector } from 'src/app/store/nopaper/selectors';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit, OnDestroy {
  isDraft$ = this.store.select(packetIdSelector);
  isAddresseeAdded$ = this.store.select(isAddresseeAddedSelector);
  isAllFilesLoaded$ = this.store.select(isCompleteSelector);

  isCreateButtonVisible: boolean = false;
  isCreateButtonEnabled: boolean = false;

  subscription: Subscription;

  constructor(private store: Store, public nopaperService: NopaperService) {}

  public createDraft(): void {
    this.nopaperService.createDraft();
  }

  public removeDraft(): void {
    this.nopaperService.removeDraft();
  }

  ngOnInit(): void {
    this.subscription = this.isDraft$
      .pipe(combineLatestWith(this.isAddresseeAdded$, this.isAllFilesLoaded$))
      .subscribe(([isDraft, isAddresseeAdded, isAllFilesLoaded]) => {
        this.isCreateButtonVisible = !isDraft;
        this.isCreateButtonEnabled = isAddresseeAdded && isAllFilesLoaded;
        console.log('!');
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
