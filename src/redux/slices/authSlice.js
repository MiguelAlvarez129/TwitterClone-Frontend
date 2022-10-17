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
    logOut:(state)=>{
      state.user = {};
      state.isAuth = false;
    },
    logIn:(state,action)=>{
      state.isAuth = true;
    },
    updateUser:(state,action)=>{
      const {file, fullname} = action.payload;
      state.user= {...state.user,fullname,file};
    }
  }
})


export const {setCurrentUser,logOut,logIn,updateUser} = userSlice.actions;
export const getUser = (state) => state.user

export default userSlice.reducer