// contexts/MovieContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPopularMovies, searchMovies } from '../services/api';

const MovieContext = createContext();

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

// Also export as useMovieContext for backward compatibility
export const useMovieContext = useMovies;

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [favoritesLoaded, setFavoritesLoaded] = useState(false); // Track if favorites are loaded

  // Helper function to check if localStorage is available
  const isLocalStorageAvailable = () => {
    try {
      const test = '__localStorage_test__';
      window.localStorage.setItem(test, test);
      window.localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Load favorites from localStorage on mount
  useEffect(() => {
      const savedFavorites = window.localStorage.getItem('movieFavorites');
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);
        setFavorites(parsedFavorites);
      }
      setFavoritesLoaded(true); 
    }, []);

  useEffect(() => {
    if (!favoritesLoaded) {
      return;
    }

    try {
      window.localStorage.setItem('movieFavorites', JSON.stringify(favorites));
    } catch (err) {
      console.error('Error saving favorites to localStorage:', err);
    }
  }, [favorites, favoritesLoaded]);

  // Load movies on mount
  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getPopularMovies();
      setMovies(response.data.results);
    } catch (err) {
      setError('Failed to load movies');
      console.error('Error loading movies:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError(null);
      setSearchQuery(query);
      
      if (query.trim() === '') {
        // If search is empty, load all movies
        const response = await getPopularMovies();
        setMovies(response.data.results);
      } else {
        // Search for movies
        const response = await searchMovies(query);
        setMovies(response.data.results);
      }
    } catch (err) {
      setError('Failed to search movies');
      console.error('Error searching movies:', err);
    } finally {
      setLoading(false);
    }
  }

  const addToFavorites = (movie) => {
    setFavorites(prev =>  [movie, ...prev]
   )
  }

  const removeFromFavorites = (movieId) => {
    setFavorites(prev => prev.filter(movie => movie.id !== movieId))
  }

  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.id === movieId);
  };

  const clearSearch = () => {
    setSearchQuery('');
    loadMovies();
  };

  const value = {
    movies,
    favorites,
    loading,
    error,
    searchQuery,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    handleSearch,
    clearSearch,
    loadMovies
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};