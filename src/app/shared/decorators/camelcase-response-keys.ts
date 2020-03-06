import {map} from 'rxjs/operators';
import * as camelcaseKeys from 'camelcase-keys';

/**
 * Here, tslint is disabled because we need to preserve context,
 * so we need to use not-arrow-functions
 */
export function CamelCaseResponseKeys(): MethodDecorator {
  // tslint:disable-next-line:only-arrow-functions
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;

    // tslint:disable-next-line:only-arrow-functions
    descriptor.value = function() {
      return original
        .apply(this, arguments)
        .pipe(
          map((response: {[key: string]: unknown}) =>
            camelcaseKeys(response, {deep: true})
          )
        );
    };
    return descriptor;
  };
}
