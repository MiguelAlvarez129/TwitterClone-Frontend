import React, { useEffect, useState } from "react";
import { useParams, useHistory, useLocation, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Comments from "../shared/Comments";
import Tweet from "../components/Tweet/Tweet"
import Topbar from "../shared/Topbar"
import {updateDone} from "../redux/slices/postSlice"
import axios from "axios";
import { trackPromise } from "react-promise-tracker";
import { useAxios } from "../hooks/useAxios";
import { toast } from "react-toastify";
import { Loader } from "rsuite";
import Loading from "../shared/Loading";
const PostView = (props) => {
  
  const dispatch = useDispatch()
  const userId = useSelector((state) => state.user.user._id);
  const {update} = useSelector((state)=> state.post)
  const [comments, setComments] = useState([]);
  const [data, setData] = useState([]);
  const location = useLocation();
  const {_id} = props.match.params;
  const {response,error,loading} = useAxios({url:'app/get-tweet/' + _id, method:'GET', auto:true})

  useEffect(()=>{
    if (!loading && error){
      if (error?.response?.status === 404){
        toast.error('This tweet doesn\'t seem to exist')
      } else {
        toast.error('An error ocurred while retrieving the tweet')
      }
    }
  },[response,error,loading])
  // useEffect(() => {
 
  //   return () => {
  //     console.log("CLEAN UP!")
  //   }
  // }, [])

  // useEffect(() => {
  //     const prueba = () =>{
  //         return  new Promise(resolve => setTimeout(() => resolve("Done!"),10000000))
  //       }
  //       trackPromise(
  //         axios
  //           .post("/app/getSinglePost", { tweetId })
  //           .then((res) => {
  //             setData(res.data);
  //             setComments(res.data.comments)
  //             if (update) dispatch(updateDone())
  //           }).catch(e => {
  //             if (e.response.status === 404){
  //               setRedirect(true)
  //             }
  //           })
  //       )

  //   return () =>{
  //     setRedirect(false)
  //     dispatch(updateDone())
  //   }
  // }, [tweetId,update]);

 
  return (
    <>
    <Topbar title={"Tweet"} button/> 
    {loading && <Loader center size="md"/>}
   {!loading && response?.data && <Tweet {...response.data} extended={true}/>}
    {!loading && response?.data?.comments &&  <Comments /> }
    </> 
    
  );
};

export default PostView;
