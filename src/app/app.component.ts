import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { appLoadAction } from './store/app-context/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Nopaper';

  constructor(private store: Store) {}
}
