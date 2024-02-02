import { createStore, combineReducers, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import TaskReducer from '../Component/TaskReducer'

export default function configureStore() {
    const taskPersistConfig = {
        key: 'task',
        storage: storage,
        whitelist: ["taskList"],
        debug: true,
    }

    const middleWare = applyMiddleware(thunk)
    const rootReducer = combineReducers({
        taskStore: persistReducer(taskPersistConfig, TaskReducer),
    })
    let store = createStore(rootReducer, middleWare)
    let persistor = persistStore(store)
    return { store, persistor }
}


