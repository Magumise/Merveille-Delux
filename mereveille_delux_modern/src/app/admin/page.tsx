"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

export default function AdminDashboard() {
  const [total, setTotal] = useState(0);
  const [active, setActive] = useState(0);
  const [pending, setPending] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      // Total properties
      const { count: totalCount } = await supabase.from("properties").select("id", { count: "exact", head: true });
      setTotal(totalCount || 0);
      // Active listings
      const { count: activeCount } = await supabase.from("properties").select("id", { count: "exact", head: true }).eq("status", "active");
      setActive(activeCount || 0);
      // Pending approvals
      const { count: pendingCount } = await supabase.from("properties").select("id", { count: "exact", head: true }).eq("status", "pending");
      setPending(pendingCount || 0);
      setLoading(false);
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Welcome to the Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-blue-600 mb-2">{loading ? "..." : total}</span>
          <span className="text-gray-700">Total Properties</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-green-600 mb-2">{loading ? "..." : active}</span>
          <span className="text-gray-700">Active Listings</span>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <span className="text-4xl font-bold text-yellow-600 mb-2">{loading ? "..." : pending}</span>
          <span className="text-gray-700">Pending Approvals</span>
        </div>
      </div>
      <div className="bg-blue-50 rounded-xl p-8 shadow text-center">
        <h2 className="text-2xl font-semibold mb-2 text-blue-700">Quick Actions</h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-4">
          <a href="/admin/properties/add" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Add New Property</a>
          <a href="/admin/properties" className="bg-gray-200 text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">Manage Properties</a>
          <a href="/admin/inquiries" className="bg-gray-200 text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">View Inquiries</a>
        </div>
      </div>
    </div>
  );
} 