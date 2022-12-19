import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StepName } from '../api/nopaper-api/nopaper-api.types';

@Injectable()
export class RoutingService {
  constructor(private router: Router, private route: ActivatedRoute) {}

  public getParentParameter(parameterName: string): string | never {
    const parameter = this.route.parent?.snapshot.paramMap.get(parameterName);

    if (!parameter) {
      throw new Error('Missing "id" parameter in parent path');
    }

    return parameter;
  }

  public redirect(url: string): void {
    window.location.href = url;
  }

  public goLandingPage(): void {
    this.router.navigate(['landing']);
  }

  public goPacketsListPage(): void {
    this.router.navigate(['widget/list']);
  }

  public goCreatePage(): void {
    this.router.navigate(['widget/new']);
  }

  public goPacketPage(id: number): void {
    this.router.navigate(['widget/packet', id]);
  }

  public goMatchedStepPacketPage(stepName: StepName | null, id: number): void {
    const basePath = `widget/packet/${id}/`;
    let destination = '';

    switch (stepName) {
      case 'new':
        destination = 'draft';
        break;
      case 'nopaperPrepareFiles':
        destination = 'prepare';
        break;
      case 'nopaperPreview':
      case 'nopaperPreviewBeforeOferta':
      case 'nopaperOfertaSenderPreview':
        destination = 'preview';
        break;
      case 'nopaperSenderSign':
        destination = 'sender-sign';
        break;
      case 'nopaperReceiverPreview':
      case 'nopaperReceiverPreviewBeforeOferta':
      case 'nopaperOfertaReceiverPreview':
        destination = 'receiver-preview';
        break;
      case 'nopaperEnd':
        destination = 'end';
        break;
      case 'nopaperReceiverSigning':
      case 'nopaperEndRead':
      case 'nopaperError':
      case 'nopaperErrorEnd':
      case 'nopaperDelete':
      case 'nopaperSenderCancel':
      case 'nopaperSenderCancelEnd':
      case 'nopaperSignRefused':
      case 'nopaperSignRefusedEnd':
      case 'nopaperSignRefusedRead':
      default:
        this.goPacketsListPage();
        return;
    }

    this.router.navigate([basePath + destination]);
  }
}
