'use client';

import { useState, useEffect, use } from 'react';
import { supabase } from '../../../supabaseClient';
import type { Property } from '../../../types';
import Link from 'next/link';
import LightboxGallery from '../../components/LightboxGallery';
import { useRouter } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PropertyDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const router = useRouter();
  // Inquiry form state
  const [inquiry, setInquiry] = useState({ name: '', email: '', phone: '', message: '' });
  const [inquiryLoading, setInquiryLoading] = useState(false);
  const [inquiryError, setInquiryError] = useState('');
  const [inquirySuccess, setInquirySuccess] = useState('');

  // Define a safe fallback for images
  const propertyImages = property?.images && property.images.length > 0 ? property.images : ['/hero.jpg'];

  useEffect(() => {
    fetchPropertyDetails();
  }, [resolvedParams.id]);

  const fetchPropertyDetails = async () => {
    try {
      // Fetch main property
      const { data: propertyData, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', resolvedParams.id)
        .single();

      if (error) throw error;
      setProperty(propertyData);

      // Fetch similar properties (same type, similar price range)
      if (propertyData) {
        const minPrice = propertyData.price * 0.7;  // 30% below
        const maxPrice = propertyData.price * 1.3;  // 30% above

        const { data: similarData } = await supabase
          .from('properties')
          .select('*')
          .eq('type', propertyData.type)
          .gte('price', minPrice)
          .lte('price', maxPrice)
          .neq('id', propertyData.id)
          .limit(3);

        setSimilarProperties(similarData || []);
      }
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  // Inquiry form submit handler
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryError('');
    setInquirySuccess('');
    setInquiryLoading(true);
    // Check if user is signed in
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/signin'); // Or show a modal if you want
      setInquiryLoading(false);
      return;
    }
    // Save inquiry to Supabase
    const { error } = await supabase.from('inquiries').insert({
      property_id: property.id,
      user_id: session.user.id,
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      message: inquiry.message,
    });
    if (error) {
      setInquiryError('Failed to send message. Please try again.');
    } else {
      setInquirySuccess('Your message has been sent!');
      setInquiry({ name: '', email: '', phone: '', message: '' });
    }
    setInquiryLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
        <Link href="/listings" className="text-blue-600 hover:underline">
          Back to Listings
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Image Gallery */}
        <div className="mb-8">
          <div 
            className="relative h-[60vh] w-full rounded-lg overflow-hidden group cursor-pointer"
            onClick={() => setIsLightboxOpen(true)}
          >
            <img
              src={propertyImages[currentImageIndex]}
              alt={`${property.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {propertyImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex((prev) => 
                      prev === 0 ? propertyImages.length - 1 : prev - 1
                    );
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ←
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex((prev) => 
                      prev === propertyImages.length - 1 ? 0 : prev + 1
                    );
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  →
                </button>
              </>
            )}
            {/* View full screen overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <span className="text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 px-4 py-2 rounded-lg">
                Click to view full screen
              </span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {propertyImages.length > 1 && (
            <div className="mt-4 flex space-x-2 overflow-x-auto pb-2">
              {propertyImages.map((url, index) => (
                <button
                  key={url}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden transition-all ${
                    currentImageIndex === index 
                      ? 'ring-2 ring-blue-600 opacity-100' 
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Lightbox */}
        {isLightboxOpen && (
          <LightboxGallery
            images={propertyImages}
            initialIndex={currentImageIndex}
            onClose={() => setIsLightboxOpen(false)}
          />
        )}

        {/* Property Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
            <p className="text-gray-600 mb-4">{property.address}</p>
            <div className="flex gap-4 mb-6">
              <div className="flex items-center">
                <span className="font-bold mr-2">{property.bedrooms}</span>
                <span className="text-gray-600">Beds</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold mr-2">{property.bathrooms}</span>
                <span className="text-gray-600">Baths</span>
              </div>
              <div className="flex items-center">
                <span className="font-bold mr-2">{property.area}</span>
                <span className="text-gray-600">sq ft</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-6">
              ${new Intl.NumberFormat().format(property.price)}
            </div>
            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700">{property.description}</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-semibold mb-4">Interested in this property?</h2>
            <form className="space-y-4" onSubmit={handleInquirySubmit}>
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                  value={inquiry.name}
                  onChange={e => setInquiry(i => ({ ...i, name: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your email"
                  value={inquiry.email}
                  onChange={e => setInquiry(i => ({ ...i, email: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your phone number"
                  value={inquiry.phone}
                  onChange={e => setInquiry(i => ({ ...i, phone: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="I'm interested in this property..."
                  value={inquiry.message}
                  onChange={e => setInquiry(i => ({ ...i, message: e.target.value }))}
                  required
                ></textarea>
              </div>
              {inquiryError && <div className="text-red-600 bg-red-100 p-2 rounded">{inquiryError}</div>}
              {inquirySuccess && <div className="text-green-600 bg-green-100 p-2 rounded">{inquirySuccess}</div>}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                disabled={inquiryLoading}
              >
                {inquiryLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* Similar Properties */}
        {similarProperties.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarProperties.map((similarProperty) => (
                <Link
                  key={similarProperty.id}
                  href={`/property/${similarProperty.id}`}
                  className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <img
                      src={similarProperty.images?.[0] || '/hero.jpg'}
                      alt={similarProperty.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">{similarProperty.name}</h3>
                    <p className="text-gray-600">{similarProperty.address}</p>
                    <p className="text-blue-600 font-bold mt-2">
                      ${new Intl.NumberFormat().format(similarProperty.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 