import {FormControl} from '@angular/forms';

export class ValidatorsLnr {
  static checkboxRequired(control: FormControl) {
    return !control.value ? {required: true} : null;
  }

  static email(control: FormControl): { [s: string]: boolean } {
    const expression =
      '^((?=.*[a-z])|(?=.*[A-Z])|(?=.*\\d)|(?=.*[$!%*?#\\.\\^\\-_&])|([-!$%^&*()_+|~=`{}\\[\\]:";\'<>?,' +
      '.\\/])|[A-Za-z\\d$$!%*?#\\.\\^\\-_&]{1,254})@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0' +
      '-9]+\\.)+[a-zA-Z]{2,}))$';
    const val = control.value;
    if (!new RegExp(expression).test(val)) {
      if (!/@/.test(val) || val.match(/@/g).length > 1) {
        return {noAt: true};
      }
      if (val.indexOf('@') === 0) {
        return {noName: true};
      }
      if (
        !/@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          val.slice(val.indexOf('@'))
        )
      ) {
        return {wrongDomain: true};
      }
      return {wrongMail: true};
    }
    return null;
  }
}
