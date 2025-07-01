'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../../../supabaseClient';
import type { Property } from '../../../types';

export default function ManagePropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setProperties(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (propertyToDelete: Property) => {
    if (!window.confirm(`Are you sure you want to delete "${propertyToDelete.name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      // 1. Delete images from storage
      if (propertyToDelete.images && propertyToDelete.images.length > 0) {
        const filePaths = propertyToDelete.images.map(url => {
          const parts = url.split('/');
          return parts.slice(parts.indexOf('public')).join('/');
        });
        
        const { error: storageError } = await supabase.storage
          .from('property-images')
          .remove(filePaths);

        if (storageError) {
          console.warn("Could not delete some images, but proceeding with DB deletion:", storageError.message);
        }
      }

      // Log the ID and its type
      console.log('Attempting to delete property with id:', propertyToDelete.id, 'Type:', typeof propertyToDelete.id);

      // 2. Delete the property from the database
      const { data: deleteData, error: dbError } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyToDelete.id);
      
      console.log('Supabase delete response:', { deleteData, dbError });
      if (dbError) {
        console.error('Supabase delete error:', dbError);
        throw dbError;
      }

      // 3. Update the UI
      setProperties(prev => prev.filter(p => p.id !== propertyToDelete.id));
      alert('Property deleted successfully.');

    } catch (err: any) {
      console.error('Full delete process error:', err);
      alert(`Error deleting property: ${err.message}`);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Manage Properties</h1>
        <Link href="/admin/properties/add" className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          + Add Property
        </Link>
      </div>

      {loading && <div className="text-center py-4">Loading properties...</div>}
      {error && <div className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">{error}</div>}
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-xs sm:text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold text-gray-600">Image</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold text-gray-600">Name</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold text-gray-600">Price</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold text-gray-600">Status</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(property => (
              <tr key={property.id} className="border-b hover:bg-gray-50">
                <td className="py-2 sm:py-3 px-2 sm:px-4">
                  <img src={property.images?.[0] || '/hero.jpg'} alt={property.name} className="w-12 h-10 sm:w-16 sm:h-12 object-cover rounded-md" />
                </td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-800">{property.name}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-600">${new Intl.NumberFormat().format(property.price)}</td>
                <td className="py-2 sm:py-3 px-2 sm:px-4">
                  <span className={`px-2 sm:px-3 py-1 text-xs font-semibold rounded-full ${
                    property.offer === 'Sale' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    For {property.offer}
                  </span>
                </td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 flex items-center gap-2 sm:gap-3">
                  <Link href={`/admin/properties/edit/${property.id}`} className="text-blue-600 hover:underline font-semibold text-xs sm:text-sm">Edit</Link>
                  <button onClick={() => handleDelete(property)} className="text-red-600 hover:underline font-semibold text-xs sm:text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {properties.length === 0 && !loading && (
          <p className="text-center text-gray-500 py-8">No properties found. Add one to get started!</p>
        )}
      </div>
    </div>
  );
} 