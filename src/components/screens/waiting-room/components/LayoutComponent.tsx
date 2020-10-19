//@import dependencies
import React from 'react'
import {useTranslation} from 'react-i18next'
//@end

function LayoutComponent(props: any) {
  const image = {
    kuepaLogo: require('app_assets/images/icons/ket.png'),
    notFoundImage: require('app_assets/images/icons/page-not-found.svg'),
  }

  const {t} = useTranslation()

  return (
    <div className='containerWaitingRoom'>
      <div className=''>
        <div className='containerLogo'>
          <div>
            <img src={image.kuepaLogo} width='60' alt='logo' />
          </div>
        </div>
        <div className='containerCenter'>
            <div className='textContainer'>
              <div>
                <p className='title'>{t('waiting_room.title')}</p>
              </div>
              <p className='info'>{t('waiting_room.message')}</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutComponent
