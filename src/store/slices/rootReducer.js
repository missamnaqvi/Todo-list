import { createSlice } from "@reduxjs/toolkit";
import { getTodos } from "../actions/todoAction";

const initialState = {
    count: 0,
    // error: null,
    // loading: false,
};

export const rootReducer = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        
    },
    // extraReducers: (builder) => {
    //     builder
    //         /**
    //          * Get All Todos
    //          */
    //         .addCase(getTodos.pending, (state, action) => {
    //             state.loading = true;
    //         })
    //         .addCase(getTodos.fulfilled, (state, action) => {
    //             state.loading = false;
    //             state.todos = action.payload;
    //         })
    //         .addCase(getTodos.rejected, (state, action) => {
    //             state.loading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export default rootReducer.reducer;
