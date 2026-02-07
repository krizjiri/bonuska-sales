export const categoryConfig = {
  'Restaurant': { emoji: '🍴', color: '#FF5733' },
  'Czech restaurant': { emoji: '🍺', color: '#D35400' },
  'Cafe': { emoji: '☕', color: '#8E44AD' },
  'Coffee shop': { emoji: '☕', color: '#8E44AD' },
  'Bar': { emoji: '🍸', color: '#E74C3C' },
  'Pub': { emoji: '🍺', color: '#E67E22' },
  'Hotel': { emoji: '🏨', color: '#2980B9' },
  'Park': { emoji: '🌳', color: '#27AE60' },
  'Museum': { emoji: '🏛️', color: '#7F8C8D' },
  'Gym': { emoji: '💪', color: '#16A085' },
  'Beauty salon': { emoji: '💇', color: '#E91E63' },
  'Medical Center': { emoji: '🏥', color: '#C0392B' },
  'School': { emoji: '🏫', color: '#F1C40F' },
  'Store': { emoji: '🛍️', color: '#34495E' },
};

export const getCategoryStyle = (category) => {
  if (!category) return { emoji: '📍', color: '#3388ff' };
  
  for (const [key, value] of Object.entries(categoryConfig)) {
    if (category.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  
  return { emoji: '📍', color: '#3388ff' };
};
