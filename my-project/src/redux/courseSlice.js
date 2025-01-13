import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name:"course",
    initialState:{
        loading:false,
        course:null,
    },
    reducers:{
        //actions
        setLoading:(state, action) => {
            state.loading = action.payload;
        },
        setCourse:(state, action) => {
            state.course = action.payload;
        },
      
    }
});
export const {setLoading, setCourse} = courseSlice.actions;
export default courseSlice.reducer;