"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchPokemonList, loadMorePokemon } from "@/lib/store/slices/pokemonSlice";
import { PokemonCard } from "@/components/ui/PokemonCard";
import { Pokemon } from "@/lib/services/pokeApi";
import { pokeApi } from "@/lib/services/pokeApi";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Navbar } from "@/components/sections/Navbar";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { list, loading, hasMore, currentPage } = useAppSelector((state) => state.pokemon);
  const { query, results: searchResults, loading: searchLoading } = useAppSelector(
    (state) => state.search
  );
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loadedIds, setLoadedIds] = useState<Set<number>>(new Set());

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  // Fetch initial Pokemon list
  useEffect(() => {
    dispatch(fetchPokemonList(0));
  }, [dispatch]);

  // Load Pokemon details when list changes
  useEffect(() => {
    const loadDetails = async () => {
      if (list.length === 0) return;

      // Get Pokemon IDs from URLs
      const getPokemonIdFromUrl = (url: string): number => {
        const matches = url.match(/\/(\d+)\/$/);
        return matches ? parseInt(matches[1]) : 0;
      };

      // Filter out already loaded Pokemon
      const newItems = list.filter((item) => {
        const id = getPokemonIdFromUrl(item.url);
        return id > 0 && !loadedIds.has(id);
      });

      if (newItems.length === 0) return;

      setLoadingDetails(true);
      try {
        const details = await Promise.all(
          newItems.map((item) => pokeApi.getPokemon(item.name))
        );
        
        setPokemonDetails((prev) => {
          // Create a Map to ensure uniqueness by ID
          const pokemonMap = new Map<number, Pokemon>();
          
          // Add existing Pokemon
          prev.forEach((p) => {
            pokemonMap.set(p.id, p);
          });
          
          // Add new Pokemon (this will overwrite if duplicate, but shouldn't happen)
          details.forEach((p) => {
            if (!pokemonMap.has(p.id)) {
              pokemonMap.set(p.id, p);
            }
          });
          
          // Update loadedIds
          const updatedIds = new Set(loadedIds);
          details.forEach((p) => updatedIds.add(p.id));
          setLoadedIds(updatedIds);
          
          // Convert Map back to array, sorted by ID
          return Array.from(pokemonMap.values()).sort((a, b) => a.id - b.id);
        });
      } catch (error) {
        console.error("Error loading Pokemon details:", error);
      } finally {
        setLoadingDetails(false);
      }
    };

    loadDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  // Infinite scroll
  useEffect(() => {
    if (inView && hasMore && !loading && !query) {
      dispatch(loadMorePokemon());
    }
  }, [inView, hasMore, loading, query, dispatch]);

  // Reset Pokemon details when search is cleared
  useEffect(() => {
    if (!query) {
      setPokemonDetails([]);
      setLoadedIds(new Set());
    }
  }, [query]);

  // Determine which Pokemon to display
  const displayPokemon = query ? searchResults : pokemonDetails;
  const displayLoading = query ? searchLoading : loading || loadingDetails;

  return (
    <div className="dark min-h-screen bg-background-dark text-white font-display overflow-x-hidden selection:bg-primary selection:text-black">
      {/* Background Grid */}
      <div className="fixed inset-0 technical-grid pointer-events-none z-0"></div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 pl-4 sm:pl-6 lg:pl-48 pr-4 sm:pr-6 lg:pr-12 pt-24 sm:pt-32 lg:pt-40 flex-grow min-h-screen">
        <div className="mb-12 sm:mb-16 lg:mb-20 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-8 border-b border-white/5 pb-8 sm:pb-10 lg:pb-12">
          <div className="flex-1">
            <span className="text-primary text-[10px] sm:text-xs font-bold tracking-[0.3em] sm:tracking-[0.5em] uppercase block mb-3 sm:mb-4">
              // Database 001
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase leading-none">
              The Collector&apos;s<br />
              Archive
            </h1>
          </div>
          <div className="text-left sm:text-right max-w-full sm:max-w-sm">
            <p className="text-xs sm:text-sm text-white/40 leading-relaxed">
              A curated high-fidelity digital repository of elite-tier specimens. Sorted by
              molecular density and bio-electric potential.
            </p>
          </div>
        </div>

        {/* Pokemon Grid */}
        {displayLoading && displayPokemon.length === 0 ? (
          <div className="flex justify-center items-center py-16 sm:py-24 lg:py-32">
            <div className="size-12 sm:size-16 border-t-2 border-primary animate-spin rounded-full opacity-20"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            {displayPokemon.map((pokemon) => (
              <PokemonCard key={`pokemon-${pokemon.id}`} pokemon={pokemon} />
            ))}
          </div>
        )}

        {/* Infinite Scroll Trigger */}
        {!query && hasMore && (
          <div ref={ref} className="mt-16 sm:mt-24 lg:mt-32 mb-12 sm:mb-16 flex flex-col items-center gap-4 sm:gap-6">
            {loading && (
              <>
                <div className="size-12 sm:size-16 border-t-2 border-primary animate-spin rounded-full opacity-20"></div>
                <p className="text-[9px] sm:text-[10px] tracking-[0.6em] sm:tracking-[0.8em] font-bold opacity-40 uppercase text-center px-4">
                  Calibrating Archive Stream
                </p>
              </>
            )}
          </div>
        )}

        {/* No Results */}
        {query && displayPokemon.length === 0 && !displayLoading && (
          <div className="flex justify-center items-center py-16 sm:py-24 lg:py-32">
            <p className="text-white/40 text-sm sm:text-base lg:text-lg text-center px-4">
              No Pokemon found for &quot;{query}&quot;
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 pl-4 sm:pl-6 lg:pl-48 pr-4 sm:pr-6 lg:pr-12 pb-8 sm:pb-10 lg:pb-12 pt-8 sm:pt-10 lg:pt-12 border-t border-white/5 bg-background-dark/50 backdrop-blur-md">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold tracking-[0.3em] sm:tracking-[0.4em] uppercase">
              PKMN-LUXE ARCHIVE
            </h3>
            <p className="text-[9px] sm:text-[10px] tracking-widest opacity-30 font-medium">
              © 2024 THE COLLECTOR&apos;S GUILD. ALL RIGHTS RESERVED.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 lg:gap-12 text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] font-bold uppercase">
            <a className="hover:text-primary transition-colors opacity-60 hover:opacity-100" href="#">
              Terms of Access
            </a>
            <a className="hover:text-primary transition-colors opacity-60 hover:opacity-100" href="#">
              Privacy Policy
            </a>
          </div>
          <div className="flex gap-4 sm:gap-6 items-center">
            <a
              className="size-8 sm:size-10 flex items-center justify-center border border-white/10 hover:border-primary group transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-white/40 group-hover:text-primary transition-colors text-base sm:text-lg">
                terminal
              </span>
            </a>
            <a
              className="size-8 sm:size-10 flex items-center justify-center border border-white/10 hover:border-primary group transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-white/40 group-hover:text-primary transition-colors text-base sm:text-lg">
                hub
              </span>
            </a>
            <a
              className="size-8 sm:size-10 flex items-center justify-center border border-white/10 hover:border-primary group transition-colors"
              href="#"
            >
              <span className="material-symbols-outlined text-white/40 group-hover:text-primary transition-colors text-base sm:text-lg">
                data_exploration
              </span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
