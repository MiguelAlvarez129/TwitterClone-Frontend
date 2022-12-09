import React, { useEffect, useState } from "react";
import ProfilePic from "../../shared/ProfilePic";
import {
  TweetButton,
  Stack,
} from "../../shared/styles";
import FollowButton from "../FollowButton/FollowButton"
import "react-quill/dist/quill.snow.css";
import { useHistory, useLocation } from "react-router-dom";
import Topbar from "../../shared/Topbar"
import { BackgroundImage, ProfileContainer, UserProfileContainer } from "./userProfile.styles";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useAxios } from "../../hooks/useAxios";
import UserProfileContent from "./UserProfileContent/UserProfileContent";
import { Loader } from "rsuite";
import Feed from "../../shared/Feed";
import User from "../../shared/User";

const UserProfile = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [data, setData] = useState({});
  const {user} = useAuth()
  const {
    params: { username }, 
  } = props.match;
  const {response,error,loading} = useAxios({url:'/app/get-user/' + username,method:'GET',auto:true,key:'userProfile'});

  
  useEffect(()=>{
    if (!loading && error){
      if (error.response.status === 404){
        toast.error('This user doesn\'t seem to exist')
      } else {
        toast.error('An error ocurred while fetching this user')
      }
    }

    if (!loading && response){
      console.log(response)
    }
  },[response,error,loading])

  const openSettings = (e) => {
    e.stopPropagation();
    history.push({
      pathname: `/settings/profile`,
      state: {
        background: location,
      },
    });
  };


return (

    <div> 
      <Topbar title={'@' + username} button/>
      <BackgroundImage image={process.env.REACT_APP_BASE_URL + `\\${response?.data?.bgPic}`}/>
      <ProfileContainer>
          {/* <ProfilePic hidden src={process.env.REACT_APP_BASE_URL + `/public/uploads/${username}/profile/profile.png`}/> */}
          <User username={username} small={false} profilePic={response?.data?.profilePic}  />
          {user.username === username ? 
          <TweetButton inverted small top onClick={openSettings} style={{flex:1,maxWidth:200}}>
            Edit Profile
          </TweetButton>
          : <FollowButton followers={data.followers}/>}
      </ProfileContainer>
    {loading && <Loader size="md" center/>}
    {!loading && <UserProfileContent {...response?.data}/>} 
    {!loading && response?.data && <Feed username={username}/>}
    </div>
  );
};

export default UserProfile;
