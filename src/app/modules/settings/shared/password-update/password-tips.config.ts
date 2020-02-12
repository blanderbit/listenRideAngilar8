import {PasswordTip} from './password-tip.interface';

export const passwordTips: PasswordTip[] = [
  {
    rule: 'minlength',
    text: 'At least 8 characters'
  },
  {
    rule: 'uppercase',
    text: '1 or more capital later'
  },
  {
    rule: 'digit',
    text: '1 or more number'
  },
  {
    rule: 'specialchar',
    text: '1 or more special symbol'
  },
  {
    rule: 'maxlength',
    text: 'Maximum 50 characters'
  }
];
