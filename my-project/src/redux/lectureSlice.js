import { createSlice } from "@reduxjs/toolkit";

const lectureSlice = createSlice({
    name:"lecture",
    initialState:{
        loading:false,
        lecture:null,
    },
    reducers:{
        //actions
        setLoading:(state, action) => {
            state.loading = action.payload;
        },
        setLecture:(state, action) => {
            state.lecture = action.payload;
        },
      
    }
});
export const {setLoading, setLecture} = lectureSlice.actions;
export default lectureSlice.reducer;