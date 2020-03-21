// import {UnavailableDaysResponse} from '@api/api-rides/types';
// import {UnavailableDates} from '@models/bike/bike.types';
import * as moment from 'moment';
// export const processUnavailableDaysResponse = (
//   response: UnavailableDaysResponse
// ): UnavailableDates =>
//     ({
//         days: Object.entries(response.days).reduce(
//     (acc, [key, datesString]) => ({
//       ...acc,
//       [key]: datesString.map(str => moment(new Date(str)))
//     }),
//     {} as UnavailableDates
//   )})
