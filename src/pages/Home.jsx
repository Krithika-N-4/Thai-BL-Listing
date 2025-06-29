// Home.jsx
import MovieCard from "../components/MovieCard";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/Home.css";

function Home() {
  const { 
    movies, 
    loading, 
    error, 
    searchQuery, 
    handleSearch, 
    addToFavorites, 
    removeFromFavorites, 
    isFavorite 
  } = useMovieContext();

  const onSearch = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <div className="home">
      <form onSubmit={onSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for Dramas..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Drama not found!</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard 
              movie={movie} 
              key={movie.id}
              onAddToFavorites={addToFavorites}
              onRemoveFromFavorites={removeFromFavorites}
              isFavorite={isFavorite(movie.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;