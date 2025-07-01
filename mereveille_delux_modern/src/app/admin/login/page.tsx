"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../supabaseClient";

// Set your admin email(s) here
const ADMIN_EMAILS = [
  "merveillebulambo13@gmail.com",
  "magumisekelvin2023@gmail.com"
];

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    // Check if the email is an admin
    if (!ADMIN_EMAILS.includes(email)) {
      await supabase.auth.signOut();
      setError("You are not authorized to access the admin area.");
      setLoading(false);
      return;
    }
    router.push("/admin");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg flex w-full max-w-md p-10 flex-col justify-center">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Admin Login</h1>
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email Address*</label>
            <input type="email" className="w-full p-3 border rounded-lg" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password*</label>
            <input type="password" className="w-full p-3 border rounded-lg" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <div className="text-red-600 bg-red-100 p-2 rounded">{error}</div>}
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
} 