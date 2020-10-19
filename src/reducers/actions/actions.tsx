import {IActionState,REDIRECT} from './types'

export function redirect(redirect:IActionState){
  return {
    type:REDIRECT,
    payload: redirect,
  }
}
