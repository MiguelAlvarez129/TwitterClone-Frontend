import React, {useRef} from 'react'
import { toast } from 'react-toastify'
import { Col, Icon, IconButton, Row } from 'rsuite'
import { useAuth } from '../../../hooks/useAuth'
import { Stack } from '../../../shared/styles'
import User from '../../../shared/User'
import { Bg } from '../profileSettings.styles'

const ProfileSettingsImages = (props) => {
  const {data,setData} = props;
  const {user:{username,profilePic}} = useAuth();
  const bg = useRef();
  const profile = useRef();
  const upload = async (event,key) => {
    const file = event.target.files[0]
    if (event.target.files[0]) {
      const reader = new FileReader();      
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        setData(state =>
          ({
            ...state,[key]:{image:reader.result,file}
          })
        )};
      reader.onerror = () =>{
        toast.error('An error ocurred while loading the images')
      }
    }
  };
  return (
    <Row>
    <Bg image={data?.bg?.image} bottom>
      <Stack justify={'center'} align={'center'}>  
        <IconButton
          onClick={() => bg.current.click()}
          appearance="subtle"
          icon={<Icon icon="camera" />}
          circle 
          size="lg"
          />
        <input 
          accept=".jpg, .jpeg, .png"
          style={{ display: "none" }}
          onChange={(e) => upload(e,'bg')}
          type="file"
          name="bg"
          id="bg"
          ref={bg}
          />
      </Stack>
    </Bg>
    <Col xsOffset={1} xs={10}>
    <input
      accept=".jpg, .jpeg, .png"
      name="file"
      style={{display:"none"}}
      onChange={(e) => upload(e,'profile')}
      ref={profile}
      type="file"/>
      <User username={username} small={false} image={data?.profile?.image} onClick={() => profile.current.click()}/>
    </Col>
  </Row>
  )
}

export default ProfileSettingsImages