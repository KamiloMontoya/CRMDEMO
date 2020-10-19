import {IActionState,REDIRECT,RedirectActionTypes} from './types'

const initialState : IActionState={
    redirect:false,
    url_logout:'',
}

export function actionsReducer(
  state = initialState,
  action: RedirectActionTypes,
){
  switch (action.type) {
    case REDIRECT:
        return{
          ...state,
          redirect:action.payload.redirect,
          url_logout:action.payload.url_logout,
        }
    default:
      return state
  }
}
