"use client"
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function Settings() {
    return(
        <>
        <Nav />
        <div className="settings">
        <h1 className="settingstitle">Your Settings</h1>
        <form className="settingsForm">
        <div className="form-group">
          <input type="text" placeholder="url of profile picture" className="username" />

          <input
            type="text"
            placeholder="Your name"
            className="email"
          />

          <input
            type="text"
            placeholder="Short bio about you"
            className="password newsection"
          />

          <input
            type="text"
            name="password"
            placeholder="Email"
            className="password"
          />
            <input
            type="text"
            name="password"
            placeholder="password"
            className="password"
          />
          <button type="submit" className="signbtn1">
            Update Settings
          </button>
          <button className="logout">Or click here to logout</button>
        </div>
      </form>

    
    </div>
    <Footer />
    
  
  
    
    
  </>
)}
