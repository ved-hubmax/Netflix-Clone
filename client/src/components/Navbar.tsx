"use client";

import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-300 px-4 py-4 flex items-center justify-between ${isScrolled ? 'bg-black' : 'bg-transparent gradient-to-b from-black/70 to-transparent'}`}>
      <div className="flex items-center gap-8">
        <h1 className="text-red-600 text-3xl font-bold tracking-tighter cursor-pointer" onClick={() => window.location.href = '/'}>NETFLIX</h1>
        <div className="hidden md:flex items-center gap-4 text-sm text-zinc-200">
          <a href="/" className="hover:text-zinc-400 transition">Home</a>
          <a href="#" className="hover:text-zinc-400 transition">TV Shows</a>
          <a href="#" className="hover:text-zinc-400 transition">Movies</a>
          <a href="#" className="hover:text-zinc-400 transition">New & Popular</a>
          <a href="/my-list" className="hover:text-zinc-400 transition font-bold text-white">My List</a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <form onSubmit={handleSearch} className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search movies..."
            className="bg-black/50 border border-zinc-700 text-white text-sm rounded-full px-4 py-1 focus:outline-none focus:ring-1 focus:ring-zinc-500 w-48 transition-all focus:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="absolute right-3 top-1 text-zinc-400 hover:text-white">
            🔍
          </button>
        </form>
        <div className="w-8 h-8 rounded bg-red-600 cursor-pointer" onClick={() => window.location.href = '/auth/login'}></div>
      </div>
    </nav>
  );
}
