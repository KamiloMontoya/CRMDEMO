//@import dependencies
import * as JsSIP from 'jssip'
//@end

class SIPUtil {

  ua: any = null
  //constructor() {}

  /**
   * Metodo que permite inicializar la conexion
   * @returns
   */
  public connect = () => {
    // JsSIP.debug.enable('JsSIP:*')
    JsSIP.debug.disable()
    if (this.ua) {
      this.ua.stop()
      this.ua = null
    }

    const socket = new JsSIP.WebSocketInterface('wss://201.184.65.162:8045/ws')
    const configuration = {
      sockets  : [ socket ],
      uri      : 'sip:1032@201.184.65.162',
      password : '$newBh8',
      realm    : '201.184.65.162',
    }

    this.ua = new JsSIP.UA(configuration)
    this.ua.start()
  }

  public startCall = ( number: string) => {
    // Register callbacks to desired call events
    const eventHandlers = {
      'progress': function(e: any) {
        console.log('call is in progress')
      },
      'failed': function(e: any) {
        console.log(e)
        console.log('call failed with cause: '+ e.cause)
      },
      'ended': function(e: any) {
        console.log(e)
        console.log('call ended with cause: '+ e.cause)
      },
      'confirmed': function(e: any) {
        console.log(e)
        console.log('call confirmed')
      },
    }

    const options = {
      'eventHandlers'    : eventHandlers,
      'mediaConstraints' : { 'audio': true, 'video': false },
      'rtcOfferConstraints': { iceRestart: false },
      'sessionTimersExpires': 120,
      'pcConfig': {
        iceServers: [],
      },
    }

    const session = this.ua.call( number , options)
    console.log('Llamada Actual', session)
  }

  public stopCall = () => {
    if (this.ua) this.ua.terminateSessions()
  }

}

export { SIPUtil }
