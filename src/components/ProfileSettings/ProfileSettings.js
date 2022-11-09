import React, { useRef, useState, useEffect } from "react";
import { BackDrop, Stack } from "../../shared/styles";
import { IconButton, Divider, Icon, Grid, Col , Row, Loader, Tag, Alert} from "rsuite";
import { ReplyDiv, FlexCenter, TextArea, CustomRow, Bg, Input, TweetButton} from "../../shared/styles";
import ProfilePic from "../../shared/ProfilePic"
import { useHistory, useRouteMatch } from "react-router-dom";
import {useSelector, useDispatch} from "react-redux"
import {updateUser} from "../../redux/slices/authSlice"
import { useForm } from "react-hook-form";
import { trackPromise } from "react-promise-tracker";
import axios from "axios"
import { toast } from "react-toastify";
import ModalDiv from "../../shared/ModalDiv/ModalDiv";
import { useAxios } from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";


const ProfileSettings = (props) => {
  const {user:{username}} = useAuth();
  const history = useHistory();
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
 // const [data, setData] = useState({});
  const ref = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const { register, handleSubmit, errors, setValue} = useForm();
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
    <BackDrop>
      <Stack justify={'center'} align={'center'}>
        <ModalDiv style={{overflow:'auto'}} loading={loading}>
          <IconButton
                style={{ margin: "-15px -15px 0px" }}
                appearance="subtle"
                icon={<Icon icon="close" style={{ color: "dodgerblue" }} />}
                circle
                size="lg"
                onClick={()=> history.goBack()}
              />
          <Divider style={{ margin: "0px -20px 20px" }} />
        </ModalDiv>
      </Stack>
      {loading && <Loader size="md"/>}
      {}
    </BackDrop>
  )
  // return loading ?  
  // <BackDrop onClick={back}>
  //     <FlexCenter top>
  //       <ReplyDiv onClick={(e) => e.stopPropagation()} style={{paddingTop:10}}>
  //         <Grid fluid>
  //           <div style={{height:514}}>
  //             <Loader size="md" center/>
  //           </div>
  //         </Grid>
  //       </ReplyDiv>
  //     </FlexCenter>
  //   </BackDrop>
  // :(
  //   <BackDrop onClick={back}>
  //     <FlexCenter top>
  //       <ReplyDiv onClick={(e) => e.stopPropagation()} style={{paddingTop:10}}>
  //       <Grid fluid>
  //         <Row>
  //         <Col xs={2} xsPull={1}>
  //         <IconButton
            
  //           appearance="subtle"
  //           icon={<Icon icon="close" style={{ color: "dodgerblue" }} />}
  //           circle
  //           size="lg"
  //           onClick={back}
  //         />

  //         </Col>
  //         <Col xs={5} xsPush={18}>
  //         <TweetButton small onClick={()=>ref2.current.click()} disabled={loading} >
  //           Save
  //         </TweetButton>
  //         </Col>
  //         </Row>
  //         <Divider style={{ margin: "0px -20px 20px" }} />
  //           <Row>
  //             <Bg image={bg} bottom>
  //               <FlexCenter>
  //                 <IconButton
  //                   onClick={() => ref.current.click()}
  //                   appearance="subtle"
  //                   icon={<Icon icon="camera" />}
  //                   circle
  //                   size="lg"
  //                 />
  //                 <input
  //                   accept=".jpg, .jpeg, .png"
  //                   style={{ display: "none" }}
  //                   type="file"
  //                   ref={ref}
  //                   onChange={(e) => onChange(e,"bg")}
  //                 />
  //               </FlexCenter>
  //             </Bg>
  //             <Col xsOffset={1} xs={10}>

  //           <input
  //             accept=".jpg, .jpeg, .png"
  //             name="file"
  //             style={{display:"none"}}
  //             type="file"
  //             ref={ref3}
  //             onChange={(e) =>{ onChange(e,"pic")}}/>
          
  //             <ProfilePic hidden src={pic} onClick={()=>ref3.current.click()}/>
       
  //             </Col>

  //           </Row>
  //             <form onSubmit={handleSubmit(onSubmit)}>
  //             <CustomRow>

  //               <Col xs={4}>
  //                 <label htmlFor="fullname">
  //                   <h5 style={{marginTop:18}}>Fullname</h5>
  //                 </label>
  //               </Col>
  //               <Col xs={19}>
  //                 <Input
  //                 fluid
  //                 name="fullname"
  //                 error={errors.fullname}
  //                 ref={register({ required: "fullname can't be blank" })}
  //                  />
  //               </Col>
  //               <Col xsOffset={4}>
  //               {errors.fullname && (
  //                     <Tag color="red">{errors.fullname.message}</Tag>
  //                   )}
  //               </Col>
  //             </CustomRow>
  //             <CustomRow>
  //               <Col xsOffset={2} xs={2}>
  //                 <label htmlFor="bio">
  //                   <h5>Bio</h5>
  //                 </label>
  //               </Col>
  //               <Col xs={19}>
  //                 <TextArea
  //                   name="bio"
  //                   border
  //                   fontSmall
  //                   maxLength="150"
  //                   placeholder="What's on your mind?"
  //                   ref={register}
  //                 />
  //               </Col>
  //             </CustomRow>
  //           <button style={{display:"none"}} ref={ref2} type="submit"/>
  //         </form>
  //           </Grid>
  //       </ReplyDiv>
  //     </FlexCenter>
  //   </BackDrop>
  // );
};

export default ProfileSettings;
