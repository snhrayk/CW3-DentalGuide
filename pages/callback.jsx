// pages/callback.js
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    // URLからアクセストークンを取得
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");

    if (accessToken) {
      // アクセストークンをローカルストレージに保存
      localStorage.setItem("spotifyAccessToken", accessToken);
      // トップページにリダイレクト
      router.push("/");
    } else {
      // エラー処理
      console.error("アクセストークンが取得できませんでした。");
    }
  }, [router]);

  return <div>Loading...</div>;
}
