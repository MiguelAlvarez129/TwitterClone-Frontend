import axios from "axios";
import { Alert } from "rsuite";
import { setAuthToken } from "./setAuth";
import {
  setCurrentUser,
  logIn,
  logOut,
  updateImage,
} from "../redux/slices/authSlice";
import {updateDone,updatePosts} from "../redux/slices/postSlice"
import { trackPromise } from "react-promise-tracker";
import { clearData } from "../redux/slices/dataSlice";
 
export const registerUser = async (user, history) => {
  try {
    const data = await axios.post("/app/register", user);
    history.push("/login");
    return data;
  } catch (error) {
    return error;
  }
};

export const loginUser = (user, history,dispatch, setLoading) => {
  return axios
    .post("/app/login", user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("token", token); 
      setAuthToken(token);
        trackPromise(
          axios
          .post("/app/auth")
          .then((res) => {
              dispatch(setCurrentUser(res.data))
              history.push("/home");
              Alert.success("You Have Logged in Succesfully", 5000);
          })
          .catch((err) => {
            console.log(err)}))
      })
    .catch((err) => { 
      console.log(err.response)
      setLoading(false)
      const { status } = err.response;
      let message = "";
      if (status === 404) {
        message = "Username not found";
      }
      if (status === 400) {
        message = "Wrong password";
      }
      Alert.error(message, 5000);
    });
};

export const authenticate = dispatch => {
  return axios
    .post("/app/auth")
    .then((res) => {
        dispatch(setCurrentUser(res.data))
    })
    .catch((err) => {
      console.log(err)
      if (err.response.status == 401) {
        if (localStorage.getItem("token")){
          Alert.warning("Your session has timed out", 5000);
        } 
        localStorage.removeItem("token");
        setAuthToken(false);
        localStorage.clear()
        dispatch(logOut());
      }
    });
};


export const getPosts = (id,) =>{
  return axios 
    
}

export const likePost = (data,dispatch) =>{
  return axios
    .post("/app/likePost",data)
    .then(res => {
      dispatch(clearData())
      dispatch(updatePosts())
    })
    .catch(err => console.log(err))
}

export const createPost = (dispatch,data) =>{
  return trackPromise(
    axios
      .post("/app/createPost", data)
      .then((res) => {
        console.log(res)
        Alert.success(res.data.message, 3000);
        dispatch(clearData())
        dispatch(updatePosts())
      })
      .catch((error) => {
        console.log(error)
        Alert.error("An error ocurred while tweeting", 3000);
      }),
    "images"
  );
}

export const createRetweet = (data,dispatch) =>{
    axios 
    .post("/app/retweet",data)
    .then((res)=> {
      Alert.success(res.data.message,3000);
      dispatch(clearData())
      dispatch(updatePosts())      
    })
}

