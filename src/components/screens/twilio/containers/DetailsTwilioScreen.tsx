//@import dependencies
import React, {Component} from 'react'
import {connect} from 'react-redux'
//@end

//@import components
import {DetailsLayout} from 'app_components/screens/twilio'
//@end

// @import utils
// @end

//@import services
//@end

interface DetailsTwilioScreenProps {
  history: any
  match: any
}

interface DetailsTwilioScreenState {
  phone_number: string | null | undefined
}

function mapStatesToProps(state: any = {}) {
  return state
}
class DetailsTwilioScreen extends Component<DetailsTwilioScreenProps, DetailsTwilioScreenState> {

  constructor(props: any) {
    super(props)
    this.state =
      {
        phone_number: this.props.match?.params?.number,
      }
  }

  componentDidMount = async () => {

  }

  render() {
    return(
      <DetailsLayout
      phone_number={this.state.phone_number}
      />
    )
  }
}

export default connect(mapStatesToProps)(DetailsTwilioScreen)
