import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'profilePicturePipe' })
export class ProfilePicturePipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(value: string): string {
    return (
      value ||
      'https://s3.eu-central-1.amazonaws.com/listnride/assets/default_profile_picture.jpg'
    );
  }
}
