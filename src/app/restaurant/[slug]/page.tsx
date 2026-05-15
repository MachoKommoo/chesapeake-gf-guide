import Link from "next/link";
import { restaurants } from "@/data/restaurants";
import PhotoCarousel from "@/components/PhotoCarousel";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return restaurants.map((restaurant) => ({
    slug: restaurant.slug,
   }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const restaurant = restaurants.find((r) => r.slug === slug);
  return {
    title: restaurant
        ? `${restaurant.name} - Gluten-Free Reviews | 757 Safe Eats: Chesapeake`
       : "Restaurant Not Found - 757 Safe Eats",
    description: restaurant
        ? `${restaurant.name} gluten-free review in Chesapeake, VA. ${restaurant.safetyNotes}`
       : "Restaurant not found",
   };
}

export default async function RestaurantPage({ params }: PageProps) {
  const { slug } = await params;
  const restaurant = restaurants.find((r) => r.slug === slug);

  if (!restaurant) {
    return (
       <main className="min-h-screen bg-gray-50">
         <div className="max-w-4xl mx-auto px-4 py-12">
           <div className="text-center">
             <h1 className="text-3xl font-bold mb-4">Restaurant Not Found</h1>
             <Link href="/" className="text-emerald-600 hover:underline">
               &larr; Back to all restaurants
             </Link>
            </div>
          </div>
       </main>
     );
    }

  return (
     <main className="min-h-screen bg-gray-50">
       {/* Back Button */}
       <header className="bg-white border-b">
         <div className="max-w-4xl mx-auto px-4 py-6">
           <Link
            href="/"
            className="text-emerald-600 hover:text-emerald-700 flex items-center font-medium"
            >
             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
             </svg>
             Back to all restaurants
           </Link>
          </div>
       </header>

        {/* Restaurant Header */}
        <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{restaurant.name}</h1>
                <p className="text-xl opacity-90">{restaurant.cuisine}</p>
              </div>
              <div className="flex items-center bg-white text-emerald-700 px-6 py-3 rounded-xl shadow-lg">
                <span className="text-3xl font-bold">{restaurant.rating}</span>
                <span className="ml-3 text-lg">/5 Rating</span>
              </div>
            </div>
          </div>
        </section>

        {/* Photo Carousel */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <PhotoCarousel photos={restaurant.photos} />
        </section>

        {/* Main Content Grid */}
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Left Column - Main Info */}
            <div className="md:col-span-2 space-y-6">
              {/* About Section - Expanded */}
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <svg className="w-7 h-7 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About {restaurant.name}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{restaurant.about}</p>
                </div>
              </div>

              {/* GF Highlights */}
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <svg className="w-7 h-7 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  What Makes It Safe
                </h2>
                <ul className="space-y-4">
                  {restaurant.gfHighlights.map((highlight, index) => (
                    <li key={index} className="flex items-start bg-emerald-50 p-5 rounded-xl">
                      <svg className="w-7 h-7 text-emerald-600 mr-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 text-lg">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safety Notes */}
              <div className="bg-white rounded-2xl p-8 shadow-md">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <svg className="w-7 h-7 mr-2 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.667-1.732-3-1.732-3H1.998c-.77 0-1.732 1.333-1.732 3l-1.732 3c-.77 1.667.192 3 1.732 3z" />
                  </svg>
                  Safety Information
                </h2>
                <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
                  <p className="text-gray-700 text-lg leading-relaxed">{restaurant.safetyNotes}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Practical Info */}
            <div className="space-y-6">
              {/* Address & Directions */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Location
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">{restaurant.address}</p>
                <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-emerald-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                 Get Directions &rarr;
                </a>
              </div>

              {/* Price Range */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-3">Price Range</h3>
                <div className="flex items-center bg-gray-100 px-4 py-3 rounded-lg">
                  <span className="text-3xl font-bold text-gray-700">{restaurant.priceRange}</span>
                </div>
              </div>

              {/* Quick Features */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-4">GF Features</h3>
                <div className="space-y-3">
                  {restaurant.gfFriendly && (
                    <div className="flex items-center bg-green-50 p-4 rounded-lg">
                      <svg className="w-7 h-7 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 font-medium">GF Menu Available</span>
                    </div>
                  )}
                  {restaurant.dedicatedFryer && (
                    <div className="flex items-center bg-blue-50 p-4 rounded-lg">
                      <svg className="w-7 h-7 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 font-medium">Dedicated GF Fryer</span>
                    </div>
                  )}
                  {restaurant.celiacSafe && (
                    <div className="flex items-center bg-purple-50 p-4 rounded-lg">
                      <svg className="w-7 h-7 text-purple-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 font-medium">Celiac Safe Facility</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Last Reviewed */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-semibold mb-3">Last Reviewed</h3>
                <p className="text-gray-700">{restaurant.lastVisited}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Restaurants */}
        <section className="max-w-6xl mx-auto px-4 py-12 bg-white">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">More GF Restaurants in Chesapeake</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {restaurants
              .filter((r) => r.slug !== restaurant.slug)
              .slice(0, 3)
              .map((r) => (
                <Link
                key={r.id}
                href={`/restaurant/${r.slug}`}
                className="group block bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all border border-gray-100 hover:border-emerald-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {r.name}
                      </h3>
                      <p className="text-gray-500 text-sm">{r.cuisine}</p>
                    </div>
                    <div className="flex items-center bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                      <span className="text-lg font-bold">{r.rating}</span>
                      <span className="text-sm ml-1">/5</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2">{r.about}</p>
                </Link>
              ))}
          </div>
        </section>

        {/* About This Guide */}
        <section className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">About This Guide</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
            As someone with gluten sensitivity, I know how challenging it can be to find restaurants
            that truly understand your needs. This guide is my passion project to help the Chesapeake
            community dine with confidence and peace of mind.
            </p>
            <p className="text-gray-700 leading-relaxed">
            Every restaurant in this guide has been personally reviewed by me and my wife. We look at
            menu options, staff knowledge, kitchen safety practices, and most importantly - the food!
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="opacity-70">&copy; 2024 757 Safe Eats: Chesapeake. Built with care for our local community.</p>
          </div>
        </footer>
      </main>
    );
}
