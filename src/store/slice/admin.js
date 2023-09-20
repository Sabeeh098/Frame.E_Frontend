import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    role:null,
    name:null,
    token:null,
    id:null,
}

export const adminAuthSlice = createSlice({
    name:"adminAuth",
    initialState,
    reducers:{
        adminLogin:(state,action)=>{
            console.log(action.payload);
            state.role= action.payload.role;
            state.name = action.payload.name;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        adminLogout : (state)=>{
            state.role = null;
            state.name = null;
            state.token = null;
            state.id = null;
        }
    }
})
export const {adminLogin,adminLogout} = adminAuthSlice.actions
export default adminAuthSlice.reducer