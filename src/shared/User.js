import React from "react";
import { CircularFrame, Wrapper, Fullname, FlexColumn, Stack } from "../shared/styles";
import { Link } from "react-router-dom";
import { Icon } from "rsuite";
const User = (props) => {
  const { image, username, small, medium} = props;
  return (

      <Wrapper>
        <CircularFrame small={small} medium={medium}>
          {image ? <img
            src={image}
            width="auto"
            height="auto"
            style={{ maxHeight: small ? 45 : medium ? 75 : 150, cursor:"pointer"}}
          /> :
           <Icon icon='user-circle' size='2x'/>
          }
        </CircularFrame>
      </Wrapper>

  );
};

export default User;
