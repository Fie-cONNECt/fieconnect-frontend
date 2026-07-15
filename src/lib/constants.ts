export const REGIONS = [
  "Ahafo",
  "Ashanti",
  "Bono",
  "Bono East",
  "Central",
  "Eastern",
  "Greater Accra",
  "Northern",
  "North East",
  "Oti",
  "Savannah",
  "Upper East",
  "Upper West",
  "Volta",
  "Western",
  "Western North",
];

export const PROPERTY_TYPES = [
  "Apartment",
  "House",
  "Studio",
  "Villa",
  "Townhouse",
  "Duplex",
  "Penthouse",
];

export const SEARCH_REGIONS = ["All", ...REGIONS];

export const SEARCH_PROPERTY_TYPES = ["All", ...PROPERTY_TYPES];

export const RENT_RANGES = [
  { label: "Any Price", min: undefined, max: undefined },
  { label: "1,000 – 3,000", min: 1000, max: 3000 },
  { label: "3,000 – 5,000", min: 3000, max: 5000 },
  { label: "5,000 – 10,000", min: 5000, max: 10000 },
  { label: "10,000 – 20,000", min: 10000, max: 20000 },
  { label: "20,000+", min: 20000, max: undefined },
];

export const PARKING_OPTIONS = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];
