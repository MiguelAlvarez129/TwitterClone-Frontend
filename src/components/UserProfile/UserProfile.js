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

const UserProfile = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [data, setData] = useState({});
  const {user} = useAuth()
  const {
    params: { username }, 
  } = props.match;
  const {response,error,loading} = useAxios({url:'/app/get-user/' + username,method:'GET',auto:true});
  // const { username, file, fullname, bg} = data;
  
  useEffect(()=>{
    if (!loading && error){
      if (error.response.status === 404){
        toast.error('This user doesn\'t seem to exist')
      } else {
        toast.error('An error ocurred while fetching this user')
      }
    }
  },[response,error,loading])
  // useEffect(() => {
  //   const cancel = axios.CancelToken.source();
  //   if (savedData?.userData){
  //     setData(savedData.userData)
  //   } else {
  //     trackPromise(
  //       axios
  //         .post("/app/getUser", { username: profile}, {cancelToken:cancel.token}) 
  //         .then((res) => {
  //           setData(res.data);
  //           dispatch(setUserData(res.data))
  //         })
  //         .catch((e) => {
  //           setData(false)
  //           if (e.response.status === 404){
  //             Alert.error(e.response.statusText,5000)
  //             history.push("/404")
  //           } else {
  //             Alert.error(e.response.statusText,5000)
  //           }
  //         })
  //     )
  //   }
  
  //   return () => {
  //     cancel.cancel()
  //   };
  // }, [user]);

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
      <BackgroundImage />
      <ProfileContainer>
          <ProfilePic hidden />
          {user.username === username ? 
          <TweetButton inverted small top onClick={openSettings} style={{flex:1,maxWidth:200}}>
            Edit Profile
          </TweetButton>
          : <FollowButton followers={data.followers}/>}
      </ProfileContainer>
    {loading && <Loader size="md" center/>}
    {!loading && <UserProfileContent {...response?.data}/>} 
    <Feed username={username}/>
    </div>

    // <CustomGrid fluid>
    //   <Topbar title={ data ? fullname : "Profile"} button/>
    //   <Bg bottom image={bg} />
    //   <Row>
    //     <Col xs={12} xsPull={1}>
    //       <FlexCenter>
    //         <ProfilePic src={file} hidden />
    //       </FlexCenter>
    //     </Col>
    //     <Col xs={7} xsOffset={4}>
    //       {editable ? 
    //         <TweetButton inverted small top onClick={openSettings}>
    //           Edit Profile
    //         </TweetButton>
    //        : <FollowButton followers={data.followers} profile={data._id}/>
    //       }
    //     </Col>
    //   </Row>
    //   <Row style={{borderBottom:"solid 1px lightgray"}}>
    //     <Col xs={12} xsOffset={1}>
    //       {data ? (
    //         <>
    //           <Fullname>{fullname}</Fullname>
    //           <p>{username}</p>
    //           <p style={{fontSize:18}}>{data.bio}</p>
    //           <br />
    //         </>
    //       ) : (
    //         <Fullname>{profile}</Fullname>
    //       )}
    //     </Col>
    //     <Col xs={24}>
    //       {!data && (
    //         <div style={{textAlign:"center"}}>
    //           <hr />
    //           <br />

    //           <Fullname>This account doesn't seem to exist</Fullname>
    //           <br />
    //           <p>Try searching for another.</p>
    //         </div>
    //       )}
    //     </Col>
    //   </Row>

    //   <Row>
    //     <Feed _id={data._id} data={data} />
    //   </Row>
    // </CustomGrid>
  );
};

export default UserProfile;
