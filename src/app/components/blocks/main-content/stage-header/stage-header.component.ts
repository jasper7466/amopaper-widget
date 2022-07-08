import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stage-header',
  templateUrl: './stage-header.component.html',
  styleUrls: ['./stage-header.component.css'],
})
export class StageHeaderComponent implements OnInit {
  @Input() caption: string = 'Untitled stage';

  constructor() {}

  ngOnInit(): void {}
}
