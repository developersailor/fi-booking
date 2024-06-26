import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import authReducer from '../slice/authSlice';
import hotelReducer from '../slice/hotelSlice';
import adminReducer from '../slice/adminSlice';
import availabilityReducer from '../slice/availabilitySlice';
import reviewSlice from '../slice/reviewSlice';

// Configure the store with all the reducers
const store = configureStore({
  reducer: {
    authStore: authReducer,
    hotelStore: hotelReducer,
    adminStore: adminReducer,
    availabilityStore: availabilityReducer,
    reviewStore: reviewSlice,
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
