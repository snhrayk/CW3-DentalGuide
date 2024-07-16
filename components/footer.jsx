import { useState } from "react";

import Link from "next/link";
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
            <Link href="/" className={styles.link}>
              <span className={styles.icon}></span>
              <span className={styles.text}>ホーム</span>
            </Link>
          </li>
          <li
            className={`${styles.list} ${active === 1 ? styles.active : ""}`}
            onClick={() => click(1)}
          >
            <Link href="/BrushTeeth" className={styles.link}>
              <span className={styles.icon}></span>
              <span className={styles.text}>歯磨き</span>
            </Link>
          </li>
          <li
            className={`${styles.list} ${active === 2 ? styles.active : ""}`}
            onClick={() => click(2)}
          >
            <Link href="/Record" className={styles.link}>
              <span className={styles.icon}></span>
              <span className={styles.text}>記録</span>
            </Link>
          </li>
          <div className={styles.indicator}></div>
        </ul>
      </nav>
    </footer>
  );
}

// import { useState } from "react";
// import styles from "../styles/footer.module.scss";
// import { Link } from "react-router-dom";

// export default function Footer() {
//   const [active, setActive] = useState(0);
//   const click = (i) => {
//     setActive(i);
//   };

//   return (
//     <footer className={styles.footer}>
//       <nav className={styles.nav}>
//         <ul>
//           <li
//             className={`${styles.list} ${active === 0 ? styles.active : ""}`}
//             onClick={() => click(0)}
//           >
//             <button>
//               <span className={styles.icon}></span>
//               <span className={styles.text}>ホーム</span>
//             </button>
//           </li>
//           <li
//             className={`${styles.list} ${active === 1 ? styles.active : ""}`}
//             onClick={() => click(1)}
//           >
//             <button>
//               <span className={styles.icon}></span>
//               <span className={styles.text}>歯磨き</span>
//             </button>
//           </li>
//           <li
//             className={`${styles.list} ${active === 2 ? styles.active : ""}`}
//             onClick={() => click(2)}
//           >
//             <button>
//               <span className={styles.icon}></span>
//               <span className={styles.text}>記録</span>
//             </button>
//           </li>
//           <div className={styles.indicator}></div>
//         </ul>
//       </nav>
//     </footer>
//   );
// }
