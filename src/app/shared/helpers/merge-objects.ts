import mergeWith from 'lodash-es/mergeWith';
import cloneDeep from 'lodash-es/cloneDeep';

const customizer = (
  objValue: unknown,
  srcValue: unknown,
): Array<unknown> | undefined => {
  if (Array.isArray(objValue)) {
    return [...new Set(objValue.concat(srcValue))];
  }
  return undefined;
};

export const mergeObjects: typeof mergeWith = (object, source) => {
  return mergeWith(cloneDeep(object), cloneDeep(source), customizer);
};
