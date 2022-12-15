import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAddresseeFormComponent } from './add-addressee-form/add-addressee-form.component';
import { AddresseeDisplayerComponent } from './addressee-displayer/addressee-displayer.component';
import { AddresseeSelectorComponent } from './addressee-selector/addressee-selector.component';
import { DocumentsDisplayerComponent } from './documents-displayer/documents-displayer.component';
import { DocumentsUploaderComponent } from './documents-uploader/documents-uploader.component';
import { HeaderComponent } from './header/header.component';
import { ModalSignInfoComponent } from './modal-sign-info/modal-sign-info.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { PacketsListComponent } from './packets-list/packets-list.component';
import { AtomsSharedModule } from '../atoms/atoms-shared.module';
import { MoleculesSharedModule } from '../molecules/molecules-shared.module';
import { TemplatesSharedModule } from '../templates/templates-shared.module';

@NgModule({
  declarations: [
    AddAddresseeFormComponent,
    AddresseeDisplayerComponent,
    AddresseeSelectorComponent,
    DocumentsDisplayerComponent,
    DocumentsUploaderComponent,
    HeaderComponent,
    ModalSignInfoComponent,
    NavBarComponent,
    PacketsListComponent,
    StatusBarComponent,
  ],
  imports: [
    CommonModule,
    AtomsSharedModule,
    MoleculesSharedModule,
    TemplatesSharedModule,
  ],
  exports: [
    AddAddresseeFormComponent,
    AddresseeDisplayerComponent,
    AddresseeSelectorComponent,
    DocumentsDisplayerComponent,
    DocumentsUploaderComponent,
    HeaderComponent,
    ModalSignInfoComponent,
    NavBarComponent,
    PacketsListComponent,
    StatusBarComponent,
  ],
})
export class OrganismsSharedModule {}
