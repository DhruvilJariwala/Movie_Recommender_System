
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import pickle
from Recommender import recommend
import gzip

print("Loading pickle files...")
movies = pickle.load(open("movies.pkl", "rb"))
f = gzip.open("similarity.pkl.gz", "rb")
similarity = pickle.load(f)
print("Pickle files loaded!")

app = FastAPI() 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/recommend")
def get_recommendations(movie: str):
    results = recommend(movie, movies, similarity)
    return {"recommendations":results}

@app.get("/search")
def search_movies(query: str):
    query = query.lower()
    results = movies[movies['title'].str.lower().str.contains(query)]
    return {"results": results['title'].tolist()[:10]}

if __name__ == "__main__":
    uvicorn.run(app, host="https://movie-recommender-system-hvzr.onrender.com")
