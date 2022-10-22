import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StepName } from 'src/app/services/api/nopaper/nopaper-api.types';
import { Store } from '@ngrx/store';
import { stepNameSelector } from 'src/app/store/nopaper/selectors';
import { NopaperService } from 'src/app/services/nopaper.service';
import { CrmService } from 'src/app/services/crm.service';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { ModalSignInfoComponent } from 'src/app/components/modal-sign-info/modal-sign-info.component';

@Component({
  selector: 'app-widget-page',
  templateUrl: './widget-page.component.html',
  styleUrls: ['./widget-page.component.css'],
})
export class WidgetPageComponent implements OnInit, OnDestroy {
  @ViewChild(ModalSignInfoComponent) signInfo: ModalSignInfoComponent;
  stepName$ = this.store.select(stepNameSelector);

  stepName: StepName | null;
  files: any;

  isAwaitingBannerShown: boolean = false;
  isPreparingBannerShown: boolean = false;
  isSigningBannerShown: boolean = false;
  isAddresseeShown: boolean = false;
  isDocumentsShown: boolean = false;
  isFooterShown: boolean = false;

  private subscription: Subscription;

  constructor(
    private store: Store,
    public nopaperService: NopaperService,
    public crmService: CrmService
  ) {}

  // checkCustomFields$() {
  //   return this.amoApiService.getCompaniesCustomFieldsAll.pipe(
  //     map((customFields) => {
  //       const packetId = customFields.filter(
  //         (field) => field.name === 'packetId'
  //       );
  //       const vatId = customFields.filter((field) => field.name === 'ИНН');

  //       if (packetId.length === 0) {
  //         console.log(packetId);
  //         return throwError(() => new Error('e'));
  //         this.notificationService.notify(
  //           notifications['packetIdFieldMissing']
  //         );
  //       }

  //       return EMPTY;
  //     })
  //   );
  // }

  ngOnInit(): void {
    this.subscription = this.stepName$
      .pipe(distinctUntilChanged())
      .subscribe((stepName) => {
        this.resetFlags();

        switch (stepName) {
          case 'new':
          case 'nopaperPreview':
          case 'nopaperPreviewBeforeOferta':
          case 'nopaperOfertaSenderPreview':
            this.isAwaitingBannerShown = true;
            this.isFooterShown = true;
            break;
          case 'nopaperPrepareFiles':
            this.isPreparingBannerShown = true;
            break;
          case 'nopaperReceiverSigning':
            this.isSigningBannerShown = true;
            break;
          case 'nopaperEnd':
            this.isDocumentsShown = true;
            this.nopaperService.getFilesIdentifiers().subscribe();
            break;
          default:
            this.isAddresseeShown = true;
            this.isDocumentsShown = true;
            this.isFooterShown = false;
            break;
        }

        this.stepName = stepName;
      });
  }

  private resetFlags(): void {
    this.isAwaitingBannerShown = false;
    this.isPreparingBannerShown = false;
    this.isSigningBannerShown = false;
    this.isAddresseeShown = false;
    this.isDocumentsShown = false;
    this.isFooterShown = false;
  }

  public showSignInfo(): void {
    this.signInfo.open();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
