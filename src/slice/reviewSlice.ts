import { createSlice, createAsyncThunk, Draft} from "@reduxjs/toolkit";

import axios from "axios";
import { ReviewData } from "../types/review";

export interface ReviewState {
    id: number;
    loading: boolean;
    error: string | null;
    reviews: Draft<ReviewData>[];
  }
const initialState: ReviewState = { 
    id: 0,
    loading: false,
    error: null,
    reviews: [],
};
export const addReview = createAsyncThunk<ReviewState, ReviewState>(
    "review/addReview",
    async (review) => {
        const response = await axios.post<ReviewState>("http://localhost:3000/reviews", review);
        return response.data;
    });


export const fetchReview = createAsyncThunk<ReviewState[],number>(
    "review/fetchReview",
    async (hotelId) => {
        const response = await axios.get<ReviewState[]>(`http://localhost:3000/hotel/${hotelId}/review`);
        return response.data;
    });

export const updateReview = createAsyncThunk<ReviewState, ReviewState>(
    "review/updateReview",
    async (review) => {
        const response = await axios.put<ReviewState>(`http://localhost:3000/reviews/${review.id}`, review);
        return response.data;
    });

export const deleteReview = createAsyncThunk<number, number>(
    "review/deleteReview",
    async (id) => {
        await axios.delete(`http://localhost:3000/reviews/${id}`);
        return id;
    });

const reviewSlice = createSlice({
    name: "reviewData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //Review.tsx için reducer
        builder.addCase(fetchReview.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchReview.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        })
        .addCase(fetchReview.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || null;
        });
    }
});
export default reviewSlice.reducer;