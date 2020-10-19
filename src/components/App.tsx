//@import dependencies
import React from 'react'

import {persistor, store} from 'app_storage/redux-storage'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
//@end

//@import styles
import './App.css'
//@end

//@import layouts
import MasterLayout from './layouts/master'
//@end

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <MasterLayout />
      </PersistGate>
    </Provider>
  )
}

export default App
