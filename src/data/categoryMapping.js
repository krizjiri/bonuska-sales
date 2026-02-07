
export const CATEGORY_GROUPS = {
  GASTRO: 'Gastronomie',
  CAFE: 'Kavárny a pekárny',
  BARS: 'Bary a noční život',
  BEAUTY: 'Krása a vizáž',
  WELLNESS: 'Wellness a relaxace',
  SPORT: 'Sport a fitness',
  HEALTH: 'Zdraví a medicína',
  SHOPPING: 'Obchody a květinářství',
  ACCOMMODATION: 'Ubytování',
  CULTURE: 'Kultura a umění',
  SERVICES: 'Služby a ostatní',
};

const mapping = [
  { group: CATEGORY_GROUPS.GASTRO, keywords: ['restaurant', 'bistro', 'grill', 'steak', 'pizza', 'burger', 'sushi', 'kebab', 'diner', 'kitchen', 'buffet', 'food court', 'pancake', 'taco', 'wok', 'dim sum', 'dumpling', 'ramen', 'shawarma'] },
  { group: CATEGORY_GROUPS.CAFE, keywords: ['cafe', 'coffee', 'bakery', 'cake', 'pastry', 'confectionery', 'donut', 'creperie', 'sweets', 'dessert', 'espresso bar', 'tea house'] },
  { group: CATEGORY_GROUPS.BARS, keywords: ['bar', 'pub', 'club', 'lounge', 'brewery', 'gastropub', 'beer garden', 'beer hall', 'disco', 'nightclub'] },
  { group: CATEGORY_GROUPS.BEAUTY, keywords: ['salon', 'hair', 'barber', 'nail', 'beautician', 'makeup', 'waxing', 'eyebrow', 'eyelash', 'tanning', 'cosmetics', 'tattoo'] },
  { group: CATEGORY_GROUPS.WELLNESS, keywords: ['spa', 'massage', 'wellness', 'sauna', 'bath', 'retreat'] },
  { group: CATEGORY_GROUPS.SPORT, keywords: ['gym', 'fitness', 'yoga', 'pilates', 'sports', 'martial arts', 'boxing', 'dance', 'cycling', 'pool', 'stadium', 'court', 'rink', 'track', 'trainer', 'boot camp'] },
  { group: CATEGORY_GROUPS.HEALTH, keywords: ['physio', 'therapist', 'clinic', 'medical', 'doctor', 'health', 'hospital', 'dentist', 'chiropractor', 'orthopedic', 'mental', 'counselor', 'nutritionist', 'ayurvedic', 'acupuncture', 'medicine'] },
  { group: CATEGORY_GROUPS.SHOPPING, keywords: ['store', 'shop', 'market', 'boutique', 'gift', 'jewelry', 'goldsmith', 'florist', 'flower', 'jeweler', 'antique', 'clothing', 'fashion', 'bookstore', 'candy', 'cheese', 'butcher', 'wine store'] },
  { group: CATEGORY_GROUPS.ACCOMMODATION, keywords: ['hotel', 'hostel', 'accommodation', 'boarding house', 'serviced accommodation'] },
  { group: CATEGORY_GROUPS.CULTURE, keywords: ['art', 'gallery', 'museum', 'studio', 'cinema', 'theater', 'library', 'cultural', 'exhibition'] },
  { group: CATEGORY_GROUPS.SERVICES, keywords: ['service', 'repair', 'cleaning', 'laundry', 'bank', 'legal', 'insurance', 'consultant', 'office', 'agency', 'wedding', 'pet', 'groomer', 'vet', 'veterinary', 'auto', 'car', 'vehicle', 'travel', 'real estate'] },
];

export const getAggregatedCategory = (category) => {
  if (!category) return CATEGORY_GROUPS.SERVICES;
  
  const lowerCategory = category.toLowerCase();
  
  for (const item of mapping) {
    if (item.keywords.some(keyword => lowerCategory.includes(keyword))) {
      return item.group;
    }
  }
  
  return CATEGORY_GROUPS.SERVICES;
};
