import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Review, ReviewState } from "../types/review";
const initialState: ReviewState = {
  reviews: [],
  loading: false,
  error: null,
};

export const fetchReviews = createAsyncThunk<Review[], number>(
  "reviews/fetchReviews",
  async (hotelId:number) => {
    const response = await axios.get<Review[]>(`http://localhost:3000/hotel/${hotelId}/reviews`);
    return response.data;
  }
);

export const addReview = createAsyncThunk<Review, { hotelId: number, review: Review }>(
    "reviews/addReview",
    async ({ hotelId, review }) => {
        const response = await axios.post<Review>(`http://localhost:3000/hotel/${hotelId}/reviews`, review, {
        headers: {
            'Content-Type': 'application/json',
        },
        });
        return response.data;
    });

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action: PayloadAction<Review[]>) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      }).addCase(addReview.fulfilled, (state, action: PayloadAction<Review>) => {
        state.reviews.push(action.payload);
      }).addCase(addReview.rejected, (state, action) => {
        state.error = action.error.message || 'Something went wrong';
      }).addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export default reviewSlice.reducer;
