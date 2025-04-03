// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/MainPage/homepage';
import GenrePage from './components/Genres/genrepage'; 
import ArtistPage from './components/ArtistPage/artistpage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/genre/:id" element={<GenrePage />} />
          <Route path="/artist/:artistName" element={<ArtistPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
