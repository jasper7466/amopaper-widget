import { ModalComponent } from './components/templates/modal/modal.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { AppComponent } from './app.component';
import { StatusBarComponent } from './components/organisms/status-bar/status-bar.component';
import { NavBarComponent } from './components/organisms/nav-bar/nav-bar.component';
import { NopaperLogoComponent } from './components/atoms/nopaper-logo/nopaper-logo.component';
import { HeaderComponent } from './components/organisms/header/header.component';
import { ArrowComponent } from './components/atoms/arrow/arrow.component';
import { BackButtonComponent } from './components/atoms/back-button/back-button.component';
import { NavPathComponent } from './components/molecules/nav-path/nav-path.component';
import { StatusLabelComponent } from './components/atoms/status-label/status-label.component';
import { StageHeaderComponent } from './components/molecules/stage-header/stage-header.component';
import { DocumentCountLabelComponent } from './components/atoms/document-count-label/document-count-label.component';
import { StatusBannerComponent } from './components/atoms/status-banner/status-banner.component';
import { ButtonComponent } from './components/atoms/button/button.component';
import { FooterComponent } from './components/templates/footer/footer.component';
import { AddresseeSelectorComponent } from './components/organisms/addressee-selector/addressee-selector.component';
import { SubtitleComponent } from './components/atoms/subtitle/subtitle.component';
import { AddresseeNameplateComponent } from './components/molecules/addressee-nameplate/addressee-nameplate.component';
import { DocumentsUploaderComponent } from './components/organisms/documents-uploader/documents-uploader.component';
import { TooltipComponent } from './components/atoms/tooltip/tooltip.component';
import { InputComponent } from './components/atoms/input/input.component';
import { BannerPreparingComponent } from './components/molecules/banner-preparing/banner-preparing.component';
import { PreloaderComponent } from './components/atoms/preloader/preloader.component';
import { BannerAwaitingComponent } from './components/molecules/banner-awaiting/banner-awaiting.component';
import { BannerSigningComponent } from './components/molecules/banner-signing/banner-signing.component';
import { ModalSignInfoComponent } from './components/organisms/modal-sign-info/modal-sign-info.component';
import { AppRoutingModule } from './app-routing.module';
import { StartupPageComponent } from './pages/main-pages/startup-page/startup-page.component';
import { LandingPageComponent } from './pages/main-pages/landing-page/landing-page.component';
import { WidgetPageComponent } from './pages/main-pages/widget-page/widget-page.component';
import { NotificationPageComponent } from './pages/main-pages/notification-page/notification-page.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers, metaReducers } from './store';
import { AppEffects } from './app.effects';
import { NgxMaskModule } from 'ngx-mask';
import { AddAddresseeFormComponent } from './components/organisms/add-addressee-form/add-addressee-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DocumentsDropAreaComponent } from './components/molecules/documents-drop-area/documents-drop-area.component';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';
import { FileBrowserDirective } from './directives/file-browser.directive';
import { DocumentsListItemComponent } from './components/molecules/documents-list-item/documents-list-item.component';
import { WidgetPageListComponent } from './pages/widget-pages/widget-page-list/widget-page-list.component';
import { MainContentWrapperComponent } from './components/templates/main-content-wrapper/main-content-wrapper.component';
import { WidgetPageNewComponent } from './pages/widget-pages/widget-page-new/widget-page-new.component';
import { WidgetPagePacketComponent } from './pages/widget-pages/widget-page-packet/widget-page-packet.component';
import { PacketPageDraftComponent } from './pages/packet-pages/packet-page-draft/packet-page-draft.component';
import { PacketsListItemComponent } from './components/molecules/packets-list-item/packets-list-item.component';
import { StepToLabelStatusPipe } from './pipes/step-label-status.pipe';
import { PacketsListComponent } from './components/organisms/packets-list/packets-list.component';
import { PacketPageEndComponent } from './pages/packet-pages/packet-page-end/packet-page-end.component';
import { AddresseeDisplayerComponent } from './components/organisms/addressee-displayer/addressee-displayer.component';
import { DocumentsDisplayerComponent } from './components/organisms/documents-displayer/documents-displayer.component';
import { DeclensionPipe } from './pipes/declension.pipe';
import { UploadsFoldableListComponent } from './components/templates/uploads-foldable-list/uploads-foldable-list.component';
import { DocumentsListComponent } from './components/templates/documents-list/documents-list.component';

registerLocaleData(localeRu, 'ru');
@NgModule({
  declarations: [
    AppComponent,
    StepToLabelStatusPipe,
    StatusBarComponent,
    NavBarComponent,
    NopaperLogoComponent,
    HeaderComponent,
    ArrowComponent,
    BackButtonComponent,
    NavPathComponent,
    StatusLabelComponent,
    StageHeaderComponent,
    DocumentCountLabelComponent,
    StatusBannerComponent,
    ButtonComponent,
    FooterComponent,
    AddresseeSelectorComponent,
    SubtitleComponent,
    AddresseeNameplateComponent,
    DocumentsUploaderComponent,
    TooltipComponent,
    InputComponent,
    BannerPreparingComponent,
    PreloaderComponent,
    BannerAwaitingComponent,
    BannerSigningComponent,
    ModalSignInfoComponent,
    StartupPageComponent,
    LandingPageComponent,
    WidgetPageComponent,
    NotificationPageComponent,
    ModalComponent,
    AddAddresseeFormComponent,
    DocumentsDropAreaComponent,
    DragAndDropDirective,
    FileBrowserDirective,
    DocumentsListItemComponent,
    WidgetPageListComponent,
    MainContentWrapperComponent,
    WidgetPageNewComponent,
    WidgetPagePacketComponent,
    PacketPageDraftComponent,
    PacketsListItemComponent,
    PacketsListComponent,
    PacketPageEndComponent,
    AddresseeDisplayerComponent,
    DocumentsDisplayerComponent,
    DeclensionPipe,
    UploadsFoldableListComponent,
    DocumentsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([AppEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers,
    }),
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
