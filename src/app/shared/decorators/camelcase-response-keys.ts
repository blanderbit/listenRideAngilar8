import { map } from 'rxjs/operators';
import * as camelcaseKeys from 'camelcase-keys';

const STOP_PATHS: string[] = [
  // Engaged time response
  'hours',
  // Bike data processing result
  'variations',
];

/**
 * Here, tslint is disabled because we need to preserve context,
 * so we need to use not-arrow-functions
 */
export function CamelCaseResponseKeys(): MethodDecorator {
  // tslint:disable-next-line:only-arrow-functions
  return function(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const original = descriptor.value;

    // tslint:disable-next-line:only-arrow-functions
    // eslint-disable-next-line no-param-reassign
    descriptor.value = function() {
      return (
        original
          // eslint-disable-next-line prefer-rest-params
          .apply(this, arguments)
          .pipe(
            map((response: { [key: string]: unknown }) =>
              camelcaseKeys(response, { deep: true, stopPaths: STOP_PATHS }),
            ),
          )
      );
    };
    return descriptor;
  };
}
