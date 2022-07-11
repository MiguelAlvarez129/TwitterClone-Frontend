import React, {useState, useEffect, useRef} from "react";
import {
  Logo,
  Sidemenu,
  Sideoption,
  TweetButton,
  WhiteBackground,
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
const Sidebar = () => {
  const [show,setShow] = useState(false)
  const user = useSelector((state) => state.user.user);
  const auth = useSelector((state) => state.user.isAuth);
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
    {to:`/${user.username}`,text:"'Profile'",icon:"avatar"},
    {to:``,text:"'Messages'",icon:"envelope-o"},
    {to:`/notifications`,text:"'Notifications'",icon:"bell-o"},
  ] : 
  [
    {to:`/register`,text:"'Register'",icon:"edit"},
    {to:`/login`,text:"'Login'",icon:"sign-in"},
  ]

  useEffect(()=>{
    socket.on("notification",(value)=>{
      setNoti(value);
    })

    return ()=>{
      socket.off("notification")
    }
  },[])


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
        <Dropdown.Item>
        <User hidden image={user.file} username={user.username} small />
        </Dropdown.Item>
        <Dropdown.Item onClick={logout}>
        Log out @{user.username}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Popover>
    )
  }
  
  const openTweet = (e) => {
    e.stopPropagation()
    if (!auth){
      open()
    } else {
      history.push({
        pathname:`/compose/tweet`,
        state:{
          background:location,
        }
      })
    }
  }

  const handleSelect = () =>{
    ref.current.hide()
  }

  const open = () =>{
    setShow(true)
  }

  const close = () =>{
    setShow(false)
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

      <div style={{ margin: "auto 0px 20px",width:"80%" }}>
    
        {auth && (
          <Whisper
          placement="topStart"
          trigger="click"
          triggerRef={ref}
          speaker={<Menu onSelect={handleSelect} />}
          >   
          <Sideoption flex>
              <User hidden image={user.file} username={user.username} fullname={user.fullname} small disabled /> 
              <Icon icon="more" className="responsive-icon"/>
          </Sideoption>
          </Whisper>
        )}
      </div>
    </>
      
    )
  }

  return  (
    <Sidemenu>
  
      <RegisterMessage show={show} close={close}/>
       <MenuContents/>
      {loading && <WhiteBackground width="310">
        <Loader size="md" center backdrop/>
      </WhiteBackground>}
    </Sidemenu>
  );
};

export default Sidebar;
