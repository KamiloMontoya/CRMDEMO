// @import dependencies
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
// @end

interface loginLayoutProps {
  alliance: any
  onSubmit: (data: any) => any,
}

const LoginLayout: React.FC<loginLayoutProps> = (props) => {

  const { t } = useTranslation()

  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (data: any) => props.onSubmit(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className='form-group'>
        <select id='alliance_id' name='alliance_id' className='form-control' ref={register()}>
          {props.alliance && props.alliance.data && props.alliance.data.alliances && props.alliance.data.alliances.map((alliance: any) => (
            <option key={alliance._id} value={alliance._id}>
              {alliance.name}
            </option>
          ))}
        </select>
        <label htmlFor='password'>
          {t('login.form.fields.alliance')}
        </label>
      </div>

      <div className='form-group'>
        <input
          id='username'
          name='username'
          type='text'
          className={`form-control ${errors.username && 'is-invalid'}`}
          ref={register({ required: true })}
          placeholder=' '
          required
        />
        <label htmlFor='username'>
          {t('login.form.fields.username')}
        </label>
        {errors.username && (
          <div className='invalid-feedback'>{t('forms.required')}</div>
        )}
      </div>

      <div className='form-group'>
        <input
          id='password'
          name='password'
          type='password'
          className={`form-control ${errors.password && 'is-invalid'}`}
          ref={register({ required: true })}
          placeholder=' '
          required
        />
        <label htmlFor='password'>
          {t('login.form.fields.password')}
        </label>
        {errors.password && (
          <div className='invalid-feedback'>{t('forms.required')}</div>
        )}
      </div>

      <button type='submit' className='btn btn-primary'>{t('login.form.btn_login')}</button>
    </form>
  )
}

export default LoginLayout
