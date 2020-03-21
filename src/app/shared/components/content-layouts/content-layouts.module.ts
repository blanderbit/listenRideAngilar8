import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageTextComponent } from './image-text/image-text.component';
import { ImageOnBgTextComponent } from './image-on-bg-text/image-on-bg-text.component';

@NgModule({
  declarations: [ImageTextComponent, ImageOnBgTextComponent],
  exports: [ImageTextComponent, ImageOnBgTextComponent],
  imports: [CommonModule],
})
export class ContentLayoutsModule {}
