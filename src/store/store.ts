import { configureStore } from '@reduxjs/toolkit';
import availabilityReducer from '../slice/availabilitySlice';
import authReducer from '../slice/authSlice';
import hotelSlice from '../slice/hotelSlice';
const store = configureStore({
  reducer: {
    availability: availabilityReducer,
    auth: authReducer,
    hotel: hotelSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
