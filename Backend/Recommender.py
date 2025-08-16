def recommend(movie,movies,similarity):
    movie_index= movies[movies['title'] ==movie].index[0]
    distances= similarity[movie_index]
    movie_list= sorted(list(enumerate(distances)),reverse=True,key=lambda x:x[1])[1:11]
    movie_names={}

    for i in movie_list:
        m=movies.iloc[i[0]].title
        id=movies.iloc[i[0]].id
        movie_names[str(m)]=str(id)
    
    return movie_names