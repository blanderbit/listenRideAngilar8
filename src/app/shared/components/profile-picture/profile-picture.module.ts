import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {ProfilePictureDialogComponent} from '@shared/components/profile-picture/profile-picture-dialog/profile-picture-dialog.component';
import {ProfilePictureEditorComponent} from '@shared/components/profile-picture/profile-picture-editor/profile-picture-editor.component';
import {ProfilePictureComponent} from '@shared/components/profile-picture/profile-picture.component';
import {CommonModule} from '@angular/common';
import {ButtonsModule} from '@shared/components/buttons/buttons.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {HttpErrorMessageModule} from '@shared/components/http-error-message/http-error-message.module';
import {ImageCropperModule} from 'ngx-image-cropper';
import {LoadersModule} from '@shared/components/loader/loaders.module';
import {MatButtonModule} from '@angular/material/button';

const components = [
  ProfilePictureComponent,
  ProfilePictureEditorComponent,
  ProfilePictureDialogComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ImageCropperModule,
    ButtonsModule,
    HttpErrorMessageModule,
    LoadersModule
  ],
  exports: [...components],
  entryComponents: [ProfilePictureDialogComponent]
})
export class ProfilePictureModule {

}
