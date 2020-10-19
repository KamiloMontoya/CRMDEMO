import React, { Component } from 'react';

import { LayoutComponent } from './../index'

interface AvatarComponentProps {
  name?: string;
  src: string;
  size?: string;
  rounded?: boolean;
}

class AvatarComponent extends Component<AvatarComponentProps> {
  render() {
    return (
      <LayoutComponent {...this.props} />
    );
  }
}

export default AvatarComponent;
