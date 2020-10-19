//@import dependencies
import React, {Component} from 'react'
import {connect} from 'react-redux'
//@end

//@import components
import {Layout} from 'app_components/screens/home'
//@end

//@import utils
//@end

//@import services
//@end

interface HomeScreenProps {
  history: any
}

interface HomeScreenState {}

function mapStatesToProps(state: any = {}) {
  return state
}
class HomeScreen extends Component<HomeScreenProps, HomeScreenState> {

  user: any = null

  constructor(props: any) {
    super(props)

    //@set attributes
    this.user = props.auth.user
    //@end
  }

  componentDidMount = async () => {}

  render() {
    return(
      <Layout
        user={this.user}
      />
    )
  }
}

export default connect(mapStatesToProps)(HomeScreen)
