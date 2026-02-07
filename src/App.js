import React, { useState, useMemo } from 'react';
import MapComponent from './components/MapComponent';
import Sidebar from './components/Sidebar';
import businessesData from './data/businesses.json';
import categoriesList from './data/categories_list.json';
import { usePersistence } from './hooks/usePersistence';
import { SALES_STATUSES } from './data/salesStatus';

function App() {
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [userAppData, setUserAppData] = usePersistence('bonuska-sales-user-data', {});
  const [filters, setFilters] = useState({
    categories: [],
    statuses: Object.values(SALES_STATUSES),
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

  const filteredBusinesses = useMemo(() => {
    return businessesData.filter(b => {
      const status = userAppData[b.id]?.status || SALES_STATUSES.REACHOUT;
      
      const categoryMatch = filters.categories.length === 0 || 
        filters.categories.includes(b.firstCategory) || 
        filters.categories.includes(b.secondCategory);
        
      const statusMatch = filters.statuses.includes(status);
      
      return categoryMatch && statusMatch;
    });
  }, [filters, userAppData]);

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      <Sidebar 
        selectedBusiness={selectedBusiness}
        onCloseDetail={() => setSelectedBusiness(null)}
        userAppData={userAppData}
        onUpdateAppData={handleUpdateAppData}
        allCategories={categoriesList}
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
