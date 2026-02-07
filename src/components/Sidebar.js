import React, { useState } from 'react';
import { STATUS_CONFIG, SALES_STATUSES } from '../data/salesStatus';
import { X, Phone, Mail, Globe, MapPin, Facebook, Instagram, Youtube, ExternalLink, StickyNote, MessageCircle, Search } from 'lucide-react';

const Sidebar = ({ 
  selectedBusiness, 
  onCloseDetail, 
  userAppData, 
  onUpdateAppData,
  allCategories,
  filters,
  onUpdateFilters
}) => {
  const [noteText, setNoteText] = useState('');

  const handleStatusChange = (status) => {
    onUpdateAppData(selectedBusiness.id, { status });
  };

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    const currentNotes = userAppData[selectedBusiness.id]?.notes || [];
    onUpdateAppData(selectedBusiness.id, { 
      notes: [...currentNotes, { text: noteText, date: new Date().toISOString() }] 
    });
    setNoteText('');
  };

  const businessData = selectedBusiness ? (userAppData[selectedBusiness.id] || {}) : {};
  const currentStatus = businessData.status || SALES_STATUSES.REACHOUT;
  const notes = businessData.notes || [];

  return (
    <div className="w-96 h-screen overflow-y-auto bg-white border-r shadow-xl flex flex-col">
      <div className="p-6 border-b sticky top-0 bg-white z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Hledat podnik..."
            value={filters.searchTerm}
            onChange={(e) => onUpdateFilters({ ...filters, searchTerm: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          />
        </div>
      </div>
      {selectedBusiness ? (
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-gray-800">{selectedBusiness.name}</h2>
            <button onClick={onCloseDetail} className="p-1 hover:bg-gray-100 rounded">
              <X size={24} />
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-4">{selectedBusiness.firstCategory}</p>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Sales Status</label>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => handleStatusChange(key)}
                  className={`px-3 py-2 rounded text-xs font-semibold transition ${
                    currentStatus === key 
                      ? 'ring-2 ring-offset-1 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  style={currentStatus === key ? { backgroundColor: config.color, ringColor: config.color } : {}}
                >
                  {config.label}
                </button>
              ))}
            </div>

            <div className="flex items-center pt-2 border-t">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={businessData.hasLoyaltySystem || false}
                  onChange={(e) => onUpdateAppData(selectedBusiness.id, { hasLoyaltySystem: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300 transition"
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition">Má věrnostní systém</span>
              </label>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="font-semibold text-gray-700 border-b pb-1">Kontaktní údaje</h3>
            {selectedBusiness.phone1 && (
              <div className="flex items-center gap-3 text-gray-600">
                <Phone size={18} className="text-blue-500" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Telefon 1</span>
                  <a href={`tel:${selectedBusiness.phone1}`} className="hover:text-blue-600">{selectedBusiness.phone1}</a>
                </div>
              </div>
            )}
            {selectedBusiness.phoneWebsite && selectedBusiness.phoneWebsite !== selectedBusiness.phone1 && (
              <div className="flex items-center gap-3 text-gray-600">
                <Phone size={18} className="text-purple-500" />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Telefon z webu</span>
                  <a href={`tel:${selectedBusiness.phoneWebsite}`} className="hover:text-blue-600">{selectedBusiness.phoneWebsite}</a>
                </div>
              </div>
            )}
            {(selectedBusiness.phone1 || selectedBusiness.phoneWebsite) && (
              <div className="flex items-center gap-3 text-gray-600">
                <MessageCircle size={18} className="text-green-500" />
                <a 
                  href={`https://wa.me/${(selectedBusiness.phone1 || selectedBusiness.phoneWebsite).replace(/\+/g, '').replace(/\s/g, '').replace(/\D/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-green-600 font-semibold text-green-600"
                >
                  WhatsApp
                </a>
              </div>
            )}
            {selectedBusiness.email && (
              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={18} />
                <a href={`mailto:${selectedBusiness.email}`} className="hover:text-blue-600 truncate">{selectedBusiness.email}</a>
              </div>
            )}
            {selectedBusiness.website && (
              <div className="flex items-center gap-3 text-gray-600">
                <Globe size={18} />
                <a href={selectedBusiness.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 truncate flex items-center gap-1">
                  Website <ExternalLink size={14} />
                </a>
              </div>
            )}
            <div className="flex items-start gap-3 text-gray-600">
              <MapPin size={18} className="mt-1 flex-shrink-0" />
              <span className="text-sm">{selectedBusiness.address}</span>
            </div>
            
            <div className="flex gap-4 pt-2">
              {selectedBusiness.facebook && <a href={selectedBusiness.facebook} target="_blank" rel="noreferrer"><Facebook size={20} className="text-blue-600" /></a>}
              {selectedBusiness.instagram && <a href={selectedBusiness.instagram} target="_blank" rel="noreferrer"><Instagram size={20} className="text-pink-600" /></a>}
              {selectedBusiness.youtube && <a href={selectedBusiness.youtube} target="_blank" rel="noreferrer"><Youtube size={20} className="text-red-600" /></a>}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold text-gray-700 border-b pb-1 mb-3">Poznámky</h3>
            <div className="space-y-3 mb-4">
              {notes.map((note, i) => (
                <div key={i} className="bg-yellow-50 p-3 rounded border border-yellow-100 text-sm shadow-sm">
                  <p className="text-gray-800">{note.text}</p>
                  <span className="text-[10px] text-gray-400 mt-1 block">
                    {new Date(note.date).toLocaleString('cs-CZ')}
                  </span>
                </div>
              ))}
            </div>
            
            {(currentStatus === SALES_STATUSES.LOST || notes.length > 0 || true) && (
              <div className="flex flex-col gap-2">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Přidat poznámku..."
                  className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  rows={3}
                />
                <button
                  onClick={handleAddNote}
                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  <StickyNote size={16} /> Uložit poznámku
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Filtry</h2>
          
          <div className="mb-8">
            <h3 className="font-semibold text-gray-700 mb-3">Sales Status</h3>
            <div className="space-y-2">
              {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.statuses.includes(key)}
                    onChange={(e) => {
                      const newStatuses = e.target.checked
                        ? [...filters.statuses, key]
                        : filters.statuses.filter(s => s !== key);
                      onUpdateFilters({ ...filters, statuses: newStatuses });
                    }}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: config.color }}></span>
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">{config.label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold text-gray-700 mb-3">Kategorie</h3>
            <div className="max-h-[50vh] overflow-y-auto space-y-2 pr-2 border-t pt-2">
              {allCategories.filter(cat => cat && cat.trim()).map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(cat)}
                    onChange={(e) => {
                      const newCats = e.target.checked
                        ? [...filters.categories, cat]
                        : filters.categories.filter(c => c !== cat);
                      onUpdateFilters({ ...filters, categories: newCats });
                    }}
                    className="w-4 h-4 rounded text-blue-600"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 truncate">{cat}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
