import { IHttpResponse } from 'app_utils/types/httpTypes'

export interface IUserPermissions {
  [keys: string]: string[]
}

export interface IUserProfile {
  first_name: string
  last_name: string
}

export interface IUserData {
  username: string
  profile: IUserProfile
  permissions?: IUserPermissions
  screen_mode?: string
}

export interface IAllianceData {
  default_style: string
  description: string
  modules: any
  name: string
  alug: string
  styles: any
  url_logout: string
  logo?: string
  favicon?: string
  i18n_configuration?: Array<any>
}

export interface IUser {
  data?: IUserData
  timestamp?: number
  token?: string
  alliance?: IAllianceData
  locale?: string
}

export interface IUserHttpResponse extends IHttpResponse {
  user: IUserData
  token: string
  alliance: IAllianceData
  locale?: string
}
