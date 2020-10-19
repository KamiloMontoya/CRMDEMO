//@import dependencies
import React from 'react'
//@end

//@import components
import {AuthLayout} from 'app_components/layouts/auth'
import SipModule from 'app_components/modules/sip'
//@end

import './../styles.scss'

interface TwilioLayoutProps {
  onCallTwilio: any
}

function LayoutComponent(props: TwilioLayoutProps) {
  const ref = React.createRef()
  return(
    <AuthLayout>
      <div className=''>
        <div className='row'>
          <div className='col-5'>
            <div className='container mt-3 mx-3'>
              <h2>Listado de Cola de llamados</h2>
              <ul className='list-group mt-3'>
                <li className='list-group-item'>
                  Camilo Montoya (+573204386075)&nbsp;&nbsp;&nbsp;
                  <button className='btn btn-sm btn-primary' onClick={() => props.onCallTwilio('+573204386075')}> Llamar</button>
                </li>
                <li className='list-group-item'>
                  Nicolas Guerrero (+573016398418)&nbsp;&nbsp;&nbsp;
                  <button className='btn btn-sm btn-primary' onClick={() => props.onCallTwilio('+573016398418')}> Llamar</button>
                </li>
                <li className='list-group-item'>
                  Juan Garcia (+573143697430)&nbsp;&nbsp;&nbsp;
                  <button className='btn btn-sm btn-primary' onClick={() => props.onCallTwilio('+573143697430')}> Llamar</button>
                </li>
              </ul>

              <hr></hr>
              <SipModule/>
            </div>
          </div>
          <div className='col-7 twilio-section'>
            <iframe height='100%' width='100%' allow='camera;microphone' src='http://localhost:3030'/>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}

export default LayoutComponent
