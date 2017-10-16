import FilesUtils from './utils'

import { doAction } from './action'

export function copyFile(sourcePath, targetPath, asyncHandler) {

  const parameters = {
    sourcePath: FilesUtils.ensureSlashInPath(sourcePath),
    targetPath: FilesUtils.ensureSlashInPath(targetPath)
  }

  return doAction('copy', parameters, asyncHandler)
}
