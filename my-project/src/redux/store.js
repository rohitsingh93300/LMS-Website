// import { configureStore } from "@reduxjs/toolkit"
// import authSlice from './authSlice'

// const store = configureStore({
//       reducer:{
//         auth:authSlice
//       }
// })

// export default store;


import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import courseSlice from "./courseSlice"
import lectureSlice from "./lectureSlice"
// import jobSlice from "./jobSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import companySlice from "./companySlice";
// import applicationSlice from "./applicationSlice";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  const rootReducer = combineReducers({
    auth:authSlice,
    course:courseSlice,
    lecture:lectureSlice
  })
  const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
});
export default store;