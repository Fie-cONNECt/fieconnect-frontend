export interface Property {
  id: number;
  title: string;
  type: 'Apartment' | 'Studio' | 'Townhouse' | 'Penthouse';
  location: string;
  region: 'Greater Accra' | 'Ashanti' | 'Western' | 'Eastern';
  price: string;
  verified: boolean;
  bedrooms: string;
  bathrooms: string;
  size: string;
  parking: string;
  about: string;
  amenities: string[];
  mapDescription: string;
  lat: number;
  lng: number;
  image: string;
  images: {
    main: string;
    kitchen: string;
    bedroom: string;
    bathroom: string;
  };
  landlord: {
    name: string;
    phone: string;
    email: string;
    avatar: string;
    verified: boolean;
  };
}

export const propertiesDb: Property[] = [
  // 1. Greater Accra Combinations
  {
    id: 1,
    title: 'Modern 3-Bedroom Apartment',
    type: 'Apartment',
    location: '12 Ringway Cres, Cantonments, Greater Accra',
    region: 'Greater Accra',
    price: 'GHS 4,500',
    verified: true,
    bedrooms: '3 Rooms',
    bathrooms: '3.5 Baths',
    size: '2,400 sqft',
    parking: '2 Spaces',
    about:
      'Nestled in the heart of Cantonments, this sophisticated 3-bedroom apartment offers a blend of modern elegance and functional luxury. The open-plan layout is designed for both entertaining and relaxation, featuring premium finishes, floor-to-ceiling windows, and abundant natural light throughout.',
    amenities: [
      '24/7 Security',
      'Water Storage',
      'Swimming Pool',
      'Gym Facility',
      'Back-up Power',
      'Elevator',
    ],
    mapDescription:
      'Located 5 minutes from the American Embassy. Close to premium schools and international restaurants.',
    lat: 5.5786,
    lng: -0.1704,
    image:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
    images: {
      main: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      kitchen:
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop',
      bedroom:
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600&auto=format&fit=crop',
      bathroom:
        'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=600&auto=format&fit=crop',
    },
    landlord: {
      name: 'Mr. Kofi Mensah',
      phone: '+233 24 123 4567',
      email: 'kofi.m@email.com',
      avatar:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop',
      verified: true,
    },
  },
  {
    id: 2,
    title: 'Cozy City Studio',
    type: 'Studio',
    location: 'Airport Residential Area, Greater Accra',
    region: 'Greater Accra',
    price: 'GHS 2,800',
    verified: true,
    bedrooms: '1 Room',
    bathrooms: '1 Bath',
    size: '720 sqft',
    parking: '1 Space',
    about:
      'An exquisitely designed studio flat located in the most secure enclave of Airport Residential. Perfectly optimized layout with a high-end kitchenette, smart-home locks, and access to a premium sky lounge and rooftop pool.',
    amenities: ['24/7 Security', 'Water Storage', 'Rooftop Pool', 'Elevator', 'Back-up Power'],
    mapDescription:
      'Located 7 minutes from Kotoka International Airport. Walking distance from fine-dining restaurants.',
    lat: 5.6053,
    lng: -0.1776,
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop',
    images: {
      main: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop',
      kitchen:
        'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=600&auto=format&fit=crop',
      bedroom:
        'https://images.unsplash.com/photo-1502672090437-224176051197?q=80&w=600&auto=format&fit=crop',
      bathroom:
        'https://images.unsplash.com/photo-1620626011761-996317b69798?q=80&w=600&auto=format&fit=crop',
    },
    landlord: {
      name: 'Ms. Naa Adjeley',
      phone: '+233 27 777 8888',
      email: 'adjeley.n@email.com',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
      verified: true,
    },
  },
  {
    id: 3,
    title: 'Spacious Family Townhouse',
    type: 'Townhouse',
    location: 'Tema Community 6, Greater Accra',
    region: 'Greater Accra',
    price: 'GHS 6,000',
    verified: true,
    bedrooms: '4 Rooms',
    bathrooms: '4.5 Baths',
    size: '3,200 sqft',
    parking: '3 Spaces',
    about:
      'A multi-level modern townhouse in Tema Community 6. Excellent choice for families looking for high-end spatial efficiency, premium flooring, custom kitchen carpentry, and a private green lawn garden.',
    amenities: [
      '24/7 Security',
      'Back-up Power',
      'Swimming Pool',
      'Kids Play Area',
      'Water Storage',
      'Solar Backup',
    ],
    mapDescription:
      'Located 10 minutes from the Tema Harbour. Close to international schools and Tema Golf Club.',
    lat: 5.6494,
    lng: -0.0175,
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop',
    images: {
      main: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
      kitchen:
        'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=600&auto=format&fit=crop',
      bedroom:
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=600&auto=format&fit=crop',
      bathroom:
        'https://images.unsplash.com/photo-1620626011761-996317b69798?q=80&w=600&auto=format&fit=crop',
    },
    landlord: {
      name: 'Mr. John Lamptey',
      phone: '+233 20 444 5555',
      email: 'lamptey.j@email.com',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
      verified: true,
    },
  },
  {
    id: 4,
    title: 'Luxury Heights Penthouse',
    type: 'Penthouse',
    location: 'Airport Residential Area, Greater Accra',
    region: 'Greater Accra',
    price: 'GHS 12,000',
    verified: true,
    bedrooms: '4 Rooms',
    bathrooms: '4.5 Baths',
    size: '4,500 sqft',
    parking: '3 Spaces',
    about:
      'An spectacular penthouse apartment representing the pinnacle of luxurious city living. Spans across two levels, with private elevators, expansive glass balconies providing panoramic skyline vistas, and a private jacuzzi.',
    amenities: [
      '24/7 Security',
      'Water Storage',
      'Private Jacuzzi',
      'Rooftop Pool',
      'Concierge Service',
      'Back-up Power',
    ],
    mapDescription:
      'Located in the most sought-after tower in Airport Residential. 5 minutes from Kotoka Airport.',
    lat: 5.6025,
    lng: -0.1802,
    image:
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop',
    images: {
      main: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop',
      kitchen:
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop',
      bedroom:
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600&auto=format&fit=crop',
      bathroom:
        'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=600&auto=format&fit=crop',
    },
    landlord: {
      name: 'Mr. Kofi Mensah',
      phone: '+233 24 123 4567',
      email: 'kofi.m@email.com',
      avatar:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop',
      verified: true,
    },
  },

  // 2. Ashanti Region Combinations
  {
    id: 5,
    title: 'Garden City Heights Apartment',
    type: 'Apartment',
    location: 'Nhyiaeso Residential Area, Kumasi, Ashanti',
    region: 'Ashanti',
    price: 'GHS 3,200',
    verified: true,
    bedrooms: '3 Rooms',
    bathrooms: '2.5 Baths',
    size: '1,800 sqft',
    parking: '2 Spaces',
    about:
      'A beautiful modern 3-bedroom apartment located in the prestigious suburb of Nhyiaeso, Kumasi. Features high ceilings, classic hardwood cabinetry, private balconies, and a quiet communal atmosphere.',
    amenities: ['24/7 Security', 'Water Storage', 'Back-up Power', 'Communal Garden'],
    mapDescription: 'Located 4 minutes from the Golden Tulip Kumasi. Peaceful tree-lined street.',
    lat: 6.6852,
    lng: -1.6384,
    image:
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800&auto=format&fit=crop',
    images: {
      main: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop',
      kitchen:
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop',
      bedroom:
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop',
      bathroom:
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop',
    },
    landlord: {
      name: 'Ms. Ama Serwaa',
      phone: '+233 55 987 6543',
      email: 'serwaa.a@email.com',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
      verified: true,
    },
  },
  {
    id: 6,
    title: 'Executive Studio',
    type: 'Studio',
    location: '45 Ahodwo Nhyiaeso, Kumasi, Ashanti',
    region: 'Ashanti',
    price: 'GHS 2,200',
    verified: true,
    bedrooms: '1 Room',
    bathrooms: '1 Bath',
    size: '850 sqft',
    parking: '1 Space',
    about:
      'An executive, modern studio apartment located in the prime residential hub of Kumasi. Offers absolute comfort, safety, and a beautifully optimized kitchen, perfect for a single professional or couple.',
    amenities: ['24/7 Security', 'Water Storage', 'Back-up Power', 'Gym Facility'],
    mapDescription:
      'Located 3 minutes from the Kumasi Royal Golf Club. Close to shopping centers and transit hubs.',
    lat: 6.6666,
    lng: -1.6244,
    image:
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop',
    images: {
      main: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop',
      kitchen:
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop',
      bedroom:
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop',
      bathroom:
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop',
    },
    landlord: {
      name: 'Ms. Ama Serwaa',
      phone: '+233 55 987 6543',
      email: 'serwaa.a@email.com',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
      verified: true,
    },
  },
  {
    id: 7,
    title: 'Royal Ridge Townhouse',
    type: 'Townhouse',
    location: 'Nhyiaeso Heights, Kumasi, Ashanti',
    region: 'Ashanti',
    price: 'GHS 4,800',
    verified: true,
    bedrooms: '3 Rooms',
    bathrooms: '3.5 Baths',
    size: '2,600 sqft',
    parking: '2 Spaces',
    about:
      'A prestigious multi-level townhouse offering high security and space efficiency. Nestled in a gated community in Nhyiaeso, it offers a secure kids play yard, backing gas lines, and fully fitted kitchen specs.',
    amenities: ['24/7 Security', 'Back-up Power', 'Kids Play Area', 'Water Storage'],
    mapDescription: 'Located 5 minutes from Kumasi Sports Stadium. Easy highway accessibility.',
    lat: 6.6801,
    lng: -1.6335,
    image:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop',
    images: {
      main: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop',
      kitchen:
        'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=600&auto=format&fit=crop',
      bedroom:
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=600&auto=format&fit=crop',
      bathroom:
        'https://images.unsplash.com/photo-1620626011761-996317b69798?q=80&w=600&auto=format&fit=crop',
    },
    landlord: {
      name: 'Mr. John Lamptey',
      phone: '+233 20 444 5555',
      email: 'lamptey.j@email.com',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
      verified: true,
    },
  },
  {
    id: 8,
    title: 'Sovereign Heights Penthouse',
    type: 'Penthouse',
    location: 'Asokwa Luxury Towers, Kumasi, Ashanti',
    region: 'Ashanti',
    price: 'GHS 7,500',
    verified: true,
    bedrooms: '3 Rooms',
    bathrooms: '3 Baths',
    size: '3,000 sqft',
    parking: '2 Spaces',
    about:
      'An elite penthouse unit occupying the top two floors of the Asokwa Towers. Features custom wood details, private rooftop deck access, and amazing 360 views of Kumasi city.',
    amenities: [
      '24/7 Security',
      'Water Storage',
      'Private Jacuzzi',
      'Rooftop Pool',
      'Back-up Power',
    ],
    mapDescription: 'Located near Kumasi City Mall. Excellent retail access.',
    lat: 6.6712,
    lng: -1.6112,
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
    images: {
      main: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
      kitchen:
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop',
      bedroom:
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600&auto=format&fit=crop',
      bathroom:
        'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=600&auto=format&fit=crop',
    },
    landlord: {
      name: 'Ms. Ama Serwaa',
      phone: '+233 55 987 6543',
      email: 'serwaa.a@email.com',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
      verified: true,
    },
  },

  // 3. Western Region Combinations
  {
    id: 9,
    title: 'Coastal View Apartment',
    type: 'Apartment',
    location: 'Atlantic Enclave, Takoradi, Western',
    region: 'Western',
    price: 'GHS 3,500',
    verified: true,
    bedrooms: '2 Rooms',
    bathrooms: '2 Baths',
    size: '1,500 sqft',
    parking: '1 Space',
    about:
      'A spectacular 2-bedroom seaside apartment in Takoradi. Features private beach access, a gorgeous modern open-plan kitchen, and deep sea breezes.',
    amenities: ['24/7 Security', 'Water Storage', 'Beach Access', 'Back-up Power'],
    mapDescription:
      'Located 2 minutes from Takoradi Beach. Quiet and relaxing sounds of ocean waves.',
    lat: 4.8923,
    lng: -1.7584,
    image:
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop',
    images: {
      main: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1200&auto=format&fit=crop',
      kitchen:
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop',
      bedroom:
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop',
      bathroom:
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop',
    },
    landlord: {
      name: 'Mr. John Lamptey',
      phone: '+233 20 444 5555',
      email: 'lamptey.j@email.com',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
      verified: true,
    },
  },
  {
    id: 10,
    title: 'Atlantic Breeze Studio',
    type: 'Studio',
    location: 'Beach Road Enclave, Takoradi, Western',
    region: 'Western',
    price: 'GHS 1,900',
    verified: true,
    bedrooms: '1 Room',
    bathrooms: '1 Bath',
    size: '780 sqft',
    parking: '1 Space',
    about:
      'A gorgeous, well-ventilated studio apartment on Beach Road. Features custom layout, secure fencing, electric gates, and quick access to Takoradi Harbour.',
    amenities: ['24/7 Security', 'Water Storage', 'Back-up Power', 'High-speed Internet'],
    mapDescription:
      'Located 4 minutes from Takoradi Harbour. Walking distance from beachside bars.',
    lat: 4.8876,
    lng: -1.7523,
    image:
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?q=80&w=800&auto=format&fit=crop',
    images: {
      main: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?q=80&w=1200&auto=format&fit=crop',
      kitchen:
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop',
      bedroom:
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop',
      bathroom:
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop',
    },
    landlord: {
      name: 'Ms. Ama Serwaa',
      phone: '+233 55 987 6543',
      email: 'serwaa.a@email.com',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
      verified: true,
    },
  },
  {
    id: 11,
    title: 'Oil City Townhouse',
    type: 'Townhouse',
    location: 'Kwesimintsim Estates, Sekondi-Takoradi, Western',
    region: 'Western',
    price: 'GHS 4,500',
    verified: true,
    bedrooms: '3 Rooms',
    bathrooms: '3 Baths',
    size: '2,400 sqft',
    parking: '2 Spaces',
    about:
      'A multi-level custom townhouse in a gated family community. Perfect for professionals in the oil & gas industry looking for safety and peace.',
    amenities: ['24/7 Security', 'Back-up Power', 'Kids Play Area', 'Water Storage'],
    mapDescription: 'Located 15 minutes from Takoradi Mall. Highly accessible family suburb.',
    lat: 4.9087,
    lng: -1.7745,
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
    images: {
      main: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
      kitchen:
        'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=600&auto=format&fit=crop',
      bedroom:
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=600&auto=format&fit=crop',
      bathroom:
        'https://images.unsplash.com/photo-1620626011761-996317b69798?q=80&w=600&auto=format&fit=crop',
    },
    landlord: {
      name: 'Mr. John Lamptey',
      phone: '+233 20 444 5555',
      email: 'lamptey.j@email.com',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
      verified: true,
    },
  },
  {
    id: 12,
    title: 'Ocean Crest Penthouse',
    type: 'Penthouse',
    location: 'Ridge Sea View, Takoradi, Western',
    region: 'Western',
    price: 'GHS 9,000',
    verified: true,
    bedrooms: '3 Rooms',
    bathrooms: '3.5 Baths',
    size: '3,500 sqft',
    parking: '2 Spaces',
    about:
      'An absolute masterpiece of design, this sea-facing penthouse offers private elevator entry, double height living area, and vast terraces overlooking the Atlantic.',
    amenities: [
      '24/7 Security',
      'Water Storage',
      'Private Jacuzzi',
      'Rooftop Pool',
      'Back-up Power',
    ],
    mapDescription:
      'Located in Ridge Takoradi, the most premium residential enclave in the region.',
    lat: 4.9016,
    lng: -1.7831,
    image:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
    images: {
      main: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      kitchen:
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop',
      bedroom:
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600&auto=format&fit=crop',
      bathroom:
        'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=600&auto=format&fit=crop',
    },
    landlord: {
      name: 'Mr. Kofi Mensah',
      phone: '+233 24 123 4567',
      email: 'kofi.m@email.com',
      avatar:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop',
      verified: true,
    },
  },

  // 4. Eastern Region Combinations
  {
    id: 13,
    title: 'Mountain View Apartment',
    type: 'Apartment',
    location: 'Hillside Enclave, Koforidua, Eastern',
    region: 'Eastern',
    price: 'GHS 2,500',
    verified: true,
    bedrooms: '2 Rooms',
    bathrooms: '2 Baths',
    size: '1,300 sqft',
    parking: '1 Space',
    about:
      'A peaceful, hillside 2-bedroom apartment in Koforidua. Panoramic views of the mountain ridge, clean air, large kitchen, and private parking.',
    amenities: ['24/7 Security', 'Water Storage', 'Mountain View Garden', 'Back-up Power'],
    mapDescription: 'Located 6 minutes from Koforidua technical university. Highly scenic escape.',
    lat: 6.0944,
    lng: -0.2591,
    image:
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=800&auto=format&fit=crop',
    images: {
      main: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200&auto=format&fit=crop',
      kitchen:
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop',
      bedroom:
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop',
      bathroom:
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop',
    },
    landlord: {
      name: 'Ms. Ama Serwaa',
      phone: '+233 55 987 6543',
      email: 'serwaa.a@email.com',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
      verified: true,
    },
  },
  {
    id: 14,
    title: 'Hilltop Studio Aburi',
    type: 'Studio',
    location: 'Peduase Enclave, Aburi, Eastern',
    region: 'Eastern',
    price: 'GHS 2,600',
    verified: true,
    bedrooms: '1 Room',
    bathrooms: '1 Bath',
    size: '800 sqft',
    parking: '1 Space',
    about:
      'A luxurious hilltop studio in the cooling climates of Aburi. Perfect weekend gateway or executive house for telecommuters.',
    amenities: [
      '24/7 Security',
      'Water Storage',
      'Private Balcony',
      'Back-up Power',
      'Solar Heating',
    ],
    mapDescription: 'Located 3 minutes from Peduase Presidential Lodge. Peaceful cool winds.',
    lat: 5.7235,
    lng: -0.1743,
    image:
      'https://images.unsplash.com/photo-1502672090437-224176051197?q=80&w=800&auto=format&fit=crop',
    images: {
      main: 'https://images.unsplash.com/photo-1502672090437-224176051197?q=80&w=1200&auto=format&fit=crop',
      kitchen:
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop',
      bedroom:
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop',
      bathroom:
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop',
    },
    landlord: {
      name: 'Mr. Kofi Mensah',
      phone: '+233 24 123 4567',
      email: 'kofi.m@email.com',
      avatar:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop',
      verified: true,
    },
  },
  {
    id: 15,
    title: 'Valley View Townhouse',
    type: 'Townhouse',
    location: 'Ridge Heights, Koforidua, Eastern',
    region: 'Eastern',
    price: 'GHS 4,000',
    verified: true,
    bedrooms: '3 Rooms',
    bathrooms: '3 Baths',
    size: '2,200 sqft',
    parking: '2 Spaces',
    about:
      'A classic 3-bedroom townhouse in a secure gated estate in Koforidua. Ideal for family living with premium kitchen appliances and fitted wardrobes.',
    amenities: ['24/7 Security', 'Water Storage', 'Playground', 'Back-up Power'],
    mapDescription: 'Located 5 minutes from Koforidua central market. Scenic valley views.',
    lat: 6.0912,
    lng: -0.2645,
    image:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop',
    images: {
      main: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop',
      kitchen:
        'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=600&auto=format&fit=crop',
      bedroom:
        'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=600&auto=format&fit=crop',
      bathroom:
        'https://images.unsplash.com/photo-1620626011761-996317b69798?q=80&w=600&auto=format&fit=crop',
    },
    landlord: {
      name: 'Mr. John Lamptey',
      phone: '+233 20 444 5555',
      email: 'lamptey.j@email.com',
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
      verified: true,
    },
  },
  {
    id: 16,
    title: 'Summit Heights Penthouse',
    type: 'Penthouse',
    location: 'Aburi Ridge Summit, Aburi, Eastern',
    region: 'Eastern',
    price: 'GHS 8,000',
    verified: true,
    bedrooms: '3 Rooms',
    bathrooms: '3 Baths',
    size: '3,200 sqft',
    parking: '2 Spaces',
    about:
      'An outstanding luxury penthouse sitting atop the highest point of Aburi ridge. Magnificent panoramic vistas, floor-to-ceiling glass design, fireplace, and private garden.',
    amenities: [
      '24/7 Security',
      'Water Storage',
      'Aburi ridge deck',
      'Back-up Power',
      'Solar Heating',
    ],
    mapDescription: 'Located 10 minutes from Aburi Botanical Gardens. Clean forest mountain air.',
    lat: 5.7312,
    lng: -0.1654,
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
    images: {
      main: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
      kitchen:
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop',
      bedroom:
        'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600&auto=format&fit=crop',
      bathroom:
        'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=600&auto=format&fit=crop',
    },
    landlord: {
      name: 'Mr. Kofi Mensah',
      phone: '+233 24 123 4567',
      email: 'kofi.m@email.com',
      avatar:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop',
      verified: true,
    },
  },
];
