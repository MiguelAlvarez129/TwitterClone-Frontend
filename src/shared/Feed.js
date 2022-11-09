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
  const {username} = props;
  const {response,error,loading} = useAxios({
    // new props => renderize/change => cleanup => new effect
    url:!username ?  '/app/feed' : '/app/get-user-tweets/' + username ,
    method:'GET',
    auto:true,
    key:'feed'
  })
  useEffect(()=>{
    if(!loading && error){
      toast.error('An error ocurred while fetching the feed data')
    }
  },[response,error,loading])


  const noTweetMsg = () => {
    if (!username){
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
