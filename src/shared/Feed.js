import React, { useEffect, useState } from "react";
import {Loader} from "rsuite"
// import Tweet from "./Tweet";
import Tweet from "../components/Tweet/Tweet";
import axios from "axios";
import { useParams, Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import {updateDone} from "../redux/slices/postSlice"
import {saveData} from "../redux/slices/dataSlice"
import { trackPromise } from "react-promise-tracker";
import { FeedLoader } from "../shared/styles";
import Loading from "./Loading";
import { useAxios } from "../hooks/useAxios";
import { toast } from "react-toastify";

const Feed = (props) => {
  const location = useLocation()
  const update = useSelector(state => state.post.update)
  const {data} = useSelector(state => state.data)
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch()
  const { _id, home} = props;
  const {response,error,loading} = useAxios({
    // new props => renderize/change => cleanup => new effect
    url:home ?  '/app/feed' : '/app/getUserTweets',
    method:'GET',
    auto:true
  })
  useEffect(()=>{
    if(!loading && error){
      toast.error('An error ocurred while fetching the feed data')
    }
  },[response,error,loading])
  // useEffect(() => { 

    
  //   if (data?.posts){
  //     setPosts([...data.posts])
  //   } else {
  //     if (_id != undefined) {
  //       trackPromise(  axios.post(url, { userId:_id },{cancelToken:cancel.token}).then((res) => {
  //         setPosts(res.data)
  //         setLoading(false)
  //         dispatch(saveData({posts:[...res.data]}))
  //         if (update){
  //         dispatch(updateDone())
  //         }
  //       }),"feed")
  //     }
  //   }

  //   return () =>{
  //     cancel.cancel()
  //     if (update){
  //       dispatch(updateDone())
  //       }
  //   }
  // }, [_id,update,user]);

  const noTweetMsg = () => {
    if (home){
      return <h5 style={{textAlign:"center"}}> There's no tweets at the moment</h5>
    } else {
      return <h5 style={{textAlign:"center"}}>This user hasn't posted anything yet :(</h5>
    }
  }
  return (
  <>
    {response?.data.map((e,index) => <Tweet {...e} key={index} />)}
    {!loading && !response?.data?.length && noTweetMsg()}
    {loading && <Loader center backdrop size="md"/>}
  </>
  );
};

export default Feed;
