//@import dependencies
import * as io from 'socket.io-client'
//@end

// @import_config_files
import { main_external_socket } from 'app_config/globals'
// @end

// @import_services
import { externalConnectionsService } from 'app_services/externalConnectionsService'
// @end


type SocketConfigStructure = {
  endpoint: string;
}

class SocketUtil {

  private _main_external_socket: any = null
  socket: any // Instancia de socket

  constructor (socketConfig: SocketConfigStructure) {
    this.connect(socketConfig) // Iniciando configuración de socket
  }

  /**
   * Metodo que permite generar una conexión con un Socket
   * @param socketConfig Configuración necesaria para el socket
   * @returns
   */
  private connect = (socketConfig: SocketConfigStructure) => {

    try{

      if (socketConfig.endpoint) {
				this._main_external_socket = externalConnectionsService.getConnection(socketConfig.endpoint)
			} else if (main_external_socket) {
				this._main_external_socket = this._main_external_socket = externalConnectionsService.getConnection(main_external_socket)
			} else {
				this._main_external_socket = null
      }

			if (!this._main_external_socket) {
				return {
					status: 'error',
					status_code: 'fail_request',
					message: 'fail_request',
					code: 404,
				}
			}

      this.socket = io.connect(this._main_external_socket)
    } catch (e) {
      return null
    }
  }

  /**
   * Metodo que permite desconectar un socket
   */
  public disconnect = () => {
    try {
      this.socket.disconnect()
    } catch(e){}
  }

  /**
   * Metodo que permite poner a la escucha de un evento
   * @param eventName Nombre del evento a escuchar
   * @param fn Funcion que se ejecutara inmediatamente despues de recibir el evento
   * @returns
   */
  public listen = (eventName: string, fn: any) => {
    if (!this.socket || typeof fn !== 'function') return null
    return this.socket.on(eventName, fn)
  }

  /**
   * Metodo que permite emitir un evento al socket host
   * @param eventName Nombre del evento a generar
   * @param [data] Información que se enviará por el evento
   * @returns
   */
  public emit = (eventName: string, data: any = {}) => {
    if (!this.socket) return null
    this.socket.emit(eventName, data)
  }
}

export { SocketUtil }
