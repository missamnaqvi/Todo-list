import axios from "axios"
import { path } from "../constant"

export const fetchTodo = () => {
    return axios.get(path.getTodo)
}
export const fetchNotes = (token) => {
    return axios.get(path.usernote, { token })
}