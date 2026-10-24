"use client";

import React, { useState, useEffect } from 'react';
import { fetchMovies, type Movie } from '@/lib/tmdb';

export default function Row({ title, fetchUrl, onMovieSelect }: { title: string; fetchUrl: string; onMovieSelect: (movie: Movie) => void }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;

    async function loadMovies() {
      try {
        const data = await fetchMovies(fetchUrl);
        if (isCurrent) {
          setMovies(data);
          setError(null);
        }
      } catch (error) {
        if (isCurrent) {
          setError(error instanceof Error ? error.message : 'Could not load movies.');
        }
      }
    }

    loadMovies();

    return () => {
      isCurrent = false;
    };
  }, [fetchUrl]);

  return (
    <div className="ml-4 mb-8">
      <h2 className="text-white text-xl font-semibold mb-4">{title}</h2>
      {error ? (
        <p role="alert" className="text-red-300 text-sm">{error}</p>
      ) : (
        <div className="flex overflow-x-scroll scrollbar-hide space-x-4 p-2">
          {movies.filter((movie) => movie.poster_path).map((movie) => (
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title || movie.name || 'Movie poster'}
              className="w-40 h-60 object-cover rounded-md cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => onMovieSelect(movie)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
