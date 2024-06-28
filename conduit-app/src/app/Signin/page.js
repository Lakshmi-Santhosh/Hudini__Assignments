"use client"
import { useRouter } from "next/navigation";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import Link from "next/link";
import {useState}from "react"
import axios from "axios";


export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const router = useRouter();

  async function submit(e) {
    e.preventDefault(); 
    
    try {
      
      const response = await axios.post(
        "https://api.realworld.io/api/users/login",
        {
          user: {
            email: email,
            password: password,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token",response.data.user.token)
      router.push("/");
    } catch (err) {
      console.log(err, "error"); 
    }
  }
 
  function handleOnChange(e) {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  }
  
  return (
    <>
      <Nav />
      <div className="signin-container">
        <h2 className="signin">Sign In</h2>
        <Link  className="signin1" href="/Signup">
        <li>Need an account?</li>
        </Link>
        <form onSubmit={submit}>
          <div className="form-group">
            <input type="email" onChange={handleOnChange} placeholder="Email" className="email" name="email"  />
            <input type="password" onChange={handleOnChange} placeholder="Password" className="password" name="password"  />
            <button type="submit" className="signbtn1">Sign In</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
