import { IUser } from 'app_utils/types/userTypes'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const UPDATE_TOKEN = 'UPDATE_TOKEN'

export interface IUserState {
  user: null | IUser
}
interface ILoginAction {
  type: typeof LOGIN
  payload: IUser
}

interface ILogoutAction {
  type: typeof LOGOUT
  payload: null
}

interface IUpdateTokenAction {
  type: typeof UPDATE_TOKEN
  payload: string
}

export type AuthActionTypes = ILoginAction | ILogoutAction | IUpdateTokenAction
