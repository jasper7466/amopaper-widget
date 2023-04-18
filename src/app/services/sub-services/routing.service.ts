import { Observable, map, filter } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Scroll } from '@angular/router';
import { TPacketStatus } from 'src/app/interfaces/packet-status.type';

export type TNavigationPart = {
    title: string;
    routerLink: string[];
};

@Injectable()
export class RoutingService {
    constructor(private _router: Router, private _route: ActivatedRoute) {}

    public getParentParameter(parameterName: string): string | never {
        const parameter = this._route.parent?.snapshot.paramMap.get(parameterName);

        if (!parameter) {
            throw new Error('Missing "id" parameter in parent path');
        }

        return parameter;
    }

    public navParts$(): Observable<TNavigationPart[]> {
        return this._router.events.pipe(
            filter(
                (event) => event instanceof NavigationEnd || event instanceof Scroll,
            ),
            map(() => {
                let route = this._route;

                while (route.firstChild) {
                    route = route.firstChild;
                }

                return route;
            }),
            map((route) => {
                const routes = route.snapshot.pathFromRoot;
                const navParts: TNavigationPart[] = [];

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
            }),
        );
    }

    public redirect(url: string): void {
        window.location.href = url;
    }

    public goLandingPage(): void {
        this._router.navigate(['landing']);
    }

    public goPacketsListPage(): void {
        this._router.navigate(['widget/list']);
    }

    public goCreatePage(): void {
        this._router.navigate(['widget/new']);
    }

    public goPacketPage(id: number): void {
        this._router.navigate([
            'widget/packet',
            id,
        ]);
    }

    public goNotificationPage(): void {
        this._router.navigate(['notification']);
    }

    public goStartupPage(): void {
        this._router.navigate(['']);
    }

    public goMatchedStepPacketPage(
        packetStatus: TPacketStatus | undefined,
        id: number,
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
                throw new Error(
                    `${this.constructor.name}: Corresponding page for status "${packetStatus}" does not exist.`,
                );
        }

        this._router.navigate([basePath + destination]);
    }
}
