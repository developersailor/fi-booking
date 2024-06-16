import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { HotelData } from "../types/HotelData";

interface HotelState {
  hotel: HotelData[];
  loading: boolean;
  error: Error | null;
}

export const fetchHotels = createAsyncThunk(
  "hotel/fetchHotels",
  async () => {
    const response = await axios.get<HotelData[]>('http://localhost:3000/hotels', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }
);

const initialState: HotelState = {
  hotel: [],
  loading: false,
  error: null,
};

const hotelSlice = createSlice({
  name: 'hotel',
  initialState,
  reducers: {
    setHotels: (state, action: PayloadAction<HotelData[]>) => {
      state.hotel = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotels.fulfilled, (state, action: PayloadAction<HotelData[]>) => {
        state.loading = false;
        state.hotel = action.payload;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as Error;
      });
  },
});

export const { setHotels } = hotelSlice.actions;
export default hotelSlice.reducer;
