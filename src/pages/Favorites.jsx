// Favorites.jsx
import "../css/Favorites.css";
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();

  if (favorites.length > 0) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard 
              movie={movie} 
              key={movie.id}
              onAddToFavorites={addToFavorites}
              onRemoveFromFavorites={removeFromFavorites}
              isFavorite={isFavorite(movie.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No Favorite Dramas Yet</h2>
      <p>Start adding dramas to your favorites and they will appear here!</p>
    </div>
  );
}

export default Favorites;