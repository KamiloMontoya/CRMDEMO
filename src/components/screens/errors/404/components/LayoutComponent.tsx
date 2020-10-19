//@import dependencies
import React from 'react'
import { useTranslation } from 'react-i18next'
//@end

function LayoutComponent(props: any) {
  const { t } = useTranslation()

  const image = {
    notFoundImage: require('app_assets/images/icons/page-not-found.svg'),
  }

  return(
    <div className='containerErrorCenter'>
      <div className=''>
        <div className='containerErrorInfo'>
          <div className='containerErrorPrincipal'>
            <div className='containerErrorImage'>
              <img src={image.notFoundImage} alt='logo' width='90' height='' />
            </div>
            <div className='containerErrorTitle'>
              <p className='mb-0'>{t('errors.404.content')}</p>
              <p className='mt-0'>(404)</p>
            </div>
          </div>
          <div className=''>
            <p className='h5'>{t('errors.404.info')}</p>
            <p className='h6'>{t('errors.404.description')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutComponent
