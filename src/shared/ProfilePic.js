import React, {useState} from "react";
import { CircularFrame, ProfileResponsive, FlexCenter } from "../shared/styles";
import {Icon} from "rsuite";
import { useEffect } from "react";
const ProfilePic = (props) => {
  const [error,setError] = useState(false)
  const { hidden, src, onClick, profile, small } = props;
  const onError = (event) => {
    if (!error){
      setError(true)
    }
  }

  useEffect(() => {
    setError(false)
  },[src])
  
  return (
    <CircularFrame
      onClick={onClick}
      hidden={hidden}
      style={{ cursor: "pointer" }}
      type="button"
    >
     <div className="overlay"/>
    
      {!error ? <ProfileResponsive
        maxHeight={150}
        src={src}
        onError={onError}
      /> :
        <Icon icon='user-circle' size='5x'/> }
    </CircularFrame>
  );
};

export default ProfilePic;
