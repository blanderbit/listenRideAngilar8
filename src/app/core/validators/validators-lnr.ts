import {FormControl} from '@angular/forms';
import {isEmpty, pickBy} from 'lodash';

export class ValidatorsLnr {
  static checkboxRequired(control: FormControl) {
    return !control.value ? {required: true} : null;
  }

  static passwordValidator(control: FormControl) {
    if (!control.parent || !control.value) {
      return null;
    }

    const result = pickBy({
      uppercase: !/[A-Z]/.test(control.value),
      digit: !/\d/.test(control.value),
      specialchar: !/[!@#\$%^&\*\(\)\[\]\-{}=_+?:;~`"'\.,<>/|\\]/.test(control.value),
      minlength: control.value.length < 8,
      maxlength: control.value.length > 50
    });

    return isEmpty(result) ? null : {format: result};
  }

  static passwordsMatchValidator(control: FormControl) {
    const password = control.get('password').value;
    const confirmation = control.get('confirmPassword').value;

    if (password !== confirmation) {
      control.get('confirmPassword').setErrors({match: true});
    } else {
      control.get('confirmPassword').setErrors(null);
    }

    return null;
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
