import React, { Component } from 'react'

import allianceService from 'app_services/alliance/allianceService'

import { Layout } from './../index'

interface LoginModuleProps {
  onSubmit: () => any
}

class LoginModule extends Component<LoginModuleProps, any> {

  allianceService: any

  constructor(props: any) {
    super(props)

    this.state = {
      alliance: {
        data: [],
        loading: null,
        error: null,
      },
    }

    this.allianceService = new allianceService()
  }

  componentDidMount() {
    this.getAlliance()
  }

  async getAlliance() {
    let allianceState = this.state.alliance

    this.setState({
      alliance: { ...allianceState, loading: true },
    })

    const data = await this.allianceService.loginList()

    if (data) {
      this.setState({
        alliance: { ...allianceState, data, loading: false },
      })
    } else {
      this.setState({
        alliance: { ...allianceState, loading: false, error: true },
      })
    }
  }

  render() {
    return (
      <Layout
        alliance={this.state.alliance}
        onSubmit={this.props.onSubmit}
      />
    )
  }
}

export default LoginModule
