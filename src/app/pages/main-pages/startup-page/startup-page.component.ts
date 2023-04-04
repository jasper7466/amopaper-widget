import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { appLoadAction } from 'src/app/store/app-context/actions';

@Component({
  selector: 'app-startup-page',
  templateUrl: './startup-page.component.html',
  styleUrls: ['./startup-page.component.css'],
})
export class StartupPageComponent implements OnInit {
  constructor(private _store: Store) {}

  ngOnInit(): void {
    this._store.dispatch(appLoadAction());
  }
}
