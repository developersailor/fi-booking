import { configureStore } from '@reduxjs/toolkit';
import availabilityReducer from '../slice/availabilitySlice';
import authReducer from '../slice/authSlice';
const store = configureStore({
  reducer: {
    availability: availabilityReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
