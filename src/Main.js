import React, { useState, useEffect } from "react";
import {
  Route,
  useLocation,
  Switch,
  useHistory,
  Redirect,
} from "react-router-dom";
import { Alert } from "rsuite";
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
import { Container, Content, Header, Footer } from "rsuite";
import { setAuthToken } from "./controllers/setAuth";
import { Rightmenu } from "./shared/styles";
import Loading from "./shared/Loading";
import { trackPromise } from "react-promise-tracker";
import { authenticate } from "./controllers/axios";
import { useSelector, useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import { logOut } from "./redux/slices/authSlice";
import ProtectedRoute from "./private/ProtectedRoute";
import Info from "./components/Info/Info"
import {userOnline, notificationsRead} from "./controllers/ioControllers"
import RightMenu from "./components/RightMenu/RightMenu"
import { io } from "socket.io-client";
import axios from  "axios"

const Main = () => {
  const [dark, setDark] = useState(false);
  const auth = useSelector((state) => state.user.isAuth);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const background = location.state && location.state.background;
  axios.defaults.baseURL = "http://localhost:5000"
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
      trackPromise(authenticate(dispatch));
    }
  
    const {pathname} = location
    if (pathname == "/compose/tweet" ){
      location.state = {background:{pathname:"/home"}}
    }
    if (pathname == "/settings/profile" ){
      location.state = {background:{pathname:"/home"}}
    }
  }, []);
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const decoded = jwt_decode(localStorage.getItem("token"));
      if (decoded.exp < Date.now() / 1000) {
        Alert.warning("Your session has timed out", 5000);
        dispatch(logOut());
        setAuthToken(false);
        localStorage.clear();
      }
    } 
    const {pathname} = location

    if(auth){
     
      userOnline(user.username)
      if (pathname == "/notifications" ){
        notificationsRead(user.username)
      }
    }
  }, [auth, location.key]);
 
  return (
    <Switch>
      <Route exact path="/" component={(props) => <Home auth={auth} />} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={(props) => <Login {...props} />} />
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
            <Sidebar auth={auth} />
            <Content style={{ maxWidth: 592 }}>
              <Switch location={background || location}>
                <Route
                  exact
                  path="/home"
                  render={(props) => <Dashboard {...props} />}
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
                {/* <Route
                  exact
                  path="/404"
                  render={(props) => <NotFound {...props} />}
                />  */}
              </Switch>
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
                
              <Loading />
            </Content>
            
              <RightMenu/>
          
          </Container>
        )}
      />
    </Switch>
  );
};

export default Main;

const notFound = (props) => {
  return (<div>
  <p>
    mmm... this page doesn't seem to exist, let's go back home
    <button>

    </button>
  </p>
  </div>)
};
