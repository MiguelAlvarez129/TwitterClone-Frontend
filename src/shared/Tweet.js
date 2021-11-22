import React, { useState, useEffect } from "react";
import { Col, IconButton, Icon, Divider, Dropdown } from "rsuite";
import RegisterMessage from "./RegisterMessage";
import { useSelector, useDispatch } from "react-redux";
import User from "./User";
import {
  ImageContainer,
  ImageCounter,
  PostContent,
  PostHeader,
  PostPanel,
  PostDate,
  ActionsToolbar,
  FlexColumn,
  Connector,
  StyledDiv,
  Statistics,
  Fullname,
  ToolbarButton
} from "./styles";
import { likePost, createRetweet } from "../controllers/axios";
import { useHistory, useLocation } from "react-router-dom";
import Comments from "./Comments";
import axios from "axios";

const Tweet = (props) => {
  const userId = useSelector((state) => state.user.user._id);
  const dispatch = useDispatch();
  const {
    last,
    retweetBy,
    retweets,
    comment,
    big,
    username,
    fullname,
    image,
    content,
    date,
    likes,
    _id,
    files,
    comments,
  } = props;
  const [like, setLike] = useState(0);
  const [rq, setRq] = useState(0);
  const [show, setShow] = useState(false);
  const [images, setImages] = useState([]);
  const history = useHistory();
  const location = useLocation();
  const undo =
  retweets && retweets.usersRetweeted.indexOf(userId) == -1 ? false : true;
  //console.log(last)
  useEffect(() => {
    const cancel = axios.CancelToken.source();
    if (files) {
      axios
        .post("/app/testposts", { files }, { cancelToken: cancel.token })
        .then((res) => {
          setImages(res.data);
          setLike(likes.quantity)
          setRq(retweets.quantity)
        });
    }

    return () => {
      cancel.cancel();
    };
  }, [files]);

  const open = () => {
    setShow(true);
  };

  const close = () => {
    setShow(false);
  };

  const openGallery = (e) => {
    e.stopPropagation();
    history.push({
      pathname: `/${username}/${_id}/gallery`,
      state: {
        background: location,
      },
    });
  };

  const redirect = (e) => {
    if (userId == null) {
      open();
    } else if (e == "retweet") { 
      createRetweet({ _id },dispatch);
    } else if (e == "like") {
      likePost({ _id }, dispatch);
    } else if (e == "comment") {
      
      history.push({
        pathname: `/compose/tweet`,
        state: {
          background: location,
          reply: props,
        },
      });
    } else {
      if (retweetBy){
        history.push({
          pathname: `/${username}/${_id}`,
          state: {
            retweetBy
          },
        });
      } else {
        history.push(`/${username}/${_id}`);
      }
    }
  };

  const Toolbar = (props) => (
    <ActionsToolbar big={props.big} onClick={(e) => e.stopPropagation()}>
      <div>
        <ToolbarButton
          icon={<Icon icon="comment-o" size="3x" />}
          appearance="subtle"
          onClick={() => redirect("comment")}
          circle
          type={"blue"}
          size="lg"
        />
        <b>{comments && comments.length}</b>
      </div>
      <div>
        <Dropdown
          placement="leftStart"
          icon={<Icon icon="retweet" />}
          renderTitle={() => {
            return (
              <div>
                <ToolbarButton
                  appearance="subtle"
                  icon={<Icon icon="retweet" />}
                  size="lg"
                  type={"green"}
                  circle
                />
              </div>
            );
          }}
          noCaret
        >
          <Dropdown.Item icon={<Icon icon="retweet" />} onClick={() => redirect("retweet")}>
            {" "}
            {undo ? "Undo retweet" : "Retweet"}
          </Dropdown.Item>
          <Dropdown.Item icon={<Icon icon="edit2" />}>
            {" "}
            Quote Tweet
          </Dropdown.Item>
        </Dropdown>
        <b>{rq}</b>
      </div>
      <div>
        <ToolbarButton
          icon={<Icon icon="heart-o" />}
          appearance="subtle"
          onClick={() => redirect("like")}
          circle
          type={"red"}
          size="lg"
        />
        <b>{like}</b>
      </div>
      <ToolbarButton
        icon={<Icon icon="share" />}
        appearance="subtle"
        type={"blue"}
        circle
        size="lg"
      />
    </ActionsToolbar>
  );

  return (
    <>
      {big ? (
        <>
          <PostPanel big>
            {retweetBy && (
              <p style={{marginBottom:5,marginLeft:10}}>
                <Icon icon="retweet" />
                {" "} <b>{retweetBy} Retweeted</b>
              </p>
            )}
            <User image={image} username={username} fullname={fullname} small />
            <PostContent big>
              {content}
            </PostContent>
            <ImageContainer images={images} onClick={openGallery}>
              {images.map((e) => (
                <div
                  style={{ 
                    backgroundColor: "lightgray",
                    backgroundImage: `url(${e && e.pic})`,
                    backgroundSize: "cover",
                    width: "auto",
                    height:
                      images.length == 1 && e && (572 * e.height) / e.width,
                  }}
                />
              ))}
              {images.length > 3 && (
                <ImageCounter>{images.length - 3}+</ImageCounter>
              )}
            </ImageContainer>

            <PostDate>{date}</PostDate>
            <StyledDiv />
            <Statistics>
              <p>
                <b>{rq}</b>
                Retweets 
              </p> 
            
              <p>Quote tweets </p>{" "}
              
              {!!likes && (
                <p onClick={() => redirect("likes")}>
                  <b>{like}</b> Likes
                </p>
              )}
            </Statistics>
            <StyledDiv />
            <Toolbar big />
          </PostPanel>
          <div></div>
        </>
      ) : (
        <>
          {/* comments.length ? true : */}
          <PostPanel onClick={redirect} hover comment={comment}>
            {retweetBy && (
              <p style={{marginBottom:5,marginLeft:10}}>
                <Icon icon="retweet" size="lg" /> &nbsp;
                <b>{retweetBy} Retweeted</b>
              </p>
            )}
            <div style={{ display: "flex" }}>
              <FlexColumn>
                <User image={image} small />
                {/* {comment ? <Connector last={last} comment /> : " "} */}
              </FlexColumn>
              <FlexColumn block>
                <PostHeader>
                  <Fullname small>
                  {fullname} 
                  </Fullname> 
                  &nbsp;
                   {username}
                  <PostDate>{date}</PostDate>
                </PostHeader>
                <PostContent>{content}</PostContent>
                <ImageContainer images={images} onClick={openGallery}>
                  {images.map((e,index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: "lightgray",
                        backgroundImage: `url(${e && e.pic})`,
                        backgroundSize: "cover",
                        width: "auto",
                      }}
                    />
                  ))}
                  {images.length > 3 && (
                    <ImageCounter>{images.length - 3}+</ImageCounter>
                  )}
                </ImageContainer>
                <Toolbar />
              </FlexColumn>
            </div>
          </PostPanel>
          <RegisterMessage show={show} close={close} />
        </>
      )}
    </>
  );
};

export default Tweet;
