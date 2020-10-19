import { AuthActionTypes, IUserState, LOGIN, LOGOUT, UPDATE_TOKEN } from './types'

const initialState: IUserState = {
  user: null,
}

export function authReducer(
  state = initialState,
  action: AuthActionTypes,
): IUserState {
  switch (action.type) {
    case LOGIN:
      return {
        user: {
          ...state.user,
          ...action.payload,
        },
      }
    case LOGOUT:
      return {
        ...state,
        user: null,
      }
    case UPDATE_TOKEN: {
      return {
        user: {
          ...state.user,
          token: action.payload,
        },
      }
    }
    default:
      return state
  }
}
