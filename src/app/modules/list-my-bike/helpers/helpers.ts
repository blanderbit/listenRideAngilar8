/*
  clear unnecessary characters
*/
export const getClearName = (key: string): string => {
  return key ? key.replace('./', '').replace('.svg', '') : '';
};

const isString = (str: string): boolean => typeof str !== 'string';

export const getName = (day: string | number): string => `price${day}`;

export const SetRound = (day: number, base: number, data: string): any =>
  Math.round(day * base * ((100 - parseFloat(data)) / 100)) || 0;

export const templateMessage = (str?: string): string =>
  `Please fill out all required fields ${str ? `in ${str}` : ''}`;

// TODO: Please, provide naming to explain what is going on
export const numberValidate = (str = ''): string => {
  if (isString(str)) {
    return '';
  }
  const newStr = str.replace(/[^\d,]+/g, '');
  const find = str.indexOf(',');
  if (find > -1) {
    return newStr.split(',', 2).join(',');
  }

  return newStr;
};

export const reformatNumberDTC = (str = '', operand): string => {
  if (isString(str)) {
    return '';
  }
  return operand === '.' ? str.split('.').join(',') : str.split(',').join('.');
};

export const split = (item, operator) =>
  isString(item) ? item.split(operator) : [];
export const concat = (item1, item2) => {
  return Array.isArray(item1) && Array.isArray(item2)
    ? item1.concat(item2)
    : [];
};
