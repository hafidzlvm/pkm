"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { toggleFavorite } from "@/lib/store/slices/favoritesSlice";
import { Pokemon, getTypeColor } from "@/lib/services/pokeApi";
import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo } from "react";

interface PokemonCardProps {
  pokemon: Pokemon;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.pokemon);
  const isFavorite = favorites.some((fav) => fav.id === pokemon.id);

  const primaryType = pokemon.types[0]?.name || "normal";
  const accentColor = getTypeColor(primaryType);
  const pokemonId = pokemon.id.toString().padStart(3, "0");
  const imageUrl =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default ||
    "";

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(pokemon));
  };

  const typeLabels = useMemo(() => {
    return pokemon.types.map((type) => type.name);
  }, [pokemon.types]);

  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <motion.div
        className="specimen-card relative group cursor-pointer"
        style={{ "--accent-color": accentColor } as React.CSSProperties}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -8 }}
      >
        <div className="glass-container aspect-[3/4.8] relative overflow-hidden rounded-sm">
          <span className="specimen-id-bg absolute -bottom-2 sm:-bottom-4 -right-6 sm:-right-12 font-bold italic text-6xl sm:text-8xl lg:text-[12rem]">
            {pokemonId}
          </span>

          <div className="absolute inset-0 p-4 sm:p-6 lg:p-8 flex flex-col">
            <div className="flex justify-between items-start mb-2 sm:mb-4">
              <div>
                <span className="text-[8px] sm:text-[9px] lg:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] font-bold opacity-40 uppercase">
                  Protocol
                </span>
                <p className="text-[10px] sm:text-xs font-mono">SPEC-{pokemonId}</p>
              </div>
              <div className="text-right">
                {isFavorite ? (
                  <span className="material-symbols-outlined text-primary text-base sm:text-lg lg:text-xl">
                    verified
                  </span>
                ) : (
                  <span className="material-symbols-outlined text-white/20 text-base sm:text-lg lg:text-xl">
                    token
                  </span>
                )}
              </div>
            </div>

            <div className="flex-1 relative flex items-center justify-center">
              <div
                className="w-full h-full bg-center bg-no-repeat bg-contain transform scale-90 group-hover:scale-100 transition-transform duration-700 mix-blend-screen"
                style={{ backgroundImage: `url("${imageUrl}")` }}
              />
            </div>

            <div className="mt-auto">
              <span
                className="text-[10px] sm:text-xs font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase block mb-1"
                style={{ color: accentColor }}
              >
                {typeLabels.join(" / ")}
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter uppercase leading-none mb-2 sm:mb-4">
                {pokemon.name}
              </h3>
              <div className="flex justify-between items-end pt-2 sm:pt-4 border-t border-white/10">
                <div>
                  <p className="text-[8px] sm:text-[9px] tracking-widest opacity-40 uppercase">
                    Base EXP
                  </p>
                  <p className="text-xs sm:text-sm font-bold tracking-tighter">
                    {pokemon.base_experience}
                  </p>
                </div>
                <button
                  onClick={handleFavoriteClick}
                  className="material-symbols-outlined text-white/20 group-hover:text-primary transition-colors text-base sm:text-lg"
                  style={{ "--hover-color": accentColor } as React.CSSProperties}
                >
                  arrow_outward
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

