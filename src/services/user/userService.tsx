import { store } from 'app_storage/redux-storage'
import { IUser } from 'app_utils/types/userTypes'

class UserService {

  private storeObject: any

  constructor() {
    this.storeObject = store
  }

  can(action: string, moduleName: string) {
    const user = this.getUserState()

    if (user?.data?.permissions) {
      if (
        user?.data?.permissions[moduleName] !== undefined &&
        user?.data?.permissions[moduleName]?.includes(action)
      ) {
        return true
      }
    }

    return false
  }

  canAccess(moduleName: string) {
    const user = this.getUserState()

    if (user?.data?.permissions) {
      if (user?.data?.permissions[moduleName] !== undefined) {
        return true
      }
    }

    return false
  }

  private getUserState() {
    const state = this.storeObject.getState()
    const user: IUser = state.auth.user

    return user
  }

}

export default UserService
