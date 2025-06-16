export default class Playlist {
  constructor() {
    this.expireAfter = 1000 * 60 * 10; // 10 minutes
    this.initExpiration();
  }

  initExpiration() {
    const expiry = sessionStorage.getItem("playlistExpiry");
    if (expiry && Date.now() > parseInt(expiry)) {
      sessionStorage.clear();
    }
  }

  saveGenreSongs(genre, song) {
    const key = `genre-${genre.toLowerCase()}`;
    const current = this.getGenreSongs(genre);
    current.push(song);
    sessionStorage.setItem(key, JSON.stringify(current));
    this.setExpiry();
  }

  getGenreSongs(genre) {
    const key = `genre-${genre.toLowerCase()}`;
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  }

  setExpiry() {
    sessionStorage.setItem("playlistExpiry", (Date.now() + this.expireAfter).toString());
  }
}
