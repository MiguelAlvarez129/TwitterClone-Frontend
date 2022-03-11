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
  }
})


export const {updateDone,updatePosts} = postSlice.actions;

export default postSlice.reducer