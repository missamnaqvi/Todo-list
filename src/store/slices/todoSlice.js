import { createSlice } from "@reduxjs/toolkit";
import { getNotes, getTodos } from "../actions/todoAction";

const initialState = {
    todos: [],
    userNotes:[],
    error: null,
    loading: false,
};

export const todosSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            /**
             * Get All Todos
             */
            .addCase(getTodos.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(getTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getNotes.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.userNotes = action.payload;
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default todosSlice.reducer;
