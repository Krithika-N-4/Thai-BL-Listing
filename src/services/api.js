// Import movies data from separate JSON file
import moviesData from './movies.json';

// Mock API functions to replace TMDB API calls
export const getPopularMovies = async () => {
  try {
    // Simulate API delay (optional)
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Return movies in reverse order (newest first)
    const reversedMovies = [...moviesData].reverse();
    
    return {
      data: {
        results: reversedMovies
      }
    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    // Simulate API delay (optional)
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Filter movies based on search query
    const filteredMovies = moviesData.filter(movie => 
      movie.name.toLowerCase().includes(query.toLowerCase())
    );
    
    // Return in reverse order
    const reversedMovies = [...filteredMovies].reverse();
    
    return {
      data: {
        results: reversedMovies
      }
    };
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

