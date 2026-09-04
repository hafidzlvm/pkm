"use client";

import { useEffect, useState } from "react";
import { Pokemon, getTypeColor } from "@/lib/services/pokeApi";
import { pokeApi } from "@/lib/services/pokeApi";
import { Navbar } from "@/components/sections/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";

// Curated Pokemon IDs - High value/rare Pokemon
const CURATED_POKEMON_IDS = [150, 6, 25, 9, 144, 145, 146, 151, 149, 143];

interface CuratedPokemon extends Pokemon {
  grade?: string;
  rarity?: string;
  valuation?: number;
}

export default function CuratedPage() {
  const [curatedPokemon, setCuratedPokemon] = useState<CuratedPokemon[]>([]);
  const [featuredPokemon, setFeaturedPokemon] = useState<CuratedPokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCuratedPokemon = async () => {
      setLoading(true);
      try {
        // Load featured Pokemon (Mewtwo)
        const featured = await pokeApi.getPokemon(150);
        setFeaturedPokemon({
          ...featured,
          grade: "Grade 10 / Gem Mint",
          rarity: "LEGENDARY",
          valuation: 84.2,
        });

        // Load other curated Pokemon
        const pokemonList = await Promise.all(
          CURATED_POKEMON_IDS.map(async (id) => {
            const pokemon = await pokeApi.getPokemon(id);
            const totalStats = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);
            
            // Determine grade and rarity based on stats
            let grade = "Grade 9.0 / Mint";
            let rarity = "RARE";
            let valuation = totalStats / 10;

            if (totalStats > 600) {
              grade = "Grade 10 / Gem Mint";
              rarity = "LEGENDARY";
              valuation = totalStats / 8;
            } else if (totalStats > 500) {
              grade = "Grade 9.5 / Pristine";
              rarity = "ULTRA RARE";
              valuation = totalStats / 9;
            }

            return {
              ...pokemon,
              grade,
              rarity,
              valuation: Math.round(valuation * 100) / 100,
            };
          })
        );

        // Sort by valuation (highest first)
        pokemonList.sort((a, b) => (b.valuation || 0) - (a.valuation || 0));
        setCuratedPokemon(pokemonList);
      } catch (error) {
        console.error("Error loading curated Pokemon:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCuratedPokemon();
  }, []);

  const getPokemonIdFormatted = (id: number, suffix: string = "") => {
    return `#${id.toString().padStart(3, "0")}${suffix}`;
  };

  const getRaritySuffix = (rarity: string) => {
    if (rarity === "LEGENDARY") return "-A";
    if (rarity === "ULTRA RARE") return "-S";
    return "-Ω";
  };

  if (loading) {
    return (
      <div className="dark min-h-screen bg-background-dark text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="size-16 border-t-2 border-primary animate-spin rounded-full opacity-20"></div>
          <p className="text-white/60">Calibrating curated specimens...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dark min-h-screen bg-background-dark text-white font-display overflow-x-hidden selection:bg-primary selection:text-black">
      {/* Background Grid */}
      <div className="fixed inset-0 technical-grid pointer-events-none z-0"></div>

      {/* Navbar */}
      <Navbar />

      {/* Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-full w-24 border-r border-white/5 z-40 bg-background-dark/80 backdrop-blur-xl flex-col items-center justify-center py-12">
        <div className="command-bar flex items-center gap-4 rotate-180">
          <span className="text-[10px] tracking-[0.5em] font-bold opacity-40 uppercase">
            Curator Protocol
          </span>
          <div className="w-px h-24 bg-white/10 my-4"></div>
          <span className="text-[10px] tracking-[0.5em] font-bold text-primary uppercase">
            Alpha Access
          </span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative z-10 pl-4 sm:pl-6 lg:pl-24 pt-24 sm:pt-32 lg:pt-32 flex-grow overflow-x-hidden">
        {/* Featured Hero Section */}
        {featuredPokemon && (
          <section className="px-4 sm:px-6 lg:px-12 mb-12 sm:mb-16 lg:mb-24">
            <div className="relative w-full aspect-[21/9] glass-container overflow-hidden flex items-center group rounded-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-40"></div>

              <div className="absolute top-6 sm:top-12 left-6 sm:left-12 z-10">
                <span className="text-primary text-[9px] sm:text-[10px] font-bold tracking-[0.5em] sm:tracking-[0.6em] uppercase block mb-2">
                  // Featured Specimen
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tighter uppercase leading-none">
                  Apex<br />
                  Guardian
                </h1>
              </div>

              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-full h-full bg-center bg-no-repeat bg-contain transform scale-75 group-hover:scale-[0.78] transition-transform duration-[2000ms] ease-out mix-blend-screen"
                  style={{
                    backgroundImage: `url("${
                      featuredPokemon.sprites.other["official-artwork"].front_default ||
                      featuredPokemon.sprites.front_default ||
                      ""
                    }")`,
                    filter: "brightness(1.2) contrast(1.1)",
                  }}
                ></div>
              </div>

              <div className="absolute bottom-6 sm:bottom-12 right-6 sm:right-12 text-right z-10">
                <div className="flex flex-col gap-4 sm:gap-6">
                  <div>
                    <p className="text-[8px] sm:text-[9px] tracking-widest opacity-40 uppercase mb-1">
                      Specimen Identification
                    </p>
                    <p className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tighter uppercase">
                      {featuredPokemon.name.toUpperCase()} / L-{featuredPokemon.id}
                    </p>
                  </div>
                  <div>
                    <p className="text-[8px] sm:text-[9px] tracking-widest opacity-40 uppercase mb-1">
                      Atmospheric Pressure
                    </p>
                    <p className="text-xs sm:text-sm font-mono tracking-widest">
                      101.325 kPa [OPTIMAL]
                    </p>
                  </div>
                  <Link
                    href={`/pokemon/${featuredPokemon.id}`}
                    className="mt-4 px-6 sm:px-8 py-2 sm:py-3 bg-white text-black text-[9px] sm:text-[10px] font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase hover:bg-primary transition-colors self-end"
                  >
                    Initiate Inquiry
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* High-Value Assets Table */}
        <section className="px-4 sm:px-6 lg:px-12 mb-16 sm:mb-24 lg:mb-32">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter uppercase mb-2">
                High-Value Assets
              </h2>
              <p className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] opacity-40 uppercase">
                Global Market Inventory / Vaulted Reserves
              </p>
            </div>
            <div className="flex gap-2 sm:gap-4">
              <button className="size-8 sm:size-10 border border-white/10 flex items-center justify-center hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-xs sm:text-sm">filter_list</span>
              </button>
              <button className="size-8 sm:size-10 border border-white/10 flex items-center justify-center hover:border-primary transition-colors">
                <span className="material-symbols-outlined text-xs sm:text-sm">sort</span>
              </button>
            </div>
          </div>

          {/* Table Header - Hidden on mobile, visible on tablet+ */}
          <div className="hidden md:grid grid-cols-12 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-[8px] sm:text-[9px] tracking-[0.3em] sm:tracking-[0.4em] font-bold opacity-30 uppercase border-b border-white/5">
            <div className="col-span-1">ID</div>
            <div className="col-span-4">Specimen Designation</div>
            <div className="col-span-2">Purity Grade</div>
            <div className="col-span-2 text-center">Rarity Status</div>
            <div className="col-span-2 text-center">Market Volatility</div>
            <div className="col-span-1 text-right">Valuation</div>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col gap-1">
            {curatedPokemon.map((pokemon, index) => {
              const imageUrl =
                pokemon.sprites.other["official-artwork"].front_default ||
                pokemon.sprites.front_default ||
                "";
              const primaryType = pokemon.types[0]?.name || "normal";
              const accentColor = getTypeColor(primaryType);
              const suffix = getRaritySuffix(pokemon.rarity || "RARE");

              return (
                <Link key={pokemon.id} href={`/pokemon/${pokemon.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-12 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 glass-container hover:bg-white/5 transition-colors items-center cursor-pointer group rounded-sm"
                  >
                    {/* ID */}
                    <div className="col-span-1 font-mono text-xs opacity-40 mb-2 md:mb-0">
                      {getPokemonIdFormatted(pokemon.id, suffix)}
                    </div>

                    {/* Specimen Designation */}
                    <div className="col-span-1 md:col-span-4 flex items-center gap-4 sm:gap-6 mb-4 md:mb-0">
                      <div className="size-12 sm:size-16 bg-white/5 rounded-sm overflow-hidden flex items-center justify-center flex-shrink-0">
                        <img
                          alt={pokemon.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                          src={imageUrl}
                        />
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl font-bold tracking-tighter uppercase">
                          {pokemon.name}
                        </h4>
                        <p className="text-[8px] sm:text-[9px] tracking-widest opacity-40 uppercase">
                          {pokemon.types.map((t) => t.name).join(" / ")} Elite Tier
                        </p>
                      </div>
                    </div>

                    {/* Purity Grade */}
                    <div className="col-span-1 md:col-span-2 mb-4 md:mb-0">
                      <div
                        className={`inline-flex items-center px-2 sm:px-3 py-1 ${
                          pokemon.rarity === "LEGENDARY"
                            ? "bg-primary/10 border border-primary/20"
                            : "bg-white/5 border border-white/10"
                        }`}
                      >
                        <span
                          className={`text-[9px] sm:text-[10px] font-bold tracking-widest uppercase ${
                            pokemon.rarity === "LEGENDARY" ? "text-primary" : ""
                          }`}
                        >
                          {pokemon.grade}
                        </span>
                      </div>
                    </div>

                    {/* Rarity Status */}
                    <div className="col-span-1 md:col-span-2 text-left md:text-center mb-4 md:mb-0">
                      <span className="text-[9px] sm:text-[10px] tracking-widest uppercase opacity-60">
                        {pokemon.rarity}
                      </span>
                    </div>

                    {/* Market Volatility - Sparkline */}
                    <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center mb-4 md:mb-0">
                      <svg
                        className="sparkline"
                        viewBox="0 0 80 20"
                        style={{ height: "20px", width: "80px", stroke: "rgba(255, 255, 255, 0.4)", strokeWidth: "1.5", fill: "none" }}
                      >
                        <polyline
                          points="0,15 10,12 20,16 30,5 40,8 50,2 60,10 70,4 80,6"
                          className="group-hover:stroke-primary transition-colors"
                        />
                      </svg>
                    </div>

                    {/* Valuation */}
                    <div className="col-span-1 text-left md:text-right">
                      <p className="text-sm font-bold tracking-tighter">ETH {pokemon.valuation?.toFixed(2)}</p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Loading Indicator */}
        <div className="mb-12 sm:mb-16 lg:mb-24 flex flex-col items-center gap-4 sm:gap-6">
          <div className="size-10 sm:size-12 border-t border-primary animate-spin rounded-full opacity-20"></div>
          <p className="text-[8px] sm:text-[9px] tracking-[0.6em] sm:tracking-[0.8em] font-bold opacity-30 uppercase text-center px-4">
            Syncing Curated Stream
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 pl-4 sm:pl-6 lg:pl-24 pr-4 sm:pr-6 lg:pr-12 pb-8 sm:pb-10 lg:pb-12 pt-12 sm:pt-14 lg:pt-16 border-t border-white/5 bg-background-dark/80 backdrop-blur-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 sm:gap-12">
          <div className="flex flex-col gap-2 sm:gap-3">
            <h3 className="text-base sm:text-lg font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase">
              PKMN-LUXE ARCHIVE
            </h3>
            <p className="text-[8px] sm:text-[9px] tracking-widest opacity-20 font-medium">
              ESTABLISHED 2024 / PRIVATE ARCHIVE ACCESS ONLY.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 sm:gap-8 lg:gap-12 text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] font-bold uppercase">
            <a className="hover:text-primary transition-colors opacity-40 hover:opacity-100" href="#">
              Terms of Access
            </a>
            <a className="hover:text-primary transition-colors opacity-40 hover:opacity-100" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-primary transition-colors opacity-40 hover:opacity-100" href="#">
              Compliance
            </a>
          </div>
          <div className="flex gap-3 sm:gap-4 items-center">
            <a
              className="size-8 sm:size-10 flex items-center justify-center border border-white/5 hover:border-primary/40 group transition-all"
              href="#"
            >
              <span className="material-symbols-outlined text-white/20 group-hover:text-primary transition-colors text-base sm:text-lg">
                terminal
              </span>
            </a>
            <a
              className="size-8 sm:size-10 flex items-center justify-center border border-white/5 hover:border-primary/40 group transition-all"
              href="#"
            >
              <span className="material-symbols-outlined text-white/20 group-hover:text-primary transition-colors text-base sm:text-lg">
                hub
              </span>
            </a>
            <a
              className="size-8 sm:size-10 flex items-center justify-center border border-white/5 hover:border-primary/40 group transition-all"
              href="#"
            >
              <span className="material-symbols-outlined text-white/20 group-hover:text-primary transition-colors text-base sm:text-lg">
                public
              </span>
            </a>
          </div>
        </div>
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0 opacity-20 text-[7px] sm:text-[8px] tracking-[0.4em] sm:tracking-[0.5em] font-bold uppercase">
          <span>Server: LX-VAULT-01</span>
          <span>Uptime: 99.9%</span>
          <span>Latency: 14ms</span>
        </div>
      </footer>
    </div>
  );
}

