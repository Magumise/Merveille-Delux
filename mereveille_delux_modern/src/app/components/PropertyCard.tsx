import Link from 'next/link';
import type { Property } from '../../types';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/property/${property.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform h-full">
        <div className="w-full aspect-[4/3] sm:aspect-[4/3] relative overflow-hidden bg-gray-100">
          <img
            src={property.images?.[0] || '/hero.jpg'}
            alt={property.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 truncate">{property.name}</h3>
          <p className="text-gray-600 mb-1 sm:mb-2 text-sm sm:text-base">{property.address}</p>
          <p className="text-gray-500 text-xs sm:text-sm mb-2 sm:mb-4">{property.type} for {property.offer}</p>
          <div className="font-bold text-blue-600 text-base sm:text-lg">
            ${new Intl.NumberFormat().format(property.price)}
          </div>
        </div>
      </div>
    </Link>
  );
} 