'use client';
import { useRouter } from "next/navigation";
import "../styles/signup.css"
import "../styles/global.css"
const registerURL = 'http://localhost:5000/form/userRegister';
const loginURL = 'http://localhost:5000/form/userLogin';
let RegjsonResponse = {};
let LogjsonResponse = {};
async function submitRegForm(id) {
    const form = document.getElementById(id)
    const data = new FormData(form);
    let jsonData = {}
    data.forEach((value, key) => {
        jsonData[key] = value;
    });
    try{
        let response = await fetch(registerURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(jsonData),
        })
        RegjsonResponse = await response.json()
    }catch(err){
        console.log("Error sending form data to the server: ", err)
    }
}
async function submitLoginForm(id) {
    const form = document.getElementById(id)
    const data = new FormData(form)
    let jsonData = {}
    data.forEach((value, key) => {
        jsonData[key] = value
    });
    try{
        const response = await fetch(loginURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(jsonData)
        })
        LogjsonResponse = await response.json()
    }catch(err){
        console.log("Error occured when trying to log you in: ", err)
    }
}
export default function SignUp(){
    const router = useRouter();
    return(
        <>
            <div className="SignUp">
                <h2 className="green-text" id="join-moovibox">Join MooviBox</h2>
                <hr className="form-hr"></hr>
                <form id="sign-up-form">
                    <label htmlFor="input-username" id="username-label">Username</label>
                    <input className="input" id="input-username" type="text" placeholder="Enter Username" name="username" required></input>
                    <label htmlFor="input-mail" id="mail-label">Mail</label>
                    <input className="input" id="input-mail" type="text" placeholder="Enter Mail ID" name="mailID" required></input>
                    <label htmlFor="input-password" id="password-label">Password</label>
                    <input className="input" id="input-password" type="password" placeholder="Enter Password" name="password" required></input>
                    <input type="checkbox" className="input-btn" id="btn-captcha" required></input>
                    <label htmlFor="btn-captcha" id="captcha-label" className="radio-label">I'm not a Robot</label>
                    <input type="checkbox" className="input-btn" id="btn-tANDc"></input>
                    <label htmlFor="btn-tANDc" id="tANDc-label" className="radio-label" required>I agree to the Terms and Conditions</label>
                    <button id="btn-sign-up" className="form-btn" onClick={async (e) => {e.preventDefault(); await submitRegForm("sign-up-form"); if(RegjsonResponse && RegjsonResponse["code"] === "PASS"){router.push("/home")}else{let label = document.getElementById("username-label"); label.innerText = "User already exists"; function updateLabel(){label.innerText = "Username"; label.classList.remove("error")}; label.classList.add("error"); setTimeout(() => {
                        updateLabel();
                    }, 2500); }}}>Sign Up</button>
                </form>
                <h3 className="green-text" id="already-an-user">Already an user ?  Log in!</h3>
                <hr className="form-hr" id="second-hr"></hr>
                <form id="sign-in-form">
                    <label htmlFor="login-username" id="login-username-label">Username</label>
                    <input className="input" id="login-username" type="text" placeholder="Enter Username" name="username" required></input>
                    <label htmlFor="login-password" id="login-password-label">Password</label>
                    <input className="input" id="login-password" type="password" placeholder="Enter Password" name="password" required></input>
                    <button id="btn-log-in" className="form-btn" onClick={async (e) => {e.preventDefault(); await submitLoginForm("sign-in-form"); if(LogjsonResponse && LogjsonResponse["code"] === "PASS"){router.push("/home")}else{let loginLabel = document.getElementById("login-username-label"); loginLabel.innerText = LogjsonResponse["msg"]; function changeLabel(){loginLabel.innerText = "Username"; loginLabel.classList.remove("error")}; loginLabel.classList.add("error"); setTimeout(() => {
                        changeLabel();
                    }, 2500); }}}>Login</button>
                </form>
            </div>
            <div className="green-box">
                <h1 className="website-name-big" id="moovibox-main-txt">MOOVIBOX</h1>
            </div>
        </>
    );
}


