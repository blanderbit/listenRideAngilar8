import {Component, Input} from '@angular/core';
import {Dimensions, ImageCroppedEvent, ImageTransform} from 'ngx-image-cropper';
import {ApiUserService} from '@api/api-user/api-user.service';
import {exhaustMap} from 'rxjs/operators';
import {MatHorizontalStepper} from '@angular/material/stepper';

@Component({
  selector: 'lnr-user-verification-logo',
  templateUrl: './user-verification-logo.component.html',
  styleUrls: ['./user-verification-logo.component.scss']
})
export class UserVerificationLogoComponent {
  @Input() stepper: MatHorizontalStepper;
  mode: 'create' | 'update' = 'create';
  imageChangedEvent: any = null;
  croppedImage: any = '';
  canvasRotation = 0;
  rotation = 0;
  scale = 1;
  showCropper = false;
  transform: ImageTransform = {};
  croppedImageName: string;
  croppedImageType: string;
  croppedImageBlob: Blob;
  uploading = false;
  uploaded = false;

  constructor(private apiUserService: ApiUserService) {
  }

  submit() {
    this.uploading = true;
    this.uploaded = false;
    this.apiUserService.me()
      .pipe(exhaustMap((user) => {
          return this.apiUserService.updateLogo(user.id, this.croppedImageBlob, this.croppedImageName);
        }
      ))
      .subscribe((res) => {
        debugger;
        this.uploading = false;
        this.uploaded = true;
      }, (error) => {
        debugger;
        this.uploading = false;
      });
  }


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedImageName = this.imageChangedEvent.target.files[0].name;
    this.croppedImageType = this.imageChangedEvent.target.files[0].type;
    this.croppedImageBlob = this.dataURItoBlob(this.croppedImage, this.croppedImageType);
    console.log(event);
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    };
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {};
  }

  deleteImage(input: any) {
    this.showCropper = false;
    input.value = null;
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH
    };
  }

  private dataURItoBlob(dataURI, type) {
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type
    });
  }
}
