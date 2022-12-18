import { CommonLogicService } from '../../../services/common-logic.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-startup-page',
  templateUrl: './startup-page.component.html',
  styleUrls: ['./startup-page.component.css'],
})
export class StartupPageComponent implements OnInit {
  constructor(private commonLogicService: CommonLogicService) {}

  ngOnInit(): void {
    this.commonLogicService.init();
  }
}
