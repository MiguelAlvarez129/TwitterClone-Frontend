import React, {useEffect, useState} from "react";
import { CircularFrame} from "../shared/styles";
import { Icon } from "rsuite";
const User = (props) => {
  const { image, username, small, onClick} = props;
  const [error,setError] = useState(false)

  const onError = () => {
    if (!error){
      setError(true)
    }
  }
  useEffect(() => {
    setError(false)
  },[image])

  return (
        <CircularFrame small={small} type="button" onClick={onClick}>
          <div className="overlay"/>
          {!error ? <img
            src={image || process.env.REACT_APP_BASE_URL + `/public/uploads/${username}/profile/profile.png`}
            width="auto"
            height="auto"
            onError={onError}
            style={{ maxHeight: small ? 45 : 150, cursor:"pointer"}}
          /> :
           <Icon icon='user-circle' size={small ? '2x' : '5x'}/>
          }
        </CircularFrame>
    

  );
};

export default User;
