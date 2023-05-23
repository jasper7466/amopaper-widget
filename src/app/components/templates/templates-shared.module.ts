import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsListComponent } from './documents-list/documents-list.component';
import { FooterComponent } from './footer/footer.component';
import { MainContentWrapperComponent } from './main-content-wrapper/main-content-wrapper.component';
import { ModalComponent } from './modal/modal.component';

@NgModule({
    declarations: [
        DocumentsListComponent,
        FooterComponent,
        MainContentWrapperComponent,
        ModalComponent,
    ],
    imports: [CommonModule],
    exports: [
        DocumentsListComponent,
        FooterComponent,
        MainContentWrapperComponent,
        ModalComponent,
    ],
})
export class TemplatesSharedModule {}
