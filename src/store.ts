import { useDispatch } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import axios from "axios";

import * as api from "config";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { controlsReducer } from "features/controls/controls-slice";
import { countryReducer } from "features/countries/countries-slice";
import { detailsReducer } from "features/details/details-slice";
import { themeReducer } from "features/theme";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["theme"],
};

const rootReducer = combineReducers({
  theme: themeReducer,
  controls: controlsReducer,
  countries: countryReducer,
  details: detailsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          client: axios,
          api: api,
        },
      },
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
