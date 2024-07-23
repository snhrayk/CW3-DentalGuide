import axios from "axios";

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

const getSpotifyToken = async (req, res) => {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(
            `${client_id}:${client_secret}`
          ).toString("base64")}`,
        },
      }
    );

    res.status(200).json({ access_token: response.data.access_token });
  } catch (error) {
    console.error("Error fetching Spotify token:", error);
    res.status(500).json({ error: "Failed to fetch access token" });
  }
};

export default getSpotifyToken;
