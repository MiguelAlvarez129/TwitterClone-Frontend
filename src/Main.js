import React, { useEffect } from "react";
import {
  Route,
  useLocation,
  Switch,
} from "react-router-dom";
import Gallery from "./components/Gallery/Gallery";
import Register from "./components/Register/Register";
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
import { Content} from "rsuite";
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
import { Container } from "./shared/styles";


const Main = () => {
  const auth = useSelector((state) => state.user.isAuth);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const location = useLocation();
  let background =  location.state?.background;
  // axios.defaults.baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000"
  
  useEffect(() => {
    
    const {pathname,state} = location
    // if (localStorage.getItem("token")) {
    //   setAuthToken(localStorage.getItem("token"));
    //   trackPromise(authenticate(dispatch));
    // } 
  }, [location.pathname]);


  
  useEffect(() => {

    const {pathname,state} = location

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

  return (
    <Switch>
      <PublicRoute exact path="/" component={Home}/>
      <PublicRoute exact path="/login" component={Login}/>
      <PublicRoute exact path="/register" component={Register}/>
      <Route
        render={() => (
        
          <Container>
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
