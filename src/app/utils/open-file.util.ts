import { take } from 'rxjs';
import { EventEmitter } from '@angular/core';

export const openFile = (
    file: File,
    revokeEmitter: EventEmitter<void> | null = null
): void => {
    const url = window.URL.createObjectURL(file);
    window.open(url);

    if (revokeEmitter) {
        revokeEmitter.pipe(take(1)).subscribe(() => {
            window.URL.revokeObjectURL(url);
        });
    }
};
