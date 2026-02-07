export const categoryConfig = {
  'Gastronomie': { emoji: '🍴', color: '#FF5733' },
  'Kavárny a pekárny': { emoji: '☕', color: '#8E44AD' },
  'Bary a noční život': { emoji: '🍸', color: '#E74C3C' },
  'Krása a vizáž': { emoji: '💇', color: '#E91E63' },
  'Wellness a relaxace': { emoji: '🧖', color: '#00BCD4' },
  'Sport a fitness': { emoji: '💪', color: '#16A085' },
  'Zdraví a medicína': { emoji: '🏥', color: '#C0392B' },
  'Obchody a květinářství': { emoji: '🛍️', color: '#34495E' },
  'Ubytování': { emoji: '🏨', color: '#2980B9' },
  'Kultura a umění': { emoji: '🎨', color: '#9C27B0' },
  'Služby a ostatní': { emoji: '📍', color: '#94a3b8' },
};

export const getCategoryStyle = (category) => {
  if (!category) return categoryConfig['Služby a ostatní'];
  
  // Pokud je to už agregovaná kategorie
  if (categoryConfig[category]) {
    return categoryConfig[category];
  }

  // Fallback pro staré volání s neagregovanou kategorií
  return categoryConfig['Služby a ostatní'];
};
