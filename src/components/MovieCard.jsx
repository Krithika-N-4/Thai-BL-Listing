// components/MovieCard.jsx
import React from 'react';
import '../css/MovieCard.css';

const MovieCard = ({ movie, onAddToFavorites, onRemoveFromFavorites, isFavorite }) => {
  const handleFavoriteClick = () => {
    if (isFavorite) {
      onRemoveFromFavorites(movie.id);
    } else {
      onAddToFavorites(movie);
    }
  };

  // Format rating
  const formatRating = (rating) => {
    if (rating === null || rating === undefined) return 'N/A';
    return rating.toFixed(1);
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img 
          src={movie.poster_url} 
          alt={movie.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
          }}
        />
        <div className="movie-overlay">
          <button 
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={handleFavoriteClick}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
      
      <div className="movie-info">
        <h3 className="movie-title">{movie.name}</h3>
        <div className="movie-details">
          <span className="release-date">{movie.release_date.split("-")[0]}</span>
          <span className="rating">    ⭐{formatRating(movie.rating)} </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;