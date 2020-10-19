// @import_dependencies_node Import libraries
// @end

// @import_config_files
import {secure_home_path} from 'app_config/globals'
// @end


class RoutingService {

  /**
   * Metodo que permite obtener el enrutamiento para paths publicos
   * @param [path] Path a buscar
   * @returns  
   */
  public getPublicPath(path: string = '/') {
    return path
  }

  /**
   * Metodo que permite obtener el enrutamiento para paths privados
   * @param [path] Path a buscar
   * @returns  
   */
  public getSecurePath(path: string = secure_home_path) {
    let new_path = path
    if (secure_home_path !== '/' && path !== secure_home_path) {
      new_path = `${secure_home_path}${(path !== '/') ? path : ''}`
    }
    return new_path
  }

}

export const routingService = new RoutingService()
export { RoutingService as DefaultRoutingService }
