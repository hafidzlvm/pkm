import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { pokeApi, Pokemon, EvolutionChain } from "@/lib/services/pokeApi";

interface PokemonDetailState {
  pokemon: Pokemon | null;
  evolutionChain: EvolutionChain | null;
  loading: boolean;
  error: string | null;
}

const initialState: PokemonDetailState = {
  pokemon: null,
  evolutionChain: null,
  loading: false,
  error: null,
};

export const fetchPokemonDetail = createAsyncThunk(
  "pokemonDetail/fetch",
  async (idOrName: string | number) => {
    const pokemon = await pokeApi.getPokemon(idOrName);
    const evolutionChain = await pokeApi.getEvolutionChain(pokemon.id);
    return { pokemon, evolutionChain };
  }
);

const pokemonDetailSlice = createSlice({
  name: "pokemonDetail",
  initialState,
  reducers: {
    clearDetail: (state) => {
      state.pokemon = null;
      state.evolutionChain = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemon = action.payload.pokemon;
        state.evolutionChain = action.payload.evolutionChain;
      })
      .addCase(fetchPokemonDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch Pokemon details";
        console.error("Failed to fetch Pokemon details:", action.error);
      });
  },
});

export const { clearDetail } = pokemonDetailSlice.actions;
export default pokemonDetailSlice.reducer;

