import {
  Component,
  HostBinding,
  Input,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit, OnDestroy {
  @HostBinding('class.opened') isOpened = false;
  @Input() isClosable = true;
  @Input() openTrigger: EventEmitter<void>;
  @Input() closeTrigger: EventEmitter<void>;

  private onDestroyEmitter = new EventEmitter<void>();

  ngOnInit(): void {
    this.openTrigger
      .pipe(takeUntil(this.onDestroyEmitter))
      .subscribe(() => this.open());
    this.closeTrigger
      .pipe(takeUntil(this.onDestroyEmitter))
      .subscribe(() => this.close());
  }

  ngOnDestroy(): void {
    this.onDestroyEmitter.emit();
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
