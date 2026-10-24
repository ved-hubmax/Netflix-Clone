"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Movie } from '@/lib/tmdb';

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  if (!movie) return null;

  const handlePlay = () => {
    // DIRECTLY to the full movie watch page
    router.push(`/watch/${movie.id}`);
    onClose();
  };

  const handleAddToList = async () => {
    setIsAdding(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to add movies to your list!');
        return;
      }

      const res = await fetch('http://localhost:5000/api/watchlist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ movieId: movie.id }),
      });

      if (res.ok) {
        alert('Added to My List! ❤️');
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to add movie');
      }
    } catch (error) {
      alert('Something went wrong');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-zinc-900 w-full max-w-3xl rounded-xl overflow-hidden relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black/50 w-10 h-10 rounded-full flex items-center justify-center hover:bg-black transition z-10"
        >
          ✕
        </button>

        <div className="relative h-64 md:h-96">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title || movie.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h2 className="text-4xl font-bold text-white mb-2">{movie.title || movie.name}</h2>
            <div className="flex gap-2 text-sm text-zinc-300">
              <span className="bg-zinc-800 px-2 py-1 rounded">{movie.id}</span>
              <span className="text-green-400 font-bold">Full HD</span>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-4">
          <div className="flex gap-4">
            <button
              onClick={handlePlay}
              className="bg-white text-black px-6 py-2 rounded font-bold hover:bg-zinc-200 transition flex items-center gap-2"
            >
              ▶ Watch Full Movie
            </button>
            <button
              onClick={handleAddToList}
              disabled={isAdding}
              className="bg-zinc-700 text-white px-6 py-2 rounded font-bold hover:bg-zinc-600 transition disabled:opacity-50"
            >
              {isAdding ? 'Adding...' : '+ My List'}
            </button>
          </div>
          <p className="text-zinc-300 leading-relaxed">
            {movie.overview}
          </p>
        </div>
      </div>
    </div>
  );
}
