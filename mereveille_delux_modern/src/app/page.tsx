export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import { supabase } from '../supabaseClient';
import type { Property } from '../types';
import PropertyCard from './components/PropertyCard';
import SearchBar from './components/SearchBar';

export default async function HomePage() {
  const { data: properties, error } = await supabase
    .from('properties')
    .select('*')
    .eq('is_featured', true)
    .limit(3);

  if (error) {
    console.error('Error fetching featured properties:', error);
  }

  const infoCards = [
    {
      title: 'Buy a home',
      description: 'Find your place with an immersive photo experience and the most listings, including things you won\'t find anywhere else.',
      buttonText: 'Browse homes',
      link: '/listings?type=buy',
      imageUrl: '/buy-home.png',
    },
    {
      title: 'Sell a home',
      description: 'No matter what path you take to sell your home, we can help you navigate a successful sale.',
      buttonText: 'See your options',
      link: '/sell',
      imageUrl: '/sell-home.png',
    },
    {
      title: 'Rent a home',
      description: "We're creating a seamless online experience – from shopping on the largest rental network, to applying, to paying rent.",
      buttonText: 'Find rentals',
      link: '/listings?type=rent',
      imageUrl: '/rent-home.png',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-white">
        <Image
          src="/hero.jpg"
          alt="Beautiful modern house"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center px-4 w-full">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            Find Your Dream Home
          </h1>
          <p className="text-lg md:text-xl mb-8">
            The best place to find your next property.
          </p>
          {/* Search Bar */}
          <div className="mt-4 max-w-4xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {infoCards.map((card) => (
              <div key={card.title} className="text-center p-8 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center">
                <div className="w-36 h-36 mb-6 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center aspect-square">
                  <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{card.title}</h3>
                <p className="text-gray-600 mb-6">{card.description}</p>
                <Link href={card.link} className="inline-block text-blue-600 border border-blue-600 rounded-full px-8 py-3 hover:bg-blue-600 hover:text-white transition-colors">
                  {card.buttonText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties && properties.map((property: Property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
            {(!properties || properties.length === 0) && (
              <p className="col-span-3 text-center text-gray-500">No featured properties available at the moment.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
