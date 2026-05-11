import { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import type { Movie } from '../../types/movie';
import fetchMovies from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import css from './App.module.css';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    setMovies([]); // Очищення колекції при новому пошуку
    setError(false);
    setIsLoading(true);

    try {
      const data = await fetchMovies(query);
      
      if (data.results.length === 0) {
        toast('No movies found for your request.', { icon: '🍿' });
      } else {
        setMovies(data.results);
      }
    } catch (err) {
        console.error(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };
  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />
      
      {error && <ErrorMessage />}
      {isLoading && <Loader />}
      
      {!isLoading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default App;