import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAddresseeFormComponent } from './add-addressee-form/add-addressee-form.component';
import { AddresseeViewerComponent } from './addressee-viewer/addressee-viewer.component';
import { AddresseeSelectorComponent } from './addressee-selector/addressee-selector.component';
import { DocumentsUploaderComponent } from './documents-uploader/documents-uploader.component';
import { HeaderComponent } from './header/header.component';
import { ModalSignInfoComponent } from './modal-sign-info/modal-sign-info.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { PacketsListComponent } from './packets-list/packets-list.component';
import { ShareLinkButtonComponent } from './share-link-button/share-link-button.component';
import { AtomsSharedModule } from '../atoms/atoms-shared.module';
import { MoleculesSharedModule } from '../molecules/molecules-shared.module';
import { TemplatesSharedModule } from '../templates/templates-shared.module';

@NgModule({
    declarations: [
        AddAddresseeFormComponent,
        AddresseeViewerComponent,
        AddresseeSelectorComponent,
        DocumentsUploaderComponent,
        HeaderComponent,
        ModalSignInfoComponent,
        NavBarComponent,
        PacketsListComponent,
        StatusBarComponent,
        ShareLinkButtonComponent,
    ],
    imports: [
        CommonModule,
        AtomsSharedModule,
        MoleculesSharedModule,
        TemplatesSharedModule,
    ],
    exports: [
        AddAddresseeFormComponent,
        AddresseeViewerComponent,
        AddresseeSelectorComponent,
        DocumentsUploaderComponent,
        HeaderComponent,
        ModalSignInfoComponent,
        NavBarComponent,
        PacketsListComponent,
        StatusBarComponent,
        ShareLinkButtonComponent,
    ],
})
export class OrganismsSharedModule {}
