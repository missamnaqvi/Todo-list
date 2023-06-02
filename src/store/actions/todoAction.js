import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNotes, fetchTodo } from "../api/todoapis";

export const getTodos = createAsyncThunk('todo/getTodo', async () => {
    let { data } = await fetchTodo()
    return data
})
export const getNotes=createAsyncThunk('notes/getNotes',async(token)=>{
    let{data}=await fetchNotes(token)
    return data
})