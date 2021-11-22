import React, { useEffect, useState } from "react";
import ProfilePic from "../../shared/ProfilePic";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import { Panel, Grid, Col, Row, IconButton, Icon, DateRangePicker } from "rsuite";
import {
  FlexCenter,
  Fullname,
  CustomGrid,
  TweetButton,
  Bg,
} from "../../shared/styles";
import FollowButton from "../FollowButton/FollowButton"
import Feed from "../../shared/Feed";
import { useSelector, useDispatch } from "react-redux";
import "react-quill/dist/quill.snow.css";
import { useHistory, useLocation } from "react-router-dom";
import Topbar from "../../shared/Topbar"

const UserProfile = (props) => {
  //const [user, setUser] = useContext(UserContext);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [data, setData] = useState({});
  const editable = user.username == data.username ? true : false;
  const { username, file, fullname, bg} = data;

  const {
    params: { profile },
  } = props.match;

  useEffect(() => {
    console.log("key",props)
    trackPromise(
      axios
        .post("/app/getUser", { username: profile })
        .then((res) => {
          localStorage.setItem("content", JSON.stringify(res.data));
          setData(res.data);
          console.log(res.data)
        })
        .catch((e) => {
          setData(false)
          console.log(e)
        })
    );
    return () => {
      console.log("unmounting...");
      setData({})
    };
  }, [user]);

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
    <CustomGrid fluid>
      <Topbar title={ data ? fullname : "Profile"} button/>
      <Bg bottom image={bg} />
      <Row>
        <Col xs={12} xsPull={1}>
          <FlexCenter>
            <ProfilePic src={file} hidden />
          </FlexCenter>
        </Col>
        <Col xs={7} xsOffset={4}>
          {editable ? 
            <TweetButton inverted small top onClick={openSettings}>
              Edit Profile
            </TweetButton>
           : <FollowButton followers={data.followers} profile={data._id}/>
          }
        </Col>
      </Row>
      <Row style={{borderBottom:"solid 1px lightgray"}}>
        <Col xs={12} xsOffset={1}>
          {data ? (
            <>
              <Fullname>{fullname}</Fullname>
              <p>{username}</p>
              <p style={{fontSize:18}}>{data.bio}</p>
              <br />
            </>
          ) : (
            <Fullname>{profile}</Fullname>
          )}
        </Col>
        <Col xs={24}>
          {!data && (
            <div style={{textAlign:"center"}}>
              <hr />
              <br />

              <Fullname>This account doesn't seem to exist</Fullname>
              <br />
              <p>Try searching for another.</p>
            </div>
          )}
        </Col>
      </Row>

      <Row>
        <Feed _id={data._id} data={data} />
      </Row>
    </CustomGrid>
  );
};

export default UserProfile;
