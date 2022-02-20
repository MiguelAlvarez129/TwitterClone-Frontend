import React, { useState, useEffect } from "react";
import {
  Route,
  useLocation,
  Switch,
  useHistory,
  Redirect,
} from "react-router-dom";
import Gallery from "./components/Gallery/Gallery";
import Register from "./components/Register";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./private/Dashboard";
import Home from "./components/Home";
import UserProfile from "./components/UserProfile/UserProfile";
import NotFound from "./components/NotFound/NotFound"
import PostView from "./components/PostView";
import Reply from "./components/Reply";
import Notifications from "./components/Notifications/Notifications"
import ProfileSettings from "./components/ProfileSettings/ProfileSettings"
import "rsuite/dist/styles/rsuite-default.css";
import { Container, Content} from "rsuite";
import { setAuthToken } from "./controllers/setAuth";
import Loading from "./shared/Loading";
import { trackPromise } from "react-promise-tracker";
import { authenticate } from "./controllers/axios";
import { useSelector, useDispatch } from "react-redux";
import {userOnline, notificationsRead} from "./controllers/ioControllers"
import RightMenu from "./components/RightMenu/RightMenu"
import axios from  "axios"
import ProtectedRoute from "./private/ProtectedRoute";
import PublicRoute from "./private/PublicRoute";


const Main = () => {
  const [loading, setLoading] = useState(true)
  const auth = useSelector((state) => state.user.isAuth);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  let background =  location.state?.background;
  axios.defaults.baseURL = process.env.REACT_APP_API_URL
  
  useEffect(() => {
    const {pathname,state} = location
    // if (state?.from == "/compose/tweet" ){
    //   location.state =  {pathname:"/home"}
    // }
    // console.log("HEREEE!",background)
    // if (pathname || state.from  == "/settings/profile" ){
    //   location.state = {background:{pathname:"/home"}}
    // }


    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
      trackPromise(authenticate(dispatch));
    } 
    console.log(location,auth)
  }, [auth]);


  
  useEffect(() => {

    const {pathname} = location
    if(auth){
      userOnline(user.username)
      if (pathname == "/notifications" ){
        notificationsRead(user.username)
      }  
    } 
  }, [auth]);

 
  const Prueba = () => {
    return (
      <Route render={()=>(
        <>

           <Switch location={background || location}>
                <Route
                  exact
                  path="/home"
                  render={(props) => <Dashboard {...props} />}
                />
                <Route
                  exact
                  path="/404"
                  render={(props) => <NotFound {...props} />}
                />
                <Route
                  exact
                  path="/notifications"
                  render={(props)=> <Notifications {...props}/>}
                />
                 <Route
                  exact
                  path="/settings/profile"
                  render={(props) => (<Dashboard {...props} />)}
                /> 
                <Route
                  exact
                  path="/compose/tweet"
                  render={(props) => <Dashboard {...props} />}
                />
                <Route 
                  exact 
                  path="/:profile" 
                  render={(props)=> (<UserProfile {...props} key={props.location.key}/>)} />
                <Route
                  exact
                  path="/:profile/:tweetId/gallery"
                  render={(props) => <PostView {...props} />}
                />
                <Route
                  exact
                  path="/:profile/:tweetId"
                  render={(props) => <PostView {...props} />}
                /> 
           </Switch>
           <Loading/>
              {background && (
                <Route
                  exact 
                  path="/compose/tweet"
                  render={(props) => <Reply {...props} />}
                />
              )}
              {background && (
                <Route
                  exact
                  path="/settings/profile"
                  render={(props) => <ProfileSettings {...props} />}
                />
              )}
              {background && (
                <Route
                  exact
                  path="/:profile/:tweetId/gallery"
                  render={(props) => <Gallery {...props} />}
                />
              )}
        </>

      )}/>
    )
  }
  const PublicRoutes = () =>{
    return (
      <Route render={()=>(
        <div>

          <Route exact path="/" render={(props) => <Home  {...props} auth={auth} loading={loading} />} />
          <Route exact path="/register" render={(props)=> <Register {...props}/>} />
          <Route exact path="/login" component={(props) => <Login {...props} />} />
        </div>
     
      )}/>
    )
  }
  return (
    <Switch>
      <PublicRoute  exact path="/" component={Home}/>
      <PublicRoute exact path="/login" component={Login}/>
      <PublicRoute exact path="/register" component={Register}/>
      {/* <Route exact path="/" render={(props) => <Home  {...props} auth={auth} loading={loading} />} />
      <Route exact path="/register" render={(props)=> <Register {...props}/>} />
      <Route exact path="/login" component={(props) => <Login {...props} />} /> */}
      <Route
        render={() => (
        
          <Container
            style={{
              display: "flex",
              height: "100%",
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Sidebar />
            <Content style={{ maxWidth: 592 }}>
     
              <ProtectedRoute component={(props)=> <Prueba {...props}/>}/>
             
                
            </Content>
              <RightMenu/>
          
          </Container>
        )}
      />
    
    </Switch>
  );
};

export default Main;

;
