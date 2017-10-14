import Utils from '../../utils'
import { deprecated } from '../../decorators'

import { sendRequest } from './send-request'

const PermissionTypes = {
  GRANT: 'GRANT',
  DENY : 'DENY',
}

function grantUser(userId, object, async) {
  return sendRequest(this.permission, PermissionTypes.GRANT, object, { userId }, async)
}

function grantRole(roleName, object, async) {
  return sendRequest(this.permission, PermissionTypes.GRANT, object, { roleName }, async)
}

function grant(object, async) {
  return sendRequest(this.permission, PermissionTypes.GRANT, object, { userId: '*' }, async)
}

function denyUser(userId, object, async) {
  return sendRequest(this.permission, PermissionTypes.DENY, object, { userId }, async)
}

function denyRole(roleName, object, async) {
  return sendRequest(this.permission, PermissionTypes.DENY, object, { roleName }, async)
}

function deny(object, async) {
  return sendRequest(this.permission, PermissionTypes.DENY, object, { userId: '*' }, async)
}

class DataPermission {

  constructor(permission) {
    this.permission = permission
  }

}

//TODO: will be removed when remove sync methods
const namespaceLabel = 'Backendless.Data.Permissions.{FIND|REMOVE|UPDATE}'

Object.setPrototypeOf(DataPermission.prototype, {

  @deprecated(namespaceLabel, `${namespaceLabel}.grantUser`)
  grantUserSync: Utils.synchronized(grantUser),
  grantUser    : Utils.promisified(grantUser),

  @deprecated(namespaceLabel, `${namespaceLabel}.grantRole`)
  grantRoleSync: Utils.synchronized(grantRole),
  grantRole    : Utils.promisified(grantRole),

  @deprecated(namespaceLabel, `${namespaceLabel}.grant`)
  grantSync: Utils.synchronized(grant),
  grant    : Utils.promisified(grant),

  @deprecated(namespaceLabel, `${namespaceLabel}.denyUser`)
  denyUserSync: Utils.synchronized(denyUser),
  denyUser    : Utils.promisified(denyUser),

  @deprecated(namespaceLabel, `${namespaceLabel}.denyRole`)
  denyRoleSync: Utils.synchronized(denyRole),
  denyRole    : Utils.promisified(denyRole),

  @deprecated(namespaceLabel, `${namespaceLabel}.deny`)
  denySync: Utils.synchronized(deny),
  deny    : Utils.promisified(deny),

})

export default DataPermission
