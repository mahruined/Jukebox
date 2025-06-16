import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Style/HomePage.css';
import Playlist from '../../util/playlist';

const Profile = ({ genre, image, id }) => {
  return (
    <div className="genre">
      <Link to={`/genre/${id}`} className="genre-link">
        <div className="genre-image-container">
          <img className="genre-image" src={image} alt={genre} />
        </div>
        <p className="genre-name">{genre}</p>
      </Link>
    </div>
  );
};

export default function HomePage() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newSong, setNewSong] = useState({
    title: '',
    image: '',
    genre: '',
  });

  useEffect(() => {
    axios.get('http://localhost:3000/api/genres')
      .then((response) => {
        setGenres(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch genres');
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    setNewSong({ ...newSong, [e.target.name]: e.target.value });
  };

  const handleAddSong = () => {
    if (!newSong.title || !newSong.genre) {
      alert("Title and Genre are required");
      return;
    }

    const playlist = new Playlist();
    playlist.saveGenreSongs(newSong.genre, newSong);

    alert(`Added "${newSong.title}" to genre "${newSong.genre}"`);
    setNewSong({ title: '', image: '', genre: '' });
  };

  if (loading) {
    return <div className="loading">Loading genres...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <section className="homepage-container">
      <h1 className="homepage-title">Genres</h1>

      {/* Form to Add a Song to a Genre */}
      <div className="add-song-form">
        <h2>Add New Song to a Genre</h2>
        <input
          type="text"
          name="title"
          placeholder="Song Title"
          value={newSong.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newSong.image}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre Name (must match exactly)"
          value={newSong.genre}
          onChange={handleInputChange}
        />
        <button onClick={handleAddSong}>Add to Genre</button>
      </div>

      <div className="genres-grid">
        {genres.map((genre) => (
          <Profile key={genre.id} genre={genre.name} image={genre.image} id={genre.id} />
        ))}
      </div>
    </section>
  );
}
