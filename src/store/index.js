import { configureStore } from '@reduxjs/toolkit'
import todosSlice from './slices/todoSlice'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './slices/rootReducer';


const persistConfig = {
    key: 'persistTodo',
    storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default configureStore({
    reducer: {
        todoList: todosSlice
    },
})