import React, { useState } from "react";
import SearchBox from "./Component/SearchBox";
import MovieCard from "./Component/MovieCard";
import "./App.css";
import image from "./assets/404.jpeg";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY ;

async function fetchPoster(movieName) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${encodeURIComponent(movieName)}?api_key=${API_KEY}&language=en-US`
    );
    if (!res.ok) throw new Error("Poster API Error");
    const data = await res.json();
    console.log(data);
    if (data && data.poster_path) {
      return `https://image.tmdb.org/t/p/w500${data.poster_path}`;
    }
  } catch (_) {}
  return image;
}

export default function App() {
  const [recs, setRecs] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(false);
  const [err, setErr] = useState("");

  const handleSelectMovie = async (movieName) => {
    setErr("");
    setLoadingRecs(true);
    setRecs([]);

    try {
      const res = await fetch(`http://127.0.0.1:8000/recommend?movie=${encodeURIComponent(movieName)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      
      const topTen = (data?.recommendations);
      const withPosters = await Promise.all(
        Object.entries(topTen).map(async ([title, id]) => ({
          title,
          id,
          posterUrl: await fetchPoster(id)
        }))
      );
      
      setRecs(withPosters);
    } catch (e) {
      setErr("Couldn’t load recommendations. Try again.");
    } finally {
      setLoadingRecs(false);
    }
  };

  return (
    <div className="page">
      <h1 className="brand">🎬 Movie Recommender</h1>

      <SearchBox onSelect={handleSelectMovie} />

      <div className="content">
        {loadingRecs && <div className="status">Loading recommendations…</div>}
        {err && <div className="status error">{err}</div>}

        {!loadingRecs && !err && recs.length === 0 && (
          <div className="hint">Start typing a movie name to get suggestions.</div>
        )}

        <div className="grid">
          {recs.map((m, idx) => (
            <MovieCard key={`${m.title}-${idx}`} title={m.title} posterUrl={m.posterUrl} />
          ))}
        </div>
      </div>
    </div>
  );
}
