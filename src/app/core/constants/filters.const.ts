export const sizeList = [
  {
    text: 'All Sizes',
    value: -1,
  },
  {
    text: 'Unisize',
    value: 0,
  },
  {
    text: '155-165',
    value: 155
  },
  {
    text: '165-175',
    value: 165
  },
  {
    text: '165-175',
    value: 165
  },
  {
    text: '175-185',
    value: 175
  },
  {
    text: '185-195',
    value: 185
  },
  {
    text: '195-205',
    value: 195
  },
  {
    text: '85-95',
    value: 85
  }
];
export const typeList = [{
  type: 'Urban',
  active: false,
  subcategories: [
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
  ]
},
  {
    type: 'E-bike',
    active: false,
    subcategories: [
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
    ]
  },
  {
    type: 'Road Bike',
    active: false,
    subcategories: [
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
    ]
  },
  {
    type: 'All-terrain',
    active: false,
    subcategories: [
      {
        text: 'MTB Hardtail',
        value: '40',
      },
      {
        text: 'MTB Full suspension',
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
    ]
  },
  {
    type: 'Transport',
    active: false,
    subcategories: [
      {
        text: 'Cargo bike',
        value: '50',
      },
      {
        text: 'Bike trailer',
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
    ]
  },
  {
    type: 'Kids',
    active: false,
    subcategories: [
      {
        text: 'City Bike',
        value: '60',
      },
      {
        text: 'All-terrain bike',
        value: '61',
      },
      {
        text: 'Road Bike',
        value: '62',
      },
      {
        text: 'Bogie Bike',
        value: '63',
      },
    ]
  },
  {
    type: 'Special',
    active: false,
    subcategories: [
      {
        text: 'Folding Bike',
        value: '70',
      },
      {
        text: 'Recumbent bike',
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
        value: '74',
      },
    ]
  },
];

export const brandList = [
  {
    text: '8bar',
    value: '8bar',
  },
  {
    text: 'Benveno',
    value: 'Benveno'
  }];

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
    value: 'daily_price-desc'
  },
  {
    text: 'Price: Low to High',
    value: 'daily_price-asc'
  }
];
