'use client';
import BackArrow from "@/components/backarrow";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
const { default: MooviBox } = require("@/components/heading");

const imgStyle ={
    width: '20%',
    height: 'auto',
    borderRadius: '10px',
}

function ReviewPage(){
    const url_obj = useParams()
    const [alldetails, setAlldetails] = useState({});
    useEffect(()=> {
        if (!url_obj) return;
        const url = `http://localhost:5000/reviews/${url_obj["id"]}`
        async function specific_details_fetch(url){
            try{
                let response = await fetch(url, {
                    method: "GET",
                    credentials: "include",
                })
                let specific_details = await response.json()
                setAlldetails(specific_details);
                console.log(specific_details)
            }
            catch(err){
                console.log("Error in fetching specific details: ", err)
            }
        }
        specific_details_fetch(url)
    }, [url_obj])

    return(
        <>
            <MooviBox />
            < BackArrow />
            <h3 style={{textAlign: 'center'}}>Here are a few more reviews for {alldetails ? alldetails["original_title"] : "Loading.." }</h3>
            <img className="banner" style={imgStyle} src={`https://image.tmdb.org/t/p/original/${alldetails["backdrop_path"]}`}></img>
        </>
    )
}
export default ReviewPage;