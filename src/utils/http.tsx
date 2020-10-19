// @import_config_files
import { main_external_api } from 'app_config/globals'
// @end

// @import_services
import AuthService from 'app_services/auth/authService'
import { externalConnectionsService } from 'app_services/externalConnectionsService'
// @end

type HttpCustomStructure = {
	method    : 'GET' | 'POST' | 'DELETE' | 'PUT',  // Metodos HTTP habilitados para envio de peticiones
	url       : string,            // Ruta parcial del punto destino de la petición
	api?      : string,            // URL del sistema hacia el cual se van a realizar las peticiones. Por defecto toma el valor de main_external_api
	params?   : object | string,   // Parametros que se enviaran a la petición
	headers?  : object,           // Encabezados de la peticion
	mode? 		: 'cors' | 'navigate' | 'same-origin' | 'no-cors' | undefined,
	cache? 		: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached' | undefined,
	auth_token?: string, // Token de Autenticación
}

class HttpUtil {

	private _main_external_api: any = null
	/**
	 * Metodo que permite enviar una petición HTTP a un endpoint determinado
	 * @param httpConfig Configuración del metodo HTTP
	 * @returns
	 */
	public send = async (httpConfig: HttpCustomStructure) => {
    const authService = new AuthService()
    try{

			if (httpConfig.api) {
				this._main_external_api = externalConnectionsService.getConnection(httpConfig.api)
			} else if (main_external_api) {
				this._main_external_api = this._main_external_api = externalConnectionsService.getConnection(main_external_api)
			} else {
				this._main_external_api = null
			}

			if (!this._main_external_api) {
				return {
					status: 'error',
					status_code: 'fail_request',
					message: 'fail_request',
					code: 404,
				}
			}

			/*============================================
			=            Enviando la petición            =
			============================================*/

				let method     = httpConfig.method ? httpConfig.method.toString() : 'GET'
				let body       = null
				let url_params = ''

				if (['GET', 'DELETE'].indexOf(method) !== -1){
					url_params = '?' + new URLSearchParams(httpConfig.params)
				} else { // POST or PUT
					body = JSON.stringify(httpConfig.params)
				}

        let headers: any = null

        if (!(httpConfig.params instanceof FormData)) {
          headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }

				if (httpConfig.headers && typeof httpConfig.headers === 'object') {
					headers = {
						...headers,
						...httpConfig.headers,
					}
				}

				if (httpConfig.auth_token && httpConfig.auth_token !== '') {
					headers['Authorization'] = httpConfig.auth_token
        }

        headers['Refresh-Token'] = '1' // Always refresh token

				const configRequest: RequestInit = {
					method:  method,
					headers: new Headers(headers),
					body:  body,
					mode:  httpConfig.mode ? httpConfig.mode : 'cors',
					cache: httpConfig.cache ? httpConfig.cache : 'default',
				}

				const query = await fetch(`${this._main_external_api}${httpConfig.url}${url_params}`, configRequest)
        const query_response = await query.json()

        if (
          query_response.status_code === 'jwt_token_expired' ||
          query_response.status_code === 'jwt_token_invalid' ||
          query_response.status_code === 'jwt_unauthorized_header'
        ) {
          await authService.logout()
        } else if (query_response.hasOwnProperty('token')) {
          if (httpConfig.auth_token && query_response.token) {
            authService.updateToken(
              query_response.token,
            )
          }
        }

				return query_response

			/*=====  End of Enviando la petición  ======*/
		} catch (e) {
			return {
				status: 'error',
				status_code: 'fail_request_http',
				message: e.message,
				code: 500,
			}
		}
  }
}

const Http = new HttpUtil()

export { Http, HttpCustomStructure }
