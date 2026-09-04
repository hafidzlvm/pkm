import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { pokeApi, Pokemon, PokemonListItem } from "@/lib/services/pokeApi";

interface PokemonState {
  list: PokemonListItem[];
  currentPage: number;
  totalCount: number;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  nextUrl: string | null;
}

const initialState: PokemonState = {
  list: [],
  currentPage: 0,
  totalCount: 0,
  loading: false,
  error: null,
  hasMore: true,
  nextUrl: null,
};

export const fetchPokemonList = createAsyncThunk(
  "pokemon/fetchList",
  async (page: number = 0) => {
    const limit = 20;
    const offset = page * limit;
    const response = await pokeApi.getPokemonList(offset, limit);
    return { response, page };
  }
);

export const loadMorePokemon = createAsyncThunk(
  "pokemon/loadMore",
  async (_, { getState }) => {
    const state = getState() as { pokemon: PokemonState };
    const currentPage = state.pokemon.currentPage;
    const limit = 20;
    const offset = (currentPage + 1) * limit;
    const response = await pokeApi.getPokemonList(offset, limit);
    return { response, page: currentPage + 1 };
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    resetPokemon: (state) => {
      state.list = [];
      state.currentPage = 0;
      state.hasMore = true;
      state.nextUrl = null;
    },
    setPokemonList: (state, action: PayloadAction<PokemonListItem[]>) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.loading = false;
        const { response, page } = action.payload;
        state.totalCount = response.count;
        state.nextUrl = response.next;
        state.hasMore = !!response.next;

        if (page === 0) {
          // First page - replace list
          state.list = response.results;
        } else {
          // Append new results
          state.list = [...state.list, ...response.results];
        }

        state.currentPage = page;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch Pokemon list";
        console.error("Failed to fetch Pokemon list:", action.error);
      })
      .addCase(loadMorePokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMorePokemon.fulfilled, (state, action) => {
        state.loading = false;
        const { response, page } = action.payload;
        state.nextUrl = response.next;
        state.hasMore = !!response.next;
        state.list = [...state.list, ...response.results];
        state.currentPage = page;
      })
      .addCase(loadMorePokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load more Pokemon";
        console.error("Failed to load more Pokemon:", action.error);
      });
  },
});

export const { resetPokemon, setPokemonList } = pokemonSlice.actions;
export default pokemonSlice.reducer;

