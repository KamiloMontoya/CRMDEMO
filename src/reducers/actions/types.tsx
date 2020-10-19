export const REDIRECT = 'REDIRECT'

export interface IActionState{
  redirect: boolean
  url_logout:string
}

interface IRedirectAction{
  type: typeof REDIRECT
  payload:IActionState
}

export type RedirectActionTypes = IRedirectAction
