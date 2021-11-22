import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  update: false,
}


export const postSlice = createSlice({
  name:'posts',
  initialState,
  reducers:{
    updateDone:(state) =>{
      state.update = false;
    },
    updatePosts:(state)=>{
      state.update = true;
    },
    // logIn:(state,action)=>{
    //   state.isAuth = true;
    // },
    // updateImage:(state,action)=>{
    //   state.user.file = action.payload;
    // }
  }
})


export const {updateDone,updatePosts} = postSlice.actions;

export default postSlice.reducer