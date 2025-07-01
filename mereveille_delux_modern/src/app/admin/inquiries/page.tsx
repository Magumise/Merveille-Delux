"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import Link from "next/link";

interface Inquiry {
  id: string;
  property_id: number;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
  property?: { name: string; address: string };
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    setError("");
    // Fetch inquiries and join property info
    const { data, error } = await supabase
      .from("inquiries")
      .select("*, property:property_id(name, address)")
      .order("created_at", { ascending: false });
    if (error) {
      setError("Failed to fetch inquiries.");
      setInquiries([]);
    } else {
      setInquiries(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (!error) {
      setInquiries(prev => prev.filter(i => i.id !== id));
    } else {
      alert('Failed to delete inquiry.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Inquiries</h1>
      {loading ? (
        <div className="text-center py-4">Loading inquiries...</div>
      ) : error ? (
        <div className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">{error}</div>
      ) : inquiries.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No inquiries found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Date</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Property</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Phone</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Message</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr key={inq.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-500 whitespace-nowrap">{new Date(inq.created_at).toLocaleString()}</td>
                  <td className="py-3 px-4">
                    {inq.property ? (
                      <Link href={`/property/${inq.property_id}`} className="text-blue-600 hover:underline">
                        {inq.property.name}
                      </Link>
                    ) : (
                      <span className="text-gray-400">[Deleted]</span>
                    )}
                    <div className="text-xs text-gray-500">{inq.property?.address}</div>
                  </td>
                  <td className="py-3 px-4">{inq.name}</td>
                  <td className="py-3 px-4">{inq.email}</td>
                  <td className="py-3 px-4">{inq.phone}</td>
                  <td className="py-3 px-4 max-w-xs break-words">{inq.message}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 font-semibold"
                      title="Reply (coming soon)"
                      disabled
                    >
                      Reply
                    </button>
                    <button
                      className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 font-semibold"
                      onClick={() => handleDelete(inq.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 