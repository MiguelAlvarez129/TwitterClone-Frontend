import React, { useState, useEffect } from "react";
import "../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";
import { IconButton, Icon, Loader} from "rsuite";
import User from "../../shared/User"
import Tweet from "../../shared/Tweet"
import { useSelector } from "react-redux";
import { likePost } from "../../controllers/axios";
import { useHistory, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import RegisterMessage from "../../shared/RegisterMessage";
import {BackDrop,  GalleryContainer, BottomToolbar} from "../../shared/styles"

const Gallery = (props) => {
  const [slide, setSlide] = useState(0);
  const userId = useSelector((state) => state.user.user._id);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [drawer,setDrawer] = useState(true)
  const [data, setData] = useState([]);
  const { image, content, date, username } = data;
  const [images, setImages] = useState([]);
  const [like, setLike] = useState(0);
  const { tweetId, profile } = useParams();
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    console.log(location,"GALLERY")
    const cancel = axios.CancelToken.source();
    document.body.style.overflow = "hidden";
    axios
      .post("/app/getSinglePost", { tweetId, username: profile })
      .then((res) => {
        const date = res.data.date.slice(0,11)
        setData([{...res.data,files:[]}]);
        setLike(res.data.likes.quantity);
        setImages(res.data.files.map((e) => null));
        const { files } = res.data;
        axios.post("/app/testposts", { files }).then((res) => {
          console.log("IT WORKS!");
          setImages(res.data);
          setLoading(false);
        });
      });

    return () => {
      document.body.style.overflow = "auto";
      cancel.cancel();
    };
  }, [tweetId]);

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

  const updateLikes = (e) => {
    e.stopPropagation();
    if (userId == null) {
      open();
    } else {
      const data = { tweetId, userId };
      likePost(data, setLike);
    }
  };

  const toggle = (e) => {
    e.stopPropagation();
    setDrawer(!drawer);
  };

  const open = () => {
    setShow(true);
  };

  const close = (e) => {
    e.stopPropagation();
    setShow(false);
  };

  const back = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  const next = (e) => {
    e.stopPropagation();
    setSlide((index) => index + 1);
  };

  const prev = (e) => {
    e.stopPropagation();
    setSlide((index) => index - 1);
  };

  const updateSlide = (index) => {
    if (index !== slide) setSlide(index);
  };

  return (
    <BackDrop onClick={back}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          height: "100%",
        }}
      >
        <GalleryContainer style={{marginTop:10}}>
          <IconButton
            style={{position:'absolute',zIndex:10,top:0}}
            icon={<Icon icon="close" />}
            appearance="subtle"
            circle
            size="lg"
            onClick={back}
          />
          <IconButton
            style={{
              left: 0,
              position:'absolute',
              top: "45%",
              zIndex: 15,
            }}
            icon={<Icon icon="angle-left" />}
            appearance="subtle"
            circle
            size="lg"
            onClick={prev}
          />
          <IconButton
            style={{
              position: "absolute",
              right: 0,
              top: "45%",
              zIndex: 10,
            }}
            icon={<Icon icon="angle-right" />}
            appearance="subtle"
            circle
            size="lg"
            onClick={next}
          />
          {loading && <Loader center size="lg" />}
        
            {images[0] && (
              <Carousel
                className="container"
                showStatus = {false}
                renderArrowPrev={() => null}
                renderArrowNext={() => null}
                renderThumbs={() => null}
                renderIndicator={() => null}
                onChange={(index) => updateSlide(index)}
                selectedItem={slide}
                
              >
                {images.map((e,index) => (
                  <div key={index} >

                    <img src={e && e.pic} style={{maxWidth:'100%',width:'auto',maxHeight:'90vh'}}/>
                  </div>
              
                ))}
              </Carousel>
            )}
         
          <BottomToolbar>
            <IconButton
              icon={<Icon icon="comment" />}
              size="lg"

              onClick={e => openComment(e)}
              circle
            />
            <IconButton
              icon={<Icon icon="retweet" />}
              size="lg"
            
              circle
            />
            <div>
            <IconButton
              icon={<Icon icon="heart" />}
              size="lg"
              
              onClick={(e) => updateLikes(e)}
              circle
            />
            <b>{like}</b>
            </div>
            
            <IconButton
              icon={<Icon icon="share" />}
              size="lg"

              circle
            />
          </BottomToolbar>
         {drawer ? 
          <IconButton
              style={{
                position: "absolute",
                top: 0,
                right: 0,
              }}
              icon={<Icon icon="angle-double-right" />}
              size="lg"
              appearance="subtle"
              circle
              onClick={toggle}
            />
            :
            <IconButton
              style={{
                position: "absolute",
                top: 0,
                right: 0,
              }}
              icon={<Icon icon="angle-double-left" />}
              size="lg"
              appearance="subtle"
              circle
              onClick={toggle}
            />}
          
      </GalleryContainer>
      <div
          style={{
            background: "white",
            height: "100%",
            width: 400,
            zIndex: 20,
            display: drawer ? "block" : "none"
          }}
        > 
        {data && data.map((e,index) => <Tweet key={index} {...e} big/>)}
      </div> 
     
      <RegisterMessage show={show} close={(e) => close(e)} />
      </div>
    </BackDrop>
  );
};

export default Gallery;
