import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    role:null,
    name:null,
    token:null,
    id:null,
};

export const artistAuthSlice = createSlice({
    name:"artistAuth",
    initialState,
    reducers:{
        artistLogin:(state,action)=>{
            state.role = action.payload.role;
            state.name = action.payload.name;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        artistLogout: (state)=>{
            state.role = null;
            state.name = null;
            state.token = null;
            state.id = null;
        }
    }
})

export const {artistLogin, artistLogout} = artistAuthSlice.actions;

export default artistAuthSlice.reducer