import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // <-- import Link here
import axios from 'axios';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';
import './Style/genrepage.css';

const GenrePage = () => {
  const { id } = useParams();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [player, setPlayer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/songs/${id}`)
      .then((response) => {
        setSongs(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch songs');
        setLoading(false);
      });
  }, [id]);

  const handlePlay = (song) => {
    if (player) {
      player.pause();
    }
    const newPlayer = new Audio(song.file_path);
    
    newPlayer.onloadedmetadata = () => setDuration(newPlayer.duration);
    newPlayer.ontimeupdate = () => setCurrentTime(newPlayer.currentTime);

    newPlayer.volume = volume;
    newPlayer.play();
    
    setPlayer(newPlayer);
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const handlePause = () => {
    if (player) {
      player.pause();
      setIsPlaying(false);
    }
  };

  const togglePlayPause = () => {
    if (player) {
      if (isPlaying) {
        handlePause();
      } else {
        player.play();
        setIsPlaying(true);
      }
    }
  };

  const handleNext = () => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex(song => song.file_path === currentSong.file_path);
    const nextIndex = (currentIndex + 1) % songs.length;
    handlePlay(songs[nextIndex]);
  };

  const handlePrevious = () => {
    if (!currentSong) return;
    const currentIndex = songs.findIndex(song => song.file_path === currentSong.file_path);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    handlePlay(songs[prevIndex]);
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (player) {
      player.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  if (loading) return <div className="loading">Loading songs...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="genre-page">
      <aside className="sidebar">
        <h2>Your Library</h2>
      </aside>
      <main className="main-content">
        <h1>{songs[0]?.genre || 'Genre'}</h1>
        <div className="song-list">
          <div className="song-list-header">
            <span>Title</span>
          </div>
          {songs.map((song, index) => (
            <div key={index} className="song-item">
              <img src={song.image} alt={song.title} className="song-cover" />
              <div className="song-info">
                <span className="song-title">{song.title}</span>
                {/* Artist name is now a clickable link */}
                <Link to={`/artist/${song.artist}`} className="song-artist">
                  {song.artist}
                </Link>
              </div>
              {/* Play button that appears on hover */}
              <div 
                className="play-button" 
                onClick={() => handlePlay(song)}
              >
                <FaPlay />
              </div>
            </div>
          ))}
        </div>
      </main>
      {currentSong && (
        <footer className="footer">
          {/* Song Cover & Info */}
          <div className="current-song-info">
            <img src={currentSong.image} alt={currentSong.title} className="footer-cover" />
            <div>
              <p className="song-title">{currentSong.title}</p>
              <p className="artist">{currentSong.artist}</p>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="playback-controls">
            <button onClick={handlePrevious}><FaStepBackward /></button>
            <button onClick={togglePlayPause}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={handleNext}><FaStepForward /></button>
          </div>

          {/* Song Progress */}
          <div className="song-progress">
            <span>{formatTime(currentTime)}</span>
            <input 
              type="range" 
              min="0" 
              max={duration} 
              value={currentTime} 
              onChange={(e) => player && (player.currentTime = e.target.value)}
              className="progress-bar"
            />
            <span>{formatTime(duration)}</span>
          </div>

          {/* Volume Slider */}
          <div className="volume-control">
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume} 
              onChange={handleVolumeChange} 
              className="volume-slider"
            />
          </div>
        </footer>
      )}
    </div>
  );
};

export default GenrePage;
