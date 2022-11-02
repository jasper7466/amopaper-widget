import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StepName } from './api/nopaper/nopaper-api.types';

@Injectable({
  providedIn: 'root',
})
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
      case 'nopaperPreview':
      case 'nopaperPreviewBeforeOferta':
      case 'nopaperOfertaSenderPreview':
        destination = 'draft';
        break;
      case 'nopaperPrepareFiles':
        break;
      case 'nopaperReceiverSigning':
        break;
      case 'nopaperEnd':
        break;
      default:
        this.goPacketsListPage();
        return;
    }

    this.router.navigate([basePath + destination]);
  }
}