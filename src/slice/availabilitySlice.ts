import { createSlice, createAsyncThunk, Draft,SerializedError} from '@reduxjs/toolkit';
import axios from 'axios';
interface AvailabilityState {
    available: boolean | null;
    loading: boolean;
    error: string | Draft<SerializedError> | null;
    
}
  
const initialState: AvailabilityState = {
  available: false,
  loading: false,
  error: null,

};
interface CheckAvailabilityPayload{
  hotelId: string;
  checkInDate: string;
  checkOutDate: string;
}

export const checkAvailability = createAsyncThunk(
  'availability/checkAvailability',
  async ({hotelId, checkInDate, checkOutDate}: CheckAvailabilityPayload) => {
    const response = await axios.post<{ available: boolean }>('http://localhost:3000/checkAvailability', {
      hotelId,
      checkInDate,
      checkOutDate
    });
    return response.data;
  }
);

 const availabilitySlice = createSlice({
  name: 'availability',
  initialState,
  reducers: {
    resetAvailability: (state) => {
      state.available = null;
      state.error = null;
    },
    setAvailability: (state, action) => {
      state.available = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.available = null;
      })
      .addCase(checkAvailability.fulfilled, (state, action) => {
        state.available = action.payload.available;
        state.loading = false;
        state.available = action.payload.available;
      })
      .addCase(checkAvailability.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || "An error occurred.";
      });
  },
});
export const { reducer } = availabilitySlice;

export default availabilitySlice;