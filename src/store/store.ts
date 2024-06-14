import { configureStore } from '@reduxjs/toolkit';
import availabilityReducer from '../slice/availabilitySlice';

const store = configureStore({
  reducer: {
    availability: availabilityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
