export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">Contact Us</h1>
        <p className="text-lg text-gray-700 text-center mb-10">
          Have questions or want to get in touch? Fill out the form below or reach us directly using the contact details provided.
        </p>
        <form className="bg-gray-50 rounded-xl p-8 shadow-md mb-8">
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2">Name</label>
            <input type="text" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Name" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2">Email</label>
            <input type="email" className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@email.com" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-2">Message</label>
            <textarea className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows={5} placeholder="Type your message..." required></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">Send Message</button>
        </form>
        <div className="bg-white rounded-xl p-6 shadow text-center">
          <h2 className="text-xl font-semibold mb-2 text-blue-600">Our Contact Details</h2>
          <p className="text-gray-700 mb-1">Email: <a href="mailto:info@mereveille.com" className="text-blue-600 underline">info@mereveille.com</a></p>
          <p className="text-gray-700 mb-1">Phone: <a href="tel:+256759055133" className="text-blue-600 underline">+1 234 567 890</a></p>
          <p className="text-gray-700">Address: 123 Naalya Estate, Kampala, Uganda</p>
        </div>
      </div>
    </div>
  );
} 