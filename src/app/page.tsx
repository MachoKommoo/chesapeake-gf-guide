"use client";

import Link from "next/link";
import { restaurants } from "@/data/restaurants";
import React from "react";
import SafetyScoreTooltip from "@/components/SafetyScoreTooltip";
import RestaurantMap from "@/components/RestaurantMap";

// Get featured restaurant (one with active featuredUntil date)
function getFeaturedRestaurant() {
  const now = new Date();
  const featured = restaurants.find((r) => r.featuredUntil && new Date(r.featuredUntil) > now);
  return featured || null;
}

// Map restaurant cuisine to standardized category
function getCuisineCategory(cuisine: string): string {
  const categoryMap: Record<string, string> = {
    "American": "American",
    "Diner & Breakfast": "American",
    "Steakhouse": "American",
    "American Burgers": "Burgers",
    "Pizza": "Pizza",
    "Brewery & Pizza": "Pizza",
    "Asian": "Asian",
    "BBQ": "BBQ",
    "Mexican": "Mexican",
    "Chicken & Whiskey": "Chicken",
  };
  return categoryMap[cuisine] || "American";
}

// Get unique cuisines from restaurants
function getUniqueCuisines() {
  const categories = new Set<string>();
  categories.add("All");
  restaurants.forEach((r) => categories.add(getCuisineCategory(r.cuisine)));
  return Array.from(categories).sort();
}

// Get unique cities from restaurants
function getUniqueCities() {
  const cities = new Set<string>();
  cities.add("All");
  restaurants.forEach((r) => cities.add(r.city));
  return Array.from(cities).sort();
}

// Calculate objective safety score (0-4) based on verifiable facts
function calculateSafetyScore(restaurant: typeof restaurants[0]): number {
  let score = 0;
  if (restaurant.gfFriendly) score++;
  if (restaurant.dedicatedFryer) score++;
  if (restaurant.celiacSafe) score++;
  if (restaurant.serverKnowledge) score++;
  return score;
}

