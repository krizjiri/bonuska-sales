import React, { useState, useMemo } from 'react';
import MapComponent from './components/MapComponent';
import Sidebar from './components/Sidebar';
import businessesData from './data/businesses.json';
import { getAggregatedCategory } from './data/categoryMapping';
import { usePersistence } from './hooks/usePersistence';
import { SALES_STATUSES } from './data/salesStatus';
import { LOYALTY_STATUSES } from './data/loyaltyStatus';

function App() {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [userAppData, setUserAppData] = usePersistence('bonuska-sales-user-data', {});
  const [filters, setFilters] = useState({
    categories: [],
    statuses: Object.values(SALES_STATUSES),
    loyaltyStatuses: Object.values(LOYALTY_STATUSES),
    searchTerm: '',
  });

  const handleUpdateAppData = (id, newData) => {
    setUserAppData(prev => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        ...newData,
      }
    }));
  };

  const aggregatedCategories = useMemo(() => {
    const categories = new Set();
    businessesData.forEach(b => {
      if (b.firstCategory) categories.add(getAggregatedCategory(b.firstCategory));
      if (b.secondCategory && b.secondCategory.trim()) categories.add(getAggregatedCategory(b.secondCategory));
    });
    return Array.from(categories).sort();
  }, []);

  const filteredBusinesses = useMemo(() => {
    return businessesData.filter(b => {
      const status = userAppData[b.id]?.status || SALES_STATUSES.REACHOUT;
      const loyaltyStatus = userAppData[b.id]?.loyaltyStatus || LOYALTY_STATUSES.UNKNOWN;
      
      const bAggregatedCats = [
        getAggregatedCategory(b.firstCategory),
        b.secondCategory && b.secondCategory.trim() ? getAggregatedCategory(b.secondCategory) : null
      ].filter(Boolean);

      const categoryMatch = filters.categories.length === 0 || 
        filters.categories.some(cat => bAggregatedCats.includes(cat));
        
      const statusMatch = filters.statuses.includes(status);

      const nameMatch = !filters.searchTerm || 
        (b.name && b.name.toLowerCase().includes(filters.searchTerm.toLowerCase()));
      
      const loyaltyMatch = filters.loyaltyStatuses.includes(loyaltyStatus);
      
      return categoryMatch && statusMatch && nameMatch && loyaltyMatch;
    });
  }, [filters, userAppData]);

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      <Sidebar 
        selectedBusiness={selectedBusiness}
        onCloseDetail={() => setSelectedBusiness(null)}
        userAppData={userAppData}
        onUpdateAppData={handleUpdateAppData}
        allCategories={aggregatedCategories}
        filters={filters}
        onUpdateFilters={setFilters}
      />
      <main className="flex-1 h-full relative">
        <MapComponent 
          businesses={filteredBusinesses} 
          userAppData={userAppData}
          onSelectBusiness={setSelectedBusiness}
          selectedBusiness={selectedBusiness}
        />
        <div className="absolute top-4 right-4 z-[1000] bg-white p-3 rounded-lg shadow-md border">
          <p className="text-sm font-bold text-gray-700">Zobrazeno: {filteredBusinesses.length} podniků</p>
        </div>
      </main>
    </div>
  );
}

export default App;
