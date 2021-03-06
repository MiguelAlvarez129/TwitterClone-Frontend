import React from "react";
import { CircularFrame, Wrapper, Fullname, FlexColumn } from "../shared/styles";
import { Link } from "react-router-dom";
import { Icon } from "rsuite";
const User = (props) => {
  const { image, username, fullname, hidden, small, medium, disabled} = props;
  return (
    <Link
      onClick={(e)=> disabled && e.preventDefault()}
      to={`/${username}`}
      style={{
        color: "gray",
        textDecoration: "none",
        pointerEvents: username == undefined ? "none" : "auto",
      }}
    >
      <Wrapper>
        <CircularFrame small={small} medium={medium}>
          {image ? <img
            src={image}
            width="auto"
            height="auto"
            style={{ maxHeight: small ? 45 : medium ? 75 : 150, cursor:"pointer"}}
          /> :
           <Icon icon='user-circle' size='2x' />
          }
        </CircularFrame>
        <FlexColumn>
        <Fullname small hidden={hidden}>
          {fullname}
        <p> {username} </p>
        </Fullname>
        </FlexColumn>
      </Wrapper>
    </Link>
  );
};

export default User;
