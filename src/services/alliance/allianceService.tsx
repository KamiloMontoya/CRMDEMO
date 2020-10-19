// @import store
import { store } from 'app_storage/redux-storage'
// @end

// @import utils
import { Http, HttpCustomStructure } from 'app_utils/http'
import { I18nUtil } from 'app_utils/i18n'
import { ScreenNotificationsUtil } from 'app_utils/screenNotification'
// @end

// @import types
import { IAlliancesHttpResponse } from 'app_utils/types/allianceTypes'
// @end


class AllianceService {
  // private token: string
  private Http: any
  private storeObject: any
  // private screenNotification: ScreenNotificationsUtil
  private authObj: any
  private i18nUtil: I18nUtil

  constructor() {
    this.Http = Http
    this.storeObject = store
    // this.screenNotification = new ScreenNotificationsUtil()
    let auth = this.storeObject.getState().auth

    this.authObj = auth
    // this.token = (auth.user?.token) ? auth.user.token : ''
    this.i18nUtil = new I18nUtil()
  }

  refreshAuthToken = () => {
    let auth = this.storeObject.getState().auth
    // this.token = (auth.user?.token) ? auth.user.token : ''
  }

  /**
   * Metodo que personaliza la internacionalización por alianza
   * @param [auth] Objeto de autenticación
   */
  setI18nCustom = (auth?: any) => {

    let _auth: any = null
    if (auth) {
      _auth = auth
    } else if (this.authObj) {
      _auth = this.authObj.user
    }

    if (_auth) {
      if (_auth.locale && _auth.locale !== '') {
        this.i18nUtil.use(_auth.locale)

        if (_auth.alliance?.i18n_configuration) {
          _auth.alliance?.i18n_configuration
          .filter((i: any) => i.culture.toString() === _auth.locale?.toString())
          .map((i: any) => {
            if (_auth.locale && i.data.frontend) {
              this.i18nUtil.addResourceBundle({lng: _auth.locale, resources: i.data.frontend})
            }
          })
        }
      }

    }

  }

  async loginList(params: any = {}) {
    let responseData: IAlliancesHttpResponse

    const queryData: HttpCustomStructure = {
      method: 'GET',
      url: `/api/alliance/login/list`,
      params: params,
    }

    responseData = await this.Http.send(queryData)

    if (responseData.code === 200) {
      return responseData
    } else {
      // this.screenNotification.fire(responseData)
    }


    return null
  }
}

export default AllianceService
