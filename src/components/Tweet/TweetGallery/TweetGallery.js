import React from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { ImageContainer } from '../../../shared/styles';
import { Image } from '../../Reply/reply.styles';

const TweetGallery = (props) => {
  const {files,_id,author:{username}} = props;
  const history = useHistory();
  // const {response,error,loading} = useAxios({url:files,method:'GET',auto:true});

  // useEffect(() => {
  //   if (!loading){
  //     if(error){
  //       console.log(error)
  //       toast.error('An error ocurred while retrieving the images')
  //     }
  //   }
  // },
  // [response,error,loading])

  const redirect = (e) =>{
    e.stopPropagation();
    history.push({
      pathname:`/${username}/${_id}/gallery`,
      state:{background:history.location}
      })
  }
  return (
    <ImageContainer images={files} onClick={redirect}>
    
    {files?.map((data,index) => (
    <Image image={ process.env.REACT_APP_BASE_URL + '\\' + data} key={index}>
        <img src={ process.env.REACT_APP_BASE_URL + '\\' + data}  style={{height:'auto',width:'100%'}}/>
    </Image>
  ))}
    </ImageContainer>
  )
}

export default TweetGallery