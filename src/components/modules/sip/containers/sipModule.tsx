
import React, { Component } from 'react'

import {SIPUtil} from 'app_utils/sip'

interface SIPModuleProps {
}

interface SIPModuleState {
  number_phone: string
}
class SipModule extends Component<SIPModuleProps, SIPModuleState> {

  sipUtil: SIPUtil

  constructor(props: any) {
    super(props)
    this.sipUtil = new SIPUtil()
    this.state = {
      number_phone: '',
    }
  }

  onChangeInput = (event: any) => {
    this.setState({number_phone: event.target.value})
  }

  call = () => {
    this.sipUtil.startCall(`03${this.state.number_phone}`)
  }
  endCall = () => {
    this.sipUtil.stopCall()
  }

  render() {
    return (
      <div>
        <h2>Llamadas por medio de la central telefónica</h2>
        <br/>
        <input
          type='text'
          name='phone_number'
          className='form-control'
          placeholder='Numero telefonico 3202223333'
          value={this.state.number_phone}
          onChange={this.onChangeInput}
        />
        <br/>
        <button
          className='btn btn-warning'
          onClick={this.call}
        >
          LLamar por medio de la central
        </button>
        <br/> <br/>
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
