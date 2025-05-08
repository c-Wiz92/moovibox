"use client";
import BackArrow from "@/components/backarrow";
import MooviBox from "@/components/heading";
import SideBar from "@/components/sidebar";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

import "../../../styles/moviepage.css"
import ReviewCard from "@/components/reviewcard";

const imgStyle ={
    width: '35%',
    height: 'auto',
    borderRadius: '10px',
}
const genreStyle = {
    display: 'inline',
}

function Movie(){
    const [details, setDetails] = useState({});
    const [reviews, setReviews] = useState({});
    const [favourite, setFavourite] = useState(false);
    const url_obj = useParams();

    useEffect(() => {
        const url = `http://localhost:5000/movie/${url_obj["id"]}`
        async function specific_details_fetch(url){
            try{
                let response = await fetch(url, {
                    method: "GET",
                    credentials: "include"
                })
                let specific_details = await response.json()
                console.log(specific_details)
                setDetails(specific_details["details"]);
                setReviews(specific_details["reviews"]);
                setFavourite(specific_details["favourite"]);
            }
            catch(err){
                console.log("Error in fetching specific details: ", err)
            }
        }
        specific_details_fetch(url)
    }, [])

    const router = useRouter();
    return(
        <>
            <MooviBox />
            <SideBar />
            <BackArrow />
            <div className="containerOne">
                <img className="banner" style={imgStyle} src={`https://image.tmdb.org/t/p/original/${details["backdrop_path"]}`}></img>
                <button style={{width: 80, height: 35, position: "relative", top: -100, left: -155, border: 0, backgroundColor: 'transparent'}} onClick={async () => {async function setFav(favourite) {
                   const response = await fetch(`http://localhost:5000/movie/${url_obj["id"]}`, {method: "POST", credentials: "include", body: favourite})
                }; setFav(favourite); setFavourite(!favourite)}}>{favourite ? <FaHeart style={{width: 25, height: 25, color: "rgb(181, 79, 66)"}}/> : <FaRegHeart style={{width: 25, height: 25, color: "rgb(181, 79, 66)"}}/>}</button>
                <div className="rating-container">
                    <h1>{details["original_title"]} ({details["release_date"] ? details["release_date"].split("-")[0] : "loading"})</h1>
                    <h3>{details["vote_average"] ? `TMDb ${details["vote_average"]}` : "Not Rated on TMDb yet!"}</h3>
                    <hr></hr>
                    <h3 style={genreStyle}>{details["genres"] ? details["genres"][0]["name"] : "No Genres found"}</h3>
                </div>
            </div>
            <h2 className="alignLeft">Top reviews for {details["original_title"]}</h2>
            <button style={{width: 110, height: 50, backgroundColor: "black", color: "rgba(159, 204, 46, 1)", border: "1px solid rgba(159, 204, 46, 1)", borderRadius: 5}} onClick={(e)=> {e.preventDefault(); router.push(`/reviews/${url_obj["id"]}`)}}>View more/ Add your own review!</button>
            <div className="containerTwo">
                <ReviewCard reviewText={reviews.results?.[0]?.content ?? "No review here yet!"} />
                <ReviewCard reviewText={reviews.results?.[1]?.content ?? "No review here yet!"} />
                <ReviewCard reviewText={reviews.results?.[2]?.content ?? "No review here yet!"} />
            </div>
        </>
    )
}
export default Movie;   

border: '1px solid rgb(181, 79, 66)'