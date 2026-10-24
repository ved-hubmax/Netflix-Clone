"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function WatchPage() {
  const params = useParams();
  const router = useRouter();
  const [trailerId, setTrailerId] = useState<string | null>(null);
  const [movie, setMovie] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMovieData() {
      try {
        const id = params.id;
        // 1. Fetch Movie Details
        const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=54ff50cc9ebc2d863aedee5b440d9e59&language=en-US`);
        const movieData = await movieRes.json();
        setMovie(movieData);

        // 2. Fetch Video Trailer
        const videoRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=54ff50cc9ebc2d863aedee5b440d9e59`);
        const videoData = await videoRes.json();
        const trailer = videoData.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');

        if (trailer) {
          setTrailerId(trailer.key);
        }
      } catch (error) {
        console.error('Error loading movie:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieData();
  }, [params.id]);

  if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading Cinema...</div>;
  if (!movie) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Movie not found.</div>;

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Header Navigation */}
      <div className="fixed top-0 left-0 w-full p-6 z-50 flex items-center gap-6 bg-gradient-to-b from-black/80 to-transparent">
        <button
          onClick={() => router.back()}
          className="text-white hover:text-zinc-300 transition flex items-center gap-2 text-lg font-medium"
        >
          ← Back
        </button>
      </div>

      {/* Video Player Section */}
      <div className="relative w-full aspect-video bg-black">
        {trailerId ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${trailerId}?autoplay=1`}
            title={movie.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-500">
            No trailer available for this movie.
          </div>
        )}
      </div>

      {/* Movie Details Section */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-6">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <span className="text-green-400 font-bold">{movie.vote_average} Rating</span>
        </div>
        <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl">
          {movie.overview}
        </p>
        <div className="flex gap-4 text-sm text-zinc-500">
          <span>{movie.release_date?.split('-')[0]}</span>
          <span>•</span>
          <span>{movie.runtime} min</span>
          <span>•</span>
          <span>{movie.genres?.map((g: any) => g.name).join(', ')}</span>
        </div>
      </div>
    </div>
  );
}
