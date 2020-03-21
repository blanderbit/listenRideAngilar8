declare var require;

/* eslint-disable @typescript-eslint/no-var-requires */
const Urban = require('./../../../assets/images/icons/categories/urban.svg');
const Special = require('./../../../assets/images/icons/categories/special.svg');
const Road = require('./../../../assets/images/icons/categories/road.svg');
const Kids = require('./../../../assets/images/icons/categories/kids.svg');
const eBike = require('./../../../assets/images/icons/categories/e-bike.svg');
const Transport = require('./../../../assets/images/icons/categories/cargo.svg');
const AllTerrain = require('./../../../assets/images/icons/categories/all-terrain.svg');


export const sizeList = [
  {
    text: 'All Sizes',
    value: null,
  },
  {
    text: 'Unisize',
    value: 0,
  },
  {
    text: '155-165',
    value: 155,
  },
  {
    text: '165-175',
    value: 165,
  },
  {
    text: '165-175',
    value: 165,
  },
  {
    text: '175-185',
    value: 175,
  },
  {
    text: '185-195',
    value: 185,
  },
  {
    text: '195-205',
    value: 195,
  },
  {
    text: '85-95',
    value: 85,
  },
];
export const typeList = [
  {
    type: 'Urban',
    name: 'urban',
    src: Urban,
    active: false,
    categories: [
      {
        text: 'City Bike',
        value: '10',
      },
      {
        text: 'Dutch Bike',
        value: '11',
      },
      {
        text: 'Single Speed Bike',
        value: '12',
      },
    ],
  },
  {
    type: 'E-bike',
    name: 'e-bike',
    src: eBike,
    active: false,
    categories: [
      {
        text: 'E-City Bike',
        value: '20',
      },
      {
        text: 'E-Touring Bike',
        value: '21',
      },
      {
        text: 'E-Cargo Bike',
        value: '22',
      },
      {
        text: 'E-Mountain Bike',
        value: '23',
      },
      {
        text: 'E-Road Bike',
        value: '24',
      },
      {
        text: 'E-Folding Bike',
        value: '25',
      },
      {
        text: 'E-Scooter',
        value: '26',
      },
    ],
  },
  {
    type: 'Road',
    name: 'road',
    src: Road,
    active: false,
    categories: [
      {
        text: 'Road Bike',
        value: '30',
      },
      {
        text: 'Triathlon Bike',
        value: '31',
      },
      {
        text: 'Touring Bike',
        value: '32',
      },
      {
        text: 'Fixed Gear Bike',
        value: '33',
      },
    ],
  },
  {
    type: 'All terrain',
    name: 'all-terrain',
    src: AllTerrain,
    active: false,
    categories: [
      {
        text: 'MTB Hardtail',
        value: '40',
      },
      {
        text: 'MTB Fullsuspension',
        value: '41',
      },
      {
        text: 'Cyclocross Bike',
        value: '42',
      },
      {
        text: 'Gravel Bike',
        value: '43',
      },
    ],
  },
  {
    type: 'Transport',
    name: 'transport',
    src: Transport,
    active: false,
    categories: [
      {
        text: 'Cargo Bike',
        value: '50',
      },
      {
        text: 'Bike Trailer',
        value: '51',
      },
      {
        text: 'Bike Child Seat',
        value: '52',
      },
      {
        text: 'Bike Car Rack',
        value: '53',
      },
      {
        text: 'Bike Travel Bag',
        value: '54',
      },
      {
        text: 'Event Bike',
        value: '55',
      },
    ],
  },
  {
    type: 'Kids',
    name: 'kids',
    src: Kids,
    active: false,
    categories: [
      {
        text: 'City Bike',
        value: '60',
      },
      {
        text: 'All Terrain Bike',
        value: '61',
      },
      {
        text: 'Road Bike',
        value: '62',
      },
      {
        text: 'Bogie Wheel',
        value: '63',
      },
    ],
  },
  {
    type: 'Special',
    name: 'special',
    src: Special,
    active: false,
    categories: [
      {
        text: 'Folding bike',
        value: '70',
      },
      {
        text: 'Recumbent Bike',
        value: '71',
      },
      {
        text: 'Tandem Bike',
        value: '72',
      },
      {
        text: 'Longtail Bike',
        value: '73',
      },
      {
        text: 'Scooter',
        value: '73',
      },
    ],
  },
];

export const brandList = [
  {
    text: '8bar',
    value: '8bar',
  },
  {
    text: 'Benveno',
    value: 'Benveno',
  },
];

export const sortList = [
  {
    text: 'Default',
    value: null,
  },
  {
    text: 'Newest',
    value: 'created_at-desc',
  },
  {
    text: 'Price: High to low',
    value: 'daily_price-desc',
  },
  {
    text: 'Price: Low to High',
    value: 'daily_price-asc',
  },
];
