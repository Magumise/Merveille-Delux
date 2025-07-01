export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">About Mereveille Delux Estate</h1>
        <p className="text-lg text-gray-700 text-center mb-10">
          Mereveille Delux Estate is dedicated to helping you find your dream home or the perfect investment property. With a passion for excellence and a commitment to customer satisfaction, we make real estate simple, modern, and accessible for everyone.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-blue-600">Our Story</h2>
            <p className="text-gray-600 mb-2">
              Founded in 2024, Mereveille Delux Estate was born from a vision to revolutionize the real estate experience in Africa and beyond. We combine technology, local expertise, and a customer-first approach to deliver unmatched value.
            </p>
            <p className="text-gray-600">
              Whether you're buying, selling, or renting, our team is here to guide you every step of the way.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-blue-600">Our Mission</h2>
            <p className="text-gray-600">
              To empower people to make smarter real estate decisions by providing transparent, innovative, and user-friendly solutions.
            </p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-8 shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-blue-600 text-center">Meet Our Team</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex flex-col items-center">
              <img src="/team1.jpg" alt="Team Member" className="w-24 h-24 rounded-full object-cover mb-2" />
              <span className="font-semibold text-gray-800">Merveillie Bulambo</span>
              <span className="text-gray-500 text-sm">CEO & Founder</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/team2.jpg" alt="Team Member" className="w-24 h-24 rounded-full object-cover mb-2" />
              <span className="font-semibold text-gray-800">Kelvin Magumise</span>
              <span className="text-gray-500 text-sm">Head of Sales</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="/team3.jpg" alt="Team Member" className="w-24 h-24 rounded-full object-cover mb-2" />
              <span className="font-semibold text-gray-800">Mary Johnson</span>
              <span className="text-gray-500 text-sm">Lead Developer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 