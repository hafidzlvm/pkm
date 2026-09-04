import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "@/lib/services/pokeApi";

interface FavoritesState {
  pokemon: Pokemon[];
}

const loadFavoritesFromStorage = (): Pokemon[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("favoritePokemon");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error loading favorites from storage:", error);
    return [];
  }
};

const saveFavoritesToStorage = (pokemon: Pokemon[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("favoritePokemon", JSON.stringify(pokemon));
};

// Initialize with empty array to avoid hydration mismatch
// Will be loaded from localStorage on client side after mount
const initialState: FavoritesState = {
  pokemon: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Pokemon>) => {
      const exists = state.pokemon.find((p) => p.id === action.payload.id);
      if (!exists) {
        state.pokemon.push(action.payload);
        saveFavoritesToStorage(state.pokemon);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.pokemon = state.pokemon.filter((p) => p.id !== action.payload);
      saveFavoritesToStorage(state.pokemon);
    },
    toggleFavorite: (state, action: PayloadAction<Pokemon>) => {
      const exists = state.pokemon.find((p) => p.id === action.payload.id);
      if (exists) {
        state.pokemon = state.pokemon.filter((p) => p.id !== action.payload.id);
      } else {
        state.pokemon.push(action.payload);
      }
      saveFavoritesToStorage(state.pokemon);
    },
    loadFavorites: (state) => {
      state.pokemon = loadFavoritesFromStorage();
    },
    clearAllFavorites: (state) => {
      state.pokemon = [];
      saveFavoritesToStorage([]);
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite, loadFavorites, clearAllFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;

