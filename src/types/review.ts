
export interface ReviewData{
  id: number;
  author: string| null;
  content: string | null;
  rating: number | null;
  loading: boolean;
  error: string | null;
  pricePerNight: number;
  guests: number;
  bedrooms: number;
  bathrooms: number; 
  images: string[];
}

export interface ReviewPayload {
    id: number;
}