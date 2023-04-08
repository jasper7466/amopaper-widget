import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, take } from 'rxjs';
import { packetTitleSelector } from 'src/app/store/packets/selectors';

@Injectable()
export class TitleResolverService implements Resolve<string> {
  constructor(private _store$: Store) {}

  public resolve(
    route: ActivatedRouteSnapshot
  ): string | Observable<string> | Promise<string> {
    const id = route.paramMap.get('id');
    let title = '';

    if (!id) {
      return title;
    }

    this._store$
      .select(packetTitleSelector(+id))
      .pipe(take(1))
      .subscribe((value) => (title = value));

    return title;
  }
}
