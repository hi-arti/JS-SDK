import Backendless from '../../bundle'
import Utils from '../../utils'
import Async from '../../request/async'
import Urls from '../../urls'

import { wrapAsync } from '../utils'

import { SocialContainer } from './container'

export function loginSocial(socialType, fieldsMapping, permissions, container, stayLoggedIn, async) {
  const socialContainer = new SocialContainer(socialType, container)

  async = Utils.extractResponder(arguments)
  async = wrapAsync(async, stayLoggedIn)

  Utils.addEvent('message', window, function(e) {
    if (e.origin === Backendless.serverURL) {
      const result = JSON.parse(e.data)

      if (result.fault) {
        async.fault(result.fault)
      } else {
        async.success(result)
      }

      Utils.removeEvent('message', window)
      socialContainer.closeContainer()
    }
  })

  const interimCallback = new Async(function(r) {
    socialContainer.doAuthorizationActivity(r)
  }, function(e) {
    socialContainer.closeContainer()
    async.fault(e)
  })

  const request = {}
  request.fieldsMapping = fieldsMapping || {}
  request.permissions = permissions || []

  Backendless._ajax({
    method      : 'POST',
    url         : Urls.userSocialOAuth(socialType),
    isAsync     : true,
    asyncHandler: interimCallback,
    data        : JSON.stringify(request)
  })
}