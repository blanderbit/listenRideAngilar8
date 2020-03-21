// TODO Fix to avoid eslint-ignore (see below in file)
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import isEmpty from 'lodash-es/isEmpty';
import pickBy from 'lodash-es/pickBy';

export class ValidatorsLnr {
  static checkboxRequired(control: FormControl) {
    return !control.value ? { required: true } : null;
  }

  static passwordValidator(control: FormControl) {
    if (!control.parent || !control.value) {
      return null;
    }

    const result = pickBy({
      uppercase: !/[A-Z]/.test(control.value),
      digit: !/\d/.test(control.value),
      // eslint-disable-next-line no-useless-escape
      specialchar: !/[!@#\$%^&\*\(\)\[\]\-{}=_+?:;~`"'\.,<>/|\\]/.test(
        control.value,
      ),
      minlength: control.value.length < 8,
      maxlength: control.value.length > 50,
    });

    return isEmpty(result) ? null : { format: result };
  }

  static passwordsMatchValidator(control: FormControl) {
    const password = control.get('password').value;
    const confirmation = control.get('confirmPassword').value;

    if (password !== confirmation) {
      control.get('confirmPassword').setErrors({ match: true });
    } else {
      control.get('confirmPassword').setErrors(null);
    }

    return null;
  }

  static email(control: FormControl): { [s: string]: boolean } {
    const expression = /(?!^[.+&'_-]*@.*$)(^[_\w\d+&'-]+(\.[_\w\d+&'-]*)*@[\w\d-]+(\.[\w\d-]+)*\.(([\d]{1,3})|([\w]{2,}))$)/i;
    const val = control.value;
    if (!new RegExp(expression).test(val)) {
      if (!/@/.test(val) || val.match(/@/g).length > 1) {
        return { noAt: true };
      }
      if (val.indexOf('@') === 0) {
        return { noName: true };
      }
      if (
        !/@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          val.slice(val.indexOf('@')),
        )
      ) {
        return { wrongDomain: true };
      }
      return { wrongMail: true };
    }
    return null;
  }

  static minLength(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = String(control.value);

      if (value.length && value.length < +minLength) {
        return { minlength: true, requiredValue: minLength };
      }

      return null;
    };
  }

  static maxLength(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = String(control.value);

      if (value.length > +maxLength) {
        return { maxlength: true, requiredValue: maxLength };
      }

      return null;
    };
  }
}
