import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";
import { getImageUrl } from "../../services/api";

const MovieList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.item}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className={styles.link}
          >
            {movie.poster_path && (
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className={styles.poster}
              />
            )}
            <span>{movie.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
