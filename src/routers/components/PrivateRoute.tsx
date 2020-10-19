//@import dependencies
import React from 'react'
import ReactGA from 'react-ga'
import { useSelector } from 'react-redux'
import { Redirect, Route, useHistory } from 'react-router-dom'
//@end

import { redirect } from 'app_reducers/actions/actions'
import { store } from 'app_storage/redux-storage'

interface PrivateRouteProps {
  component: any
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const history = useHistory()
  React.useEffect(() => {
    ReactGA.pageview(history.location.pathname)
  }, [useHistory])

  const auth = useSelector((state: any) => state.auth ? state.auth : null)
  const actions = useSelector((state: any) => state.actions ? state.actions : null)
  if (auth.user) {
    return (
      <Route
        {...rest}
        render={(props: any) => <Component {...props} />}
      />
    )
  } else if (actions.redirect && actions.url_logout) {
    store.dispatch(redirect({ redirect: false, url_logout: '' }))
    localStorage.removeItem('persist:root')
    window.location.href = actions.url_logout
  } else {
    return (
      <Route
        {...rest}
        render={(props: any) => (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )}
      />
    )
  }
}

export default PrivateRoute
