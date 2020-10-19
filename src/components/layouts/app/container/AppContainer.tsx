import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppLayout } from '../index'


interface AppProps {
  dispatch?: any,
  children?: any
}

interface AppState {}

class AppContainer extends Component<AppProps, AppState> {

  constructor(props: any) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <AppLayout
        {...this.props}
      />
    )
  }
}

const mapStatesToProps = (state: any) => {
  return state
}


export default connect(mapStatesToProps)(AppContainer)
