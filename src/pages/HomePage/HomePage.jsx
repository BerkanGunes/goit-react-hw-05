import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getTrendingMovies()
      .then((data) => setMovies(data.results))
      .catch((err) => setError("Bir hata oluştu"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.container}>
      <h1>Trending Movies</h1>
      {loading && <p>Yükleniyor...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
