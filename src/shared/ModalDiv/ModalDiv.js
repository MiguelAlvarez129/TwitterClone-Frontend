import React from 'react'
import { useEffect, useRef, useState } from 'react';
import { Loader } from 'rsuite';
import { ReplyDiv } from '../styles';

const ModalDiv = ({children,files,loading}) => {
  const ref = useRef();
  const [overflow,setOverflow] = useState(false)
  useEffect(()=>{
    const resize = new ResizeObserver(() => {
      if (ref.current.scrollHeight > window.innerHeight){
        setOverflow(true)
      } else {
        setOverflow(false)
      }
    })
    resize.observe(ref.current)
    resize.observe(document.body)
    return () => resize.disconnect()
  },[])

  return (
    <ReplyDiv $overflow={overflow} files={files} ref={ref} onMouseDown={(e) => e.stopPropagation()}>
      {children}
    {loading && <Loader center backdrop size="md" />}
    </ReplyDiv>
  )
}

export default ModalDiv