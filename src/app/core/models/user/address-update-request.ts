import {Address} from '@models/user/address';

export interface AddressUpdateRequest {
  locations: { [key: string]: Address };
}
