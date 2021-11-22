import React, {useRef} from "react";
import { CircularFrame, ProfileResponsive, FlexCenter } from "../shared/styles";
import {Icon} from "rsuite";
const ProfilePic = (props) => {
  const { hidden, src, onClick } = props;
  return (
    <CircularFrame
      onClick={onClick}
      hidden={hidden}
      style={{ cursor: "pointer" }}
    >
     <div className="overlay"/>

    
      {src ? <ProfileResponsive
        maxHeight={150}
        src={src}
      /> :
        <Icon icon='user-circle' size='5x'/> }
    </CircularFrame>
  );
};

export default ProfilePic;
