//@import dependencies
import React from 'react'
import { useSelector } from 'react-redux'
//@end

//@import components
import Header from 'app_components/commons/header'
import { FaviconComponent } from 'app_components/commons/helmet/favicon'
//@end

function AppComponent(props: any) {
  const [imageNavbarSrc, setImageNavbarSrc] = React.useState('')
  const [imageNavbarAlt, setImageNavbarAlt] = React.useState('')

  const auth = useSelector((state: any) => state.auth ? state.auth : null)
  const app = useSelector((state: any) => state.app ? state.app : null)
  const alliance = auth.user.alliance

  React.useEffect(() => {
    if (alliance.logo) setImageNavbarSrc(alliance.logo)
    if (alliance.name) setImageNavbarAlt(alliance.name)

  }, [auth, alliance])

  return(
    <div className={`app-layout ${(app && app.screenMode) ? app.screenMode : ''}`}>
      {props.auth && props.auth.user.alliance && props.auth.user.alliance.favicon && (
        <FaviconComponent favicon={props.auth.user.alliance.favicon} />
      )}
      <div className='wrapper'>
        <div className='main'>
          <header>
            <Header
              imageNavbarSrc={imageNavbarSrc}
              imageNavbarAlt={imageNavbarAlt}
            />
          </header>
          <main>
            {props.children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default AppComponent
