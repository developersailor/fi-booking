import { createSlice, createAsyncThunk, Draft } from '@reduxjs/toolkit';
import axios from 'axios';
import { SerializedError } from '@reduxjs/toolkit';
interface AvailabilityState {
    available: boolean | null;
    loading: boolean;
    error: string | Draft<SerializedError> | null;
}
  
const initialState: AvailabilityState = {
  available: null,
  loading: false,
  error: null,
};

export const checkAvailability = createAsyncThunk(
  'availability/checkAvailability',
  async (dates: { checkInDate: string; checkOutDate: string }) => {
    const response = await axios.post('http://localhost:3000/check-availability', dates);
    return response.data;
  }
);

const availabilitySlice = createSlice({
  name: 'availability',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAvailability.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAvailability.fulfilled, (state, action) => {
        state.loading = false;
        state.available = action.payload;
      })
      .addCase(checkAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export default availabilitySlice.reducer;
