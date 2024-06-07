export default function Movie({ movie, onSelectMovie }) {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onSelectMovie(event);
    }
  };
  return (
    /* eslint-disable */
    <li
      onClick={onSelectMovie}
      onKeyPress={handleKeyPress}
      aria-label="Movie"
      aria-hidden="true"
      tabIndex="0"
      role="presentation"
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
    /* eslint-enable */
  );
}
