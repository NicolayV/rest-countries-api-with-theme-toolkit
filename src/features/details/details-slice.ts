import { Country, Extra, Status } from "types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loadCountryByName = createAsyncThunk<
  {
    data: Country[];
  },
  string,
  { extra: Extra }
>("@@details/load-country-by-name", (name, { extra: { client, api } }) => {
  return client.get(api.searchByCountry(name));
});

export const loadNeighborsByBorder = createAsyncThunk<
  {
    data: Country[];
  },
  string[],
  { extra: Extra }
>(
  "@@details/load-neighbors-by-border",
  (borders, { extra: { client, api } }) => {
    return client.get(api.filterByCode(borders));
  }
);

type DetailsSlice = {
  status: Status;
  currentCountry: Country | null;
  error: string | null;
  neighbors: string[];
};

const initialState: DetailsSlice = {
  status: "idle",
  currentCountry: null,
  error: null,
  neighbors: [],
};

const detailsSlice = createSlice({
  name: "@@details",
  initialState,
  reducers: {
    clearDetails: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCountryByName.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentCountry = action.payload.data[0];
      })
      .addCase(loadNeighborsByBorder.fulfilled, (state, action) => {
        state.status = "idle";
        state.neighbors = action.payload.data.map((country) => country.name);
      })

      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state) => {
          state.status = "rejected";
          state.error = "Cannot load data";
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
