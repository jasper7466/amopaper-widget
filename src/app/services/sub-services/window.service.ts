import { Injectable } from '@angular/core';

export interface IWindowService {
  isFramed: () => boolean;
}

@Injectable()
export class WindowService implements IWindowService {
  public isFramed(): boolean {
    return window.location !== window.parent.location;
  }
}
