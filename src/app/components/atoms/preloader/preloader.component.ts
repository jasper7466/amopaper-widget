import { Component, Input } from '@angular/core';

type TAnimation = 'rotation' | '';
type TIcon = 'preparing' | 'awaiting' | 'signing' | '';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css'],
})
export class PreloaderComponent {
  @Input() public animationOption: TAnimation = '';
  @Input() public iconOption: TIcon = '';
}
