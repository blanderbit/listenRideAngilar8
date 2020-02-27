import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {LoadedImageInterface} from "../../model/models";

@Component({
    selector: 'lnr-list-step-pictures',
    templateUrl: './list-step-pictures.component.html',
    styleUrls: ['./list-step-pictures.component.scss'],
})
export class ListStepPicturesComponent {
    @Input() picturesFormGroup: FormGroup;
    @Input() loadedPhoto: Array<LoadedImageInterface>;
    @Input() deleted: Array<number> ;
    imageError: Array<string> = [];

    previewFile(files: any): void {
        const arr = files ? Array.from(files) : [];
        this.imageError = [];
        arr.forEach((file: any) => {
            if (!file || (file && !this.isValidImage(file.name))) {
                return this.imageError.push(`${file.name} - no jpg, jpeg, png`);
            }
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const img: any = new Image();
                const vm = this;
                img.onload = function() {
                    const width = this.width;
                    const height = this.height;
                    if (width >= 1200 && height >= 800) {
                        vm.loadedPhoto.push({
                            isMain: false,
                            file,
                            url: reader.result
                        });
                    } else {
                        vm.imageError.push(`${file.name} - ${width}x${height}`);
                    }
                };
                img.src = reader.result;
            };
        });
    }

    isValidImage(value: string): boolean {
        return value.includes('jpeg') || value.includes('jpg') || value.includes('png');
    }

    removePhoto(i: number, type): void {
        if (type === 'image') {
            const data = this[type].splice(i, 1);
            this.deleted.push(data.id);
        }
        if (type === 'loadedPhoto') {
            this[type].splice(i, 1);
        }
    }
}
