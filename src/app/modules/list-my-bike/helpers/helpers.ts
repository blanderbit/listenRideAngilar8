/*
  clear unnecessary characters
*/
export const getClearName = (key: string): string => {
  return key ? key.replace('./', '').replace('.svg', '') : '';
};
