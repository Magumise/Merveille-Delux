export interface Property {
  id: number;
  name: string;
  description: string;
  price: number;
  address: string;
  type: string;
  offer: 'Sale' | 'Rent';
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  is_featured: boolean;
  created_at: string;
  latitude: number;
  longitude: number;
} 