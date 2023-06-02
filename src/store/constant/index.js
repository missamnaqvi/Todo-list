const URL = 'http://localhost:9000'

const todoApi = {
    getTodo: URL,
    usernote:`${URL}/userdata`

}

export const path = {
    root: '/',
    ...todoApi
}