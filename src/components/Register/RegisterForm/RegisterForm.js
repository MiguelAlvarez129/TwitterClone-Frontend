import React, {useState} from 'react'
import { Input, Bubble } from "../../../shared/styles";
import { useForm } from "react-hook-form";
import {
  Col,
  Button,
  Row,
  Tag,
  Icon,
  Animation
} from "rsuite";
import {validateRegister} from "../../../controllers/validate"
const RegisterForm = (props) => {
  const { register, handleSubmit, errors, watch, setValue } = useForm({defaultValues:{username:"@"}});
  const [validations,setValidations] = useState(false)
  const {onSubmit} = props
  const {Bounce} = Animation
  const icon = (error) => {
    return error ? (
      <Icon
        style={{ color: "green", fontSize: 16, fontWeight: 700 }}
        icon="check"
      />
    ) : (
      <Icon
        style={{ color: "red", fontSize: 16, fontWeight: 700 }}
        icon="close"
      />
    );
  };

  const reValidate = () => {
    setValidations(validateRegister(watch("password")));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <Row>
      <Col
        xsOffset={1}
        xs={9}
        smOffset={2}
        sm={6}
        style={{ textAlign: "center", paddingTop: 20 }}
      >
        <h5>Fullname</h5>
      </Col>
      <Col xs={14}>
        <Input
          fluid
          name="fullname"
          error={errors.fullname}
          ref={register({ required: "Please enter your name" })}
        />
        {errors.fullname && (
          <Tag color="red">{errors.fullname.message}</Tag>
        )}
      </Col>
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
          name="username"
          error={errors.username}
          onChange={(e)=>{
            if(!e.target.value.length){
              setValue("username","@")
            } else {
              setValue("username",e.target.value)
            }
          }}
          ref={register(
            { required: "Username is required",
            pattern: {
              value: /^@[A-Za-z0-9]+$/,
              message: `Usernames can't contain special characters and
              can only contain a single @`,
            },
           })}
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
        <h5>Email</h5>
      </Col>
      <Col xs={14}>
        <Input
          fluid
          name="email"
          error={errors.email}
          ref={register({
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <Tag color="red">{errors.email.message}</Tag>
        )}
      </Col>
      {validations && (
        <Bounce in={!!validations.length}>
          <Col xs={20} smOffset={2} sm={20}>
            <Bubble visible>
              {validations.map((e, index) => (
                <p key={index}>
                  {" "}
                  {icon(e.valid)} {e.message}{" "}
                </p>
              ))}
            </Bubble>
          </Col>
        </Bounce>
      )}
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
          onFocus={reValidate}
          onChange={reValidate}
          type="password"
          fluid
          name="password"
          error={errors.password}
          ref={register({
            required: "Password is required",
            minLength: {
              value: 6,
              message:
                "Password must be at least 6 characters long",
            },
            validate: {
              specialChar: (value) =>
                /\W{2,}/.test(value) ||
                "Password must contain at least 2 special character",
              hasLetters: (value) =>
                /[A-Za-z]{2,}/.test(value) ||
                "Password must contain at least 2 letters",
              hasNumbers: (value) =>
                /\d{2,}/.test(value) ||
                "Password must contain at least 2 numbers",
            },
          })}
        />

        {errors.password && (
          <Tag color="red">{errors.password.message}</Tag>
        )}
      </Col>
      <Col
        xsOffset={2}
        xs={8}
        smOffset={2}
        sm={6}
        style={{ textAlign: "center", paddingTop: 20 }}
      >
        <h5>Confirm Password</h5>
      </Col>

      <Col xs={14}>
        <Input
          type="password"
          fluid
          name="password2"
          error={errors.password2}
          ref={register({
            required: "Password confirmation is required",
            validate: {
              passwordConfirm: (value) =>
                watch("password") == value ||
                "Both password must match",
            },
          })}
        />

        {errors.password2 && (
          <Tag color="red">{errors.password2.message}</Tag>
        )}
      </Col>
    </Row>
    <Row>
    <Col xsOffset={9} xs={6} >
        <Button
          type="submit"
          color="cyan"
          size="lg"
          block
          appearance="ghost"
        >
          Submit
        </Button>
      </Col>
    </Row>
  </form>
  )
}

export default RegisterForm