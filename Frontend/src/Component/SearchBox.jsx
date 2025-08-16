import React, { useEffect, useRef, useState } from "react";
import "./SearchBox.css";

export default function SearchBox({ onSelect }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1); 
  const wrapperRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < 2) {
      setSuggestions([]);
      setOpen(false);
      setErr("");
      setLoading(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setErr("");
      const URL= import.meta.env.VITE_BACKEND_URL;
      try {
        const res = await fetch(`${URL}/search?query=${encodeURIComponent(query.trim())}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setSuggestions(Array.isArray(data.results) ? data.results : []);
        setOpen(true);
      } catch (e) {
        setErr("Couldn’t fetch suggestions. Try again.");
        setSuggestions([]);
        setOpen(true);
      } finally {
        setLoading(false);
      }
    }, 250); 

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const choose = (movie) => {
    setQuery(movie);
    setOpen(false);
    setActiveIndex(-1);
    onSelect(movie);
  };

  const onKeyDown = (e) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        choose(suggestions[activeIndex]);
      } else if (query.trim().length > 0) {
        choose(query.trim());
      }
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div className="search-wrap">
      <div
        className={`search-shell ${open || document.activeElement === document.querySelector(".search-input") ? "active" : ""}`}
        ref={wrapperRef}
      >
        <input
          className="search-input"
          type="text"
          placeholder="Type movie name…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length >= 1 && setOpen(true)}
          onKeyDown={onKeyDown}
          aria-expanded={open}
          aria-autocomplete="list"
          aria-controls="suggestions-list"
        />

        {open && (
          <div className="dropdown">
            {loading && <div className="drop-status">Searching…</div>}
            {!loading && err && <div className="drop-status error">{err}</div>}

            {!loading && !err && (
              <ul id="suggestions-list" className="drop-list" role="listbox">
                {suggestions.length > 0 ? (
                  suggestions.map((movie, idx) => (
                    <li
                      key={`${movie}-${idx}`}
                      role="option"
                      aria-selected={activeIndex === idx}
                      className={`drop-item ${activeIndex === idx ? "active" : ""}`}
                      onMouseDown={() => choose(movie)} 
                      onMouseEnter={() => setActiveIndex(idx)}
                    >
                      {movie}
                    </li>
                  ))
                ) : (
                  <li className="drop-item empty">No matches found</li>
                )}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
