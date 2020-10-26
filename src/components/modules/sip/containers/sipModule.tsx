
import React, { Component } from 'react'

import {SIPUtil} from 'app_utils/sip'

interface SIPModuleProps {
}

interface SIPModuleState {
  number_phone: string
  info_log: string
  in_kuepa: boolean
}
class SipModule extends Component<SIPModuleProps, SIPModuleState> {

  private sipUtil: SIPUtil
  private internal_url: string
  private external_url: string

  constructor(props: any) {
    super(props)

    this.state = {
      number_phone: '',
      info_log: '',
      in_kuepa: false,
    }
    this.conectToCentral()

    this.internal_url = '201.184.65.162'
    this.external_url = '201.184.65.162'
  }

  conectToCentral = () => {
    this.sipUtil = new SIPUtil(
      {
        ip: (this.state.in_kuepa) ? this.internal_url : this.external_url,
        handlers: {
          progress: (e:any) => this.onProgressCall(e),
          failed: (e:any) => this.onProgressCall(e),
          ended: (e:any) => this.onProgressCall(e),
          confirmed: (e:any) => this.onProgressCall(e),
        },
      },
    )

    console.log('this.sipUtil ', this.sipUtil)
  }

  onChangeInKuepa = async (event: any) => {
    await this.setState({in_kuepa: !this.state.in_kuepa})
    this.conectToCentral()
  }

  onChangeInput = (event: any) => {
    this.setState({number_phone: event.target.value})
  }

  call = () => {
    if (this.state.number_phone !== ''){
      this.sipUtil.startCall(`03${this.state.number_phone}`)
      this.setState({info_log:'Estableciendo conexión ...'})
    }else{
      this.setState({info_log:'Error: Digite un número telefonico'})
    }

  }
  endCall = () => {
    this.sipUtil.stopCall()
    this.setState({info_log:''})
  }

  /**
   * Metodo se invoca cuando la llamada se inicializa
   * @returns
   */
  onProgressCall = (e: any) => {
    console.log(e)
    if (e.hasOwnProperty('cause')){
      this.setState({info_log:'Error: '+e.cause})
    }else{
      this.setState({info_log:'Llamada en progreso ....'})
    }

  }

  /**
   * Metodo se invoca cuando la llamada finaliza
   * @returns
   */
  onEndCall = (e: any) => {
    console.log(e)
    this.setState({info_log:'Llamada Finalizada: '+ e.cause})
  }

  /**
   * Metodo se invoca cuando la llamada falla y se cancela
   * @returns
   */
  onFailCall = (e: any) => {
    console.log(e)
    this.setState({info_log:'Error: La llamada fallo: '+ e.cause})
  }

  /**
   * Metodo se invoca cuando la llamada es confirmada
   * @returns
   */
  onConfirmCall = (e: any) => {
    console.log(e)
    if (e.hasOwnProperty('cause')){
      this.setState({info_log:'Error: Llamada aceptada: '+e.cause})
    }else{
      this.setState({info_log:'Llamada aceptada'})
    }
  }


  render() {
    return (
      <div>
        <h2>Llamadas por medio de la central telefónica</h2>
        <br/>
        <p>Para empezar necesitamos saber si estás trabajando desde Kuepa Calle 72</p>

        <label htmlFor='in_kuepa'>Estas en Kuepa Calle 72 ?  &nbsp;</label>
        <input
          type='checkbox'
          id='in_kuepa'
          name='in_kuepa'
          value='in_kuepa'
          defaultChecked={this.state.in_kuepa}
          checked={this.state.in_kuepa}
          onChange={this.onChangeInKuepa}
        />


        <br/><hr/>
        <input
          type='text'
          name='phone_number'
          className='form-control'
          placeholder='Numero telefonico 3002223333'
          value={this.state.number_phone}
          onChange={this.onChangeInput}
        />
        <br/>


        {
          (this.state.info_log !== '') &&

          <div className='alert alert-primary' role='alert'>
            {this.state.info_log}
          </div>
        }

        <button
          className='btn btn-warning'
          onClick={this.call}
        >
          LLamar
        </button>
        &nbsp; &nbsp;
        <button
          className='btn btn-danger'
          onClick={this.endCall}
        >
          Colgar
        </button>

      </div>
    )
  }
}

export default SipModule
