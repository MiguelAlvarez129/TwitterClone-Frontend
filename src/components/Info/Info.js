import React from "react"
import {
  BackDrop,
  PostContent,
  PostHeader,
  PostDate,
  FlexCenter,
  FlexColumn,
  ReplyDiv,
  Connector,
} from "../../shared/styles";
import { Icon, Modal, Divider, IconButton, Panel } from "rsuite";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Info = (props) => {
  const user = useSelector((state) => state.user.user);
  const history = useHistory();
  // const { reply } = history.location.state;
  // const replyingTo = reply && reply.username;
  // const tweetId = reply && reply.tweetId;

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
          hey
          </div>
        </ReplyDiv>
      </FlexCenter>
    </BackDrop>
  );

}


export default Info;