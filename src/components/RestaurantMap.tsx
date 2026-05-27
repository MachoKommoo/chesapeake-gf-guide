"use client";

import dynamic from "next/dynamic";
import { restaurants } from "@/data/restaurants";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
  loading: () => <div className="bg-white rounded-xl p-8 text-center">Loading map...</div>
});
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
  ssr: false,
});
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), {
  ssr: false,
  loading: () => null,
});
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

import L from "leaflet";

// Fix for Leaflet icon issue in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface RestaurantMapProps {
  restaurants: typeof import("@/data/restaurants").restaurants;
  selectedCity: string;
}

export default function RestaurantMap({ restaurants, selectedCity }: RestaurantMapProps) {
  const filteredRestaurants = restaurants.filter((r) => selectedCity === "All" || r.city === selectedCity);

  if (filteredRestaurants.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 text-center">
        <p className="text-gray-500">No restaurants found in this location.</p>
      </div>
    );
  }

  // Get center coordinates based on selected city
  const getCenter = (): [number, number] => {
    if (selectedCity === "All") {
      return [36.7682, -76.2875]; // Central Virginia Beach/Chesapeake area
    }
    // City-specific coordinates
    const cityCoords: Record<string, [number, number]> = {
      Chesapeake: [36.7682, -76.2875],
      Norfolk: [36.8508, -76.2859],
      Suffolk: [36.7211, -76.5630],
      "Virginia Beach": [36.8529, -75.9780],
    };
    return cityCoords[selectedCity] || [36.7682, -76.2875];
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg">
      <div className="h-[600px] w-full">
        <MapContainer
          center={getCenter()}
          zoom={11}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filteredRestaurants.map((restaurant) => {
            // Parse address to coordinates (simplified - in production use a geocoding API)
            const coords: Record<string, [number, number]> = {
              "1400 Town Center Rd, Suite 170, Suffolk, VA 23434": [36.6961, -76.5123],
              "2355 Highwoods Blvd, Virginia Beach, VA 23464": [36.7892, -76.0539],
              "200 High St, Norfolk, VA 23510": [36.8508, -76.2859],
              "565 Belaire Ave, Chesapeake, VA 23320": [36.6892, -76.2156],
              "1801 N Great Bridge Rd, Chesapeake, VA 23320": [36.7234, -76.2089],
              "8384 Cedar Rd, Suite 5, Chesapeake, VA 23322": [36.6734, -76.3512],
              "648 Grassfield Pkwy #9, Chesapeake, VA 23323": [36.6589, -76.3978],
              "1390 Greenbrier Pkwy, Chesapeake, VA 23320": [36.7012, -76.2634],
              "1500 Volvo Pkwy, Chesapeake, VA 23320": [36.7089, -76.2456],
              "1329 N Battlefield Blvd, Suite 150, Chesapeake, VA 23320": [36.7234, -76.3567],
            };

            const coordsForRestaurant = coords[restaurant.address] || [36.7682, -76.2875];

            return (
              <Marker key={restaurant.id} position={coordsForRestaurant}>
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold">{restaurant.name}</h3>
                    <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
                    <p className="text-sm mt-1">
                      Safety Score: {restaurant.gfFriendly || restaurant.dedicatedFryer || restaurant.celiacSafe || restaurant.serverKnowledge ? "High" : "Check Details"}
                    </p>
                    <a
                      href={`/restaurant/${restaurant.slug}`}
                      className="text-blue-600 text-sm mt-2 inline-block"
                      onClick={(e) => e.preventDefault()}
                    >
                      View Details →
                    </a>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}
