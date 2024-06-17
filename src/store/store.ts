import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
import hotelReducer from '../slice/hotelSlice';
import adminReducer from '../slice/adminSlice';
import availabilityReducer from '../slice/availabilitySlice';

// Configure the store with all the reducers
const store = configureStore({
  reducer: {
    auth: authReducer,
    hotel: hotelReducer,
    admin: adminReducer,
    availability: availabilityReducer.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

// Define types for RootState, AppDispatch, and AppThunk
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
