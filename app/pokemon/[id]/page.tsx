"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchPokemonDetail, clearDetail } from "@/lib/store/slices/pokemonDetailSlice";
import { toggleFavorite } from "@/lib/store/slices/favoritesSlice";
import { getTypeColor } from "@/lib/services/pokeApi";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";

export default function PokemonDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { pokemon, evolutionChain, loading, error } = useAppSelector(
    (state) => state.pokemonDetail
  );
  const favorites = useAppSelector((state) => state.favorites.pokemon);
  const pokemonId = params.id as string;

  const isFavorite = pokemon ? favorites.some((fav) => fav.id === pokemon.id) : false;

  useEffect(() => {
    if (pokemonId) {
      dispatch(fetchPokemonDetail(pokemonId));
    }
    return () => {
      dispatch(clearDetail());
    };
  }, [pokemonId, dispatch]);

  const handleToggleFavorite = () => {
    if (pokemon) {
      dispatch(toggleFavorite(pokemon));
    }
  };

  if (loading || !pokemon) {
    return (
      <div className="dark min-h-screen bg-background-dark text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="size-16 border-t-2 border-primary animate-spin rounded-full opacity-20"></div>
          <p className="text-white/60">Calibrating specimen data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dark min-h-screen bg-background-dark text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60 mb-4">Specimen not found</p>
          <Link href="/" className="text-primary hover:underline font-bold">
            Back to Archive
          </Link>
        </div>
      </div>
    );
  }

  const primaryType = pokemon.types[0]?.name || "normal";
  const accentColor = getTypeColor(primaryType);
  const pokemonIdFormatted = pokemon.id.toString().padStart(3, "0");
  const imageUrl =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default ||
    "";

  // Get stat names
  const statNames: { [key: string]: string } = {
    hp: "Vitality",
    attack: "Offense",
    defense: "Defense",
    "special-attack": "Sp. Attack",
    "special-defense": "Sp. Defense",
    speed: "Velocity",
  };

  // Calculate total stats
  const totalStats = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
  const maxStat = Math.max(...pokemon.stats.map((s) => s.base_stat));

  // Get height and weight in proper units
  const heightInMeters = pokemon.height / 10;
  const weightInKg = pokemon.weight / 10;

  return (
    <div className="dark min-h-screen bg-background-dark text-white font-display overflow-x-hidden selection:bg-primary selection:text-black">
      {/* Background Massive Typography */}
      <div className="fixed inset-0 flex items-center justify-center z-0 overflow-hidden">
        <h1 className="text-overflow-bg font-bold uppercase">{pokemon.name.toUpperCase()}</h1>
      </div>

      {/* Right Side Vertical Index */}
      <aside className="fixed right-0 top-0 h-full w-20 border-l border-white/10 flex flex-col items-center py-10 z-50 bg-background-dark/80 backdrop-blur-md">
        <div className="text-[10px] tracking-[0.5em] rotate-90 whitespace-nowrap opacity-40 mb-20 uppercase">
          Index Scroll
        </div>
        <div className="flex flex-col gap-8 text-xs font-medium">
          {pokemon.id > 1 && (
            <Link
              href={`/pokemon/${pokemon.id - 1}`}
              className="opacity-20 hover:opacity-100 cursor-pointer transition-opacity"
            >
              {String(pokemon.id - 1).padStart(3, "0")}
            </Link>
          )}
          <span className="text-primary border-b border-primary pb-1">{pokemonIdFormatted}</span>
          <Link
            href={`/pokemon/${pokemon.id + 1}`}
            className="opacity-20 hover:opacity-100 cursor-pointer transition-opacity"
          >
            {String(pokemon.id + 1).padStart(3, "0")}
          </Link>
        </div>
      </aside>

      {/* Navbar */}
      <Navbar />

      {/* Main Content Container */}
      <main className="relative z-10 pt-24 sm:pt-32 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-12 xl:px-24 max-w-[1600px] mx-auto grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8 min-h-screen">
        {/* Left Column: Identity & Lore */}
        <div className="col-span-12 lg:col-span-4 flex flex-col justify-end pb-12">
          <div className="mb-12">
            <span className="text-primary text-sm font-bold tracking-[0.4em] uppercase block mb-4">
              — Identification
            </span>
            <h1 className="text-8xl font-bold leading-none tracking-tighter uppercase mb-6">
              {pokemonIdFormatted}
              <br />
              {pokemon.name}
            </h1>
            <div className="flex gap-2 flex-wrap">
              {pokemon.types.map((type) => (
                <span
                  key={type.name}
                  className="px-3 py-1 text-black text-[10px] font-bold tracking-widest uppercase"
                  style={{ backgroundColor: getTypeColor(type.name) }}
                >
                  {type.name}
                </span>
              ))}
              <span className="px-3 py-1 border border-white/20 text-white text-[10px] font-bold tracking-widest uppercase">
                Specimen {pokemonIdFormatted}
              </span>
            </div>
          </div>
          <div className="max-w-xs border-l-2 border-primary/30 pl-6 py-2">
            <p className="text-sm leading-relaxed text-white/60 font-light">
              An exceptional specimen characterized by high-frequency bio-electric output. This
              elite iteration displays a refined aesthetic with hyper-saturated pigmentation and
              razor-sharp agility profiles.
            </p>
          </div>
        </div>

        {/* Center Column: Hero Specimen Image */}
        <div className="col-span-12 lg:col-span-4 flex items-center justify-center relative">
          <div className="glass-container w-full aspect-[3/4] relative group cursor-crosshair overflow-hidden rounded-sm">
            <div
              className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-50"
              style={{ "--primary": accentColor } as React.CSSProperties}
            ></div>
            {/* Specimen Image */}
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div
                className="w-full h-full bg-center bg-no-repeat bg-contain transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url("${imageUrl}")` }}
              ></div>
            </div>
            {/* Architectural Framing Elements */}
            <div
              className="absolute top-4 left-4 border-t border-l size-8"
              style={{ borderColor: accentColor }}
            ></div>
            <div
              className="absolute bottom-4 right-4 border-b border-r size-8"
              style={{ borderColor: accentColor }}
            ></div>
            <div className="absolute bottom-8 left-8">
              <span className="text-[10px] font-mono opacity-40 uppercase">
                Ref: LUXE-{pokemonIdFormatted}-P
              </span>
            </div>
          </div>

          {/* Gestural Navigation Areas */}
          {pokemon.id > 1 && (
            <Link
              href={`/pokemon/${pokemon.id - 1}`}
              className="absolute inset-y-0 -left-12 w-24 flex items-center justify-center group cursor-pointer"
            >
              <span className="material-symbols-outlined text-4xl opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all">
                west
              </span>
            </Link>
          )}
          <Link
            href={`/pokemon/${pokemon.id + 1}`}
            className="absolute inset-y-0 -right-12 w-24 flex items-center justify-center group cursor-pointer"
          >
            <span className="material-symbols-outlined text-4xl opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
              east
            </span>
          </Link>
        </div>

        {/* Right Column: Technical Stats & Details */}
        <div className="col-span-12 lg:col-span-4 flex flex-col justify-end pb-12">
          {/* Technical Swiss Table */}
          <div className="mb-12">
            <span className="text-primary text-sm font-bold tracking-[0.4em] uppercase block mb-6">
              — Performance Specs
            </span>
            <div className="border-t border-white/10">
              <div className="grid grid-cols-3 py-4 border-b border-white/10 items-center">
                <span className="text-[10px] tracking-widest text-white/40 uppercase">
                  Attribute
                </span>
                <span className="text-sm font-medium uppercase">Metric</span>
                <span className="text-right text-[10px] font-mono text-primary">LVL</span>
              </div>
              {pokemon.stats.map((stat, index) => {
                const statName = statNames[stat.stat.name] || stat.stat.name;
                const percentage = (stat.base_stat / maxStat) * 100;
                return (
                  <div
                    key={`stat-${stat.stat.name}-${index}`}
                    className="grid grid-cols-3 py-5 border-b border-white/10 items-center group hover:bg-white/5 transition-colors px-1 -mx-1"
                  >
                    <span className="text-[10px] tracking-widest text-white/60 uppercase">
                      {statName}
                    </span>
                    <span className="text-lg font-light tracking-tighter uppercase">
                      {stat.base_stat}
                    </span>
                    <div className="flex justify-end">
                      <div className="w-16 h-[2px] bg-white/10 relative">
                        <div
                          className="absolute left-0 top-0 h-full bg-primary"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: accentColor,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="grid grid-cols-3 py-5 border-b border-white/10 items-center group hover:bg-white/5 transition-colors px-1 -mx-1">
                <span className="text-[10px] tracking-widest text-white/60 uppercase">
                  Potential
                </span>
                <span className="text-lg font-light tracking-tighter uppercase">
                  {totalStats > 500 ? "S-Tier" : totalStats > 400 ? "A-Tier" : "B-Tier"}
                </span>
                <div className="flex justify-end">
                  {totalStats > 500 && (
                    <span className="material-symbols-outlined text-primary text-sm">verified</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Abilities */}
          {pokemon.abilities.length > 0 && (
            <div className="mb-12">
              <span className="text-primary text-sm font-bold tracking-[0.4em] uppercase block mb-6">
                — Abilities
              </span>
              <div className="space-y-3">
                {pokemon.abilities.map((ability, index) => (
                  <div
                    key={`ability-${ability.ability.name}-${ability.slot}-${index}`}
                    className="border border-white/10 p-4 bg-background-dark/50"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium uppercase">
                        {ability.ability.name.replace("-", " ")}
                      </span>
                      {ability.is_hidden && (
                        <span className="text-[10px] text-primary uppercase tracking-widest">
                          Hidden
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detail List Grid */}
          <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10">
            <div className="bg-background-dark p-6">
              <p className="text-[9px] tracking-[0.3em] text-white/40 uppercase mb-2">Stature</p>
              <p className="text-sm font-medium uppercase">{heightInMeters} Meters</p>
            </div>
            <div className="bg-background-dark p-6">
              <p className="text-[9px] tracking-[0.3em] text-white/40 uppercase mb-2">Mass</p>
              <p className="text-sm font-medium uppercase">{weightInKg} Kilograms</p>
            </div>
            <div className="bg-background-dark p-6">
              <p className="text-[9px] tracking-[0.3em] text-white/40 uppercase mb-2">Rarity</p>
              <p className="text-sm font-medium uppercase">
                {pokemon.base_experience > 200 ? "Rare Elite" : "Common Elite"}
              </p>
            </div>
            <div className="bg-background-dark p-6">
              <p className="text-[9px] tracking-[0.3em] text-white/40 uppercase mb-2">
                Base EXP
              </p>
              <p className="text-sm font-medium text-primary uppercase">{pokemon.base_experience}</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Controls */}
      <footer className="fixed bottom-0 left-0 w-full z-50 px-12 py-8 flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] tracking-[0.2em] font-bold uppercase">Current View</span>
          <div className="flex gap-4 items-center">
            <span className="text-xs font-mono">
              {pokemonIdFormatted} / 1010
            </span>
            <div className="w-48 h-[1px] bg-white/10">
              <div
                className="h-full bg-primary"
                style={{ width: `${(pokemon.id / 1010) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <Link
            href="/"
            className="size-12 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
          >
            <span className="material-symbols-outlined text-lg">grid_view</span>
          </Link>
          <button
            onClick={handleToggleFavorite}
            className={`size-12 flex items-center justify-center hover:scale-105 transition-all ${
              isFavorite
                ? "bg-primary text-black"
                : "border border-white/10 hover:bg-white hover:text-black"
            }`}
          >
            <span className="material-symbols-outlined text-lg">
              {isFavorite ? "favorite" : "share"}
            </span>
          </button>
        </div>
      </footer>

      {/* Architectural Background Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[5] opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        ></div>
      </div>
    </div>
  );
}

