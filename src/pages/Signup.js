import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Import CSS file for styling

function Signup() {
    const [isSignup, setIsSignup] = useState(true); // State to toggle between signup and signin
    const [title,setTitle]=useState("");
    const [pass,setPass]=useState("");
    const navigate=useNavigate();
    const toggleSignup = () => {
        setIsSignup(!isSignup); // Toggle between signup and signin
    };
    // console.log(title,pass);
    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your signup or signin logic here
        isSignup ? callsignup() : signin();
    };
    const callsignup = () => {
        // console.log(" call  signuo function");
        fetch("https://trackeasy-backend.vercel.app/signup",{
            method:  "POST",
            headers: { 
                "Content-Type": "application/json",
                username: title,
                password: pass
            },
            body: JSON.stringify({})
        })
        .then(async (res)=>{
            const json=await res.json();
            alert("User created successfully!");
            console.log(json);
        })
        
    };
    const signin = () => {
        // console.log(" call signin function");
        fetch("https://trackeasy-backend.vercel.app/signin",{
            method:  "POST",
            headers: {"Content-Type": "application/json",
                username: title ,
                password: pass
            },
           body: JSON.stringify({ })
        })
        .then(async (res)=>{
            const json=await res.json();
            alert("User signin successfull!");
            console.log(json);
            localStorage.setItem('token',json.token);
            // localStorage.setItem('id',json.id);
            navigate('/todo');
        })
    };
    return (
        <>
            <div className="signup-container">
                <h1>{isSignup ? 'Signup' : 'Signin'}</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" name="username" onChange={(e)=>{setTitle(e.target.value)}} />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" onChange={(e)=>{setPass(e.target.value)}}/>
                    </label>
                    <button type="submit">{isSignup ? 'Signup' : 'Signin'}</button>
                </form>
                <button onClick={toggleSignup}>{isSignup ? 'Switch to Signin' : 'Switch to Signup'}</button>
            </div>
        </>
        
    );
}
export default Signup;