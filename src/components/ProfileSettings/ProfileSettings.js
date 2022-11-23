import React, { useRef, useState, useEffect } from "react";
import { BackDrop, Stack } from "../../shared/styles";
import { IconButton, Divider, Icon, Grid, Col , Row, Loader, Tag, Alert} from "rsuite";
import { ReplyDiv, FlexCenter, TextArea, CustomRow, Bg, Input, TweetButton,} from "../../shared/styles";
import ProfilePic from "../../shared/ProfilePic"
import { useHistory } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import {updateUser} from "../../redux/slices/authSlice"
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ModalDiv from "../../shared/ModalDiv/ModalDiv";
import { useAxios } from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";
import ProfileSettingsForm from "./ProfileSettingsForm/ProfileSettingsForm";


const ProfileSettings = (props) => {
  const {user:{username}} = useAuth();
  const history = useHistory();
  // const dispatch = useDispatch()

  // const { register, handleSubmit, errors, setValue} = useForm();
  const {response,error,loading} = useAxios({url:'/app/get-user/' + username,method:'GET',auto:true});
  useEffect(()=>{
    if (!loading  && error){
      toast.error('An error ocurred while getting the user details')
    }
    
  },[response,error,loading])

  // useEffect(() => {
  //   const cancel = axios.CancelToken.source();
  //   const {username} = user;
  //   if (username){
  //     axios
  //     .post("/app/getuser", { username }, {cancelToken:cancel.token})
  //     .then((res) => {
  //           console.log(username,"HERE!")
  //           setLoading(false)
  //           setPic(res.data.file)
  //           setBg(res.data.bg)
  //           setValue("fullname",res.data.fullname)
  //           setValue("bio",res.data.bio)
           
  //         })
  //         .catch((error) => console.log(error))
  //   }
  //   return () => {
  //     cancel.cancel()
  //   };
  // }, [user]);


  // const onSubmit = (e) =>{
  //   const {username} = user
  //   const data = {...e,pic,bg,username}
  //   setLoading(true)
  //   axios.put("/app/usersettings",data)
  //   .then(res => {
  //     Alert.success("User data updated",5000);
  //     dispatch(updateUser({file:pic,fullname:e.fullname}))
  //     history.goBack();
  //   })
  //   .catch(err =>console.log(err))
  // }

  const onChange = (e,source) => {
    // console.log("you clicked!")
    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   if (source == "pic"){
    //     setPic(reader.result);
    //   } else if (source == "bg"){
    //     setBg(reader.result);
    //   }
      
    // };
    // if (e.target.files[0]) {
    //   reader.readAsDataURL(e.target.files[0]);
    // }
  };

  return (
    <BackDrop onMouseDown={()=> history.goBack()} onMouseUp={(e) => e.preventDefault()}>
        <ModalDiv style={{overflow:'auto'}} loading={loading}>
          <ProfileSettingsForm   initialValues={response.data} />
        </ModalDiv>
      {loading && <Loader size="md"/>}
    </BackDrop>
  )
};

export default ProfileSettings;
