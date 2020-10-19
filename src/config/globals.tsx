//@import_config_files
const env = require('./env.json')
//@end

//@export_this_env
export const external_api         = (env.hasOwnProperty('external_api')) ? env['external_api'] : {}
export const main_external_api    = (env.hasOwnProperty('main_external_api')) ? env['main_external_api'] : null
export const main_external_socket = (env.hasOwnProperty('main_external_socket')) ? env['main_external_socket'] : null

export const default_language = (env.hasOwnProperty('default_language')) ? env['default_language']: 'es'
export const has_site         = (env.hasOwnProperty('has_site')) ? env['has_site']                : true
export const secure_home      = (env.hasOwnProperty('secure_home')) ? env['secure_home']          : null
export const google_analytics = (env.hasOwnProperty('google_analytics')) ? env['google_analytics'] : null
//@end

export const secure_home_path = (secure_home && typeof secure_home === 'string') ? `${(secure_home)}` : `/home`
export const has_secure       = (secure_home && typeof secure_home === 'string') ? true : false
