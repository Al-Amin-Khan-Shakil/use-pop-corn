import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import { tempMovieData, tempWatchedData } from './data/tempMovieData';
import Logo from './components/Navbar/Logo';
import Search from './components/Navbar/Search';
import NumResult from './components/Navbar/NumResult';
import ListBox from './components/Main/ListBox';
import MovieList from './components/Main/MovieList';
import WatchedSummary from './components/Main/WatchedSummary';
import WatchedMovieList from './components/Main/WatchedMovieList';

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <Navbar>
        <Logo />
        <Search />
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
          <MovieList movies={movies} />
        </ListBox>
        <ListBox>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </ListBox>
      </Main>
    </>
  );
}
