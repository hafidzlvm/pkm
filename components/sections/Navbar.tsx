"use client";

import { useState, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { searchPokemon, setQuery } from "@/lib/store/slices/searchSlice";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export function Navbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { query } = useAppSelector((state) => state.search);
  const favorites = useAppSelector((state) => state.favorites.pokemon);
  const [searchInput, setSearchInput] = useState(query);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration error by only showing client-side values after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle search
  const handleSearch = useCallback(
    (value: string) => {
      setSearchInput(value);
      dispatch(setQuery(value));
      if (value.trim()) {
        dispatch(searchPokemon(value));
        // Navigate to home if searching
        if (pathname !== "/") {
          router.push("/");
        }
      } else {
        // Clear search
        dispatch(setQuery(""));
      }
    },
    [dispatch, router, pathname]
  );

  // Sync search input with Redux state
  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      handleSearch(searchInput);
      setIsSearchOpen(false);
    }
  };

  // Handle search icon click
  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen && searchInput.trim()) {
      handleSearch(searchInput);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 lg:px-12 py-4 sm:py-6 lg:py-8 flex justify-between items-center bg-background-dark/80 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <Link href="/" className="flex items-center gap-2 sm:gap-4">
          <div className="size-8 sm:size-10 bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-black text-xl sm:text-2xl">stat_3</span>
          </div>
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tighter uppercase">
            PKMN-LUXE
          </h2>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-8 xl:gap-12 text-[10px] tracking-[0.4em] font-semibold uppercase">
          <Link href="/" className="hover:text-primary transition-colors">
            Archive
          </Link>
          <Link href="/curated" className="hover:text-primary transition-colors">
            Curated
          </Link>
          <Link href="/favorites" className="hover:text-primary transition-colors">
            Collection
          </Link>
        </nav>

        <div className="flex gap-2 sm:gap-4 lg:gap-6 items-center">
          {/* Search Bar */}
          <div className="relative">
            {isSearchOpen ? (
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-1 sm:gap-2"
              >
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search Pokemon..."
                  className="bg-white/10 border border-white/20 px-2 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-primary transition-colors w-32 sm:w-48 lg:w-64"
                  autoFocus
                  onBlur={() => {
                    // Close search after a delay to allow form submission
                    setTimeout(() => setIsSearchOpen(false), 200);
                  }}
                />
                <button
                  type="submit"
                  className="size-8 sm:size-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                >
                  <span className="material-symbols-outlined text-sm sm:text-lg">search</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchInput("");
                    handleSearch("");
                  }}
                  className="size-8 sm:size-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                >
                  <span className="material-symbols-outlined text-sm sm:text-lg">close</span>
                </button>
              </form>
            ) : (
              <button
                onClick={handleSearchIconClick}
                className="size-8 sm:size-10 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                <span className="material-symbols-outlined text-sm sm:text-lg">search</span>
              </button>
            )}
          </div>

          {/* Vault Status - Hidden on mobile, visible on tablet+ */}
          <div className="hidden sm:block text-right">
            <p className="text-[9px] tracking-widest opacity-40 uppercase">Vault Status</p>
            <p className="text-[11px] font-bold tracking-widest text-primary uppercase">
              {isMounted ? favorites.length : 0} Collected
            </p>
          </div>

          {/* Hamburger Menu - Only visible on mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden size-10 sm:size-12 border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
          >
            <span className="material-symbols-outlined text-lg sm:text-xl">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Mobile Menu */}
          <div className="fixed top-[73px] sm:top-[89px] left-0 w-full sm:w-80 bg-background-dark/95 backdrop-blur-xl border-b border-white/10 z-50 lg:hidden shadow-xl">
            <nav className="flex flex-col py-4">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-white/5 hover:text-primary transition-colors border-b border-white/5"
              >
                Archive
              </Link>
              <Link
                href="/curated"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-white/5 hover:text-primary transition-colors border-b border-white/5"
              >
                Curated
              </Link>
              <Link
                href="/favorites"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-white/5 hover:text-primary transition-colors"
              >
                Collection
              </Link>
            </nav>

            {/* Vault Status in Mobile Menu */}
            <div className="px-6 py-4 border-t border-white/10">
              <p className="text-[9px] tracking-widest opacity-40 uppercase mb-1">Vault Status</p>
              <p className="text-sm font-bold tracking-widest text-primary uppercase">
                {isMounted ? favorites.length : 0} Collected
              </p>
            </div>
          </div>
        </>
      )}

      {/* Sidebar Search (only on home page and desktop) */}
      {pathname === "/" && (
        <aside className="hidden lg:flex fixed left-0 top-0 h-full w-24 border-r border-white/5 z-40 bg-background-dark/80 backdrop-blur-xl flex-col items-center justify-center py-12">
          <div className="command-bar flex items-center gap-4 rotate-180">
            <span className="text-[10px] tracking-[0.5em] font-bold opacity-40 uppercase">
              Archive Protocol
            </span>
            <div className="w-px h-24 bg-white/10 my-4"></div>
            <input
              className="bg-transparent border-none text-[11px] tracking-[0.4em] uppercase focus:ring-0 placeholder:text-white/20 w-64 text-center cursor-pointer hover:text-primary transition-colors"
              placeholder="[ SEARCH ARCHIVE ]"
              type="text"
              value={searchInput}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </aside>
      )}
    </>
  );
}
