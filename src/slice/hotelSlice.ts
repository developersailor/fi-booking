import { createSlice,createAsyncThunk, Draft } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";
import { SerializedError } from "@reduxjs/toolkit";

interface HotelState {
  hotels: Hotel[] | null;
  loading: boolean;
  error: string | Draft<SerializedError> | null;
}

interface Hotel {
  id: string;
  name: string;
  location: string;
}

const initialState: HotelState = {
  hotels: null,
  loading: false,
  error: null,
};

export const fetchHotels = createAsyncThunk(
  "hotel/fetchHotels",
  async () => {
    const response = await axiosInstance.get("hotels");
    return response.data;
  }
);

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default hotelSlice.reducer;