import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadCountryByName = createAsyncThunk(
  "details/load-country-by-name",
  (name, { extra: { client, api } }) => {
    return client.get(api.searchByCountry(name));
  }
);
export const loadNeighborsByBorder = createAsyncThunk(
  "details/load-neighbors-by-border",
  (borders, { extra: { client, api } }) => {
    return client.get(api.filterByCode(borders));
  }
);

const initialState = {
  status: "idle",
  currentCountry: null,
  error: null,
  neighbors: [],
};

const detailsSlice = createSlice({
  name: "@@details",
  initialState,
  reducers: {
    clearDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCountryByName.fulfilled, (state, action) => {
        state.currentCountry = action.payload.data[0];
        state.status = "idle";
      })
      .addCase(loadNeighborsByBorder.fulfilled, (state, action) => {
        state.neighbors = action.payload.data.map((country) => country.name);
        state.status = "idle";
      })

      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "rejected";
          state.error = action.payload || action.meta.error;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      );
  },
});

export const detailsReducer = detailsSlice.reducer;
export const { clearDetails } = detailsSlice.actions;

// !Selectors
export const selectDetails = (state) => state.details;
export const selectCurrentCountry = (state) => state.details.currentCountry;
export const selectNeighbors = (state) => state.details.neighbors;
