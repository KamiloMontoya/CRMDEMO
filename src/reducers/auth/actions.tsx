import { IUser } from 'app_utils/types/userTypes'
import { AuthActionTypes, LOGIN, LOGOUT, UPDATE_TOKEN } from './types'

export function login(user: IUser): AuthActionTypes {
  return {
    type: LOGIN,
    payload: user,
  }
}

export function logout(): AuthActionTypes {
  return {
    type: LOGOUT,
    payload: null,
  }
}

export function updateToken(token: string): AuthActionTypes {
  return {
    type: UPDATE_TOKEN,
    payload: token,
  }
}
