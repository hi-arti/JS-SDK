import Backendless from '../bundle'
import Utils from '../utils'
import Urls from '../urls'

export function expireIn(key, seconds /**, async */) {
  if (Utils.isString(key) && (Utils.isNumber(seconds) || Utils.isDate(seconds)) && seconds) {
    seconds = (Utils.isDate(seconds)) ? seconds.getTime() : seconds

    let responder = Utils.extractResponder(arguments)
    const isAsync = !!responder

    if (responder) {
      responder = Utils.wrapAsync(responder)
    }

    return Backendless._ajax({
      method      : 'PUT',
      url         : Urls.cacheItemExpireIn(key) + '?timeout=' + seconds,
      data        : JSON.stringify({}),
      isAsync     : isAsync,
      asyncHandler: responder
    })

  } else {
    throw new Error('The "key" argument must be String. The "seconds" argument can be either Number or Date')
  }
}