import React, { useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
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
import {useAxios} from "../hooks/useAxios";
// import useAxios from 'axios-hooks'
import { toast } from "react-toastify";



const Register = () => {
  const history = useHistory()
  const {response,loading,error ,sendReq} = useAxios('app/register',"POST")

  useEffect(()=>{
    if (error && !loading){
      const {email,username} = error.response.data
      if (email && username){
        toast.error('Both username and email are already taken')
      } else if (email){
        toast.error(email)
      } else if (username){
        toast.error(username)
      }
    } 
  
    if (response && !loading){
      toast.success('You have been registered successfully')
      history.push('/login')
    } 
  },[response,error,loading])
  
  const onSubmit =  (e) => {
    sendReq(e)
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
          {loading && <Loader size="md" center backdrop/>}
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={24}></FlexboxGrid.Item>
      </FlexboxGrid>
    </BackgroundImg>
  );
};

export default Register;
