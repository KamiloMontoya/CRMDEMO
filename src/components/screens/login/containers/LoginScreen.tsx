//@import dependencies
import React, {Component} from 'react'
import {connect} from 'react-redux'
//@end

//@import components
import {Layout} from 'app_components/screens/login'
//@end

//@import services
import AuthService from 'app_services/auth/authService'
//@end

import {store} from 'app_storage/redux-storage'

function mapStatesToProps(state: any = {}) {
  return state
}

class LoginScreen extends Component<any, any> {
  storeObject: any

  constructor(props: any) {
    super(props)
    this.storeObject = store
    this.state = {
      error: null,
    }
  }

  handleLogin = async (credentials: any) => {
    const authService = new AuthService()
    const loginResult: any = await authService.login(credentials, this.props.history)

    if (loginResult?.status === 'error') {
      this.setState({ error: loginResult?.message })
    }
  }

  render() {
    return(
      <Layout onHandleLogin={this.handleLogin} error={this.state.error} />
    )
  }
}

export default connect(mapStatesToProps)(LoginScreen)
