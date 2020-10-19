//@import dependencies
import React from 'react'
import {Helmet} from 'react-helmet'
//@end

function FaviconComponent(props: any) {
  let img = null
  if (props.favicon) {
    img = props.favicon
  } else {
    img = require('app_assets/images/favicons/default.png')
  }

  return (
    <Helmet>
      {img && <link rel='icon' href={img} />}
    </Helmet>
  )
}

export default FaviconComponent