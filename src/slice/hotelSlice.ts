import { createSlice,createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


import axios from "axios";

interface Hotel {
  id: string;
  name: string;
  location: string;
}
interface HotelState {
    hotel: Hotel[] | null;
    loading: boolean;
    error: Error | null;
  }
export const fetchHotels = createAsyncThunk(
  "hotel/fetchHotels",
  async () => {
    const response = await axios.get<Hotel[]>('http://localhost:3000/hotels');
    return response.data;
  }
);

export const fetchHotelById = createAsyncThunk(
  "hotel/fetchHotelById",
  async (id: string) => {
    const response = await axios.get<Hotel>(`http://localhost:3000/hotels/${id}`);
    return response.data;
  }
);


export const fetchRoomsByHotel = createAsyncThunk(
  "hotel/fetchRoomsByHotel",
  async (id: string) => {
    const response = await axios.get(`http://localhost:3000/hotels/${id}/rooms`);
    return response.data;
  }
);

  
  const initialState: HotelState = {
      hotel: null,
      loading: false,
      error: null
  };
  
  export const hotelSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {
      setHotel: (state, action: PayloadAction<Hotel>) => {
        state.hotel = [action.payload];
      },
    },
  });
  
  export const { setHotel } = hotelSlice.actions;

  export default hotelSlice.reducer;