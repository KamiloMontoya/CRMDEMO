export const SCREEN_MODE = 'SCREEN_MODE'

export interface IAppState {
  screenMode: string
}

interface IScreenModeAction {
  type: typeof SCREEN_MODE,
  payload: string
}

export type AuthActionTypes = IScreenModeAction
