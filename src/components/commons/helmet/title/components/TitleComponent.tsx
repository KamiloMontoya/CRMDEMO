//@import dependencies
import React from 'react'
import {Helmet} from 'react-helmet'
//@end

function TitleComponent(props: any) {
  const defaultTitle = 'App'
  return (
    <Helmet>
      <title>{props.title ? props.title : defaultTitle}</title>
    </Helmet>
  )
}

export default TitleComponent