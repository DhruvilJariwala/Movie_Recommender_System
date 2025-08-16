import React from "react";
import "./MovieCard.css";
import image from "../assets/404.jpeg";

export default function MovieCard({ title, posterUrl }) {
  return (
    <div className="movie-card" title={title}>
      <div className="poster-wrap">
        <img
          src={posterUrl}
          alt={title}
          onError={(e) => { e.currentTarget.src = image; }}
        />
      </div>
      <div className="movie-title">{title}</div>
    </div>
  );
}
