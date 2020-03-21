// TODO Fix all the esLint errors and warnings
/* eslint-disable */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Dimensions,
  ImageCroppedEvent,
  ImageTransform,
} from 'ngx-image-cropper';
import { CroppedImage } from './cropped-image';

@Component({
  selector: 'lnr-profile-picture-editor',
  templateUrl: './profile-picture-editor.component.html',
  styleUrls: ['./profile-picture-editor.component.scss'],
})
export class ProfilePictureEditorComponent {
  @Input() uploadButtonText = 'Chose image';

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

  @Output() imageReady = new EventEmitter<CroppedImage>();

  @Output() imageEmpty = new EventEmitter<boolean>();

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedImageName = this.imageChangedEvent.target.files[0].name;
    this.croppedImageType = this.imageChangedEvent.target.files[0].type;
    this.croppedImageBlob = this.dataURItoBlob(
      this.croppedImage,
      this.croppedImageType,
    );
    this.imageReady.emit({
      name: this.croppedImageName,
      blob: this.croppedImageBlob,
    });
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
      flipH: !this.transform.flipH,
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV,
    };
  }

  zoomOut() {
    this.scale -= 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  zoomIn() {
    this.scale += 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
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
    this.imageEmpty.emit(true);
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH,
    };
  }

  private dataURItoBlob(dataURI, type) {
    const binary = atob(dataURI.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type,
    });
  }
}
