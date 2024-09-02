// pages/callback.js
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.replace("#", "?"));
      const token = params.get("access_token");
      if (token) {
        localStorage.setItem("spotifyAccessToken", token);
        window.location.hash = ""; // ハッシュをクリア

        // トークン取得後、ホームページにリダイレクト
        router.push("/");
      }
    }
  }, [router]);

  return <div>Loading...</div>;
}
