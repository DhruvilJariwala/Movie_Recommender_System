# 🎬 Movie Recommendation System (FastAPI + React)

This project is a **Movie Recommendation System** built using **FastAPI** (Python backend) and a **React frontend**.
It uses **content-based filtering** with precomputed similarity scores to recommend movies and integrates with external APIs (TMDB) for fetching movie details & posters.

---

## 📌 Features

* 🔎 **Search movies** by title (autocomplete support).
* 🎯 **Recommend top 10 similar movies** for a given movie.
* 🖼️ Fetch posters and metadata from external APIs (TMDB/OMDB).
* ⚡ Fast and scalable backend powered by **FastAPI**.
* 🎨 Modern UI with React (Vite).
* 🌍 CORS enabled for frontend-backend communication.

---

## 🛠️ Tech Stack

### Backend (API)

* **FastAPI** (Python web framework)
* **Uvicorn** (ASGI servers)
* **Pandas** (DataFrame handling for movies dataset)
* **scikit-learn** (used for similarity computation)
* **Pickle + Gzip** (model and data storage)

### Frontend

* **React (Vite)**
* **TailwindCSS** for styling
* Fetch API for backend communication

---

## 📂 Project Structure

```
project/
│── backend/
│   ├── backend.py                  # Main FastAPI app (entry point)
│   ├── Recommender.py              # Contains recommend() function
│   ├── movies.pkl                  # Pickled movies DataFrame
│   ├── similarity.pkl.gz           # Pickled similarity matrix (compressed)
│   ├── requirements.txt            # Backend dependencies
│   ├── Movie_Recommender.ipynb     # Notebook (data preprocessing & training steps, not needed for runtime)
│
│── frontend/
│   ├── src/                    # Your Vite + React code
│   ├── package.json
│   ├── vite.config.js
│   └── ... (other frontend files)
│
│── README.md                   # Project documentation

```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/DhruvilJariwala/Movie_Recommender_System.git
cd Movie_Recommender_System
```

### 2️⃣ Setup Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn backend:app --reload
```

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🚀 Deployment

* **Backend** can be deployed on **Render**, **Railway**, or **Heroku**.
* **Frontend** can be deployed on **Vercel** or **Netlify**.

👉 Example Render Start Command:

```bash
uvicorn backend:app --host 0.0.0.0 --port $PORT
```

---

## 🔑 API Endpoints

### 🔹 Search Movies

```
GET /search?query=<movie_name>
```

Response:

```json
{
  "results": ["Inception", "Interstellar", "Insomnia"]
}
```

### 🔹 Recommend Movies

```
GET /recommend?movie=<movie_title>
```

Response:

```json
{
  "recommendations": {
    "194662": "Birdman",
    "9870": "Forgetting Sarah Marshall"
  }
}
```

---

## 📊 Dataset

* Movies dataset (`movies.pkl`) contains metadata about thousands of movies.
* Similarity matrix (`similarity.pkl.gz`) is precomputed using **TF-IDF + Cosine Similarity**.

---

## ✨ Future Improvements

* 🔗 Integrate with **TMDB API** to fetch richer movie details.
* 📈 Add user-based collaborative filtering.
* ❤️ User authentication and personalized recommendations.

---

## 👨‍💻 Author

Developed by **[Dhruvil Jariwala](https://github.com/DhruvilJariwala)**
If you like this project, ⭐ star the repo!


