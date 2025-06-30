import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast, getImageUrl } from "../../services/api";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMovieCast(movieId)
      .then((data) => setCast(data.cast))
      .catch(() => setError("Bir hata oluştu"))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;
  if (!cast.length) return <p>Oyuncu bilgisi bulunamadı.</p>;

  return (
    <ul className={styles.list}>
      {cast.map((actor) => (
        <li key={actor.cast_id} className={styles.item}>
          {actor.profile_path && (
            <img
              src={getImageUrl(actor.profile_path)}
              alt={actor.name}
              className={styles.photo}
            />
          )}
          <div>
            <p>{actor.name}</p>
            <p>Character: {actor.character}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
