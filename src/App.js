import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import { tempMovieData } from './data/tempMovieData';
import Logo from './components/Navbar/Logo';
import Search from './components/Navbar/Search';
import NumResult from './components/Navbar/NumResult';
import ListBox from './components/Main/ListBox';
import WatchedBox from './components/Main/WatchedBox';
import MovieList from './components/Main/MovieList';

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <>
      <Navbar>
        <Logo />
        <Search />
        <NumResult movies={movies} />
      </Navbar>
      <Main>
        <ListBox>
          <MovieList movies={movies} />
        </ListBox>
        <WatchedBox />
      </Main>
    </>
  );
}
