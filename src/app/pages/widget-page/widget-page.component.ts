import { AmoApiService } from './../../services/api/amo/amo-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-page',
  templateUrl: './widget-page.component.html',
  styleUrls: ['./widget-page.component.css'],
})
export class WidgetPageComponent implements OnInit {
  constructor(amoApiService: AmoApiService) {}

  // checkCustomFields$() {
  //   return this.amoApiService.getCompaniesCustomFieldsAll.pipe(
  //     map((customFields) => {
  //       const packetId = customFields.filter(
  //         (field) => field.name === 'packetId'
  //       );
  //       const vatId = customFields.filter((field) => field.name === 'ИНН');

  //       if (packetId.length === 0) {
  //         console.log(packetId);
  //         return throwError(() => new Error('e'));
  //         this.notificationService.notify(
  //           notifications['packetIdFieldMissing']
  //         );
  //       }

  //       return EMPTY;
  //     })
  //   );
  // }

  ngOnInit(): void {}
}
