import React, {useRef, useState} from 'react'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Col, Divider, Grid, Icon, IconButton, Row, Tag } from 'rsuite';
import ProfilePic from '../../../shared/ProfilePic';
import { Input, Stack, TextArea, TweetButton } from '../../../shared/styles';
import { Bg } from '../profileSettings.styles';

const ProfileSettingsForm = (props) => {
  const {onSubmit} = props;
  const history = useHistory();
  const bg = useRef();
  const profile = useRef();
  const [data, setData] = useState({});
  const { register , reset, handleSubmit, errors} = useForm();
  
  useEffect(()=>{
    reset({
      ...data
    })
  },[data])

  const upload = async (event,key) => {
    const file = event.target.files[0]
    console.log(file)
    if (event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        setData(state =>
          ({
            [key]:{image:reader.result,file},...state
          })
        )};

      reader.onerror = () =>{
        toast.error('An error ocurred while loading the images')
      }
    }
      
  };
 
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack justify={'space-between'} align={'center'}>
      <IconButton
          style={{ margin: "-15px -15px 0px" }}
          appearance="subtle"
          icon={<Icon icon="close" style={{ color: "dodgerblue" }} />}
          circle
          size="lg"
          onClick={()=> history.goBack()}
        />
        <TweetButton small type="submit" style={{marginBottom:10}} >
        Save
      </TweetButton>
      </Stack>
    <Divider style={{ margin: "0px -20px 20px" }} />
    <Grid fluid>
      <Row>
        <Bg image={data.bg?.image} bottom>
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
          <ProfilePic hidden src={data.profile?.image} onClick={() => profile.current.click()}/>
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <label htmlFor="fullname">
            <h5>
              Fullname
            </h5>
          </label>
        </Col>
        <Col xs={20}>
          <Input fluid name="fullname" placeholder="Fullname" error={errors.fullname} ref={register({required: "fullname can't be blank" })}/>
        </Col>
          {errors.fullname && (
        <Col xsOffset={4}>
                <Tag color="red">{errors.fullname.message}</Tag>
          </Col>
              )}
      </Row>
      <Row>
        <Col xs={4}>
            <h5>
              Bio
            </h5>
        </Col>
        <Col xs={20}>
        <TextArea
          name="bio"
          border
          fontSmall
          maxLength="150"
          placeholder="What's on your mind?"
          ref={register}
          />
        </Col>
      </Row>
        {/* <form onSubmit={handleSubmit(onSubmit)}>
        <CustomRow>
        
        <Col xs={4}>
        <label htmlFor="fullname">
        <h5 style={{marginTop:18}}>Fullname</h5>
        </label>
        </Col>
        <Col xs={19}>
        <Input
        fluid
        name="fullname"
        error={errors.fullname}
        ref={register({ required: "fullname can't be blank" })}
        />
        </Col>
        <Col xsOffset={4}>
        {errors.fullname && (
          <Tag color="red">{errors.fullname.message}</Tag>
          )}
          </Col>
          </CustomRow>
          <CustomRow>
          <Col xsOffset={2} xs={2}>
          <label htmlFor="bio">
          <h5>Bio</h5>
          </label>
          </Col>
          <Col xs={19}>
          <TextArea
          name="bio"
          border
          fontSmall
          maxLength="150"
          placeholder="What's on your mind?"
          ref={register}
          />
          </Col>
          </CustomRow>
          <button style={{display:"none"}} ref={ref2} type="submit"/>
        </form> */}
      </Grid>
      </form>
  )
}

export default ProfileSettingsForm