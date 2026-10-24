"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchMovies, requests, type Movie } from '@/lib/tmdb';

export default function Hero() {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    async function fetchHero() {
      const data = await fetchMovies(requests.fetchNetflixOriginals);
      if (data && data.length > 0) {
        setMovie(data[Math.floor(Math.random() * data.length)]);
      }
    }
    fetchHero();
  }, []);

  const router = useRouter();

  if (!movie) return <div className="h-[80vh] bg-zinc-900 animate-pulse"></div>;

  return (
    <div className="relative h-[80vh] w-full">
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title || movie.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      <div className="absolute bottom-20 left-12 max-w-2xl space-y-4">
        <h1 className="text-6xl font-bold text-white">{movie.title || movie.name}</h1>
        <p className="text-lg text-zinc-300 line-clamp-3">{movie.overview}</p>
        <div className="flex gap-4">
          <button
            onClick={() => router.push(`/watch/${movie.id}`)}
            className="bg-white text-black px-8 py-2 rounded font-bold flex items-center gap-2 hover:bg-zinc-200 transition"
          >
            ▶ Watch Full Movie
          </button>
          <button className="bg-zinc-500/50 text-white px-8 py-2 rounded font-bold backdrop-blur-md hover:bg-zinc-500/70 transition">
            ⓘ More Info
          </button>
        </div>
      </div>
    </div>
  );
}
