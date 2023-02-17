import { configureStore } from '@reduxjs/toolkit';
import countrySlice from './Country/countryslice';
import detailSlice from './details';

const store = configureStore({
  reducer: {
    countries: countrySlice,
    country: detailSlice,
  },
});

export default store;
