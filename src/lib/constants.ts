export const REGIONS = [
  'Ahafo',
  'Ashanti',
  'Bono',
  'Bono East',
  'Central',
  'Eastern',
  'Greater Accra',
  'Northern',
  'North East',
  'Oti',
  'Savannah',
  'Upper East',
  'Upper West',
  'Volta',
  'Western',
  'Western North',
];

export const PROPERTY_TYPES = [
  'Apartment',
  'House',
  'Studio',
  'Villa',
  'Townhouse',
  'Duplex',
  'Penthouse',
];

export const SEARCH_REGIONS = ['All', ...REGIONS];

export const SEARCH_PROPERTY_TYPES = ['All', ...PROPERTY_TYPES];

export const RENT_RANGES = [
  { label: 'Any Price', min: undefined, max: undefined },
  { label: '1,000 – 3,000', min: 1000, max: 3000 },
  { label: '3,000 – 5,000', min: 3000, max: 5000 },
  { label: '5,000 – 10,000', min: 5000, max: 10000 },
  { label: '10,000 – 20,000', min: 10000, max: 20000 },
  { label: '20,000+', min: 20000, max: undefined },
];

export const PARKING_OPTIONS = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

export const BEDROOM_OPTIONS = ['1', '2', '3', '4', '5+'];

export const ONBOARDING_AMENITIES = [
  'High-speed WiFi',
  'Air Conditioning',
  'Private Parking Garage',
  'Gated Community with 24/7 Security',
  '24/7 Standby Generator',
  'Water Reservoir (Polytank)',
  'Fully Fitted Kitchen',
  'Swimming Pool',
  'Spacious Balcony',
];

export const DISTRICTS_BY_REGION: Record<string, string[]> = {
  'Greater Accra': [
    'Airport Residential',
    'Cantonments',
    'East Legon',
    'Osu',
    'Labone',
    'Roman Ridge',
    'Tema',
  ],
  Ashanti: ['Kumasi Nhyiaeso', 'Adum', 'Patasi', 'Ahodwo'],
  Western: ['Takoradi Anaji', 'Effiakuma', 'Kwesimintin'],
  Eastern: ['Koforidua', 'Aburi', 'Nkawkaw'],
  Northern: ['Tamale', 'Sagnarigu'],
  Central: ['Cape Coast', 'Elmina', 'Winneba'],
  Ahafo: ['Goaso', 'Duayaw Nkwanta'],
  Bono: ['Sunyani', 'Berekum'],
  'Bono East': ['Techiman', 'Kintampo'],
  'North East': ['Nalerigu', 'Walewale'],
  Oti: ['Dambai', 'Kete Krachi'],
  Savannah: ['Damongo', 'Buipe'],
  'Upper East': ['Bolgatanga', 'Navrongo'],
  'Upper West': ['Wa', 'Jirapa'],
  Volta: ['Ho', 'Keta', 'Aflao'],
  'Western North': ['Sefwi Wiawso', 'Bibiani'],
};
