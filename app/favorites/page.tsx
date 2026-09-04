"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { clearAllFavorites } from "@/lib/store/slices/favoritesSlice";
import { PokemonCard } from "@/components/ui/PokemonCard";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/sections/Navbar";

export default function FavoritesPage() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.pokemon);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleClearAll = () => {
    if (showClearConfirm) {
      dispatch(clearAllFavorites());
      setShowClearConfirm(false);
    } else {
      setShowClearConfirm(true);
      setTimeout(() => setShowClearConfirm(false), 3000);
    }
  };

  const handleShareList = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Favorite Pokemon",
        text: `Check out my ${favorites.length} favorite Pokemon!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="dark min-h-screen bg-background-dark text-white font-display overflow-x-hidden selection:bg-primary selection:text-black">
      {/* Background Grid */}
      <div className="fixed inset-0 technical-grid pointer-events-none z-0"></div>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 pl-4 sm:pl-6 lg:pl-12 pr-4 sm:pr-6 lg:pr-12 pt-24 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-20">
        <div className="mb-20 flex justify-between items-end border-b border-white/5 pb-12">
          <div>
            <span className="text-primary text-xs font-bold tracking-[0.5em] uppercase block mb-4">
              // Personal Collection
            </span>
            <h1 className="text-7xl font-bold tracking-tighter uppercase leading-none">
              My Elite<br />
              Specimens
            </h1>
          </div>
          <div className="text-right max-w-sm">
            <p className="text-sm text-white/40 leading-relaxed">
              A curated collection of {favorites.length} elite-tier specimens from your personal
              archive. Each specimen has been carefully selected for its exceptional qualities.
            </p>
          </div>
        </div>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-32"
          >
            <span className="material-symbols-outlined text-8xl text-white/20 mb-6">
              token
            </span>
            <p className="text-white/60 text-xl mb-2">No specimens collected yet</p>
            <p className="text-white/40 text-sm mb-8">
              Start building your elite collection from the archive
            </p>
            <Link
              href="/"
              className="border border-primary px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-primary hover:text-black transition-all"
            >
              Explore Archive
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Pokemon Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 mb-16">
              {favorites.map((pokemon, index) => (
                <motion.div
                  key={`favorite-${pokemon.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <PokemonCard pokemon={pokemon} />
                </motion.div>
              ))}
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between border-t border-white/5 pt-12"
            >
              <div className="flex items-center gap-6">
                <button
                  onClick={handleClearAll}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors group-hover:border-primary">
                    <span className="material-symbols-outlined text-white group-hover:text-primary">
                      delete
                    </span>
                  </div>
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">
                    {showClearConfirm ? "Confirm?" : "Clear All"}
                  </span>
                </button>
                <button onClick={handleShareList} className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors group-hover:border-primary">
                    <span className="material-symbols-outlined text-white group-hover:text-primary">
                      share
                    </span>
                  </div>
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">
                    Share Collection
                  </span>
                </button>
              </div>
              <p className="text-white/60 text-sm max-w-md text-right">
                Manage your personal collection of elite-tier specimens.
              </p>
            </motion.div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 pl-12 pr-12 pb-12 pt-12 border-t border-white/5 bg-background-dark/50 backdrop-blur-md">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold tracking-[0.4em] uppercase">PKMN-LUXE ARCHIVE</h3>
            <p className="text-[10px] tracking-widest opacity-30 font-medium">
              © 2024 THE COLLECTOR&apos;S GUILD. ALL RIGHTS RESERVED.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-12 text-[10px] tracking-[0.4em] font-bold uppercase">
            <a className="hover:text-primary transition-colors opacity-60 hover:opacity-100" href="#">
              Terms of Access
            </a>
            <a className="hover:text-primary transition-colors opacity-60 hover:opacity-100" href="#">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
