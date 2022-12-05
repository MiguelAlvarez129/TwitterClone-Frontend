import React, {useState} from 'react'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Col, Divider, Grid, Icon, IconButton, Loader, Row, Tag } from 'rsuite';
import { useAuth } from '../../../hooks/useAuth';
import { useAxios } from '../../../hooks/useAxios';
import { Input, Stack, TextArea, TweetButton } from '../../../shared/styles';
import ProfileSettingsImages from '../ProfileSettingsImages/ProfileSettingsImages';

const ProfileSettingsForm = (props) => {
  const {user:{username}} = useAuth()
  const {initialValues} = props;
  const [data,setData] = useState({})
  const history = useHistory();
  const { register , reset, handleSubmit, errors} = useForm();
  const {response,error,loading,sendReq} = useAxios({url:'/app/update-profile-settings',multipart:true,method:'PATCH'})

  useEffect(()=>{
    if (!loading){
      if (response){
        toast.success('Your profile settings have been updated successfully')
        history.goBack();
  
      }
      if (error){
        toast.error('An error ocurred while trying to update your profile settings')
      }
    }
  },[response,loading,error])

  useEffect(()=>{
    const {fullname,bio} = initialValues;
    reset({
      fullname,bio
    })
  },[initialValues])

  const onSubmit = (values) =>{ 
    const form = new FormData()
    form.append('type','profile')
    form.append('fullname',values.fullname)
    form.append('bio',values.bio)
    if (data.profile?.file){
      form.append('profile',data.profile?.file)
    }
    if (data.bg?.file){
      form.append('bg',data.bg?.file)
    }
    sendReq(form)
  }
 
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
        <TweetButton small type="submit" style={{marginBottom:10}} disabled={loading} >
        Save
      </TweetButton>
      </Stack>
    <Divider style={{ margin: "0px -20px 20px" }} />
    <Grid fluid>
      <ProfileSettingsImages data={data} setData={setData} />
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
    </Grid>
    {loading && <Loader size="md" center backdrop />}
  </form>
  )
}

export default ProfileSettingsForm