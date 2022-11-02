import { ModalComponent } from './components/modal/modal.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { AppComponent } from './app.component';
import { StatusBarComponent } from './components/status-bar/status-bar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NopaperLogoComponent } from './components/nopaper-logo/nopaper-logo.component';
import { HeaderComponent } from './components/header/header.component';
import { ArrowComponent } from './components/common/arrow/arrow.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { NavPathComponent } from './components/nav-path/nav-path.component';
import { StatusLabelComponent } from './components/common/status-label/status-label.component';
import { StageHeaderComponent } from './components/stage-header/stage-header.component';
import { DocumentCountLabelComponent } from './components/document-count-label/document-count-label.component';
import { StatusBannerComponent } from './components/status-banner/status-banner.component';
import { ButtonComponent } from './components/common/button/button.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddresseeComponent } from './components/addressee/addressee.component';
import { SubtitleComponent } from './components/common/subtitle/subtitle.component';
import { AddresseeNameplateComponent } from './components/addressee-nameplate/addressee-nameplate.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { TooltipComponent } from './components/common/tooltip/tooltip.component';
import { InputComponent } from './components/common/input/input.component';
import { DocumentsListComponent } from './components/documents-list/documents-list.component';
import { BannerPreparingComponent } from './components/banner-preparing/banner-preparing.component';
import { PreloaderComponent } from './components/common/preloader/preloader.component';
import { BannerAwaitingComponent } from './components/banner-awaiting/banner-awaiting.component';
import { BannerSigningComponent } from './components/banner-signing/banner-signing.component';
import { ModalSignInfoComponent } from './components/modal-sign-info/modal-sign-info.component';
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
import { AddAddresseeFormComponent } from './components/add-addressee-form/add-addressee-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DocumentsDropAreaComponent } from './components/documents-drop-area/documents-drop-area.component';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';
import { FileBrowserDirective } from './directives/file-browser.directive';
import { DocumentsListItemComponent } from './components/documents-list-item/documents-list-item.component';
import { WidgetPageListComponent } from './pages/widget-pages/widget-page-list/widget-page-list.component';
import { MainContentWrapperComponent } from './components/main-content-wrapper/main-content-wrapper.component';
import { WidgetPageNewComponent } from './pages/widget-pages/widget-page-new/widget-page-new.component';
import { WidgetPagePacketComponent } from './pages/widget-pages/widget-page-packet/widget-page-packet.component';
import { PacketPageDraftComponent } from './pages/packet-pages/packet-page-draft/packet-page-draft.component';
import { PacketsListItemComponent } from './components/packets-list-item/packets-list-item.component';
import { StepToLabelStatusPipe } from './pipes/step-label-status.pipe';
import { PacketsListComponent } from './components/packets-list/packets-list.component';

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
    AddresseeComponent,
    SubtitleComponent,
    AddresseeNameplateComponent,
    DocumentsComponent,
    TooltipComponent,
    InputComponent,
    DocumentsListComponent,
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
