'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '../../../../../supabaseClient';
import type { Property } from '../../../../../types';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../../../../components/Map'), { ssr: false });

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [formData, setFormData] = useState<Partial<Property>>({});
  const [images, setImages] = useState<File[]>([]);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchProperty = async () => {
        setLoading(true);
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id)
          .single();

        if (error || !data) {
          setError('Could not fetch property data.');
          console.error(error);
          setLoading(false);
        } else {
          setFormData(data);
          setExistingImageUrls(data.images || []);
          setLoading(false);
        }
      };
      fetchProperty();
    }
  }, [id]);

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    setFormData(prev => ({ ...prev, latitude: location.lat, longitude: location.lng }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let updatedImageUrls = [...existingImageUrls];

      // Upload new images if any were selected
      if (images.length > 0) {
        const newImageUrls: string[] = [];
        for (const image of images) {
          const filePath = `public/${Date.now()}-${image.name}`;
          const { error: uploadError } = await supabase.storage
            .from('property-images')
            .upload(filePath, image);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('property-images')
            .getPublicUrl(filePath);
          newImageUrls.push(publicUrl);
        }
        updatedImageUrls = [...updatedImageUrls, ...newImageUrls];
      }
      
      // Exclude 'id' from the update object
      const { id: _id, ...rest } = formData;
      const propertyData = {
        ...rest,
        images: updatedImageUrls,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        area: Number(formData.area),
        is_featured: !!formData.is_featured, // Ensure boolean
      };
      
      const { error: updateError } = await supabase
        .from('properties')
        .update(propertyData)
        .eq('id', id);

      if (updateError) throw updateError;
      
      alert('Property updated successfully!');
      router.push('/admin/properties');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !formData.id) return <div className="text-center py-4">Loading property details...</div>;
  if (error) return <div className="text-red-500 bg-red-100 p-3 rounded-lg">{error}</div>;

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Edit Property</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-800 font-semibold mb-2">Property Name</label>
            <input type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-gray-800 font-semibold mb-2">Address</label>
            <input type="text" value={formData.address || ''} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full p-3 border rounded-lg" required />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-800 font-semibold mb-2">Description</label>
          <textarea value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-3 border rounded-lg" rows={4}></textarea>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-gray-800 font-semibold mb-2">Price ($)</label>
            <input type="number" value={formData.price || 0} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full p-3 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-gray-800 font-semibold mb-2">Bedrooms</label>
            <input type="number" value={formData.bedrooms || 0} onChange={e => setFormData({...formData, bedrooms: Number(e.target.value)})} className="w-full p-3 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-gray-800 font-semibold mb-2">Bathrooms</label>
            <input type="number" value={formData.bathrooms || 0} onChange={e => setFormData({...formData, bathrooms: Number(e.target.value)})} className="w-full p-3 border rounded-lg" required />
          </div>
          <div>
            <label className="block text-gray-800 font-semibold mb-2">Area (sq ft)</label>
            <input type="number" value={formData.area || 0} onChange={e => setFormData({...formData, area: Number(e.target.value)})} className="w-full p-3 border rounded-lg" required />
          </div>
        </div>

        {/* Type and Offer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-800 font-semibold mb-2">Type</label>
            <select value={formData.type || 'House'} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full p-3 border rounded-lg">
              <option>House</option>
              <option>Apartment</option>
              <option>Shop</option>
              <option>Villa</option>
              <option>Land</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-800 font-semibold mb-2">Offer</label>
            <select value={formData.offer || 'Sale'} onChange={e => setFormData({...formData, offer: e.target.value as 'Sale' | 'Rent'})} className="w-full p-3 border rounded-lg">
              <option>Sale</option>
              <option>Rent</option>
            </select>
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block text-gray-800 font-semibold mb-2">Existing Images</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {existingImageUrls.map(url => <img key={url} src={url} className="w-20 h-20 object-cover rounded-md" />)}
          </div>
          <label className="block text-gray-800 font-semibold mb-2">Add New Images</label>
          <input type="file" multiple onChange={handleImageChange} className="w-full p-3 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"/>
        </div>

        {/* Map */}
        <div>
          <label className="block text-gray-800 font-semibold mb-2">Update Location</label>
          <div className="h-96">
            {formData.latitude && formData.longitude && (
              <Map 
                isSelectable={true} 
                onLocationSelect={handleLocationSelect} 
                center={{ lat: formData.latitude, lng: formData.longitude }}
              />
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <input type="checkbox" checked={formData.is_featured || false} onChange={e => setFormData({...formData, is_featured: e.target.checked})} id="is_featured" className="h-5 w-5 rounded text-blue-600" />
          <label htmlFor="is_featured" className="text-gray-800 font-semibold">Mark as Featured Property</label>
        </div>
        
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400">
          {loading ? 'Saving...' : 'Update Property'}
        </button>
      </form>
    </div>
  );
} 