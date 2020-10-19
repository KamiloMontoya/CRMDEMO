//@import pages
import HomeScreen from 'app_components/screens/home'
import LoginScreen from 'app_components/screens/login'
import {Twilio, TwilioDetailsScreen} from 'app_components/screens/twilio'
import WaitingRoomScreen from 'app_components/screens/waiting-room'
//@end

export const routes = [
  {
    path: '/login',
    exact: true,
    component: LoginScreen,
  },
  {
    path: '/login-by-token/:token',
    exact: true,
    component: WaitingRoomScreen,
  },
  {
    path: '/',
    exact: true,
    component: HomeScreen,
    isSecure: true,
  },
  {
    path: '/twilio',
    exact: true,
    component: Twilio,
    isSecure: false,
  },
  {
    path: '/twilio-details/:number?',
    exact: true,
    component: TwilioDetailsScreen,
    isSecure: false,
  },
]
