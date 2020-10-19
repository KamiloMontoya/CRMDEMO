//@import dependencies
import React, {Component} from 'react'
import {connect} from 'react-redux'
//@end

//@import components
import {Layout} from 'app_components/screens/twilio'
//@end

// @import utils
import { Http, HttpCustomStructure } from 'app_utils/http'
import { ScreenNotificationsUtil } from 'app_utils/screenNotification'
// @end

//@import services
//@end

interface TwilioScreenProps {
  history: any
}

interface TwilioScreenState {}

function mapStatesToProps(state: any = {}) {
  return state
}
class TwilioScreen extends Component<TwilioScreenProps, TwilioScreenState> {

  private Http: any
  private screenNotification: ScreenNotificationsUtil

  constructor(props: any) {
    super(props)

    //@set attributes
    this.Http = Http
    this.screenNotification = new ScreenNotificationsUtil()
    //@end
  }

  componentDidMount = async () => {}

  onCallTwilio = async (number: string) => {
    const queryData: HttpCustomStructure = {
      method: 'POST',
      url: '/api/twilio/call-numbers',
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        'numbers': [
            {
                'number': number,
                'contact_id': '438526',
                'worker_panel_id': '22222',
            },
        ],
      },
    }

    const responseData = await this.Http.send(queryData)
    console.log('responseDataBk', responseData)
    if (responseData.code === 200) {
      this.screenNotification.fire({
        message: 'Llamada en proceso',
      }, {
        type: 'success',
        title: '',
      })
    } else {
      this.screenNotification.fire({
        message: 'Se ha presentado un error al llamar',
      }, {
        type: 'error',
        title: '',
      })
    }
  }

  render() {
    return(
      <Layout
        onCallTwilio={this.onCallTwilio}
      />
    )
  }
}

export default connect(mapStatesToProps)(TwilioScreen)
