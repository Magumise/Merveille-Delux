import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col p-6 space-y-4">
        <h2 className="text-2xl font-bold text-blue-700 mb-8">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/admin" className="text-gray-800 hover:text-blue-600 font-semibold">Dashboard</Link>
          <Link href="/admin/properties" className="text-gray-800 hover:text-blue-600 font-semibold">Properties</Link>
          <Link href="/admin/properties/add" className="text-gray-800 hover:text-blue-600 font-semibold">Add Property</Link>
          <Link href="/admin/inquiries" className="text-gray-800 hover:text-blue-600 font-semibold">Inquiries</Link>
          <Link href="/admin/settings" className="text-gray-800 hover:text-blue-600 font-semibold">Settings</Link>
          <button className="text-red-600 font-semibold text-left mt-8">Logout</button>
        </nav>
      </aside>
      {/* Mobile Sidebar */}
      <aside className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around py-2 z-50">
        <Link href="/admin" className="text-gray-800 hover:text-blue-600 font-semibold">Dashboard</Link>
        <Link href="/admin/properties" className="text-gray-800 hover:text-blue-600 font-semibold">Properties</Link>
        <Link href="/admin/properties/add" className="text-gray-800 hover:text-blue-600 font-semibold">Add</Link>
        <Link href="/admin/settings" className="text-gray-800 hover:text-blue-600 font-semibold">Settings</Link>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-64 mt-0 md:mt-0 w-full mx-auto max-w-7xl">
        {children}
      </main>
    </div>
  );
} 