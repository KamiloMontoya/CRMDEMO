//@import dependencies
import React from 'react'
import ReactGA from 'react-ga'
import {useSelector} from 'react-redux'
import { Redirect, Route, useHistory } from 'react-router-dom'
//@end

interface GuestRouteProps {
  component: any
}

const GuestRoute: React.FC<GuestRouteProps> = ({ component: Component, ...rest }) => {
  const history = useHistory()
  React.useEffect(() => {
    ReactGA.pageview(history.location.pathname)
  }, [useHistory])

  const auth = useSelector((state: any) => state.auth ? state.auth : null)
  return (
    <Route
      {...rest}
      render={(props: any) => !auth.user ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      )
    }
  />
  )
}

export default GuestRoute
