import { useEffect } from "react";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.replace("#", "?"));
      const token = params.get("access_token");
      if (token) {
        localStorage.setItem("spotifyAccessToken", token);
        window.location.hash = "";
      }
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
