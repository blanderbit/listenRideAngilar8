/*
  clear unnecessary characters
*/
export const getClearName = (key: string): string => {
  return key ? key.replace('./', '').replace('.svg', '') : '';
};

const isString = (str: string ) : boolean => typeof str !== 'string';

export const getName = (day: string | number): string => `price${day}`;

export const SetRound = (
  day: number,
  base: number,
  data: string
): any => Math.round(day * base * ((100 - parseFloat(data)) / 100)) || 0;

export const templateMessage = (str?: string): string => `Please fill out all required fields ${str ? 'in ' + str : ''}`;

export const numberValidate = (str: string = ''): string => {
  if (isString(str)) {
    return '';
  }
  str = str.replace(/[^\d\,]+/g, '');
  let find = str.indexOf(',');
  find > -1 && (str = str.split(',', 2).join(','));
  return str;
};

export const reformatNumberDTC = (str: string = '', operand): string => {
  if (isString(str)) {
    return '';
  }
  return operand === '.' ? str.split('.').join(',') : str.split(',').join('.');
};

export const split = (item, operator) => isString(item) ? item.split(operator) : [];
export const concat = (item1, item2) => {
  return Array.isArray(item1) && Array.isArray(item2)? item1.concat(item2) : [];
}
