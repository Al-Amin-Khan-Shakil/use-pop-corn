import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import Logo from './components/Navbar/Logo';
import Search from './components/Navbar/Search';
import NumResult from './components/Navbar/NumResult';
import ListBox from './components/Main/ListBox';
import MovieList from './components/Main/MovieList';
import WatchedSummary from './components/Main/WatchedSummary';
import WatchedMovieList from './components/Main/WatchedMovieList';
import Loader from './components/Main/Loader';
import ErrorMessage from './components/Main/ErrorMessage';
import MovieDetails from './components/Main/MovieDetails';
import Instruction from './components/Main/Instruction';

const KEY = 'c9ea9aa0';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('Avengers');
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatche = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  useEffect(() => {
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
        }
      }
    };

    if (!query.length) {
      setMovies([]);
      setError('');
    }

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>
      <Main>
        {/* <ListBox element={<MovieList movies={movies} />} />
        <ListBox
          element={(
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          )}
        /> */}
        <ListBox>
          {isLoading && !error && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && !isLoading && <ErrorMessage message={error} />}
          {error && isLoading && <Instruction />}
        </ListBox>
        <ListBox>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatche}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </ListBox>
      </Main>
    </>
  );
}
