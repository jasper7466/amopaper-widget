import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NopaperService } from 'src/app/services/nopaper.service';
import { CrmService } from 'src/app/services/crm.service';
import { ModalSignInfoComponent } from 'src/app/components/modal-sign-info/modal-sign-info.component';

@Component({
  selector: 'app-widget-page',
  templateUrl: './widget-page.component.html',
  styleUrls: ['./widget-page.component.css'],
})
export class WidgetPageComponent implements OnDestroy {
  @ViewChild(ModalSignInfoComponent) signInfo: ModalSignInfoComponent;

  constructor(
    public nopaperService: NopaperService,
    public crmService: CrmService
  ) {}

  public showSignInfo(): void {
    this.signInfo.open();
  }

  ngOnDestroy(): void {}
}
