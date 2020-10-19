//@import dependencies
import React from 'react'
import { useTranslation } from 'react-i18next'
//@end

//@import components
import {AppLayout} from 'app_components/layouts/app'
//@end

function LayoutComponent(props: any) {

  const { t } = useTranslation()

  return(
    <AppLayout>
      <div className='container mt-3'>

        <h3>{t('home.welcome_title', {fullname: `${props.user.data.profile.first_name} ${props.user.data.profile.last_name}`})}</h3>

        <div className=''>
        </div>
      </div>
    </AppLayout>
  )
}

export default LayoutComponent
