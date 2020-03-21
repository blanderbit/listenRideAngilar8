import debounce from 'lodash-es/debounce';

export function Debounce(ms) {
  // tslint:disable-next-line:only-arrow-functions
  return function(target: any, key: any, descriptor: any) {
    const oldFunc = descriptor.value;
    const newFunc = debounce(oldFunc, ms);

    // eslint-disable-next-line no-param-reassign
    descriptor.value = function() {
      // eslint-disable-next-line prefer-rest-params
      return newFunc.apply(this, arguments);
    };
  };
}
