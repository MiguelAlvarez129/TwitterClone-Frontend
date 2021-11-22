import React, {useEffect} from "react";
import { Icon, Modal, Divider, IconButton, Panel } from "rsuite";
import Editor from "../shared/Editor";
import User from "../shared/User";
import Tweet from "../shared/Tweet";
import { useSelector } from "react-redux";
import {
  BackDrop,
  PostContent,
  PostHeader,
  PostDate,
  FlexCenter,
  FlexColumn,
  ReplyDiv,
  Connector,
} from "../shared/styles";
import { useHistory, useLocation } from "react-router-dom";
const Reply = (props) => {
  const user = useSelector((state) => state.user.user);
  const history = useHistory();
  const location = useLocation();
  const reply  =  location.state && location.state.reply ;

  const tweetId = reply && reply._id;

  
  const back = () => {
    history.goBack();
  };

  return (
    <BackDrop onClick={back}>
      <FlexCenter>
        <ReplyDiv onClick={(e) => e.stopPropagation()}>
          <IconButton
            style={{ margin: "-15px -15px 0px" }}
            appearance="subtle"
            icon={<Icon icon="close" style={{ color: "dodgerblue" }} />}
            circle
            size="lg"
            onClick={back}
          />

          <Divider style={{ margin: "0px -20px 20px" }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: 0,
              padding: 0,
            }}
          >
            {reply && (
              <div style={{ display: "flex" }}>
                <FlexColumn>
                  <User image={reply.image} small />
                  <Connector />
                </FlexColumn>
                <FlexColumn>
                  <PostHeader>
                    {reply.username}
                    <PostDate>{reply.date.slice(0, 11)}</PostDate>
                  </PostHeader>  
                  <PostContent>{reply.content}</PostContent>
                  <p> Replying to {reply.username}</p>
                </FlexColumn>
              </div>
            )}
            <div style={{ display: "flex" }}>
              <User image={user.file} small />
              <div style={{ width: "100%" }}>
                <Editor
                  close={back}
                  tweetId={tweetId}
                />
              </div> 
            </div>
          </div>
        </ReplyDiv>
      </FlexCenter>
    </BackDrop>
  );
};

export default Reply;
