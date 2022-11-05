
import React, { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel';
import { toast } from 'react-toastify';
import { IconButton, Loader } from 'rsuite';
import { useAxios } from '../../../hooks/useAxios';
import { CustomIcon } from '../gallery.styles';

const GalleryCarousel = (props) => {
  const {files} = props;
  const {response,error,loading} = useAxios({url:files,method:'GET',auto:true});
  const [slide,setSlide] = useState(0)

  useEffect(() => {
    if (!loading){
      if(error){
        console.log(error)
        toast.error('An error ocurred while retrieving the images')
      }
    }
  },
  [response,error,loading])

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
    <>
      <IconButton
        style={{
          left: 0,
          position:'absolute',
          top: "45%",
          zIndex: 15,
        }}
        icon={<CustomIcon icon="angle-left" />}
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
        icon={<CustomIcon icon="angle-right" />}
        appearance="subtle"
        circle
        size="lg"
        onClick={next}
      />
        
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
          {response?.map(({data},index) => (
            <div key={index} >

              <img src={data} style={{maxWidth:'100%',width:'auto',maxHeight:'90vh'}}/>
            </div>
        
          ))}
        </Carousel>
        {loading && <Loader size="md" center />}
    </>
  )
}

export default GalleryCarousel