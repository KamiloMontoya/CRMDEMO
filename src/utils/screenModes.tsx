//@import store
import {
  changeScreenMode,
} from 'app_reducers/app/actions'
import { store } from 'app_storage/redux-storage'
// @end

class ScreenModesUtil {

  private storeObject: any

  constructor () {
    this.storeObject = store
  }

  /**
   * Metodo que permite cambiar el modo de la pantalla
   * @returns
   */
  public setMode = async (mode: string = '') => {
    this.storeObject.dispatch(changeScreenMode(mode))
  }
}

export { ScreenModesUtil }
