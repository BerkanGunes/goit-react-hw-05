import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => navigate("/", { replace: true }), 2000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return (
    <div className={styles.container}>
      Sayfa bulunamadı, ana sayfaya yönlendiriliyorsunuz...
    </div>
  );
};

export default NotFoundPage;
