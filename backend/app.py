from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_session import Session 

from img import get_img_urls
from id import id_list
from movie_details import get_movie_details, get_reviews, check_favourite, set_favourite
from userauth import userRegister, userLogin, getUserData
from addToDB import addToRecent
from profile import profileInfo

app = Flask(__name__)
CORS(app, supports_credentials = True, origins=["http://localhost:3000"])
app.secret_key = "khdf9pqnhdlf091bbfda32"
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

@app.route("/home")
def home_movies():
    movie_details = {}
    userDetails = getUserData()
    img_urls = get_img_urls()
    for i in range(len(img_urls)):
        movie_details[id_list[i]] = img_urls[i]
    combinedDetails = {"movie": movie_details, "user": userDetails}
    return jsonify(combinedDetails)

@app.route("/movie/<int:id>", methods=["POST", "GET"])
def get_details(id):
    if request.method == "GET":
        specific_movie_details = get_movie_details(id)
        reviews = get_reviews(id)
        favourite = check_favourite(id)
        addToRecent(id, f'https://image.tmdb.org/t/p/original/{specific_movie_details["backdrop_path"]}')
        reviewsAndDetails = {
            "details": specific_movie_details,
            "reviews": reviews,
            "favourite": favourite,
        }
        return jsonify(reviewsAndDetails)
    else:
        set_favourite(id)
        return "Favourite updated successfully"

@app.route("/form/<string:value>", methods=["POST"])
def user_entry(value):
    reg_response = {}
    log_response ={}
    data = request.get_json()
    if value == "userRegister":
        reg_response = userRegister(data)
        return reg_response
    else:
        log_response = userLogin(data)
        return log_response

@app.route("/reviews/<int:id>")
def return_reviews(id):
    specific_movie_details = get_movie_details(id)
    return jsonify(specific_movie_details)

@app.route("/profile")
def return_profile():
    profileData = {}
    recents = profileInfo()
    profileData["username"] = session["username"]
    profileData["recently_watched"] = recents["recent_results"]
    profileData["favourite"] = recents["favourite_results"]
    return jsonify(profileData)


# if __name__ == "__main__":
#     print("loading...")
#     app.run(debug=True)
