import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { HotelData } from "../types/HotelData";

interface AdminState {
  hotels: HotelData[];
  loading: boolean;
  error: Error | null;
}

const initialState: AdminState = {
  hotels: [],
  loading: false,
  error: null,
};

export const fetchHotels = createAsyncThunk<HotelData[]>(
  "admin/fetchHotels",
  async () => {
    const response = await axios.get<HotelData[]>('http://localhost:3000/hotels', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }
);

export const addHotel = createAsyncThunk<HotelData, HotelData>(
  "admin/addHotel",
  async (hotel) => {
    const response = await axios.post<HotelData>('http://localhost:3000/hotels', 
      hotel, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }
);

export const updateHotel = createAsyncThunk<HotelData, HotelData>(
  "admin/updateHotel",
  async (hotel) => {
    const response = await axios.put<HotelData>(`http://localhost:3000/hotels/${hotel.id}`, hotel, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }
);

export const deleteHotel = createAsyncThunk<number, number>(
  "admin/deleteHotel",
  async (id) => {
    await axios.delete(`http://localhost:3000/hotels/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return id;
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotels.fulfilled, (state, action: PayloadAction<HotelData[]>) => {
        state.loading = false;
        state.hotels = action.payload;
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as Error;
      })
      .addCase(addHotel.fulfilled, (state, action: PayloadAction<HotelData>) => {
        state.hotels.push(action.payload);
      })
      .addCase(updateHotel.fulfilled, (state, action: PayloadAction<HotelData>) => {
        const index = state.hotels.findIndex(hotel => hotel.id === action.payload.id);
        if (index !== -1) {
          state.hotels[index] = action.payload;
        }
      })
      .addCase(deleteHotel.fulfilled, (state, action: PayloadAction<number>) => {
        state.hotels = state.hotels.filter(hotel => hotel.id !== action.payload);
      });
  },
});

export default adminSlice.reducer;
