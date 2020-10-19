//@import dependencies
import i18n from '../i18n.js'
//@end

// @Plugin: https://www.i18next.com/
// @Plugin: https://react.i18next.com/

interface IAddResourceBundle {
  lng       : string,
  resources : object,
  ns?       : string,
  deep?     : boolean,
  overwrite?: boolean,
}

class I18nUtil {

  /**
   * Metodo que permite conocer cual es el idioma actual del sistema
   * @returns
   */
  public language = () => {
    return i18n.language
  }

  /**
   * Metodo que permite cambiar el idioma del sistema
   * @param language Idioma a cambiar
   */
  public use = (language: string) => {
    i18n.changeLanguage(language)
  }

  /**
   * Metodo que permite obtener la internacionalización de un valor
   * @param keys Cadena de texto o array de textos con la llave a internacionalizar
   * @param [options] Parametros de la traducción
   * @returns
   */
  public getTranslate = (keys: string | Array<string>, options: any = {}) => {
    return i18n.t(keys, options)
  }

  /**
   * Agrega o actualiza datos de los recursos
   * @param data
   */
  public addResourceBundle = (data: IAddResourceBundle) => {

    let config = {
      ns: 'translation',
      deep: true,
      overwrite: true,
      ...data,

    }
    i18n.addResourceBundle(config.lng, config.ns, data.resources, config.deep, config.overwrite)
  }
}

export { I18nUtil }
