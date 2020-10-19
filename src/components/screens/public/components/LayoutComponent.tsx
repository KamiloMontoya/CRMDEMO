//@import dependencies
import React, {Fragment} from 'react'
import { useTranslation } from 'react-i18next'
import {Link} from 'react-router-dom'
//@end

//@import config
import {has_secure} from 'app_config/globals'
//@end

//@import service
import {routingService} from 'app_services/routingService'
//@end

function LayoutComponent(props: any) {

  const { t } = useTranslation()

  return(
    <Fragment>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link className='navbar-brand' to={routingService.getPublicPath()}>Navbar</Link>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav mr-auto'></ul>
          <ul className='navbar-nav my-2 my-lg-0'>
            {has_secure && (
              <li className='nav-item'>
                <Link className='nav-link' to={routingService.getSecurePath()}>{t('sandbox.nav.login')}</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <div className='container'>
          <div className='mt-3'>
            {t('sandbox.site.welcome')}
          </div>
      </div>
    </Fragment>
  )
}

export default LayoutComponent