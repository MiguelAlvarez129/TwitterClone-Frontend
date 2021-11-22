import React, {useState} from 'react'
import {Loader, Button, Icon} from 'rsuite'


const Preview = (props) =>{
  
  
  return (
    <div style={{display:'inline-block',margin:'5px 4px',borderRadius:5,overflow:'hidden'}}>
      {/* <div style={{height:50,width:50,background:'black',opacity:0.2,zIndex:10,position:'absolute',borderRadius:5}}>
       
      </div> */}
      <Button appearance="ghost" color='red'  size='xs' 
        onClick={()=>{
          props.del(props.id)
        }}
       style={{position:'absolute',zIndex:5,border:'none',margin:'-3px 0px 0px 27px'}} 
       circle > 
      <Icon icon='times-circle'/> 
      </Button>
      <img src={props.src} width='50' height='50' />
    </div>
  )
}

export default Preview