import { AuthActionTypes, IAppState, SCREEN_MODE } from './types'

const initialState: IAppState = {
  screenMode: '',
}

export function appReducer(
  state = initialState,
  action: AuthActionTypes,
): IAppState {
  switch (action.type) {
    case SCREEN_MODE: {
      return {
        ...state,
        screenMode: action.payload,
      }
    }
    default:
      return state
  }
}
