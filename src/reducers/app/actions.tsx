import { AuthActionTypes, SCREEN_MODE } from './types'

export function changeScreenMode(mode: string): AuthActionTypes {
  return {
    type: SCREEN_MODE,
    payload: mode,
  }
}
