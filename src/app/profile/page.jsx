'use client';
import "../../styles/profile.css"
import BackArrow from "@/components/backarrow";
import MooviBox from "@/components/heading";
import RecentMovie from "@/components/recentmovie";
import SideBar from "@/components/sidebar";
import UserList from "@/components/userlist";

import { useState, useEffect } from "react";
const server_url = 'http://localhost:5000/profile';
const tmdb_url = `https://api.themoviedb.org/3/movie/`;
const api_auth = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODY4YWE5MzkzYjY0OTQ1Mjg1ZTg0Y2U5YTY0ZGE5YiIsIm5iZiI6MTc0NDk2NDAxNC44NjcsInN1YiI6IjY4MDIwOWFlNjFiMWM0YmIzMjlhMWExOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D_lMH46KUt0WSID6FAckppgJJu0AQ-mJvbFziIeOM_w`;

// very inefficient way of handling the fav movies, should fix it

async function getFavMovieDetails(idList, url){
    let details = []
    for (let i = 0; i<idList.length; i++){
        const response = await fetch(`${url}${idList[i]["id"]}`, {method: "GET", headers: {"Authorization" : `Bearer ${api_auth}`}});
        const jsonResponse = await response.json();
        details[i] = jsonResponse
    }
    // console.log(details)
    return details;
}

function ProfilePage(){
    const [recentInfo, setrecentInfo] = useState([]);
    const [userInfo, setuserInfo] = useState(""); //currently only username is set within userInfo, So userInfo is initialized wit just an empty string.
    const [favDetails, setfavDetails] = useState([]);

    useEffect(() => {
        async function detail(){
            try{
                const response = await fetch(server_url, {
                    method: "GET",
                    credentials: "include",
                })
                const jsonResponse = await response.json();
                setrecentInfo(jsonResponse["recently_watched"]);
                setuserInfo(jsonResponse["username"]);
                let newdetails = await getFavMovieDetails(jsonResponse["favourite"], tmdb_url);
                setfavDetails(newdetails);
            }catch(err){
                console.log("Error in fetching content for user profile: ", err);
            }
        }
        detail();
    },[])

    return(
        <>
            <MooviBox />
            <SideBar />
            <BackArrow />
            <div className="container">
                <h1 id="user-greeting">Hey there, {userInfo}!</h1>
                <h2 id="recently-watched">Recently viewed</h2>
                <div className="recentmovies-container">
                    {recentInfo.slice(0, 3).map((item, index) => (<RecentMovie key={index} info={item}/>))}
                </div>
                <h2 id="user-lists">Your favourites</h2>
                <div className="userlist-container">
                    {favDetails.slice(0,5).map((item, index) => (<UserList key={index} info={item}/>))}
                </div>
            </div>
        </>
    )
}
export default ProfilePage;