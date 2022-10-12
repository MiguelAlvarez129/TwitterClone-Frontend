import React, { useState} from "react";
import { Link } from "react-router-dom";
import { useRegisterForm } from "../../controllers/axios";
import {
  FlexboxGrid,
  Panel,
  Col,
  Grid,
  Icon,
  Alert,
  Loader
} from "rsuite";
import { BackgroundImg} from "../../shared/styles";
import RegisterForm from "./RegisterForm/RegisterForm";
import {useAxios} from "../../controllers/useAxios";



const Register = (props) => {
  const {data,error,loading,sendReq} = useAxios('/app/register','POST')
  
  if (error){
    console.log(error)
  }
  const onSubmit =  (e) => {
    sendReq(e)
    // if (data.status == 200){
    //   Alert.success('You have been registered succesfully',5000)
    // } else {
    //   setLoading(false)
    //  const {email,username} = data.response.data;
    //   if (email){
    //     Alert.error(email,5000)
    //   }
    //   if (username){
    //     Alert.error(username,5000)
    //   }

    // }
  };

  return (
    <BackgroundImg>
      <FlexboxGrid align="middle" justify="center" style={{paddingTop:'10px'}} >
        <FlexboxGrid.Item componentClass={Col} colspan={24} sm={16} md={10}>
          <Panel
            bordered
            shaded
            bodyFill
            style={{ padding: "25px 0", background: "white" }}
          >
            <Grid fluid>
                <Col xsOffset={2} xs={20}>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <p>
                      {" "}
                      <Icon icon="home" /> Go back to the homepage
                    </p>
                  </Link>
                  <h2>Register Below</h2>
                  <p>
                    Got an account?{" "}
                    <Link to="/login" style={{ textDecoration: "none" }}>
                      Log in <Icon icon="sign-in" />
                    </Link>
                  </p>
                </Col>
            </Grid>
            <Grid fluid>
              <RegisterForm onSubmit={onSubmit}/>
            </Grid>
          </Panel>
          {/* {loading && <Loader size="md" center backdrop/>} */}
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={24}></FlexboxGrid.Item>
      </FlexboxGrid>
    </BackgroundImg>
  );
};

export default Register;
