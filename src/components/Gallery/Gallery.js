import React, { useState, useEffect } from "react";
import "../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";
import { IconButton, Icon} from "rsuite";
import { useHistory, useParams, useLocation } from "react-router-dom";
import {BackDrop,  GalleryContainer, BottomToolbar, Stack} from "../../shared/styles"
import { useAxios } from "../../hooks/useAxios";
import { toast } from "react-toastify";
import GalleryCarousel from "./GalleryCarousel/GalleryCarousel";
import GallerySidebar from "./GallerySidebar/GallerySidebar";
import { CustomIcon } from "./gallery.styles";
import TweetToolbar from "../Tweet/TweetToolbar/TweetToolbar";

const Gallery = () => {
  const [drawer,setDrawer] = useState(true)
  const [data, setData] = useState([]);
  const { _id} = useParams();
  const history = useHistory();
  const location = useLocation();
  const {response,error,loading} = useAxios({url:'app/get-tweet/' + _id, method:'GET', auto:true, key:'tweet'})

  useEffect(()=>{
    if (!loading && error){
      console.log(error)
      toast.error('An error ocurred while retrieving the tweet')
    }
  },[response,error,loading])

  const openComment = (e) => {
    e.stopPropagation();
    history.push({
      pathname: `/compose/tweet`,
      state: {
        background: location,
        reply: {...data[0]},
      },
    });
  };

  const toggle = (e) => {
    e.stopPropagation();
    setDrawer(!drawer);
  };

  const back = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <BackDrop onClick={back}>
      <Stack justify={'flex-end'} onClick={e => e.stopPropagation()} >

        <GalleryContainer style={{marginTop:10}}>
          <IconButton
            style={{position:'absolute',zIndex:10,top:0}}
            icon={<CustomIcon icon="close" />}
            appearance="subtle"
            circle
            size="lg"
            onClick={back}
          />
          {!loading && <GalleryCarousel files={response?.data?.files}/>}
          {response &&  <TweetToolbar  {...response?.data} />}
          <IconButton
          style={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
          icon={<CustomIcon icon={drawer ? "angle-double-right" : "angle-double-left"} />}
          size="lg"
          appearance="subtle"
          circle
          onClick={toggle}
        />
          
        </GalleryContainer>
        {drawer && <GallerySidebar {...response?.data} loading={loading} />}
      </Stack>
    </BackDrop>
  );
};

export default Gallery;
