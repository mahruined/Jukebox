export default class Playlist {
  constructor() {
    this.expireAfter = 1000 * 1 * 10; // 1 minuute
    this.initExpiration();
  }

  initExpiration() {
    const expiry = sessionStorage.getItem("playlistExpiry");
    if (expiry && Date.now() > parseInt(expiry)) {
      sessionStorage.clear();
    }
  }

  saveGenreSongs(genreId, song) {
    const key = `genre-${genreId}`;
    const current = this.getGenreSongs(genreId);
    current.push(song);
    sessionStorage.setItem(key, JSON.stringify(current));
    this.setExpiry();
  }

  getGenreSongs(genreId) {
    const key = `genre-${genreId}`;
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  }

  setExpiry() {
    sessionStorage.setItem("playlistExpiry", (Date.now() + this.expireAfter).toString());
  }
}
