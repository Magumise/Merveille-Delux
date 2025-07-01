"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabaseClient";
import Link from "next/link";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg flex w-full max-w-4xl overflow-hidden">
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="mb-8 flex items-center">
            {/* <img src="/zillow-logo.svg" alt="Logo" className="h-8 mr-2" /> */}
            <span className="text-2xl font-bold text-blue-700">Create account</span>
          </div>
          <form onSubmit={handleSignUp} className="space-y-6">
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
              {loading ? "Creating account..." : "Continue"}
            </button>
          </form>
          <div className="mt-6 text-center text-gray-600">
            Have a Merveille Delux account? <Link href="/signin" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
          </div>
        </div>
        <div className="hidden md:block w-1/2 bg-gray-100">
          <img src="/zillow-signin.jpg" alt="Create account visual" className="object-cover w-full h-full" />
        </div>
      </div>
    </div>
  );
} 