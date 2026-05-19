import restaurantsData from "./restaurants.json";

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  address: string;
  cuisine: string;
  rating: number;
  gfFriendly: boolean;
  dedicatedFryer: boolean;
  celiacSafe: boolean;
  priceRange: string;
  about: string;
  gfHighlights: string[];
  safetyNotes: string;
  photos: string[];
  lastVisited: string;
  featuredUntil: string | null;
  serverKnowledge: boolean;
}

export const restaurants: Restaurant[] = restaurantsData;
