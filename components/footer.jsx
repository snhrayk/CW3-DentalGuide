import { useState } from "react";
import styles from "../styles/footer.module.scss";

export default function Footer() {
  const [active, setActive] = useState(0);
  const click = (i) => {
    setActive(i);
  };

  return (
    <footer className={styles.footer}>
      <nav className={styles.nav}>
        <ul>
          <li
            className={`${styles.list} ${active === 0 ? styles.active : ""}`}
            onClick={() => click(0)}
          >
            <a href="#">
              <span className={styles.icon}></span>
              <span className={styles.text}>ホーム</span>
            </a>
          </li>
          <li
            className={`${styles.list} ${active === 1 ? styles.active : ""}`}
            onClick={() => click(1)}
          >
            <a href="#">
              <span className={styles.icon}></span>
              <span className={styles.text}>歯磨き</span>
            </a>
          </li>
          <li
            className={`${styles.list} ${active === 2 ? styles.active : ""}`}
            onClick={() => click(2)}
          >
            <a href="#">
              <span className={styles.icon}></span>
              <span className={styles.text}>記録</span>
            </a>
          </li>
          <div className={styles.indicator}></div>
        </ul>
      </nav>
    </footer>
  );
}
