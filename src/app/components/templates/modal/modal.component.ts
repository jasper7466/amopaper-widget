import {
  Component,
  HostBinding,
  Input,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @HostBinding('class.opened') isOpened: boolean = false;
  @Input() isClosable: boolean = true;
  @Input() openTrigger: EventEmitter<void>;
  @Input() closeTrigger: EventEmitter<void>;

  private onInitSubscriptions: Subscription[] = [];

  constructor() {}

  ngOnInit(): void {
    this.onInitSubscriptions.push(
      this.openTrigger.subscribe(() => this.open())
    );

    this.onInitSubscriptions.push(
      this.closeTrigger.subscribe(() => this.close())
    );
  }

  ngOnDestroy(): void {
    this.onInitSubscriptions.forEach((subscription) =>
      subscription.unsubscribe()
    );
  }

  protected close(): void {
    if (this.isClosable) {
      this.isOpened = false;
    }
  }

  protected open(): void {
    this.isOpened = true;
  }
}
