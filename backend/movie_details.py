import requests
from flask import session
from sqlalchemy import MetaData, Table, create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

engine = create_engine("postgresql+psycopg2://rohith:rohith2007@127.0.0.1:5432/moovibox")
Base = declarative_base()
metadata = MetaData()
favTable = Table("favourite", metadata, autoload_with=engine)

Session = sessionmaker(bind=engine)

class Favourite(Base):
    __table__ = favTable


api_auth = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODY4YWE5MzkzYjY0OTQ1Mjg1ZTg0Y2U5YTY0ZGE5YiIsIm5iZiI6MTc0NDk2NDAxNC44NjcsInN1YiI6IjY4MDIwOWFlNjFiMWM0YmIzMjlhMWExOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D_lMH46KUt0WSID6FAckppgJJu0AQ-mJvbFziIeOM_w"
headers = {
    "accept": "application/json",
    "Authorization": f"Bearer {api_auth}"
}
def get_movie_details(movie_id):
    details_url = (f'https://api.themoviedb.org/3/movie/{movie_id}')
    response = requests.get(details_url, headers = headers)
    response = response.json()
    with Session() as checkNadd:
        exists = checkNadd.query(Favourite).filter_by(username=session["username"], id=movie_id).first()
        if not exists:
            newRow = Favourite(username=session["username"], id=movie_id)
            checkNadd.add(newRow)
            checkNadd.commit()
    return response

def get_reviews(movie_id):
    review_url = f'https://api.themoviedb.org/3/movie/{movie_id}/reviews'
    response = requests.get(review_url, headers={
        "accept":"application/json",
        "Authorization" : f"Bearer {api_auth}"
    })
    reviews = response.json()
    return reviews

def set_favourite(movie_id):
    with Session() as setSession:
        row_to_update = setSession.query(Favourite).filter_by(username=session["username"], id=movie_id).first()
        if row_to_update:
            existing_value = row_to_update.favourite
            row_to_update.favourite= not existing_value
            setSession.commit()


def check_favourite(movie_id):
    isFavourite = False
    with Session() as checkSession:
        row = checkSession.query(Favourite).filter_by(username=session["username"], id=movie_id).first()
        if row:
            isFavourite = row.favourite
            return isFavourite


