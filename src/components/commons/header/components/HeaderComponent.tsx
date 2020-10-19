//@import dependencies
import React from 'react'
import { useTranslation } from 'react-i18next'
import {Link} from 'react-router-dom'
//@end

//@import service
import {routingService} from 'app_services/routingService'
//@end

// @import components
import Avatar from 'app_components/commons/avatar'
// @end

function HeaderComponent(props: any) {

  const user = props.auth.user.data

  const { t } = useTranslation()

  return(
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      {props.imageNavbarSrc && (
        <Link className='navbar-brand' to={routingService.getSecurePath()}>
          <img src={props.imageNavbarSrc} alt={props.imageNavbarAlt ? props.imageNavbarAlt : 'Logo'} />
        </Link>
      )}
      <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav mr-auto'></ul>
      </div>

      <div className='dropdown ml-auto order-3 offset-md-3'>
        <Link className='btn btn-dropdown nav-link dropdown-toggle' to='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
          <Avatar src={user.avatar} size='32px' />
          <span className='user-data'>
            {user.profile.first_name} {user.profile.last_name}
          </span>
        </Link>
        <div className='dropdown-menu dropdown-menu-right' aria-labelledby='navbarDropdown'>
          <Link className='dropdown-item' to='#' onClick={props.onHandleLogout}>{t('navbar.dropdown.logout')}</Link>
        </div>
      </div>
    </nav>
  )
}

export default HeaderComponent

