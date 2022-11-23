import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { Loader } from 'rsuite';
import { ReplyDiv } from '../styles';

const ModalDiv = ({children,files,loading}) => {
  const ref = useRef();
  const [overflow,setOverflow] = useState(false)
  useEffect(()=>{
    const resizeFunction = ()=>{
      if (ref.current.scrollHeight > window.innerHeight){
        setOverflow(true)
      } else {
        setOverflow(false)
      }
    }
    window.addEventListener("resize",resizeFunction)
    return () => window.removeEventListener('resize',resizeFunction)
  },[])

  return (
    <ReplyDiv $overflow={overflow} files={files} onMouseDown={(e) => e.stopPropagation()}>
      <div ref={ref}>
        {children}
      </div>
    {loading && <Loader center backdrop size="md" />}
    </ReplyDiv>
  )
}

export default ModalDiv