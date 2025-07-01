'use client';

import { useState, useRef, useEffect } from 'react';
import { FiSearch, FiX, FiChevronDown } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

interface SearchFilters {
  forSale: boolean;
  forRent: boolean;
  priceMin: string;
  priceMax: string;
  beds: string;
  baths: string;
  homeType: string[];
  minArea: string;
  maxArea: string;
}

const initialFilters: SearchFilters = {
  forSale: true,
  forRent: false,
  priceMin: '',
  priceMax: '',
  beds: 'Any',
  baths: 'Any',
  homeType: [],
  minArea: '',
  maxArea: ''
};

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const filterRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const homeTypes = ['House', 'Apartment', 'Shop', 'Villa', 'Land'];
  const bedOptions = ['Any', '1', '2', '3', '4', '5+'];
  const bathOptions = ['Any', '1', '2', '3', '4+'];

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    
    if (searchTerm) queryParams.set('location', searchTerm);
    if (filters.forSale) queryParams.set('type', 'sale');
    if (filters.forRent) queryParams.set('type', 'rent');
    if (filters.priceMin) queryParams.set('minPrice', filters.priceMin);
    if (filters.priceMax) queryParams.set('maxPrice', filters.priceMax);
    if (filters.beds !== 'Any') queryParams.set('beds', filters.beds);
    if (filters.baths !== 'Any') queryParams.set('baths', filters.baths);
    if (filters.homeType.length > 0) queryParams.set('propertyTypes', filters.homeType.join(','));
    if (filters.minArea) queryParams.set('minArea', filters.minArea);
    if (filters.maxArea) queryParams.set('maxArea', filters.maxArea);

    router.push(`/listings?${queryParams.toString()}`);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main Search Bar */}
      <div className="flex items-center bg-white rounded-full shadow-lg p-2 border border-gray-200">
        <div className="flex-1 flex items-center">
          <div className="flex-1 px-4">
            <input
              type="text"
              placeholder="Enter an address, neighborhood, city, or ZIP code"
              className="w-full text-lg text-gray-900 focus:outline-none bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FiX className="text-gray-500" />
            </button>
          )}
        </div>

        {/* Filter Button */}
        <div className="relative" ref={filterRef}>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-full flex items-center gap-2"
          >
            Filters
            <FiChevronDown className={`transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Filter Dropdown */}
          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-96 max-w-[90vw] bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 max-h-[80vh] overflow-y-auto">
              {/* Property Status */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2 text-gray-900">I want to:</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilters(f => ({ ...f, forSale: true, forRent: false }))}
                    className={`flex-1 py-2 px-4 rounded-full ${
                      filters.forSale ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => setFilters(f => ({ ...f, forSale: false, forRent: true }))}
                    className={`flex-1 py-2 px-4 rounded-full ${
                      filters.forRent ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Rent
                  </button>
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2 text-gray-900">Price Range</h3>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="p-2 border rounded-lg text-gray-900"
                    value={filters.priceMin}
                    onChange={(e) => setFilters(f => ({ ...f, priceMin: e.target.value }))}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="p-2 border rounded-lg text-gray-900"
                    value={filters.priceMax}
                    onChange={(e) => setFilters(f => ({ ...f, priceMax: e.target.value }))}
                  />
                </div>
              </div>

              {/* Beds & Baths */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="font-semibold mb-2 text-gray-900">Beds</h3>
                  <select
                    className="w-full p-2 border rounded-lg text-gray-900"
                    value={filters.beds}
                    onChange={(e) => setFilters(f => ({ ...f, beds: e.target.value }))}
                  >
                    {bedOptions.map(option => (
                      <option key={option} value={option} className="text-gray-900">{option}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-gray-900">Baths</h3>
                  <select
                    className="w-full p-2 border rounded-lg text-gray-900"
                    value={filters.baths}
                    onChange={(e) => setFilters(f => ({ ...f, baths: e.target.value }))}
                  >
                    {bathOptions.map(option => (
                      <option key={option} value={option} className="text-gray-900">{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Home Type */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2 text-gray-900">Home Type</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {homeTypes.map(type => (
                    <label key={type} className="flex items-center space-x-2 text-gray-900">
                      <input
                        type="checkbox"
                        checked={filters.homeType.includes(type)}
                        onChange={(e) => {
                          const newTypes = e.target.checked
                            ? [...filters.homeType, type]
                            : filters.homeType.filter(t => t !== type);
                          setFilters(f => ({ ...f, homeType: newTypes }));
                        }}
                        className="rounded text-blue-600"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Area Range */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2 text-gray-900">Area (sq ft)</h3>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="p-2 border rounded-lg text-gray-900"
                    value={filters.minArea}
                    onChange={(e) => setFilters(f => ({ ...f, minArea: e.target.value }))}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="p-2 border rounded-lg text-gray-900"
                    value={filters.maxArea}
                    onChange={(e) => setFilters(f => ({ ...f, maxArea: e.target.value }))}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setFilters(initialFilters)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Reset
                </button>
                <button
                  onClick={() => {
                    setIsFilterOpen(false);
                    handleSearch();
                  }}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="ml-2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
        >
          <FiSearch size={20} />
        </button>
      </div>
    </div>
  );
} 