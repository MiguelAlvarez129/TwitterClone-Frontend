import React from 'react'
import {Button, Icon} from 'rsuite'


const Preview = (props) =>{
  return (
    <div style={{display:'inline-block',margin:'5px 4px',borderRadius:5,overflow:'hidden'}}>
      <Button appearance="ghost" color='red'  size='xs' 
        onClick={()=>{
          props.del(props.id)
        }}
       style={{position:'absolute',zIndex:5,border:'none',margin:'-3px 0px 0px 27px'}} 
       circle="true" > 
      <Icon icon='times-circle'/> 
      </Button>
      <img src={props.src} width='50' height='50' />
    </div>
  )
}

export default Preview