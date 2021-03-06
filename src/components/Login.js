import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "../controllers/axios";
import { Input } from "../shared/styles";
import { FlexboxGrid, Panel, Col, Button, Grid, Row, Icon, Tag, Loader } from "rsuite";
import { useDispatch } from "react-redux";
import { BackgroundImg } from "../shared/styles";



const Login = (props) => {
  const { register, handleSubmit, errors, setValue } = useForm({defaultValues:{username:"@"}});
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading,setLoading] = useState(false)
  const onSubmit = (e) => {
      setLoading(true)
      loginUser(e, history, dispatch, setLoading);

  };

  return (
    <BackgroundImg>
      <FlexboxGrid align="middle" justify="center" style={{ height: "75vh" }}>
        <FlexboxGrid.Item
          componentClass={Col}
          colspan={24}
          sm={16}
          lg={8}
          md={10}
        >
          <Panel
            bordered
            shaded
            bodyFill
            style={{ padding: "25px 0", background: "white" }}
          >
            <Grid fluid>
              <Row>
                <Col xsOffset={2} xs={20}>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <p>
                      {" "}
                      <Icon icon="home" /> Go back to the homepage
                    </p>
                  </Link>
                  <h2>Login</h2>
                  <p>
                    Don't have an account yet?{" "}
                    <Link to="/register" style={{ textDecoration: "none" }}>
                      Register
                      <Icon icon="edit" />
                    </Link>
                  </p>
                </Col>
              </Row>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col
                    xsOffset={1}
                    xs={9}
                    smOffset={2}
                    sm={6}
                    style={{ textAlign: "center", paddingTop: 20 }}
                  >
                    <h5>Username</h5>
                  </Col>
                  <Col xs={14}>
                    <Input
                      fluid
                      placeholder="Username"
                      name="username"
                      onChange={(e) => {
                        if (!e.target.value.length){
                          setValue("username","@")
                        } else {
                          setValue("username",e.target.value)
                        }
                      }}
                      error={errors.username}
                      ref={register({ required: "Username is required" })}
                    />
                    {errors.username && (
                      <Tag color="red">{errors.username.message}</Tag>
                    )}
                  </Col>

                  <Col
                    xsOffset={2}
                    xs={8}
                    smOffset={2}
                    sm={6}
                    style={{ textAlign: "center", paddingTop: 20 }}
                  >
                    <h5>Password</h5>
                  </Col>

                  <Col xs={14}>
                    <Input
                      type="password"
                      fluid
                      placeholder="Password"
                      name="password"
                      error={errors.password}
                      ref={register({
                        required: "Password is required",
                      })}
                    />

                    {errors.password && (
                      <Tag color="red">{errors.password.message}</Tag>
                    )}
                  </Col>

                  <Col xsOffset={7} xs={10} smOffset={2} sm={6}>
                    <Button
                      type="submit"
                      color="cyan"
                      size="lg"
                      block
                      appearance="ghost"
                    >
                      Log in
                    </Button>
                  </Col>
                </Row>
              </form>
            </Grid>
          </Panel>
        {loading && <Loader size="md" center backdrop/>}
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={24}></FlexboxGrid.Item>
      </FlexboxGrid>
    </BackgroundImg>
  );
};

export default Login;
