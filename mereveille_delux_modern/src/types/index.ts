export interface Property {
  id: number;
  created_at: string;
  name: string;
  description: string | null;
  address: string;
  price: number;
  type: string;
  offer: string;
  status: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  area_sqft: number | null;
  image_urls: string[] | null;
  is_featured: boolean | null;
} 