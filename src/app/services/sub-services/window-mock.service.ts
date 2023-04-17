import { Injectable } from '@angular/core';
import { IWindowService } from './window.service';

@Injectable()
export class WindowMockService implements IWindowService {
    public isFramed(): boolean {
        return true;
    }
}
