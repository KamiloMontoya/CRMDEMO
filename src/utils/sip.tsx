//@import dependencies
import * as JsSIP from 'jssip'
//@end

// @import_config_files
import { sip_config } from 'app_config/globals'
// @end

type SIPStructure = {
  ext?      : string      // Número de la extensión
  password? : string      // Contraseña de acceso
	debug?    : boolean     // Indica si se habilita el modo de depuración o nó, por defecto este valor se establece en false
  ip?       : string      // Ip de la central telefonica
  port?     : string      // Puerto de la central telefonica para establecer la conexión con el webSocket
  handlers? : HandlersStructure, // Objeto con las funciones que se ejecutaran cuando la llamada cambie de estado
}

type HandlersStructure = {
  progress?:  any,
  failed?:  any,
  ended?:  any,
  confirmed?:  any,
}

class SIPUtil {

  private ua: any = null

  private debug: boolean = false
  private ip: string = ''
  private port: string = ''
  private ext: string = ''
  private password: string = ''
  private handlers: any = {
    progress: () => {},
    failed: () => {},
    ended: () => {},
    confirmed: () => {},
  }


  constructor( params?: SIPStructure ) {
    this.debug = params && params.hasOwnProperty('debug') && params.debug !== undefined ? params.debug : sip_config?.debug
    this.ip = params && params.hasOwnProperty('ip') && params.ip ? params.ip : sip_config?.ip
    this.port = params && params.hasOwnProperty('port') && params.port ? params.port : sip_config?.port
    this.ext = params && params.hasOwnProperty('ext') && params.ext ? params.ext : sip_config?.default_ext
    this.password = params && params.hasOwnProperty('password') && params.password ? params.password : sip_config?.password_default_ext

    this.handlers = {
      progress: params && params.handlers?.progress ? params.handlers?.progress : this.onProgressCall,
      failed: params && params.handlers?.failed ? params.handlers?.failed : this.onFailCall,
      ended: params && params.handlers?.ended ? params.handlers?.ended : this.onEndCall,
      confirmed: params && params.handlers?.confirmed ? params.handlers?.confirmed : this.onConfirmCall,
    }

    this.connect()
  }

  /**
   * Metodo que permite inicializar la conexion
   * @returns
   */
  private connect = () => {

    if (this.debug) {
      JsSIP.debug.enable('JsSIP:*')
    }else{
      JsSIP.debug.disable()
    }

    if (this.ua) {
      this.ua.stop()
      this.ua = null
    }

    const socket = new JsSIP.WebSocketInterface(`wss://${this.ip}:${this.port}/ws`)
    const configuration = {
      sockets  : [ socket ],
      uri      : `sip:${this.ext}@${this.ip}`,
      password : this.password,
      realm    : this.ip,
    }

    this.ua = new JsSIP.UA(configuration)
    const response = this.ua.start()
    console.log('responseStart', this.ua )
    return response
  }

  /**
   * Metodo que permite llamar a un numero
   * @returns
   */
  public startCall = async  (number: string , handlers?: HandlersStructure) => {
    if (!this.ua) this.connect()

    const eventHandlers = {
      progress: handlers?.progress ? handlers?.progress : this.handlers?.progress,
      failed: handlers?.failed ? handlers?.failed : this.handlers?.failed,
      ended: handlers?.ended ? handlers?.ended : this.handlers?.ended,
      confirmed: handlers?.confirmed ? handlers?.confirmed :  this.handlers?.confirmed,
    }
    console.log('eventHandlers', eventHandlers)

    const options = {
      'eventHandlers'    : eventHandlers,
      'mediaConstraints' : { 'audio': true, 'video': false },
      'rtcOfferConstraints': { iceRestart: false },
      'sessionTimersExpires': 120,
      'pcConfig': {
        iceServers: [],
      },
    }

    const session = await this.ua.call( number , options)
    if (session) {
      session.connection.addEventListener('addstream', (e: any) => {
        const audio = document.createElement('audio')
        audio.autoplay = true
        audio.srcObject = e.stream
        audio.play()
        console.log('Audio Element', audio)
        console.log('Stream', e.stream)
      })
    }
    console.log('Llamada Actual', session)

    return session
  }

  /**
   * Metodo que permite finalizar la llamada actual
   * @returns
   */
  public stopCall = () => {
    if (this.ua) this.ua.terminateSessions()
  }

  /**
   * Metodo se invoca cuando la llamada se inicializa
   * @returns
   */
  private onProgressCall = (e: any) => {
    console.log(e)
    console.log('call is in progress')
  }

  /**
   * Metodo se invoca cuando la llamada finaliza
   * @returns
   */
  private onEndCall = (e: any) => {
    console.log(e)
    console.log('call ended with cause: '+ e.cause)
  }

  /**
   * Metodo se invoca cuando la llamada falla y se cancela
   * @returns
   */
  private onFailCall = (e: any) => {
    console.log(e)
    console.log('call failed with cause: '+ e.cause)
  }

  /**
   * Metodo se invoca cuando la llamada es confirmada
   * @returns
   */
  private onConfirmCall = (e: any) => {
    console.log(e)
    console.log('call confirmed')
  }

}

export { SIPUtil }
