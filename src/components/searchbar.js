'use client';
import "../styles/searchbarstyle.css"
import "../styles/global.css"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const api_auth = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlODY4YWE5MzkzYjY0OTQ1Mjg1ZTg0Y2U5YTY0ZGE5YiIsIm5iZiI6MTc0NDk2NDAxNC44NjcsInN1YiI6IjY4MDIwOWFlNjFiMWM0YmIzMjlhMWExOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.D_lMH46KUt0WSID6FAckppgJJu0AQ-mJvbFziIeOM_w"

async function searchMovies(movieName, setResults){
    const searchURL = `https://api.themoviedb.org/3/search/movie?query=${movieName}&language=en-US`
    try{
        const response = await fetch(searchURL, {method: "GET", headers: {"Content-Type": "application/json", "Authorization": `Bearer ${api_auth}`}});
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        setResults(jsonResponse);
    }catch(err){
        console.log("Error finding the movie you searched for: ", err)
    }
}

function SearchBar(){
    const [focus, setFocus] = useState(false);
    const [value, setValue] = useState("");
    const [results, setResults] = useState({});

    const router = useRouter();

    useEffect(() => {
        if (!value) return;
        searchMovies(value, setResults);
    }, [value])
    return (
        <>
            <div className="main-div">
                <input type="text" placeholder="Search for your favorite Movies and Shows.." id="search-input" onFocus={()=> setFocus(true)} onBlur={() => setFocus(false)} value={value} onChange={(e) => {setValue(e.target.value)}}></input>
                <button id="search-icon"><img src="/assets/search.svg" alt="search-icon" style={{width: '60%', height: 'auto',}}></img></button>
            </div>
            {focus && value && results && results["results"] && results["results"].length > 1 ? <div className="results-div scroll">
                <div><button className="result-btn" onMouseDown={(e)=> {router.push(`/movie/${results["results"][0]["id"]}`) }}>{results["results"][0]["original_title"]}</button></div>
                <div><button className="result-btn" onMouseDown={(e)=> {router.push(`/movie/${results["results"][1]["id"]}`) }}>{results["results"][1]["original_title"]}</button></div>
                <div><button className="result-btn" onMouseDown={(e)=> {router.push(`/movie/${results["results"][2]["id"]}`) }}>{results["results"][2]["original_title"]}</button></div>
                <div><button className="result-btn" onMouseDown={(e)=> {router.push(`/movie/${results["results"][3]["id"]}`) }}>{results["results"][3]["original_title"]}</button></div>
            </div> : null}
        </>
    )
}
export default SearchBar;