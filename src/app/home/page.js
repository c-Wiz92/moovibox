'use client'
import MooviBox from "@/components/heading";
import MovieCard from "@/components/moviecard";
import SearchBar from "@/components/searchbar";
import SideBar from "@/components/sidebar";
import "../../styles/moviecard.css"
import { useState, useEffect } from "react";

const server_url = 'http://localhost:5000/home';

export default function HomePage(){
    const [movies, setMovies] = useState({});
    const [user, setUser] = useState({});
    useEffect(() => {
        async function fetchMovies(){
            try{
                let fetchResponse = await fetch(server_url, {
                    method: "GET",
                    credentials: "include",
                });
                if (!fetchResponse.ok){
                   throw new Error(`Error: ${fetchResponse.status}`)
                }
                const jsonResponse = await fetchResponse.json()
                setMovies(jsonResponse["movie"]);
                setUser(jsonResponse["user"]);
            }catch(err){
                console.log("Error encountered: ", err)
            }
        }
        fetchMovies();
    }, [])
    return (
        <>  
            <MooviBox />
            <SearchBar />
            <SideBar userDetails={user}/>
            <h2 id="text-trending-movies">Top shows of the day for you, {user ? user["username"] :"loading"}!</h2>
            <div className="moviecard-container">
                <div className="c1">
                {
                    Object.entries(movies).slice(0,5).map(([id, url], index) => <MovieCard key={index} movieURL={url} movieID={id} />)
                }
                </div>
                <div className="c2">
                {
                    Object.entries(movies).slice(5,10).map(([id, url], index) => <MovieCard key={index} movieURL={url} movieID={id}/>)
                }
                </div>
            </div>
        </>
    )
}