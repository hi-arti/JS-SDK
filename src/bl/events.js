import Backendless from '../bundle'
import Utils from '../utils'
import Async from '../request/async'
import Urls from '../urls'

export default class Events {

  constructor() {
    // this.restUrl = Backendless.appPath + '/servercode/events'
  }

  dispatch = Utils.promisified('_dispatch')

  dispatchSync = Utils.synchronized('_dispatch')

  _dispatch(eventName, eventArgs) {
    if (!eventName || !Utils.isString(eventName)) {
      throw new Error('Event Name must be provided and must be not an empty STRING!')
    }

    eventArgs = (Utils.isObject(eventArgs) && !(eventArgs instanceof Async)) ? eventArgs : {}

    let responder = Utils.extractResponder(arguments)

    if (responder) {
      responder = Utils.wrapAsync(responder)
    }

    eventArgs = eventArgs instanceof Async ? {} : eventArgs

    return Backendless._ajax({
      method      : 'POST',
      url         : Urls.blEvent(eventName),
      data        : JSON.stringify(eventArgs),
      isAsync     : !!responder,
      asyncHandler: responder
    })
  }
}

