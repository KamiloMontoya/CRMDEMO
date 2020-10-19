//@import dependencies
import Swal, { SweetAlertType } from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
//@end

// @import_config_files
// @end

// @import_utils
import { I18nUtil } from 'app_utils/i18n'
// @end

interface ISwalBasic {
  status?: string,
  status_code?: string,
  message?: string,
}

interface ISwalConfig {
  title?: string,           // El título del modal, como HTML.
  html?: string,           // Una descripción HTML para el modal
  text?: string            // Una descripción para el modal. Si se proporcionan los parámetros "text" y "html" al mismo tiempo, se usará "text".
  type?: SweetAlertType,   // El tipo de modal. SweetAlert2 viene con 5 tipos integrados que mostrarán una animación de icono correspondiente: warning, error, success, info, y question
  icon?: SweetAlertType,   // El tipo de modal. SweetAlert2 viene con 5 tipos integrados que mostrarán una animación de icono correspondiente: warning, error, success, info, y question
  footer?: string,           // El footer de página del modal. Puede ser texto sin formato o HTML.
  backdrop?: boolean,          // Si esta activo muestra un fondo que permite cerrar la modal.
  toast?: boolean,          // Si una notificacion debe ser ejecutada como un Tooltip. Esta opcion puede acompañarse de los parametros de posicion y temporizacion
  input?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'range' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file' | 'url',   // Tipo del campo: text, email, password, number, tel, range, textarea, select, radio, checkbox, file y url.
  background?: string,         // Color de fondo de la ventana modal
  position?: 'top' | 'top-start' | 'top-end' | 'top-left' | 'top-right' | 'center' | 'center-start' | 'center-end' | 'center-left' | 'center-right' | 'bottom' | 'bottom-start' | 'bottom-end' | 'bottom-left' | 'bottom-right',  // Posicion de la ventana modal

  timer?: number,   // Auto cierre de modal (Milisegundos)
  allowOutsideClick?: boolean   // Si se establece en FALSE, el usuario no puede cerrar el modal haciendo clic fuera de él.
  allowEscapeKey?: boolean   // Si se establece en FALSE, el usuario no puede descartar el modal presionando la tecla "Esc"
  showConfirmButton?: boolean   // Si se establece en FALSE, no se mostrará el botón "Confirmar".
  showCancelButton?: boolean   // Si se establece en TRUE, se mostrará un botón "Cancelar", en el que el usuario puede hacer clic para descartar el modal.
  confirmButtonText?: string    // Texto del boton de confirmacion
  cancelButtonText?: string    // Texto del boton cancelar
  confirmButtonColor?: string    // Background del boton de confirmación
  cancelButtonColor?: string    // Backgroun del boton de cancelar
  showCloseButton?: boolean   // Establezca en TRUE para mostrar el botón de cierre en la esquina superior derecha del modal.
  inputPlaceholder?: string    // Input field placeholder
  inputValue?: string    // Input field initial value
  inputOptions?: {}        // Si el parámetro de entrada está configurado en "seleccionar" o "radio", puede proporcionar opciones.
  inputAttributes?: {}        // Atributos de entrada HTML (por ejemplo, min, max, autocompletar, aceptar), que se agregan al campo de entrada. Las claves de objeto representarán nombres de atributos, los valores de objeto representarán valores de atributos.
}

interface ISwalToastConfig {
  toast?: boolean,          // Si una notificacion debe ser ejecutada como un Tooltip. Esta opcion puede acompañarse de los parametros de posicion y temporizacion
  position?: 'top' | 'top-start' | 'top-end' | 'top-left' | 'top-right' | 'center' | 'center-start' | 'center-end' | 'center-left' | 'center-right' | 'bottom' | 'bottom-start' | 'bottom-end' | 'bottom-left' | 'bottom-right',  // Posicion de la ventana modal
  timer?: number,   // Auto cierre de modal (Milisegundos)
  showConfirmButton?: boolean   // Si se establece en FALSE, no se mostrará el botón "Confirmar".
}


class ScreenNotificationsUtil {

  private i18nUtil: I18nUtil
  private ignore_status: Array<any>

  constructor() {
    this.i18nUtil = new I18nUtil()
    this.ignore_status = ['fail_request_http', 'jwt_token_expired', 'jwt_token_invalid', 'jwt_unauthorized_header']
  }

  /**
   * Metodo que permite disparar una notificacion de pantalla tipo toast
   * @param basic Configuración basica de la notificacion
   * @param [options] Opciones adicionales de configuración
   */
  public fireToast = (basic: ISwalBasic = {}, options: ISwalToastConfig = {}) => {
    const config: ISwalToastConfig = {
      toast: true,
      position: 'top-right',
      timer: 3000,
      showConfirmButton: false,
      ...options,
    }
    this.fire(basic, config)
  }

  /**
   * Metodo que permite dispara una notificacion de procesando
   * @INFO Este metodo debe cerrarse de forma manual utilizando el metodo close()
   */
  public fireProcessing = () => {
    const basic: ISwalBasic = {}

    const options: ISwalConfig = {
      'type': 'warning',
      'title': this.i18nUtil.getTranslate('screenNotification.default.processing.title'),
      'text': this.i18nUtil.getTranslate('screenNotification.default.processing.text'),
      'showCancelButton': false,
      'showConfirmButton': false,
      'allowOutsideClick': false,
      'allowEscapeKey': false,
    }

    this.fire(basic, options)
  }

  /**
   * Metodo que permite disparar una notificacion de pantalla
   * @param basic Configuración basica de la notificacion
   * @param [options] Opciones adicionales de configuración
   */
  public fire = (basic: ISwalBasic, options: ISwalConfig = {}) => {
    if (!this.ignore_status.includes(basic.status_code)) {
      const config: ISwalConfig = this.buildFireConfig(basic, options)
      return Swal.fire(config)
    }
  }

  /**
   * Metodo que cierra la actual notificación
   */
  public close() {
    Swal.close()
  }


  /**
   * Metodo que permite configurar la notificación a lanzar
   * @param basic Configuración basica de la notificacion
   * @param [options] Opciones adicionales de configuración
   * @returns
   */
  private buildFireConfig(basic: ISwalBasic, options: ISwalConfig = {}) {

    let config: ISwalConfig = {
      backdrop: true,
      toast: false,
      allowOutsideClick: true,
      allowEscapeKey: true,
      showConfirmButton: true,
      showCancelButton: false,
      showCloseButton: false,
    }

    if (basic) {
      if (basic.hasOwnProperty('status')) {
        if (basic.status === 'success') {
          config.title = this.i18nUtil.getTranslate('screenNotification.default.title.success')
          config.type = 'success'
        } else if (basic.status === 'error') {
          config.title = this.i18nUtil.getTranslate('screenNotification.default.title.error')
          config.type = 'error'
        }
      }

      if (basic.hasOwnProperty('message') && basic.message !== 'success') {
        config.html = basic.message
      }
    }

    config['confirmButtonText'] = this.i18nUtil.getTranslate('screenNotification.default.confirm_button')
    config['cancelButtonText'] = this.i18nUtil.getTranslate('screenNotification.default.cancel_button')

    let endConfig = {
      ...config,
      ...options,
    }

    if (endConfig.type) endConfig.icon = endConfig.type

    if (endConfig.toast === true) {
      if (endConfig.hasOwnProperty('backdrop')) delete endConfig['backdrop']
      if (endConfig.hasOwnProperty('allowOutsideClick')) delete endConfig['allowOutsideClick']
    }

    return endConfig
  }
}

export { ScreenNotificationsUtil }
