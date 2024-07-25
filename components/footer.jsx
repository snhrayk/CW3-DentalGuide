import React, { useState } from "react";
import styles from "../styles/footer.module.scss";
import Link from "next/link";

export default function Footer() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNavClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.nav}>
        <ul>
          <li
            className={`${styles.list} ${
              activeIndex === 0 ? styles.active : ""
            }`}
            onClick={() => handleNavClick(0)}
          >
            <Link href="/" className={styles.link}>
              <span className={styles.icon}></span>
              <span className={styles.text}>ホーム</span>
            </Link>
          </li>
          <li
            className={`${styles.list} ${
              activeIndex === 1 ? styles.active : ""
            }`}
            onClick={() => handleNavClick(1)}
          >
            <Link href="/BrushTeeth" className={styles.link}>
              <span className={styles.icon}></span>
              <span className={styles.text}>歯磨き</span>
            </Link>
          </li>
          <li
            className={`${styles.list} ${
              activeIndex === 2 ? styles.active : ""
            }`}
            onClick={() => handleNavClick(2)}
          >
            <Link href="/Record" className={styles.link}>
              <span className={styles.icon}></span>
              <span className={styles.text}>記録</span>
            </Link>
          </li>
        </ul>
        <svg
          className={styles.indicator}
          style={{ transform: `translateX(calc(100% * ${activeIndex}))` }}
          width="calc(100% / 3)"
          height="72"
          viewBox="0 0 108 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M108 36C82.5 36 95 72 54 72C13 72 25.5 36 0 36C0 16.1177 24.1766 0 54 0C83.8234 0 108 16.1177 108 36Z"
            fill="white"
          />
          <g filter="url(#filter0_d_1015_1260)">
            <circle cx="54" cy="36" r="28" fill="#F6F9FA" />
          </g>
          <defs>
            <filter
              id="filter0_d_1015_1260"
              x="24"
              y="6"
              width="60"
              height="60"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_1015_1260"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_1015_1260"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
    </footer>
  );
}
