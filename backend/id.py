import requests
count = 10
url = (f"https://api.themoviedb.org/3/trending/movie/day?")
api_auth = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODY4YWE5MzkzYjY0OTQ1Mjg1ZTg0Y2U5YTY0ZGE5YiIsIm5iZiI6MTc0NDk2NDAxNC44NjcsInN1YiI6IjY4MDIwOWFlNjFiMWM0YmIzMjlhMWExOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D_lMH46KUt0WSID6FAckppgJJu0AQ-mJvbFziIeOM_w"
headers = {
    "accept": "application/json",
    "Authorization": (f"Bearer {api_auth}")
}
response = requests.get(url, headers = headers)
response = response.json()
id_list = []
for i in range(count):
    id = response["results"][i]["id"]
    id_list.append(id)
