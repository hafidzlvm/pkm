import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { pokeApi, Pokemon } from "@/lib/services/pokeApi";

interface SearchState {
  query: string;
  results: Pokemon[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: "",
  results: [],
  loading: false,
  error: null,
};

export const searchPokemon = createAsyncThunk(
  "search/pokemon",
  async (query: string) => {
    if (!query.trim()) {
      return [];
    }
    const results = await pokeApi.searchPokemon(query);
    return results;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      if (!action.payload.trim()) {
        state.results = [];
      }
    },
    clearSearch: (state) => {
      state.query = "";
      state.results = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchPokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to search Pokemon";
        console.error("Failed to search Pokemon:", action.error);
      });
  },
});

export const { setQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
