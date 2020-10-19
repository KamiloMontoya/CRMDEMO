//@import dependencies
import React from 'react'
import { useTranslation } from 'react-i18next'
//@end

function PreloaderComponent(props: any) {

  const { t } = useTranslation()

  let preloaderClasses = `preloader-overlay ${props.classes}`
  return(
    <div className={preloaderClasses} >
      <div className='preloader'>
        <div className='lines'>
          <div className='line line-1'></div>
          <div className='line line-2'></div>
          <div className='line line-3'></div>
        </div>
        <div className='loading-text'>{t('loading')}</div>
      </div>
    </div>
  )
}

export default PreloaderComponent