//@import store
import { redirect } from 'app_reducers/actions/actions'
import {
  login as loginAction,
  logout as logoutAction,
  updateToken,
} from 'app_reducers/auth/actions'
import { store } from 'app_storage/redux-storage'
//@end

//@import utils
import { Http, HttpCustomStructure } from 'app_utils/http'
import { ScreenModesUtil } from 'app_utils/screenModes'
import { ScreenNotificationsUtil } from 'app_utils/screenNotification'
//@end

// @import types
import { IUser, IUserHttpResponse } from 'app_utils/types/userTypes'
// @end

//@import service
import AllianceService from 'app_services/alliance/allianceService'
import {routingService} from 'app_services/routingService'
//@end

class AuthService {
  private token: string
  private Http: any
  private storeObject: any
  private screenNotification: ScreenNotificationsUtil
  private screenModes: ScreenModesUtil
  private allianceService: AllianceService

  constructor() {
    this.Http = Http
    this.storeObject = store
    this.token = this.storeObject.getState().auth?.user?.token
    this.allianceService = new AllianceService()
    this.screenNotification = new ScreenNotificationsUtil()
    this.screenModes = new ScreenModesUtil()
  }

  refreshAuthToken = () => {
    let auth = this.storeObject.getState().auth
    this.token = (auth.user?.token) ? auth.user.token : ''
  }

  /**
   * Metodo que permite iniciar sesión
   * @param {username, password} Object Items para inicio de sesión
   * @param history Object Elementos del objeto props
   */
  login = async (credentials: any, history: any) => {

    let responseData: IUserHttpResponse
    let user: IUser | null = null

    const queryData: HttpCustomStructure = {
      method: 'POST',
      url: `/api/auth/login`,
      params: credentials,
    }

    responseData = await this.Http.send(queryData)
    if (responseData.code === 200) {
      user = {
        token: responseData.token,
        data: responseData.user,
        alliance: responseData.alliance,
        timestamp: new Date().getTime(),
        locale: (responseData.locale) ? responseData.locale : '',
      }

      await this.storeObject.dispatch(loginAction(user))
      if (responseData.alliance.url_logout !== '') await this.storeObject.dispatch(redirect({ redirect: true, url_logout: responseData.alliance.url_logout }))

      await this.allianceService.setI18nCustom(responseData)

      if (responseData.user?.screen_mode) {
        this.screenModes.setMode(responseData.user.screen_mode)
      }

      const { from } = { from: { pathname: routingService.getSecurePath() } }
      history.replace(from)

      return user
    } else {
      this.screenNotification.fire(responseData)
    }

    return responseData

  }

  /**
   * Metodo que permite iniciar sesión desde un token
   * @param token Token que permitira la sesión
   * @param history
   * @returns
   */
  loginByToken = async (token: string, history: any) => {

    const query_data: HttpCustomStructure = {
      method: 'GET',
      url: `/api/auth/login-by-token`,
      params: {
        token: token,
      },
    }

    const data = await Http.send(query_data)

    if (data.status === 'success') {

      const user = {
        token    : data.token,
        data     : data.user,
        alliance : data.alliance,
        timestamp: new Date().getTime(),
        locale   : (data.locale) ? data.locale: '',
      }
      await this.storeObject.dispatch(loginAction(user))
      if (data.alliance.url_logout !== '') await this.storeObject.dispatch(redirect({ redirect: true, url_logout: data.alliance.url_logout }))

      await this.allianceService.setI18nCustom(data)

      if (data.user?.screen_mode) {
        this.screenModes.setMode(data.user.screen_mode)
      }

      const { from } = { from: { pathname: routingService.getSecurePath() } }
      history.replace(from)

      return user
    } else {
      this.screenNotification.fire(data)
    }


    return data

  }

  /**
   * Metodo que permite el cierre de sesión en la aplicación
   */
  logout = () => this.storeObject.dispatch(logoutAction())

  /**
   * Metodo que permite actualizar el token de sesión
   */
  updateToken = (token: string) => {
    this.storeObject.dispatch(updateToken(token))
  }
}

export default AuthService
