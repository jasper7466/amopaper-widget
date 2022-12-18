import { DirectivesSharedModule } from './../../directives/directives-shared.module';
import { BannerDraftComponent } from './banner-draft/banner-draft.component';
import { BannerAwaitingComponent } from './banner-awaiting/banner-awaiting.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddresseeNameplateComponent } from './addressee-nameplate/addressee-nameplate.component';
import { BannerPreparingComponent } from './banner-preparing/banner-preparing.component';
import { BannerSigningComponent } from './banner-signing/banner-signing.component';
import { DocumentsDropAreaComponent } from './documents-drop-area/documents-drop-area.component';
import { DocumentsListItemComponent } from './documents-list-item/documents-list-item.component';
import { NavPathComponent } from './nav-path/nav-path.component';
import { StageHeaderComponent } from './stage-header/stage-header.component';
import { PacketsListItemComponent } from './packets-list-item/packets-list-item.component';
import { AtomsSharedModule } from '../atoms/atoms-shared.module';
import { TemplatesSharedModule } from '../templates/templates-shared.module';
import { UploadsFoldableListComponent } from './uploads-foldable-list/uploads-foldable-list.component';
import { PipesSharedModule } from 'src/app/pipes/pipes-shared.module';
import { SingInfoItemComponent } from './sing-info-item/sing-info-item.component';
import { DocumentsDisplayerComponent } from './documents-displayer/documents-displayer.component';

@NgModule({
  declarations: [
    AddresseeNameplateComponent,
    BannerAwaitingComponent,
    BannerDraftComponent,
    BannerPreparingComponent,
    BannerSigningComponent,
    DocumentsDropAreaComponent,
    DocumentsListItemComponent,
    NavPathComponent,
    PacketsListItemComponent,
    StageHeaderComponent,
    UploadsFoldableListComponent,
    SingInfoItemComponent,
    DocumentsDisplayerComponent,
  ],
  imports: [
    CommonModule,
    AtomsSharedModule,
    TemplatesSharedModule,
    PipesSharedModule,
    DirectivesSharedModule,
  ],
  exports: [
    AddresseeNameplateComponent,
    BannerAwaitingComponent,
    BannerDraftComponent,
    BannerPreparingComponent,
    BannerSigningComponent,
    DocumentsDropAreaComponent,
    DocumentsListItemComponent,
    NavPathComponent,
    PacketsListItemComponent,
    StageHeaderComponent,
    UploadsFoldableListComponent,
    SingInfoItemComponent,
    DocumentsDisplayerComponent,
  ],
})
export class MoleculesSharedModule {}
