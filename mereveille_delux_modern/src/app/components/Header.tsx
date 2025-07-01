'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => { listener?.subscription.unsubscribe(); };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Merveille Delux
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/listings" className="text-gray-600 hover:text-gray-800">
            Listings
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-gray-800">
            About
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-800">
            Contact
          </Link>
          {user ? (
            <button onClick={handleSignOut} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Sign Out
            </button>
          ) : (
            <Link href="/signin" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
} 