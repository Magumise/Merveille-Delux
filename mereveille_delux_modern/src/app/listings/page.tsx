'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '../../supabaseClient';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../components/SearchBar';
import dynamic from 'next/dynamic';
import type { Property } from '../../types';
import { FiList, FiMap } from 'react-icons/fi';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

export default function ListingsPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [mapCenter, setMapCenter] = useState({ lat: -1.292066, lng: 36.821945 });
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchProperties();
  }, [searchParams]);

  const fetchProperties = async () => {
    setLoading(true);
    let query = supabase.from('properties').select('*');

    // Apply filters from URL parameters
    const location = searchParams.get('location');
    const type = searchParams.get('type');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const beds = searchParams.get('beds');
    const baths = searchParams.get('baths');
    const propertyTypes = searchParams.get('propertyTypes');
    const minArea = searchParams.get('minArea');
    const maxArea = searchParams.get('maxArea');

    // Filter by location (if provided)
    if (location) {
      query = query.or(`address.ilike.%${location}%,name.ilike.%${location}%`);
    }

    // Filter by sale/rent type
    if (type === 'sale') {
      query = query.eq('offer', 'Sale');
    } else if (type === 'rent') {
      query = query.eq('offer', 'Rent');
    }

    // Filter by price range
    if (minPrice) query = query.gte('price', minPrice);
    if (maxPrice) query = query.lte('price', maxPrice);

    // Filter by beds/baths
    if (beds && beds !== 'Any') {
      if (beds === '5+') {
        query = query.gte('bedrooms', 5);
      } else {
        query = query.eq('bedrooms', parseInt(beds));
      }
    }
    if (baths && baths !== 'Any') {
      if (baths === '4+') {
        query = query.gte('bathrooms', 4);
      } else {
        query = query.eq('bathrooms', parseInt(baths));
      }
    }

    // Filter by property types
    if (propertyTypes) {
      const types = propertyTypes.split(',');
      query = query.in('type', types);
    }

    // Filter by area
    if (minArea) query = query.gte('area', minArea);
    if (maxArea) query = query.lte('area', maxArea);

    // Execute query
    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching properties:', error);
      setProperties([]);
    } else {
      setProperties(data || []);
      
      // Update map center only if there are properties with valid coordinates
      const firstPropertyWithCoords = data?.find(p => p.latitude != null && p.longitude != null);
      if (firstPropertyWithCoords) {
        setMapCenter({
          lat: firstPropertyWithCoords.latitude,
          lng: firstPropertyWithCoords.longitude
        });
      }
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Search Section */}
      <div className="bg-white shadow-sm py-6 sticky top-0 z-10">
        <SearchBar />
      </div>

      {/* Results Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            {properties.length} Properties Found
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex bg-white rounded-lg shadow p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'
                }`}
              >
                <FiList />
                List
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  viewMode === 'map' ? 'bg-blue-600 text-white' : 'text-gray-600'
                }`}
              >
                <FiMap />
                Map
              </button>
            </div>
            <select className="p-2 border rounded-lg">
              <option value="newest">Newest First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : properties.length > 0 ? (
          viewMode === 'list' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property: Property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="h-[calc(100vh-200px)]">
              <Map
                properties={properties.filter(p => p.latitude != null && p.longitude != null)}
                center={mapCenter}
                height="100%"
              />
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              No properties found
            </h2>
            <p className="text-gray-500">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 