// Filter restaurants based on search, category, and cuisine
function filterRestaurants(searchTerm: string, filters: {
  gfMenu: boolean;
  celiacSafe: boolean;
  dedicatedFryer: boolean;
}, selectedCuisine: string, selectedCity: string) {
  return restaurants.filter((r) => {
    // Search filter
    if (searchTerm && !r.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Category filters
    if (filters.gfMenu && !r.gfFriendly) return false;
    if (filters.celiacSafe && !r.celiacSafe) return false;
    if (filters.dedicatedFryer && !r.dedicatedFryer) return false;

    // Cuisine filter
    if (selectedCuisine !== "All" && getCuisineCategory(r.cuisine) !== selectedCuisine) return false;


  // City filter
  if (selectedCity !== "All" && r.city !== selectedCity) return false;

    return true;
  });
}

export default function Home() {
  const featured = getFeaturedRestaurant();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filters, setFilters] = React.useState({
    gfMenu: false,
    celiacSafe: false,
    dedicatedFryer: false,
  });
  const [selectedCuisine, setSelectedCuisine] = React.useState<string>("All");
  const [selectedCity, setSelectedCity] = React.useState<string>("All");
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<"list" | "map">("list");
  const restaurantsSectionRef = React.useRef<HTMLElement>(null);

  const filteredRestaurants = filterRestaurants(searchTerm, filters, selectedCuisine, selectedCity);
  const cities = getUniqueCities();
  const cuisines = getUniqueCuisines();
  const avgSafetyScore = (restaurants.reduce((sum, r) => sum + calculateSafetyScore(r), 0) / restaurants.length).toFixed(1);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            757 Safe Eats: Chesapeake
          </h1>
          <p className="text-xl mb-8 opacity-90">
            The definitive guide to safe, delicious gluten-free dining in Chesapeake, Virginia and the 757 area code.
          </p>
          <div className="inline-block bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <p className="text-sm opacity-80">
              {restaurants.length} restaurants reviewed &middot; {avgSafetyScore}/4 avg safety score
                  <button
                  onClick={() => setIsTooltipOpen(true)}
                  className="ml-2 inline-flex items-center justify-center w-5 h-5 text-blue-200 hover:text-blue-100 rounded-full border border-blue-300 hover:bg-blue-50 transition-colors"
                  aria-label="Learn how we calculate safety scores"
                 >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a1 1 0 011 1v4.586a.25.25 0 01-.146.234l-3 1.5a.75.75 0 00.444 1.356h2.702a.75.75 0 00.75-.75v-4.5a1 1 0 011-1zm-2.5 6.5a.75.75 0 100 1.5.75.75 0 000-1.5z" clipRule="evenodd" />
                    </svg>
                  </button>
            </p>
          </div>
        </div>
      </section>

      {/* Featured Restaurant of the Week */}
      {featured && (
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12">
          <div className="max-w-6xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 flex items-center">
                <div>
                  <p className="text-sm font-medium opacity-90">FEATURED THIS WEEK</p>
                  <h2 className="text-2xl font-bold">{featured.name}</h2>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <p className="text-gray-700 text-lg mb-4 line-clamp-2">{featured.about}</p>
                    <div className="flex gap-2 mb-4">
                      {featured.gfFriendly && (
                        <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                          GF menu
                        </span>
                      )}
                      {featured.dedicatedFryer && (
                        <span className="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full">
                          Dedicated GF fryer
                        </span>
                      )}
                      {featured.celiacSafe && (
                        <span className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full">
                          Celiac-safe
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                        <span className="text-2xl font-bold">{calculateSafetyScore(featured)}/4</span>
                        <span className="ml-2">Safety Score</span>
                      </div>
                      <Link
                        href={`/restaurant/${featured.slug}`}
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        View Full Details &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter Section */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-2xl px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg shadow-sm"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setFilters({ ...filters, gfMenu: !filters.gfMenu })}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filters.gfMenu
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {filters.gfMenu ? "✓ GF menu" : "GF menu"}
          </button>
          <button
            onClick={() => setFilters({ ...filters, celiacSafe: !filters.celiacSafe })}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filters.celiacSafe
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {filters.celiacSafe ? "✓ Celiac-safe" : "Celiac-safe"}
          </button>
          <button
            onClick={() => setFilters({ ...filters, dedicatedFryer: !filters.dedicatedFryer })}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              filters.dedicatedFryer
                ? "bg-slate-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {filters.dedicatedFryer ? "✓ Dedicated GF fryer" : "Dedicated GF fryer"}
          </button>
          {(filters.gfMenu || filters.celiacSafe || filters.dedicatedFryer) && (
            <button
              onClick={() => setFilters({ gfMenu: false, celiacSafe: false, dedicatedFryer: false })}
              className="px-6 py-3 rounded-xl font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Cuisine Type Filters */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-gray-600 mb-3">Cuisine Type</p>
          <div className="flex gap-3 flex-wrap">
            {cuisines.map((cuisine) => (
              <button
                key={cuisine}
                onClick={() => setSelectedCuisine(cuisine)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCuisine === cuisine
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
          {selectedCuisine !== "All" && (
            <button
              onClick={() => setSelectedCuisine("All")}
              className="mt-2 text-sm text-blue-600 hover:underline"
            >
              Clear cuisine filter
            </button>
          )}
        </div>

        {/* Restaurant Grid */}
        <section ref={restaurantsSectionRef}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {searchTerm || filters.gfMenu || filters.celiacSafe || filters.dedicatedFryer || selectedCuisine !== "All"
              ? `Found ${filteredRestaurants.length} restaurants`
              : "All Restaurants"}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                href={`/restaurant/${restaurant.slug}`}
                className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-blue-500 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {restaurant.name}
                      </h3>
                      <p className="text-gray-500 text-sm">{restaurant.cuisine}</p>
                    </div>
                    <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      <span className="text-lg font-bold">{calculateSafetyScore(restaurant)}/4</span>
                      <span className="text-sm ml-1">Safety</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {restaurant.about}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {restaurant.gfFriendly && (
                      <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        GF menu
                      </span>
                    )}
                    {restaurant.dedicatedFryer && (
                      <span className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded">
                        Dedicated GF fryer
                      </span>
                    )}
                    {restaurant.celiacSafe && (
                      <span className="inline-flex items-center px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">
                        Celiac-safe
                      </span>
                    )}
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="truncate">{restaurant.address}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredRestaurants.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No restaurants found matching your criteria.</p>
              <button
                onClick={() => { setSearchTerm(""); setFilters({ gfMenu: false, celiacSafe: false, dedicatedFryer: false }); setSelectedCuisine("All"); }}
                className="mt-4 text-blue-600 hover:underline font-semibold"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
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
      <footer className="bg-slate-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="opacity-70">&copy; 2024 757 Safe Eats: Chesapeake. Built with care for our local community.</p>
        </div>
      </footer>
    </main>
  );
}
