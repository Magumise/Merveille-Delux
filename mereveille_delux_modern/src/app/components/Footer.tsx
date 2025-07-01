import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Merveille Delux</h3>
            <p className="text-gray-400">
              Your gateway to the finest properties. We are committed to helping you find your dream home.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2"><Link href="/listings" className="hover:text-blue-400">All Listings</Link></li>
              <li className="mb-2"><Link href="/about" className="hover:text-blue-400">About Us</Link></li>
              <li className="mb-2"><Link href="/contact" className="hover:text-blue-400">Contact</Link></li>
              <li className="mb-2"><Link href="/login" className="hover:text-blue-400">Admin Login</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Contact Us</h3>
            <p className="text-gray-400">Kampala, Uganda</p>
            <p className="text-gray-400">Email: info@merveilledelux.com</p>
            <p className="text-gray-400">Phone: +256 123 456 789</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400"><FaFacebook size={24} /></a>
              <a href="#" className="hover:text-blue-400"><FaTwitter size={24} /></a>
              <a href="#" className="hover:text-blue-400"><FaInstagram size={24} /></a>
              <a href="#" className="hover:text-blue-400"><FaLinkedin size={24} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Merveille Delux. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 