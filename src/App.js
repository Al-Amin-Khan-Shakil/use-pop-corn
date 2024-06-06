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
import useMovies from './custom hooks/useMovies';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem('watched');
    return JSON.parse(storedValue);
  });

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
    localStorage.setItem('watched', JSON.stringify(watched));
  }, [watched]);

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

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
          {error && !isLoading && query && <ErrorMessage message={error} />}
          {error && !isLoading && !query && <Instruction />}
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
