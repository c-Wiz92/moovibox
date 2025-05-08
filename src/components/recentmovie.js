'use client';
import { useRouter } from "next/navigation";
function RecentMovie({info}){
    const router = useRouter();
    const BannerStyle = {
        width: 350,
    }
    return(
        <>  
            <button onClick={()=> {router.push(`/movie/${info["id"]}`)}} style={{border: '0px', backgroundColor: "transparent"}}><img src={info["url"]} alt="recently watched movie" style={BannerStyle}></img></button>
        </>
    )
}
export default RecentMovie;
