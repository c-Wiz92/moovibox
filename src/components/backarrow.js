'use client';
import { useRouter } from "next/navigation"

function BackArrow(){
    const router = useRouter();

    const ButtonStyle = {
        backgroundColor: 'transparent',
        border: 'none',
        position: 'relative',
        left: '-58%',
        top: '2%'
    }
    const IconStyle = {
        width: 55,
    }
    return(
        <>
            <button style={ButtonStyle}><img src="/assets/back-arrow.svg" style={IconStyle} onClick={(e)=>{e.preventDefault; router.back()}}></img></button>
        </>
    )
}
export default BackArrow;