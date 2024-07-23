import axios from "axios";

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const playlist_id = process.env.PLAYLIST_ID;

const getSpotify = async (req, res) => {
  try {
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    const tracksResponse = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const tracks = tracksResponse.data.items.map((item) => item.track);
    res.status(200).json({ tracks });
  } catch (error) {
    console.error("Server error: ", error);
    res.status(500).json({ error: "Failed to fetch tracks" });
  }
};

export default getSpotify;
