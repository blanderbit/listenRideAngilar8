import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DialogSuccessComponent } from '@shared/dialogs/dialog-success/dialog-success.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DialogSuccessComponent],
  imports: [MatIconModule, MatDialogModule, MatButtonModule],
  exports: [DialogSuccessComponent],
  entryComponents: [DialogSuccessComponent],
})
export class DialogsModule {}
