import { PacketStatus } from './../../store/packets/index';
import { Observable, map, filter, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  Event,
  GuardsCheckEnd,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  ResolveEnd,
  Router,
  RouterEvent,
  RoutesRecognized,
  Scroll,
} from '@angular/router';

export type NavigationPart = {
  title: string;
  routerLink: string | any[];
};

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

  public navParts(): Observable<NavigationPart[]> {
    return this.router.events.pipe(
      filter(
        (event) => event instanceof NavigationEnd || event instanceof Scroll
      ),
      map(() => {
        let route = this.route;

        while (route.firstChild) {
          route = route.firstChild;
        }

        return route;
      }),
      map((route) => {
        const routes = route.snapshot.pathFromRoot;
        let navParts: NavigationPart[] = [];

        for (const route of routes) {
          const title = route.title;

          if (!title) {
            continue;
          }

          const routerLink = route.pathFromRoot
            .map((route) => route.url.toString().split(','))
            .flat();

          navParts.push({ title, routerLink });
        }
        return navParts;
      })
    );
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

  public goMatchedStepPacketPage(
    packetStatus: PacketStatus | null,
    id: number
  ): void {
    const basePath = `widget/packet/${id}/`;
    let destination = '';

    switch (packetStatus) {
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
