import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragAndDropDirective } from './drag-and-drop.directive';
import { FileBrowserDirective } from './file-browser.directive';

@NgModule({
  declarations: [DragAndDropDirective, FileBrowserDirective],
  imports: [CommonModule],
  exports: [DragAndDropDirective, FileBrowserDirective],
})
export class DirectivesSharedModule {}
