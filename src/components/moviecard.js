import "../styles/moviecard.css"
import Link from "next/link";

function MovieCard({movieURL, movieID}){
    return(
        <>
            <div className="movie-card">
                <Link href={`movie/${movieID}`}><img src={movieURL}></img></Link>
            </div>
        </>
    )
}
export default MovieCard;