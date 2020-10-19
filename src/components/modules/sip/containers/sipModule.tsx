
import React, { Component } from 'react'

import {SIPUtil} from 'app_utils/sip'

class SipModule extends Component<any, any> {

  sipUtil: SIPUtil

  constructor(props: any) {
    super(props)
    this.sipUtil = new SIPUtil()
  }

  componentDidMount() {
    this.sipUtil.connect()
  }

  call = () => {
    this.sipUtil.startCall('033204386075')
  }

  render() {
    return (
      <div>
        <button className='btn btn-warning' onClick={() => this.call()}> LLamar por medio de la central </button>
      </div>
    )
  }
}

export default SipModule
