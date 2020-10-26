//@import dependencies
import React from 'react'
import { useTranslation } from 'react-i18next'
//@end

//@import components
import {AuthLayout} from 'app_components/layouts/auth'
import LoginModule from 'app_components/modules/login'

import SipModule from 'app_components/modules/sip'
//@end

function LayoutComponent(props: any) {

  const { t } = useTranslation()

  return(
    <AuthLayout>
      <div className='col-md-4 mx-auto py-5'>
        <SipModule/>
      </div>
    </AuthLayout>

    // <AuthLayout>
    //   <div className='col-md-4 mx-auto py-5'>
    //     <h2 className='mb-3'>{t('login.welcome_title')}</h2>
    //     {props.error && (
    //       <div className='alert alert-danger mb-3' role='alert'>
    //         {props.error}
    //       </div>
    //     )}
    //     <SipModule/>
    //   </div>
    // </AuthLayout>
  )
}

export default LayoutComponent
