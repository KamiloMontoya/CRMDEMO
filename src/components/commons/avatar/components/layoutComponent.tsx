import React from 'react'

import './../avatar.scss'
interface LayoutComponentProps {
  name?: string
  src: string
  size?: string
  rounded?: boolean
}

const LayoutComponent: React.FC<LayoutComponentProps> = (props) => {
  return (
    <div className={`avatar-component ${props.rounded ? 'avatar-rounded' : null}`}>
      <div
        style={{
          backgroundImage: `url('${props.src}')`,
          width: props.size,
          height: props.size,
        }}
        title={props.name}
      />
    </div>
  )
}

export default LayoutComponent
