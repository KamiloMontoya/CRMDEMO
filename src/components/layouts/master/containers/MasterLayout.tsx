//@import dependencies
// import M from 'materialize-css'
import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import { createGlobalStyle } from 'styled-components'
//@end

//@import styles
import 'app_styles/main.scss'
//@end

//@import routes
import AppNavigatorRoute from 'app_routers/components/AppNavigatorMasterRoute'
//@end

//@import components
import {FaviconComponent} from 'app_components/commons/helmet/favicon'
import {TitleComponent} from 'app_components/commons/helmet/title'
import {PreloaderComponent} from 'app_components/commons/preloader'
//@end

//@import third party libraries
// import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
// import 'materialize-css/dist/css/materialize.min.css'
//@end

// @import services
import AllianceService from 'app_services/alliance/allianceService'
// @end

function mapStatesToProps(state: any = {}) {
  return state
}

const GlobalStyle = createGlobalStyle`
  ${(props) => props.style}
`
class MasterLayout extends Component<any> {
  private allianceService: AllianceService

  constructor(props: any) {
    super(props)
    this.allianceService = new AllianceService()
    this.allianceService.setI18nCustom()
  }

  state = {
    preloader: '',
    favicon: require('app_assets/images/favicons/kuepa.png'),
    title: 'CRM',
  }

  componentDidMount() {
    // M.AutoInit()
    this.setState({
      preloader: 'hidden',
    })
  }

  render() {
    return(
      <Fragment>
        <FaviconComponent favicon={this.state.favicon}/>
        <TitleComponent title={this.state.title}/>
        <PreloaderComponent classes={this.state.preloader} />
        <AppNavigatorRoute />
        <GlobalStyle
          style={''}
        />
      </Fragment>
    )
  }
}

export default connect(mapStatesToProps)(MasterLayout)
