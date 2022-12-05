import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  keys:{}
}


export const axiosSlice = createSlice({
  name:'axios',
  initialState,
  reducers:{
    setKey:(state,action) =>{
      state.keys[action.payload] = false;
    },
    invalidateKey:(state,action) => {
      state.keys[action.payload] = true;
      
    },
    deleteKey:(state,action) =>{
      delete state.keys[action.payload];
    }
  }
})


export const {setKey,invalidateKey,deleteKey} = axiosSlice.actions;
export const getKeys = (state) => state.axiosKeys.keys

export default axiosSlice.reducer