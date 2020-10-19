//@import dependencies
import {combineReducers} from 'redux'
//@end

//@import reducers
import {actionsReducer} from 'app_reducers/actions/reducers'
import {appReducer} from 'app_reducers/app/reducers'
import {authReducer} from 'app_reducers/auth/reducers'
import {LOGOUT} from 'app_reducers/auth/types'
//@end

// @INFO: Convinar reducers
const reducers = combineReducers({
  auth: authReducer,
  actions: actionsReducer,
  app: appReducer,
})

const rootReducer = (state: any, action: any) => {
  if (action.type === LOGOUT) {
    state = {
      actions: state.actions,
    }
  }
  return reducers(state, action)
}

export type IRootState = ReturnType<typeof rootReducer>

export default rootReducer
