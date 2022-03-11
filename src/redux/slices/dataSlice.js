import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  data: {},
  paths:[],
}

export const dataSlice = createSlice({
  name:'data',
  initialState,
  reducers:{
    saveData:(state,action)=>{
      const {posts,paths} = action.payload
      state.data = {posts,...state.data};
      state.paths = [...paths]
    },
    clearData:(state)=>{
      state.data = {};
      state.paths = [];
    },
    setUserData: (state,action)=>{
      state.data = {userData:action.payload,...state.data}
    }
  }
})


export const {saveData,clearData,setUserData} = dataSlice.actions;

export default dataSlice.reducer