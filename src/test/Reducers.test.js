import configureMockStore from 'redux-mock-store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const api = await fetch('https://restcountries.com/v3.1/region/africa');
  const data = await api.json();
  const arrayLength = data.length;
  return arrayLength;
});
export const fetchCountry = createAsyncThunk('data/fetchCountry', async (country) => {
  const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  const result = await response.json();
  let isLoaded = false;
  if (result.length > 0) {
    isLoaded = true;
  }
  return isLoaded;
});
const initialState = {
  countries: 0,
  isLoaded: false,
};
const countrySlice = createSlice({
  name: 'countrySlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => ({
        ...state, list: action.payload,
      }))
      .addCase(fetchCountry.fulfilled, (state, action) => ({
        ...state, list: action.payload,
      }));
  },
});
const mockStore = configureMockStore([thunk]);

describe('Testing the country reducer', () => {
  test('should return the initial state', () => {
    const store = mockStore({ countries: countrySlice.reducer });
    const expectedActions = [
      {
        type: fetchData.pending.type,
        meta: {
          requestId: expect.any(String),
          requestStatus: 'pending',
          arg: undefined,
        },
        payload: undefined,
      },
      {
        type: fetchData.fulfilled.type,
        meta: {
          requestId: expect.any(String),
          requestStatus: 'fulfilled',
          arg: undefined,
        },
        payload: 59,
      },
    ];
    return store.dispatch(fetchData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('should handle the FETCH_DATA action', () => {
    const store = mockStore({ countries: countrySlice.reducer });
    const expectedActions = [
      {
        type: fetchCountry.pending.type,
        meta: {
          requestId: expect.any(String),
          requestStatus: 'pending',
          arg: 'Nigeria',
        },
        payload: undefined,
      },
      {
        type: fetchCountry.fulfilled.type,
        meta: {
          requestId: expect.any(String),
          requestStatus: 'fulfilled',
          arg: 'Nigeria',
        },
        payload: true,
      },
    ];
    return store.dispatch(fetchCountry('Nigeria')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
