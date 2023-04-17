import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-uploads-foldable-list',
    templateUrl: './uploads-foldable-list.component.html',
    styleUrls: ['./uploads-foldable-list.component.css'],
})
export class UploadsFoldableListComponent {
    @Input() public loadedCount: number;
    @Input() public totalCount: number;
    @Output() protected clearEmitter = new EventEmitter<void>();

    protected isFolded = false;

    protected fold(): void {
        this.isFolded = !this.isFolded;
    }

    protected clear(): void {
        this.clearEmitter.emit();
    }
}
