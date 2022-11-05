import React from 'react'
import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAxios } from '../../../hooks/useAxios';
import { ImageContainer } from '../../../shared/styles';
import { Image } from '../../Reply/reply.styles';

const TweetGallery = (props) => {
  const {files,_id,author:{username}} = props;
  const history = useHistory();
  const {response,error,loading} = useAxios({url:files,method:'GET',auto:true});

  useEffect(() => {
    if (!loading){
      if(error){
        console.log(error)
        toast.error('An error ocurred while retrieving the images')
      }
    }
  },
  [response,error,loading])

  const redirect = (e) =>{
    e.stopPropagation();
    history.push({
      pathname:`/${username}/${_id}/gallery`,
      state:{background:history.location}
      })
  }
  return (
    <ImageContainer images={files} onClick={redirect}>
    
    {response?.map(({data},index) => (
    <Image image={data} key={index}>
        <img src={data}  style={{height:'auto',width:'100%'}}/>
    </Image>
  ))}
    </ImageContainer>
  )
}

export default TweetGallery