//@import dependencies
import React, {Component} from 'react'
import {connect} from 'react-redux'
//@end

//@import components
import {Layout} from 'app_components/screens/waiting-room'
//@end

//@import services
import AuthService from 'app_services/auth/authService'
//@end

function mapStatesToProps(state: any = {}) {
  return state
}

class WaitingRoomScreen extends Component<any> {
  componentDidMount = async () => {
    const token = this.props.match.params
      ? this.props.match.params.token
      : null

    const authService = new AuthService()

    await authService.loginByToken(token,this.props.history)
  }

  render() {
    return <Layout />
  }
}

export default connect(mapStatesToProps)(WaitingRoomScreen)
