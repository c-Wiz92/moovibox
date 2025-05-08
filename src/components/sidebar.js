'use client';
import { useRouter } from "next/navigation"
import "../styles/global.css"

const SideBarStyle = {
    height: '100%',
    width: '10%',
    position: 'absolute',
    right: 'auto',
    backgroundColor: 'rgba(41, 81, 53, 1)',
    bottom: '0%',
    left: '90%',
    }
const ImageStyle = {
    width: 65,
    height: 65,
    marginTop: 30,
}
const IconStyle = {
    width:  35,
    height: 35,
    marginTop: 30,
}
const ContainerStyle = {
    width: '80%',
    margin: '0px auto 40%',
}

function SideBar({userDetails}){
    const router = useRouter();
    return (
        <>
            <div style={SideBarStyle}>
                <div style={ContainerStyle}>
                    <button id="user-profile" style={{backgroundColor: 'transparent', border: 'none'}} onClick={() => {router.push("/profile")}}>
                        <img src="/assets/user-profile.svg" alt="user-profile" style={ImageStyle}></img>
                    </button>
                    <label htmlFor="user-profile"><h2>Profile</h2></label>
                </div>

                <div style={ContainerStyle}>
                    <button id="lists" style={{backgroundColor: 'transparent', border: 'none'}}>
                        <img src="/assets/lists.svg" alt="list-image" style={IconStyle}></img>
                    </button>
                    <label htmlFor="lists"><h2>Lists</h2></label>
                </div>
                
                <div style={ContainerStyle}>
                    <button id="sign-out" style={{backgroundColor: 'transparent', border: 'none'}}>
                        <img src="/assets/sign-out.svg" alt="sign-out icon" style={IconStyle}></img>
                    </button>
                    <label htmlFor="sign-out"><h2>Sign Out</h2></label>
                </div>

            </div>
        </>
    )
}
export default SideBar;

