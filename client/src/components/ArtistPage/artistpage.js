import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Style/artistpage.css";
import artistDescriptions from "../artistinfo/artistinfo.js";

const ArtistPage = () => {
  const { artistName } = useParams(); // Get artist name from URL
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [artistDescription, setArtistDescription] = useState(""); // For artist description

  useEffect(() => {
    console.log(`Fetching data for artist: ${artistName}`);

    axios.get(`http://localhost:3000/api/artists/${artistName}`)
      .then((response) => {
        console.log("Received data from backend:", response.data);

        // Ensure the response data is an array of songs
        if (!Array.isArray(response.data) || response.data.length === 0) {
          setError("No songs found for this artist.");
          setLoading(false);
          return;
        }

        setSongs(response.data); // Directly use response.data as songs

        // Set artist description based on the artist name
        const description = artistDescriptions[artistName] || "No description available.";
        setArtistDescription(description);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching artist data:", error);
        setError("Failed to fetch artist data");
        setLoading(false);
      });
  }, [artistName]); // Re-run the effect when artistName changes

  if (loading) return <div className="loading">Loading artist info...</div>;
  if (error) return <div className="error">{error}</div>;

  // Use the first song's image as the artist image (or a default image)
  const artistImage = songs.length > 0 ? songs[0].image : "/default-artist.jpg";

  return (
    <div className="artist-page">
      <div className="artist-header">
        <img src={artistImage} alt={artistName} className="artist-image" />
        <h1>{artistName}</h1>
      </div>

      <div className="artist-description">
        <h3>Artist Description</h3>
        <p>{artistDescription}</p> {/* Display artist description dynamically */}
      </div>

      <div className="song-list">
        {songs.map((song, index) => (
          <div key={index} className="song-item">
            <img src={song.image} alt={song.title} className="song-cover" />
            <div className="song-info">
              <span className="song-title">{song.title}</span>
              <span className="song-album">{song.album || "Unknown Album"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistPage;
