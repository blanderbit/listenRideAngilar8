import {AccessoriesImageInterface} from './models';

export class BIKE {
    constructor(init?: Partial<BIKE>) {
        Object.assign(this, init);
    }

    new_images: Array<Images>;
    variations: Array<Variations>;
    is_equipment: boolean = false;
    details: string = '';
    frame_number: string = '';
    description: string = '';
    brand: string = '';
    name: string = '';
    bicycle_number: string = '';
    frame_size: string = '';
    coverage_total: number;
    custom_price: number;
    size: number;
    user_id: number;
    discounts: Discounts;
    location: Location;
    prices: Array<Prices>;
    accessories: AccessoriesImageInterface;
    available: boolean;
}

class Location {
    constructor(init?: Partial<Location>) {
        Object.assign(this, init);
    }

    street: string = '';
    zip: string = '';
    city: string = '';
    country: string = '';
}

class Prices {
    constructor(init?: Partial<Prices>) {
        Object.assign(this, init);
    }

    prices: number;
    start_at: number;
}

class Discounts {
    constructor(init?: Partial<Discounts>) {
        Object.assign(this, init);
    }

    daily: number;
    weekly: number;
}

class Images {
    constructor(init?: Partial<Images>) {
        Object.assign(this, init);
    }

    file: FormData;
    is_primary: boolean;
    position: number;
}

class Variations {
    constructor(init?: Partial<Variations>) {
        Object.assign(this, init);
    }

    size: boolean;
    frame_size: string;
    bicycle_number: string;
    frame_number: string;
    available: boolean;
}
