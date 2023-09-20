import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer, FLUSH, REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from "redux-persist"
import storage from 'redux-persist/lib/storage';


import { userAuthSlice } from './slice/user';
import { artistAuthSlice } from './slice/artist';
import { adminAuthSlice } from './slice/admin';


const UserPersistConfig = {key:"userAuth", storage,version:1 }
const artistPersistConfig = {key:"ProviderAuth", storage,version:1}
const adminPersistConfig = {key:"adminAuth",storage,version:1}


const userAuthPersistedReducer = persistReducer(UserPersistConfig,userAuthSlice.reducer)
const artistAuthPersistedReducer = persistReducer(artistPersistConfig,artistAuthSlice.reducer)
const adminAuthPersistedReducer = persistReducer(adminPersistConfig,adminAuthSlice.reducer)


export const store = configureStore({
    reducer :{
        user: userAuthPersistedReducer,
        artist: artistAuthPersistedReducer,
        admin:adminAuthPersistedReducer,

    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck:{
            ignoreActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER]
        },
    }),
});

export const persistor = persistStore(store)