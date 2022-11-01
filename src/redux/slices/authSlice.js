import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  isAuth: false,
  user:{},
}


export const userSlice = createSlice({
  name:'user',
  initialState,
  reducers:{
    setCurrentUser:(state,action) =>{
      state.user = action.payload;
      state.isAuth = true;
    },
    setAccessToken:(state,action) => {
      state.user = {...state.user,accessToken: action.payload}
    },
    logOut:(state)=>{
      state.user = {};
      state.isAuth = false;
    },
    updateUser:(state,action)=>{
      const {file, fullname} = action.payload;
      state.user= {...state.user,fullname,file};
    }
  }
})


export const {setCurrentUser,logOut,setAccessToken,updateUser} = userSlice.actions;
export const getUser = (state) => state.user

export default userSlice.reducer