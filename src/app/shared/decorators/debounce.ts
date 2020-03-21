import debounce from 'lodash-es/debounce';

export const Debounce = ms => {
  // tslint:disable-next-line:only-arrow-functions
  return function(target: any, key: any, descriptor: any) {
    const oldFunc = descriptor.value;
    const newFunc = debounce(oldFunc, ms);
    descriptor.value = function() {
      return newFunc.apply(this, arguments);
    };
  };
};
