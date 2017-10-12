import Async from '../../request/async'

import { loginSocial } from './login'
import { sendSocialLoginRequest } from './request'

export const loginWithFacebook = (fieldsMapping, permissions, stayLoggedIn, async) => {
  return loginSocial('Facebook', fieldsMapping, permissions, null, stayLoggedIn, async)
}

export const loginWithFacebookSdk = (fieldsMapping, stayLoggedIn, options) => {
  return new Promise((resolve, reject) => {
    if (!FB) {
      return reject(new Error('Facebook SDK not found'))
    }

    const async = new Async(resolve, reject)

    FB.getLoginStatus(response => {
      if (response.status === 'connected') {
        sendSocialLoginRequest(response, 'facebook', fieldsMapping, stayLoggedIn, async)
      } else {
        FB.login(response => {
          sendSocialLoginRequest(response, 'facebook', fieldsMapping, stayLoggedIn, async)
        }, options)
      }
    })
  })
}