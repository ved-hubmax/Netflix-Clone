const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const requests = {
  fetchTrending: `${BASE_URL}/trending/all/week?language=en-US`,
  fetchNetflixOriginals: `${BASE_URL}/discover/tv?with_networks=213`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?language=en-US`,
  fetchActionMovies: `${BASE_URL}/discover/movie?with_genres=28`,
};

export interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
}

interface MovieResponse {
  results?: Movie[];
  status_message?: string;
}

export async function fetchMovies(url: string): Promise<Movie[]> {
  if (!API_KEY) {
    throw new Error('TMDB API key is missing. Add NEXT_PUBLIC_TMDB_API_KEY to client/.env.local and restart the frontend.');
  }

  const requestUrl = new URL(url);
  requestUrl.searchParams.set('api_key', API_KEY);

  const response = await fetch(requestUrl);
  const data = (await response.json()) as MovieResponse;

  if (!response.ok) {
    throw new Error(data.status_message || `TMDB request failed (${response.status}).`);
  }

  if (!Array.isArray(data.results)) {
    throw new Error('TMDB returned an invalid movie list.');
  }

  return data.results;
}
