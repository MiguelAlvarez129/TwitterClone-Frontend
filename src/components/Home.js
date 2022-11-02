import React, { useState, useEffect } from "react";
import background from "../images/background1.png"
import { Link, Redirect, useLocation} from "react-router-dom";
import { Button, Loader } from "rsuite"; 
import { BackgroundImg, PurpleDiv, WhiteBackground } from "../shared/styles"
import { useSelector } from "react-redux";
import axios from 'axios'
const Home = (props) => {
  const auth = useSelector((state) => state.user.isAuth);
  const location = useLocation()
  // useEffect(() => {
  //   if (!localStorage.getItem("token")){
  //     setLoading(false)
  //   }
  // }, [auth])
  // console.log("HOME",location.state)
  console.log('HOME ')
  const from =  location.state?.from || "/home" 


  return (
      <>
      <BackgroundImg>
        <PurpleDiv>
          <span style={{background:"white",padding:"0 5px",marginBottom:"10px"}}><h1>Welcome to my </h1></span>
          
          <span style={{background:"white",padding:"0 5px",marginBottom:"5px"}}><h1>Twitter clone</h1></span>
          <div style={{display:"flex",width:"70%",height:100,marginTop:20,justifyContent:"space-evenly",flexDirection:"column"}}>
          <Link to="/register" style={{ textDecoration: "none" }}>

          <Button size="lg" appearance="default" block>Register</Button>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
          <Button size="lg" appearance="primary" block>Log in</Button>
          </Link>
          </div>
        </PurpleDiv>
      </BackgroundImg>  
      {/* {loading && 
        <WhiteBackground home>
      <Loader backdrop size="md"/> 
        </WhiteBackground>} */}
</>
      
 
  );
};
export default Home;
