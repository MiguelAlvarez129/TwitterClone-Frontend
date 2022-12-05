import React, { useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";
import { useRouteMatch } from "react-router-dom";
import Tweet from "../components/Tweet/Tweet";
import { toast } from "react-toastify";
import { Loader } from "rsuite";

const Comments = (props) => {
  const match = useRouteMatch()
  const {
    params: { _id },
  } = match;
  const {response,error,loading} = useAxios({url:'/app/get-comments/' + _id ,method:'GET',auto:true,key:'comments'})
  useEffect(()=>{
    if (!loading && error){
      toast.error('An error ocurred while retrieving the comments')
    }
  },[response,error,loading])
  return (
    <>
    {loading && <Loader size="md" style={{marginTop:50,width:'100%',textAlign:'center'}} />}
    {!loading && response?.data.map((tweet,index)=>(

      <Tweet {...tweet} key={index} />
 
    ))}
    </>
  );
};

export default Comments;
