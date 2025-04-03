import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Style/HomePage.css';

const Profile = ({ genre, image, id, name }) => {
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

  if (loading) {
    return <div className="loading">Loading genres...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <section className="homepage-container">
      <h1 className="homepage-title">Genres</h1>
      <div className="genres-grid">
        {genres.map((genre) => (
          <Profile key={genre.id} genre={genre.name} image={genre.image} id={genre.id} />
        ))}
      </div>
    </section>
  );
}
 