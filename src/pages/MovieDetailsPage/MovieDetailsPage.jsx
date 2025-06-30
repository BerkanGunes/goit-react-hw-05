import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { getMovieDetails, getImageUrl } from "../../services/api";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || "/movies");
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMovieDetails(movieId)
      .then(setMovie)
      .catch(() => setError("Bir hata oluştu"))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <p className={styles.container}>Yükleniyor...</p>;
  if (error) return <p className={styles.container}>{error}</p>;
  if (!movie) return null;

  return (
    <div className={styles.container}>
      <Link to={backLinkRef.current} className={styles.goback}>
        &larr; Go back
      </Link>
      <div className={styles.details}>
        {movie.poster_path && (
          <img
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            className={styles.poster}
          />
        )}
        <div>
          <h2>{movie.title}</h2>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres.map((g) => g.name).join(", ")}</p>
        </div>
      </div>
      <div className={styles.additional}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <NavLink
              to={`cast`}
              state={{ from: backLinkRef.current }}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`reviews`}
              state={{ from: backLinkRef.current }}
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
