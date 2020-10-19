//@import dependencies
import React from 'react'
import { useTranslation } from 'react-i18next'
import {Link} from 'react-router-dom'
//@end

//@import config
import {has_site} from 'app_config/globals'
//@end

//@import service
import {routingService} from 'app_services/routingService'
//@end

function HeaderComponent(props: any) {

  const imageNavbarSrc = require('app_assets/images/icons/ket.png')

  const { t } = useTranslation()

  return(
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <Link className='navbar-brand' to={routingService.getSecurePath()}>
        <img src={imageNavbarSrc} alt='Logo' />
      </Link>
      <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav mr-auto'></ul>
        <ul className='navbar-nav my-2 my-lg-0'>
          {has_site && (
            <li className='nav-item'>
              <Link className='nav-link' to={routingService.getPublicPath()}>{t('sandbox.nav.site')}</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default HeaderComponent

