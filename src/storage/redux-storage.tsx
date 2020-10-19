//@import dependencies
import {createStore} from 'redux'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
//@end

//@import reducers
import reducer from 'app_reducers/index'
//@end

const persistConfig = {
  key: 'root',
  storage,
  blacklist: [],
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(
  persistedReducer,
  // For Redux devtools
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)
const persistor = persistStore(store)

export {store, persistor}
