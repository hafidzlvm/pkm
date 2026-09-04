import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Types
export interface PokemonType {
  name: string;
  url: string;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  other: {
    "official-artwork": {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
  height: number; // in decimeters
  weight: number; // in hectograms
  base_experience: number;
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface EvolutionChain {
  id: number;
  chain: {
    species: {
      name: string;
      url: string;
    };
    evolves_to: EvolutionChain["chain"][];
  };
}

// Helper function to get Pokemon ID from URL
const getPokemonIdFromUrl = (url: string): number => {
  const matches = url.match(/\/(\d+)\/$/);
  return matches ? parseInt(matches[1]) : 0;
};

// Helper function to get type color
export const getTypeColor = (typeName: string): string => {
  const typeColors: { [key: string]: string } = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  };
  return typeColors[typeName.toLowerCase()] || "#68A090";
};

export const pokeApi = {
  // Get list of Pokemon with pagination
  getPokemonList: async (offset: number = 0, limit: number = 20): Promise<PokemonListResponse> => {
    try {
      const response = await api.get("/pokemon", {
        params: { offset, limit },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error fetching Pokemon list:", error);
      throw new Error(
        error.response?.data?.message || error.message || "Failed to fetch Pokemon list"
      );
    }
  },

  // Get Pokemon by ID or name
  getPokemon: async (idOrName: string | number): Promise<Pokemon> => {
    try {
      const response = await api.get(`/pokemon/${idOrName}`);
      const data = response.data;

      return {
        id: data.id,
        name: data.name,
        types: data.types.map((t: any) => ({
          name: t.type.name,
          url: t.type.url,
        })),
        stats: data.stats.map((s: any) => ({
          base_stat: s.base_stat,
          effort: s.effort,
          stat: {
            name: s.stat.name,
            url: s.stat.url,
          },
        })),
        abilities: data.abilities.map((a: any) => ({
          ability: {
            name: a.ability.name,
            url: a.ability.url,
          },
          is_hidden: a.is_hidden,
          slot: a.slot,
        })),
        sprites: {
          front_default: data.sprites.front_default,
          front_shiny: data.sprites.front_shiny,
          other: {
            "official-artwork": {
              front_default: data.sprites.other?.["official-artwork"]?.front_default || null,
              front_shiny: data.sprites.other?.["official-artwork"]?.front_shiny || null,
            },
          },
        },
        height: data.height,
        weight: data.weight,
        base_experience: data.base_experience,
      };
    } catch (error: any) {
      console.error(`Error fetching Pokemon ${idOrName}:`, error);
      throw new Error(
        error.response?.data?.message || error.message || `Failed to fetch Pokemon ${idOrName}`
      );
    }
  },

  // Search Pokemon by name
  searchPokemon: async (query: string): Promise<Pokemon[]> => {
    try {
      // PokéAPI doesn't have a search endpoint, so we'll fetch all and filter
      // For better performance, we can limit the search to first 1000 Pokemon
      const response = await api.get("/pokemon", {
        params: { offset: 0, limit: 1000 },
      });

      const filtered = response.data.results.filter((pokemon: PokemonListItem) =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );

      // Fetch details for filtered results (limit to first 20 for performance)
      const pokemonPromises = filtered.slice(0, 20).map((item: PokemonListItem) =>
        pokeApi.getPokemon(item.name)
      );

      return await Promise.all(pokemonPromises);
    } catch (error: any) {
      console.error("Error searching Pokemon:", error);
      throw new Error(
        error.response?.data?.message || error.message || "Failed to search Pokemon"
      );
    }
  },

  // Get evolution chain
  getEvolutionChain: async (pokemonId: number): Promise<EvolutionChain | null> => {
    try {
      // First get Pokemon species
      const pokemonResponse = await api.get(`/pokemon/${pokemonId}`);
      const speciesUrl = pokemonResponse.data.species.url;

      // Get species data
      const speciesResponse = await api.get(speciesUrl.replace(BASE_URL, ""));
      const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

      // Get evolution chain
      const evolutionResponse = await api.get(evolutionChainUrl.replace(BASE_URL, ""));
      const chainData = evolutionResponse.data;

      return {
        id: chainData.id,
        chain: {
          species: {
            name: chainData.chain.species.name,
            url: chainData.chain.species.url,
          },
          evolves_to: chainData.chain.evolves_to.map((evo: any) => ({
            species: {
              name: evo.species.name,
              url: evo.species.url,
            },
            evolves_to: evo.evolves_to || [],
          })),
        },
      };
    } catch (error: any) {
      console.error(`Error fetching evolution chain for Pokemon ${pokemonId}:`, error);
      return null;
    }
  },
};

