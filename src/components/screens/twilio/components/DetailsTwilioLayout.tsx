//@import dependencies
import React from 'react'
//@end

//@import components
import {AuthLayout} from 'app_components/layouts/auth'
//@end

import './../styles.scss'

interface DetailsTwilioLayoutProps {
  phone_number: string | null | undefined
}

function DetailsTwilioLayoutComponent(props: DetailsTwilioLayoutProps) {

  return(
    <>
      <div className='container mt-3'>
        { !props.phone_number?
          <h2>No se ha seleccionado un contacto</h2>
          :
          <>
            <h2>Detalle de Contacto</h2>
            <br></br>
            Número telefónico: {props.phone_number}
          </>
          }

      </div>
    </>
  )
}

export default DetailsTwilioLayoutComponent
