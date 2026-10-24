"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Row from '@/components/Row';
import MovieModal from '@/components/MovieModal';
import { requests, type Movie } from '@/lib/tmdb';

export default function HomePage() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <div className="pb-20">
        <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} onMovieSelect={setSelectedMovie} />
        <Row title="Trending Now" fetchUrl={requests.fetchTrending} onMovieSelect={setSelectedMovie} />
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated} onMovieSelect={setSelectedMovie} />
        <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} onMovieSelect={setSelectedMovie} />
      </div>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </main>
  );
}
