//@import dependencies
import React, { Fragment } from 'react'
//@end

//@import components
import {HeaderAuthComponent} from 'app_components/commons/header'
//@end

function AuthComponent(props: any) {
  return(
    <Fragment>
      <HeaderAuthComponent />
      {props.children}
    </Fragment>
  )
}

export default AuthComponent