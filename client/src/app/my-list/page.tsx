"use client";

import React, { useState, useEffect } from 'react';
import { fetchMovies, type Movie } from '@/lib/tmdb';

export default function MyListPage() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadWatchlist() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/auth/login';
          return;
        }

        // 1. Fetch the list of movie IDs from our backend
        const res = await fetch('http://localhost:5000/api/watchlist/my-list', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Failed to fetch watchlist');
        const data = await res.json();
        const movieIds = data.watchlist;

        // 2. Fetch details for each movie ID from TMDB
        const moviePromises = movieIds.map(async (id: string | number) => {
          const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=54ff50cc9ebc2d863aedee5b440d9e59&language=en-US`);
          return movieRes.json();
        });

        const movies = await Promise.all(moviePromises);
        setWatchlist(movies);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not load your list');
      } finally {
        setIsLoading(false);
      }
    }

    loadWatchlist();
  }, []);

  const handleRemove = async (movieId: number) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/watchlist/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ movieId }),
      });

      if (res.ok) {
        setWatchlist(watchlist.filter(m => m.id !== movieId));
      }
    } catch (err) {
      alert('Failed to remove movie');
    }
  };

  if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading your list...</div>;
  if (error) return <div className="min-h-screen bg-black flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="bg-black min-h-screen pt-24 px-12">
      <h1 className="text-4xl font-bold text-white mb-8">My List</h1>
      {watchlist.length === 0 ? (
        <div className="text-zinc-500 text-center py-20">
          <p className="text-xl">Your list is empty. Start adding some movies!</p>
          <a href="/" className="text-red-500 hover:underline mt-4 block">Browse Movies</a>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {watchlist.map((movie) => (
            <div key={movie.id} className="relative group bg-zinc-900 rounded-md overflow-hidden">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                <p className="text-white font-bold mb-4">{movie.title || movie.name}</p>
                <button
                  onClick={() => handleRemove(movie.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
