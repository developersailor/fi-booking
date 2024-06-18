import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { HotelData } from "../types/hotel";

interface HotelState {
  hotel: HotelData[];
  loading: boolean;
  error: Error | null;
}
const initialState: HotelState = {
  hotel: [],
  loading: false,
  error: null,
};

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


export const addHotel = createAsyncThunk<HotelData, HotelData>(
  "hotel/addHotel",
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
  "hotel/updateHotel",
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
  "hotel/deleteHotel",
  async (id) => {
    await axios.delete(`http://localhost:3000/hotels/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return id;
  }
);


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
      })
      .addCase(addHotel.fulfilled, (state, action: PayloadAction<HotelData>) => {
        state.hotel.push(action.payload);
      })
      .addCase(updateHotel.fulfilled, (state, action: PayloadAction<HotelData>) => {
        const index = state.hotel.findIndex((hotel) => hotel.id === action.payload.id);
        if (index !== -1) {
          state.hotel[index] = action.payload;
        }
      })
      .addCase(deleteHotel.fulfilled, (state, action: PayloadAction<number>) => {
        state.hotel = state.hotel.filter((hotel) => hotel.id !== action.payload);
      });
  },
});

export const { setHotels } = hotelSlice.actions;
export default hotelSlice.reducer;
