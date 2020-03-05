import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'profilePicturePipe'})
export class ProfilePicturePipe implements PipeTransform {
  transform(value: string): string {
    return value ? value : 'https://s3.eu-central-1.amazonaws.com/listnride/assets/default_profile_picture.jpg';
  }
}
