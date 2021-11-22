import React, { useState, useEffect } from "react";
import background from "../images/background1.png"
import { Link, Redirect} from "react-router-dom";
import { Button } from "rsuite";
import { BackgroundImg, PurpleDiv } from "../shared/styles"
import axios from 'axios'
const Home = (props) => {
  console.log(props.auth)
  return props.auth ? <Redirect to={
    {
      pathname:"/home",
    }
  } />:(

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
      
    // <FlexboxGrid align="middle" justify="center" style={{ height: "75vh" }}>
      
    //   <FlexboxGrid.Item componentClass={Col} colspan={20} md={12}>
    //     <Panel
    //       header={
    //         <h3 style={{ textAlign: "center" }}>
    //           Welcome to my work in progress app!
    //         </h3>
    //       }
    //       bordered
    //       shaded
    //       bodyFill
    //       style={{ paddingBottom: 25 }}
    //     >
    //       <Grid fluid>
    //         <Row>
    //           <Col smOffset={2} sm={10} xs={24}>
    //             <Link to="/login" style={{ textDecoration: "none" }}>
    //               <Button block color="cyan" appearance="ghost" size="lg">
    //                 Login
    //               </Button>
    //             </Link>
    //           </Col>
    //           <Col smOffset={1} sm={10} xs={24}>
    //             <Link to="/register" style={{ textDecoration: "none" }}>
    //               <Button block color="cyan" size="lg">
    //                 Register
    //               </Button>
    //             </Link>
    //           </Col>
    //         </Row>
    //       </Grid>
    //     </Panel>
    //   </FlexboxGrid.Item>
    //   <FlexboxGrid.Item colspan={24}></FlexboxGrid.Item>
    // </FlexboxGrid>
  );
};
export default Home;
