export interface Review {
    id: number;
    author: string;
    content: string;
    rating: number;
  }
  
export  interface ReviewState {
    reviews: Review[];
    loading: boolean;
    error: string | null;
  }
  