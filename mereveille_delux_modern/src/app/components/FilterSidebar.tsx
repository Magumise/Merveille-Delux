import { useState } from 'react';

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
  currentFilters: {
    minPrice: string;
    maxPrice: string;
    propertyTypes: string[];
    offerTypes: string[];
    bedrooms: string;
    bathrooms: string;
    minArea: string;
    maxArea: string;
  };
}

export default function FilterSidebar({ onFilterChange, currentFilters }: FilterSidebarProps) {
  const propertyTypes = ['House', 'Apartment', 'Shop'];
  const offerTypes = ['Sale', 'Rent'];
  const bedroomOptions = ['Any', '1', '2', '3', '4', '5+'];
  const bathroomOptions = ['Any', '1', '2', '3', '4+'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6">Filters</h2>

      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-1/2 p-2 border rounded"
            value={currentFilters.minPrice}
            onChange={(e) => onFilterChange({ ...currentFilters, minPrice: e.target.value })}
          />
          <input
            type="number"
            placeholder="Max"
            className="w-1/2 p-2 border rounded"
            value={currentFilters.maxPrice}
            onChange={(e) => onFilterChange({ ...currentFilters, maxPrice: e.target.value })}
          />
        </div>
      </div>

      {/* Property Type */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Property Type</h3>
        <div className="space-y-2">
          {propertyTypes.map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={currentFilters.propertyTypes.includes(type)}
                onChange={(e) => {
                  const types = [...currentFilters.propertyTypes];
                  if (e.target.checked) {
                    types.push(type);
                  } else {
                    const index = types.indexOf(type);
                    if (index > -1) {
                      types.splice(index, 1);
                    }
                  }
                  onFilterChange({ ...currentFilters, propertyTypes: types });
                }}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Offer Type */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Offer Type</h3>
        <div className="space-y-2">
          {offerTypes.map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={currentFilters.offerTypes.includes(type)}
                onChange={(e) => {
                  const types = [...currentFilters.offerTypes];
                  if (e.target.checked) {
                    types.push(type);
                  } else {
                    const index = types.indexOf(type);
                    if (index > -1) {
                      types.splice(index, 1);
                    }
                  }
                  onFilterChange({ ...currentFilters, offerTypes: types });
                }}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Bedrooms */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Bedrooms</h3>
        <select
          className="w-full p-2 border rounded"
          value={currentFilters.bedrooms}
          onChange={(e) => onFilterChange({ ...currentFilters, bedrooms: e.target.value })}
        >
          {bedroomOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Bathrooms */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Bathrooms</h3>
        <select
          className="w-full p-2 border rounded"
          value={currentFilters.bathrooms}
          onChange={(e) => onFilterChange({ ...currentFilters, bathrooms: e.target.value })}
        >
          {bathroomOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Area Range */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Area (sq ft)</h3>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-1/2 p-2 border rounded"
            value={currentFilters.minArea}
            onChange={(e) => onFilterChange({ ...currentFilters, minArea: e.target.value })}
          />
          <input
            type="number"
            placeholder="Max"
            className="w-1/2 p-2 border rounded"
            value={currentFilters.maxArea}
            onChange={(e) => onFilterChange({ ...currentFilters, maxArea: e.target.value })}
          />
        </div>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={() => onFilterChange({})}
        className="w-full bg-gray-100 text-gray-800 py-2 rounded hover:bg-gray-200"
      >
        Clear All Filters
      </button>
    </div>
  );
} 