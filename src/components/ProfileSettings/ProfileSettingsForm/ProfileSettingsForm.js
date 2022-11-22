import React from 'react'

const ProfileSettingsForm = () => {
  return (
    Grid
  )
  // return (
  //   <Grid fluid>
  //   <Row>
  //   <Col xs={2} xsPull={1}>
  //   <IconButton
      
  //     appearance="subtle"
  //     icon={<Icon icon="close" style={{ color: "dodgerblue" }} />}
  //     circle
  //     size="lg"
  //     onClick={back}
  //   />

  //   </Col>
  //   <Col xs={5} xsPush={18}>
  //   <TweetButton small onClick={()=>ref2.current.click()} disabled={loading} >
  //     Save
  //   </TweetButton>
  //   </Col>
  //   </Row>
  //   <Divider style={{ margin: "0px -20px 20px" }} />
  //     <Row>
  //       <Bg image={bg} bottom>
  //         <FlexCenter>
  //           <IconButton
  //             onClick={() => ref.current.click()}
  //             appearance="subtle"
  //             icon={<Icon icon="camera" />}
  //             circle
  //             size="lg"
  //           />
  //           <input
  //             accept=".jpg, .jpeg, .png"
  //             style={{ display: "none" }}
  //             type="file"
  //             ref={ref}
  //             onChange={(e) => onChange(e,"bg")}
  //           />
  //         </FlexCenter>
  //       </Bg>
  //       <Col xsOffset={1} xs={10}>

  //     <input
  //       accept=".jpg, .jpeg, .png"
  //       name="file"
  //       style={{display:"none"}}
  //       type="file"
  //       ref={ref3}
  //       onChange={(e) =>{ onChange(e,"pic")}}/>
    
  //       <ProfilePic hidden src={pic} onClick={()=>ref3.current.click()}/>
 
  //       </Col>

  //     </Row>
  //       <form onSubmit={handleSubmit(onSubmit)}>
  //       <CustomRow>

  //         <Col xs={4}>
  //           <label htmlFor="fullname">
  //             <h5 style={{marginTop:18}}>Fullname</h5>
  //           </label>
  //         </Col>
  //         <Col xs={19}>
  //           <Input
  //           fluid
  //           name="fullname"
  //           error={errors.fullname}
  //           ref={register({ required: "fullname can't be blank" })}
  //            />
  //         </Col>
  //         <Col xsOffset={4}>
  //         {errors.fullname && (
  //               <Tag color="red">{errors.fullname.message}</Tag>
  //             )}
  //         </Col>
  //       </CustomRow>
  //       <CustomRow>
  //         <Col xsOffset={2} xs={2}>
  //           <label htmlFor="bio">
  //             <h5>Bio</h5>
  //           </label>
  //         </Col>
  //         <Col xs={19}>
  //           <TextArea
  //             name="bio"
  //             border
  //             fontSmall
  //             maxLength="150"
  //             placeholder="What's on your mind?"
  //             ref={register}
  //           />
  //         </Col>
  //       </CustomRow>
  //     <button style={{display:"none"}} ref={ref2} type="submit"/>
  //   </form>
  //     </Grid>
  // )
}

export default ProfileSettingsForm