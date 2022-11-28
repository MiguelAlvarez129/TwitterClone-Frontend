import React, { useEffect } from "react";
import { BackDrop} from "../../shared/styles";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import ModalDiv from "../../shared/ModalDiv/ModalDiv";
import { useAxios } from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";
import ProfileSettingsForm from "./ProfileSettingsForm/ProfileSettingsForm";


const ProfileSettings = (props) => {
  const {user:{username}} = useAuth();
  const history = useHistory();
  const {response,error,loading} = useAxios({url:'/app/get-user/' + username,method:'GET',auto:true});
  useEffect(()=>{
    if (!loading  && error){
      toast.error('An error ocurred while getting the user details')
    }
    
  },[response,error,loading])


  return (
    <BackDrop onMouseDown={()=> history.goBack()} onMouseUp={(e) => e.preventDefault()}>
        <ModalDiv loading={loading}>
         {response && <ProfileSettingsForm   initialValues={response.data} />} 
        </ModalDiv>
    </BackDrop>
  )
};

export default ProfileSettings;
