import { useEffect, useState } from 'react';

const KEY = 'c9ea9aa0';

export default function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    callback?.();

    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal },
        );

        if (!res.ok) throw new Error('Something went wrong with fetching movies.');

        const data = await res.json();

        if (data.Response === 'False') throw new Error('Movie not found');

        setMovies(data.Search);
        setError('');
        setIsLoading(false);
      } catch (err) {
        if (err.name === 'AbortError') {
          setIsLoading(true);
        } else {
          setError(err.message);
          setIsLoading(false);
        }
      }
    };

    if (!query.length) {
      setMovies([]);
      setError('');
    }

    // handleCloseMovie();
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
