import React, { Component } from 'react'
import { connect } from 'react-redux'
import { HeaderComponent } from './../index'

//@import services
import AuthService from 'app_services/auth/authService'
//@end

interface HeaderProps {
  dispatch?: any,
  imageNavbarSrc?: any
  imageNavbarAlt?: string
}
class HeaderContainer extends Component<HeaderProps>{
  authService: any

  constructor(props: any) {
    super(props)

    //@service init
    this.authService = new AuthService()
    //@end
  }

  handleLogout = async () => {
    this.authService.logout()
  }

  render() {
    return (
      <HeaderComponent {...this.props} onHandleLogout={this.handleLogout} />
    )
  }
}
const mapStatesToProps = (state: any) => {
  return state
}


export default connect(mapStatesToProps)(HeaderContainer)
