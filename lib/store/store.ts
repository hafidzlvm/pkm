import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./slices/pokemonSlice";
import searchReducer from "./slices/searchSlice";
import favoritesReducer from "./slices/favoritesSlice";
import pokemonDetailReducer from "./slices/pokemonDetailSlice";

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    search: searchReducer,
    favorites: favoritesReducer,
    pokemonDetail: pokemonDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

