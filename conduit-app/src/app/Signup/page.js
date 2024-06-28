"use client"
import { useRouter } from "next/navigation";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

export default function Signup() {
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function submit(e) {
    e.preventDefault(); 
    
    try {
      const response = await axios.post(
        "https://api.realworld.io/api/users",
        {
          user: {
            username: username,
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
      
      router.push("/Signin");
    } catch (err) {
      console.log(err, "error"); 
    }
  }
  
  function handleOnChange(e) {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    }
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
                <h2 className="signin">Sign Up</h2>
        <Link href="/Signin" className="signin1">
                <li>Have an account?</li>
        </Link>
        <form onSubmit={submit}>
          <div className="form-group">
            <input
              type="text" 
              name="username"
              onChange={handleOnChange}
              placeholder="Username"
              className="username"
            />
  
            <input
              type="email"
              name="email"
              onChange={handleOnChange}
              placeholder="Email"
              className="email"
            />
  
            <input
              type="password"
              name="password"
              onChange={handleOnChange}
              placeholder="Password"
              className="password"
            />
  
            <button type="submit" className="signbtn1">
              Sign up
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );

}

