import requests
from id import id_list, count
secure_base_url = (f"https://image.tmdb.org/t/p/")
api_auth = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODY4YWE5MzkzYjY0OTQ1Mjg1ZTg0Y2U5YTY0ZGE5YiIsIm5iZiI6MTc0NDk2NDAxNC44NjcsInN1YiI6IjY4MDIwOWFlNjFiMWM0YmIzMjlhMWExOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D_lMH46KUt0WSID6FAckppgJJu0AQ-mJvbFziIeOM_w"
headers = {
    "accept": "application/json",
    "Authorization": (f"Bearer {api_auth}")
}

def get_img_urls():
    img_urls = []
    for i in id_list:
        url = (f'https://api.themoviedb.org/3/movie/{i}/images')
        response = requests.get(url, headers= headers)
        response = response.json()
        english_posters = [poster for poster in response["posters"] if poster["iso_639_1"] == "en"]
        if english_posters:
            img_url = (f'{secure_base_url}original{english_posters[0]["file_path"]}')
            img_urls.append(img_url)
        elif (response["posters"]):
            img_url = (f'{secure_base_url}original{response["posters"][0]["file_path"]}')
            img_urls.append(img_url)
    return img_urls
get_img_urls()
