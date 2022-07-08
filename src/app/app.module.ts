import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StatusBarComponent } from './components/blocks/header/status-bar/status-bar.component';
import { NavBarComponent } from './components/blocks/main-content/nav-bar/nav-bar.component';
import { NopaperLogoComponent } from './components/blocks/header/status-bar/nopaper-logo/nopaper-logo.component';
import { HeaderComponent } from './components/blocks/header/header.component';
import { MainContentComponent } from './components/blocks/main-content/main-content.component';
import { ArrowComponent } from './components/common/arrow/arrow.component';
import { BackButtonComponent } from './components/blocks/main-content/nav-bar/back-button/back-button.component';
import { NavPathComponent } from './components/blocks/main-content/nav-bar/nav-path/nav-path.component';
import { StatusLabelComponent } from './components/blocks/main-content/stage-header/status-label/status-label.component';
import { StageHeaderComponent } from './components/blocks/main-content/stage-header/stage-header.component';
import { DocumentCountLabelComponent } from './components/blocks/main-content/stage-header/document-count-label/document-count-label.component';
import { StatusBannerComponent } from './components/blocks/main-content/stage-header/status-banner/status-banner.component';
import { ButtonComponent } from './components/common/button/button.component';
import { FooterComponent } from './components/blocks/main-content/footer/footer.component';
import { AddresseeComponent } from './components/blocks/main-content/addressee/addressee.component';
import { SubtitleComponent } from './components/common/subtitle/subtitle.component';
import { AddresseeNameplateComponent } from './components/blocks/main-content/addressee/addressee-nameplate/addressee-nameplate.component';
import { DocumentsComponent } from './components/blocks/main-content/documents/documents.component';
import { TooltipComponent } from './components/common/tooltip/tooltip.component';
import { InputComponent } from './components/common/input/input.component';
import { DocumentsListComponent } from './components/blocks/main-content/documents/documents-list/documents-list.component';
import { DocumentsItemComponent } from './components/blocks/main-content/documents/documents-list/documents-item/documents-item.component';
import { BannerPreparingComponent } from './components/blocks/main-content/banner-preparing/banner-preparing.component';
import { PreloaderComponent } from './components/common/preloader/preloader.component';
import { BannerAwaitingComponent } from './components/blocks/main-content/banner-awaiting/banner-awaiting.component';
import { BannerSigningComponent } from './components/blocks/main-content/banner-signing/banner-signing.component';
import { ModalSignInfoComponent } from './components/blocks/main-content/modal-sign-info/modal-sign-info.component';
import { AccountPlateComponent } from './components/blocks/header/status-bar/account-plate/account-plate.component';

@NgModule({
  declarations: [
    AppComponent,
    StatusBarComponent,
    NavBarComponent,
    NopaperLogoComponent,
    HeaderComponent,
    MainContentComponent,
    ArrowComponent,
    BackButtonComponent,
    NavPathComponent,
    StatusLabelComponent,
    StageHeaderComponent,
    DocumentCountLabelComponent,
    StatusBannerComponent,
    ButtonComponent,
    FooterComponent,
    AddresseeComponent,
    SubtitleComponent,
    AddresseeNameplateComponent,
    DocumentsComponent,
    TooltipComponent,
    InputComponent,
    DocumentsListComponent,
    DocumentsItemComponent,
    BannerPreparingComponent,
    PreloaderComponent,
    BannerAwaitingComponent,
    BannerSigningComponent,
    ModalSignInfoComponent,
    AccountPlateComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
