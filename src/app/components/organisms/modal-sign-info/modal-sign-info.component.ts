import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { signaturesSenderSignatureSelector } from 'src/app/store/signatures/selectors';

@Component({
  selector: 'app-modal-sign-info',
  templateUrl: './modal-sign-info.component.html',
  styleUrls: ['./modal-sign-info.component.css'],
})
export class ModalSignInfoComponent implements OnInit {
  @HostBinding('class.opened') isOpened: boolean = false;
  senderSignature$ = this.store.select(signaturesSenderSignatureSelector);

  public signerName: string = '';
  public signerVatId: string = '';
  public procuratoryIssueDate: string = '';
  public procuratoryId: string = '';
  public signingDateTime: string = '';

  constructor(private store: Store) {}

  ngOnInit(): void {
    // this.signature$.subscribe((value) => console.log(value));
  }

  close(): void {
    this.isOpened = false;
  }

  open(): void {
    this.isOpened = true;
  }
}
