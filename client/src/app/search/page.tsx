"use client";

import React, { useState, useEffect } from 'react';
import { fetchMovies, type Movie } from '@/lib/tmdb';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) setQuery(q);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=54ff50cc9ebc2d863aedee5b440d9e59&query=${encodeURIComponent(query)}&language=en-US`);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen pt-24 px-12">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSearch} className="flex gap-4 mb-12">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies or series..."
            className="flex-1 bg-zinc-900 border border-zinc-700 text-white p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 text-lg"
          />
          <button type="submit" className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-red-700 transition">
            Search
          </button>
        </form>

        {isLoading ? (
          <div className="text-white text-center text-xl">Searching...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {results.map((movie) => (
              <div key={movie.id} className="group relative cursor-pointer">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="w-full h-auto rounded-md transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                  <p className="text-white font-bold text-sm">{movie.title || movie.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && results.length === 0 && query && (
          <div className="text-zinc-500 text-center py-20 text-xl">
            No results found for "{query}". Try something else!
          </div>
        )}
      </div>
    </div>
  );
}
