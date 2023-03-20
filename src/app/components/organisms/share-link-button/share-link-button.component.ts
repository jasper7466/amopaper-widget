import { ButtonStyleOption } from './../../atoms/button/button.component';
import { switchMap, tap, take } from 'rxjs';
import { shareLinkSelector } from './../../../store/misc/selectors';
import { NopaperService } from 'src/app/services/sub-services/nopaper.service';
import { Store } from '@ngrx/store';
import { Component, Input } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

const CAPTIONS = {
  initial: 'Скопировать ссылку на подпись КЭП',
  copied: 'Скопировано',
};

@Component({
  selector: 'app-share-link-button',
  templateUrl: './share-link-button.component.html',
  styleUrls: ['./share-link-button.component.css'],
})
export class ShareLinkButtonComponent {
  @Input() packetId: number;

  protected caption: string = CAPTIONS.initial;
  protected style: ButtonStyleOption = 'solid';
  protected isEnabled = true;

  protected shareLink$ = this.store.select(shareLinkSelector);

  constructor(
    private store: Store,
    private nopaperService: NopaperService,
    private clipboard: Clipboard
  ) {}

  protected clickHandler(): void {
    this.isEnabled = false;

    this.nopaperService
      .getShareLink(this.packetId)
      .pipe(
        switchMap(() => this.shareLink$),
        take(1),
        tap((link) => {
          this.clipboard.copy(link);
          this.isEnabled = true;
          this.caption = CAPTIONS.copied;
          this.style = 'blank';
        })
      )
      .subscribe();
  }
}
