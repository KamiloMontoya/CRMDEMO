//@import dependencies
import {google_analytics} from 'app_config/globals'
import React, {Component} from 'react'
import ReactGA from 'react-ga'
import {connect} from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
//@end

//@import pages
import Error404Screen from 'app_components/screens/errors/404'
//@end

//@import service
import {routingService} from 'app_services/routingService'
//@end

//@import routes
import { has_secure, has_site} from 'app_config/globals'
import {routes as appRoutes} from 'app_routers/AppRoutingRoute'
import GuestRoute from 'app_routers/components/GuestRoute'
import PrivateRoute from 'app_routers/components/PrivateRoute'
import {routes as siteRoutes} from 'app_routers/SiteRoutingRoute'
//@end

function mapStatesToProps(state: any) {
  return {auth: state.auth}
}

ReactGA.initialize(google_analytics)

interface RouteConfig {
  path: string
  component: any
  exact?: boolean
  isSecure?: boolean
  onlyGuest?: boolean
}

interface RoutesConfig {
  site_routes: Array<RouteConfig>,
  app_routes: Array<RouteConfig>
  general_routes: Array<RouteConfig>
}

class AppNavigator extends Component<any, any> {
  routes: RoutesConfig = {
    site_routes   : [],
    app_routes    : [],
    general_routes: [],
  }

  render() {

    if (has_site === true && Array.isArray(siteRoutes)) this.routes.site_routes = siteRoutes
    if (has_secure === true && Array.isArray(appRoutes)) this.routes.app_routes = appRoutes

    return(
      <Router>
        <div>
          <Switch>
            {this.routes.site_routes.map((route, i) => (
              <Route key={i} {...route} />
            ))}
            {this.routes.app_routes.map((route, i) => {
              if (route.isSecure) {
                let _route = { ...route }
                _route.path = routingService.getSecurePath(_route.path)
                return <PrivateRoute key={i} {..._route} />
              } else if (route.onlyGuest) {
                return <GuestRoute key={i} {...route} />
              } else {
                return <Route key={i} {...route} />
              }
            })}
            <Route component={Error404Screen} />
          </Switch>
        </div>

      </Router>
    )
  }
}

export default connect(mapStatesToProps)(AppNavigator)
