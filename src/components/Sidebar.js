import React, {useState, useEffect, useRef} from "react";
import {
  Logo,
  Sidemenu,
  Sideoption,
  TweetButton,
  WhiteBackground,
  UserContainer,
  Stack,
} from "../shared/styles";
import { Link, useHistory, useLocation  } from "react-router-dom";
import {
  Icon,
  Dropdown,
  Whisper,
  Popover,
  Badge,
  Loader
} from "rsuite";
import { setAuthToken } from "../controllers/setAuth";
import { logOut } from "../redux/slices/authSlice";
import User from "../shared/User";
import { useSelector, useDispatch} from "react-redux";
import RegisterMessage from "../shared/RegisterMessage"
import socket from "../controllers/ioControllers" 
import {useAuth} from "../hooks/useAuth"
import { Title } from "./Tweet/tweet.styles";
const Sidebar = () => {
  const {user:{fullname,username},isAuth:auth} = useAuth()
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [noti,setNoti] = useState([])
  const [loading,setLoading] = useState(true)
  const [list,setList] = useState([])
  const ref = useRef(null)

  const invertedIcons = (icon) =>{
    const icons = [
      "bell","envelope"
    ]
    const newIcon = icons.find(e => icon.includes(e))
    return !!newIcon ? {icon:newIcon} : {icon}
  }

  const options = auth ? [
    {to:`/${username}`,text:"'Profile'",icon:"avatar"},
    {to:``,text:"'Messages'",icon:"envelope-o"},
    {to:`/notifications`,text:"'Notifications'",icon:"bell-o"},
  ] : 
  [
    {to:`/register`,text:"'Register'",icon:"edit"},
    {to:`/login`,text:"'Login'",icon:"sign-in"},
  ]

  // useEffect(()=>{
  //   socket.on("notification",(value)=>{
  //     setNoti(value);
  //   })

  //   return ()=>{
  //     socket.off("notification")
  //   }
  // },[])


  useEffect(() => {
    setList(
      options.map(e => {
        if (e.to == location.pathname) return {...e,selected:true,...invertedIcons(e.icon)}
        else return {...e,selected:false} 
      })
    )
    setLoading(false)
  }, [location.key,auth])



  const Menu = ({onSelect,...rest}) => {
    return (
    <Popover {...rest} >
      <Dropdown.Menu onSelect={onSelect} style={{width:300}}>
        <Dropdown.Item onClick={() => history.push(`/${username}`)}>
        <Stack>
          <User small username={username}/>
            <Stack direction={"column"}>
            <Title>
              {fullname}
            </Title>
            <p>
            @{username}
            </p>
            </Stack>
          </Stack>
        </Dropdown.Item>
        <Dropdown.Item onClick={logout}>
        Log out @{username}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
    )
  }
  
  const openTweet = (e) => {
    e.stopPropagation()
    history.push({
      pathname:`/compose/tweet`,
      state:{
        background:location,
      }
    })
    
  }

  const handleSelect = () =>{
    ref.current.hide()
  }

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(false);
    dispatch(logOut());

  };

  const MenuContents = () =>{
    return (<>
      <Link to="/home" style={{ textDecoration: "none" }}>
        <Logo/>
      </Link>

      {list.map(({icon,to,text,selected},index) => {
        return (<Link
        to={to}
        key={index}
        style={{ textDecoration: "none", color: "black" }}
      >
        <Sideoption text={`${text}`} selected={selected} >
          { text === "'Notifications'" && !!noti && <Badge content={noti} style={{position:"absolute",left:10}}/>}
          <Icon icon={icon} size="2x" />
        </Sideoption> 
      </Link>)
      })}

      <TweetButton onClick={e => openTweet(e)} icon={<Icon icon='edit'/>} responsive>
        Tweet 
      </TweetButton>

      <UserContainer>
    
        {auth && (
          <Whisper
          placement="topStart"
          trigger="click"
          triggerRef={ref}
          speaker={<Menu onSelect={handleSelect} />}
          >   
          <Sideoption flex user>
          <Stack>
          <User small username={username}/>
            <Stack direction={"column"}>
            <Title>
              {fullname}
            </Title>
            <p>
            @{username}
            </p>
            </Stack>
          </Stack>
          </Sideoption>
          </Whisper>
        )}
      </UserContainer>
    </>
      
    )
  }

  return  (
    <Sidemenu>
       <MenuContents/>
      {loading && <WhiteBackground width="310">
        <Loader size="md" center backdrop/>
      </WhiteBackground>}
    </Sidemenu>
  );
};

export default Sidebar;
