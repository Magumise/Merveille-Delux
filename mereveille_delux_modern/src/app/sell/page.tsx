export default function SellPage() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">Sell Your Home with Confidence</h1>
          <p className="text-lg text-gray-700 mb-6">
            Choose the best way to sell your property. Whether you want to list with an agent, get an instant offer, or sell it yourself, Mereveille Delux Estate has you covered.
          </p>
        </div>
        {/* Selling Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Option 1 */}
          <div className="bg-gray-50 rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow">
            <div className="bg-blue-100 rounded-full p-4 mb-4">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10l1.664-1.664A2 2 0 017.05 8h9.9a2 2 0 011.386.553L21 10m-9 4v6m-4-6v6m8-6v6m-8 0h8" /></svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-blue-700">List with an Agent</h2>
            <p className="text-gray-600 mb-4">Work with our experienced agents to get the best price and a smooth selling process. We handle everything from marketing to closing.</p>
            <button className="mt-auto bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors">Connect with an Agent</button>
          </div>
          {/* Option 2 */}
          <div className="bg-gray-50 rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow">
            <div className="bg-green-100 rounded-full p-4 mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-green-700">Get an Instant Offer</h2>
            <p className="text-gray-600 mb-4">Skip the hassle and sell your home fast. Get a competitive cash offer and close on your timeline, with no showings or repairs needed.</p>
            <button className="mt-auto bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors">Request an Offer</button>
          </div>
          {/* Option 3 */}
          <div className="bg-gray-50 rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow">
            <div className="bg-yellow-100 rounded-full p-4 mb-4">
              <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4 4 4-4m0-5V3a1 1 0 00-1-1h-6a1 1 0 00-1 1v9m0 0l4 4 4-4" /></svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-yellow-700">Sell It Yourself</h2>
            <p className="text-gray-600 mb-4">Take control and sell your home on your own terms. List your property, manage showings, and negotiate directly with buyers.</p>
            <button className="mt-auto bg-yellow-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-yellow-600 transition-colors">Start Listing</button>
          </div>
        </div>
        {/* Selling Process Section */}
        <div className="bg-blue-50 rounded-xl p-8 shadow-md mb-12">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">How Selling Works</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2 max-w-2xl mx-auto">
            <li>Choose your preferred selling option above.</li>
            <li>Provide your property details and photos.</li>
            <li>Our team will review and guide you through the next steps.</li>
            <li>Get offers, negotiate, and close the deal with confidence!</li>
          </ol>
        </div>
        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Ready to sell your home?</h3>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors">Get Started</button>
        </div>
      </div>
    </div>
  );
} 