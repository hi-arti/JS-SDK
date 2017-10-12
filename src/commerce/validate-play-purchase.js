import Backendless from '../bundle'
import Utils from '../utils'
import Urls from '../urls'

import { validateStringArgument } from './validate-string-argument'

export function validatePlayPurchase(packageName, productId, token, async) {
  validateStringArgument('Package Name', packageName)
  validateStringArgument('Product Id', productId)
  validateStringArgument('Token', token)

  if (async) {
    async = Utils.wrapAsync(async)
  }

  return Backendless._ajax({
    method      : 'GET',
    url         : Urls.commerceValidate(packageName, productId, token),
    isAsync     : !!async,
    asyncHandler: async
  })
}