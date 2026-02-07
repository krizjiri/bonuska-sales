import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Import Leaflet styles in JS to ensure they are loaded
import 'leaflet/dist/leaflet.css';
import { getCategoryStyle } from '../data/categoryConfig';
import { STATUS_CONFIG, SALES_STATUSES } from '../data/salesStatus';

// Oprava výchozích ikon v Leafletu pro React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const createCustomIcon = (category, status) => {
  const { emoji } = getCategoryStyle(category);
  const statusColor = STATUS_CONFIG[status]?.color || '#94a3b8';
  
  return L.divIcon({
    html: `<div style="
      background-color: ${statusColor};
      border: 2px solid white;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    ">
      ${emoji}
    </div>`,
    className: 'custom-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15],
  });
};

function MapController({ businesses, selectedBusiness }) {
  const map = useMap();
  
  useEffect(() => {
    // Vynucení překreslení mapy při načtení
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);
    return () => clearTimeout(timer);
  }, [map]);

  useEffect(() => {
    if (selectedBusiness) {
      map.flyTo([selectedBusiness.lat, selectedBusiness.lng], 16, {
        duration: 1.5
      });
    } else if (businesses.length > 0) {
      // Automatické přizpůsobení výřezu mapy všem zobrazeným podnikům
      const validPoints = businesses
        .filter(b => b && typeof b.lat === 'number' && typeof b.lng === 'number')
        .map(b => [b.lat, b.lng]);
      
      if (validPoints.length > 0) {
        const bounds = L.latLngBounds(validPoints);
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
      }
    }
  }, [selectedBusiness, businesses, map]);
  
  return null;
}

const MapComponent = ({ businesses, userAppData, onSelectBusiness, selectedBusiness }) => {
  const center = [50.08, 14.43]; // Výchozí střed Praha

  // Filtrování podniků s platnými souřadnicemi
  const validBusinesses = businesses.filter(b => 
    b && typeof b.lat === 'number' && typeof b.lng === 'number' && !isNaN(b.lat) && !isNaN(b.lng)
  );

  return (
    <MapContainer 
      key={validBusinesses.length > 0 ? 'map-with-data' : 'map-empty'}
      center={center} 
      zoom={13} 
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController businesses={validBusinesses} selectedBusiness={selectedBusiness} />
      {validBusinesses.map((business) => {
        const status = userAppData[business.id]?.status || SALES_STATUSES.REACHOUT;
        return (
          <Marker
            key={business.id}
            position={[business.lat, business.lng]}
            icon={createCustomIcon(business.firstCategory, status)}
          >
            <Popup>
              <div className="p-1 min-w-[200px]">
                <h3 className="font-bold text-base">{business.name}</h3>
                <p className="text-xs text-gray-600 mb-2">{business.firstCategory}</p>
                
                <div className="space-y-1 mb-3">
                  {business.phone1 && (
                    <div className="flex items-center gap-2 text-xs text-gray-700">
                      <span className="font-semibold">Tel 1:</span>
                      <a href={`tel:${business.phone1}`} className="text-blue-600 hover:underline">{business.phone1}</a>
                    </div>
                  )}
                  {business.phoneWebsite && business.phoneWebsite !== business.phone1 && (
                    <div className="flex items-center gap-2 text-xs text-gray-700">
                      <span className="font-semibold">Web Tel:</span>
                      <a href={`tel:${business.phoneWebsite}`} className="text-blue-600 hover:underline">{business.phoneWebsite}</a>
                    </div>
                  )}
                </div>

                <div className="mt-2 flex items-center justify-between gap-4 border-t pt-2">
                  <span 
                    className="px-2 py-0.5 rounded text-[10px] text-white font-bold"
                    style={{ backgroundColor: STATUS_CONFIG[status].color }}
                  >
                    {STATUS_CONFIG[status].label.toUpperCase()}
                  </span>
                  <button
                    onClick={() => onSelectBusiness(business)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition"
                  >
                    Detail
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;
