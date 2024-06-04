import { useEffect, useState } from 'react';
import StarRating from '../StarRating/StarRating';

const KEY = 'c9ea9aa0';

export default function MovieDetails({ selectedId, onCloseMovie }) {
  const [movie, setMovie] = useState({});

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: realeased,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    const getMovieDetails = async () => {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
      );
      const data = await res.json();
      setMovie(data);
    };

    getMovieDetails();
  }, [selectedId]);

  return (
    <div className="details">
      <header>
        <button type="button" className="btn-back" onClick={onCloseMovie}>
          <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.384" />
            <g id="SVGRepo_iconCarrier">
              {' '}
              <path d="M7.68473 7.33186C8.07526 6.94134 8.07526 6.30817 7.68473 5.91765C7.29421 5.52712 6.66105 5.52712 6.27052 5.91765L1.60492 10.5832C0.823873 11.3643 0.823872 12.6306 1.60492 13.4117L6.27336 18.0801C6.66388 18.4706 7.29705 18.4706 7.68757 18.0801C8.0781 17.6896 8.0781 17.0564 7.68757 16.6659L4.02154 12.9998L22 12.9998C22.5523 12.9998 23 12.5521 23 11.9998C23 11.4476 22.5523 10.9998 22 10.9998L4.01675 10.9998L7.68473 7.33186Z" fill="#0F0F0F" />
              {' '}
            </g>
          </svg>
        </button>
        <img src={poster} alt={`Poster of ${movie} movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {realeased}
            {' '}
            &bull;
            {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating}
            {' '}
            IMDB rating
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          <StarRating maxRating={10} size={24} />
        </div>

        <p>
          <em>{plot}</em>
        </p>
        <p>
          Starring
          {' '}
          {actors}
        </p>
        <p>
          Directed by
          {' '}
          {director}
        </p>
        <p>
          Year:
          {' '}
          {year}
        </p>
      </section>
    </div>
  );
}
