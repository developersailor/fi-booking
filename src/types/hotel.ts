export interface HotelData {
  id: number;
  name: string;
  location: string;
  pricePerNight: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  description: string;
  amenities: string[];
  rating: number;
  reviews: number;
  images: string[];
}

export interface Hotel {
  id: number;
  name: string;
  location: string;
}