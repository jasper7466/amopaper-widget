import { CrmService } from 'src/app/services/sub-services/crm.service';
import { take, switchMap, filter, map } from 'rxjs';
import { leadIdSelector } from 'src/app/store/crm-context/selectors';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FilesService } from 'src/app/services/sub-services/files.service';

@Component({
  selector: 'app-documents-drop-area',
  templateUrl: './documents-drop-area.component.html',
  styleUrls: ['./documents-drop-area.component.css'],
})
export class DocumentsDropAreaComponent {
  private leadId$ = this.store.select(leadIdSelector);

  constructor(
    private filesService: FilesService,
    private crmService: CrmService,
    private store: Store
  ) {}

  protected fileLoadHandler(fileList: FileList): void {
    this.filesService.filesHandler(fileList);
  }

  protected loadFromLeadButtonHandler(): void {
    this.leadId$
      .pipe(
        take(1),
        filter((leadId) => typeof leadId === 'number'),
        map((leadId) => leadId as number),
        switchMap((leadId) => this.crmService.getLeadAttachments(leadId))
      )
      .subscribe();
  }
}
