import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import { tempMovieData, tempWatchedData } from "./data/tempMovieData";
import Logo from "./components/Navbar/Logo";
import Search from "./components/Navbar/Search";
import NumResult from "./components/Navbar/NumResult";
import ListBox from "./components/Main/ListBox";
import MovieList from "./components/Main/MovieList";
import WatchedSummary from "./components/Main/WatchedSummary";
import WatchedMovieList from "./components/Main/WatchedMovieList";
import Loader from "./components/Main/Loader";

const KEY = "c9ea9aa0";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const query = "War";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );

        if (!res.ok) throw new Error("Sending went wrong with fetching movies");
        const data = await res.json();
        setMovies(data.Search);
        setIsLoading(false);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    };

    fetchMovies();
  }, []);

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
          {isLoading ? <Loader /> : <MovieList movies={movies} />}
        </ListBox>
        <ListBox>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </ListBox>
      </Main>
    </>
  );
}
