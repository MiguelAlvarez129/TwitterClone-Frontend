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
import Reply from "./components/Reply/Reply";
import Notifications from "./components/Notifications/Notifications"
import ProfileSettings from "./components/ProfileSettings/ProfileSettings"
import "rsuite/dist/styles/rsuite-default.css";
import { Content} from "rsuite";
import Loading from "./shared/Loading";
import RightMenu from "./components/RightMenu/RightMenu"
import ProtectedRoute from "./private/ProtectedRoute";
import PublicRoute from "./private/PublicRoute";
import { Container } from "./shared/styles";
import { useRefreshToken } from "./hooks/useRefreshToken";
import { useAuth } from "./hooks/useAuth";
import { userOnline } from "./controllers/ioControllers";


const Main = () => {
  const {isAuth,user} = useAuth();
  const {refresh,loading} = useRefreshToken();
  const location = useLocation();
  let background =  location.state?.background;

  useEffect(() => {
    if (!isAuth) refresh()
  }, []);

  useEffect(() => {
    if (user.id){
      userOnline(user.id)
    }
  }, [user]);

  return loading ? <Loading/> : ( 
    <Switch>
      <PublicRoute exact path="/" component={Home}/>
      <PublicRoute exact path="/login" component={Login}/>
      <PublicRoute exact path="/register" component={Register}/>
      <ProtectedRoute
        render={() => (
          <Container>
            <Sidebar />
            <Content style={{ maxWidth: 592 }}>
           <Switch location={background || location}>
                <Route
                  exact
                  path="/home"
                  render={(props) => <Dashboard {...props}  />}
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
                  path="/:username" 
                  render={(props)=> (<UserProfile {...props} key={props.location.key}/>)} />
                <Route
                  exact
                  path="/:username/:_id/gallery"
                  render={(props) => <PostView {...props} />}
                />
                <Route
                  exact
                  path="/:username/:_id"
                  render={(props) => <PostView {...props} key={props.location.key}/>}
                /> 
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
                  render={(props) => <ProfileSettings {...props}/>}
                />
              )}
              {background && (
                <Route
                  exact
                  path="/:username/:_id/gallery"
                  render={(props) => <Gallery {...props} />}
                />
              )}
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
