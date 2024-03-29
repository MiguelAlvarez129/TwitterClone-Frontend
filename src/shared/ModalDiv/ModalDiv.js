import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { Loader } from 'rsuite';
import { ReplyDiv } from '../styles';

const ModalDiv = ({children,files,loading}) => {
  const ref = useRef();
  const [overflow,setOverflow] = useState(false)
  useEffect(()=>{
    const resize = new ResizeObserver((entries) => resizeFunction())
    const resizeFunction = ()=> {
      if (ref.current.scrollHeight > window.innerHeight){
        setOverflow(true)
      } else {
        setOverflow(false)
      }
    }
    resize.observe(ref.current)
    window.addEventListener("resize",resizeFunction)
    return () => {
      window.removeEventListener('resize',resizeFunction)
      resize.disconnect()
    }
  },[])

  return (
    <ReplyDiv $overflow={overflow} onMouseDown={(e) => e.stopPropagation()}>
      <div ref={ref}>
        {children}
      </div>
    {loading && <Loader center backdrop size="md" />}
    </ReplyDiv>
  )
}

export default ModalDiv