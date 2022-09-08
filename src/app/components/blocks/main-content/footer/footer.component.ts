import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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
export class FooterComponent implements OnInit {
  isDraft$ = this.store.select(packetIdSelector);
  isAddresseeAdded$ = this.store.select(isAddresseeAddedSelector);
  isAllFilesLoaded$ = this.store.select(isCompleteSelector);

  constructor(
    private store: Store,
    public nopaperService: NopaperService,
    public crmService: CrmService
  ) {}

  ngOnInit(): void {}
}
