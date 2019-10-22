// @flow
// preload script for renderer process
// defines subset of Electron API that renderer process is allowed to access
// for security reasons
import { ipcRenderer, remote } from 'electron'
import cloneDeep from 'lodash/cloneDeep'

const {
  getConfig,
  getRobots,
  CURRENT_VERSION,
  CURRENT_RELEASE_NOTES,
} = remote.require('./exports')

global.APP_SHELL_REMOTE = {
  ipcRenderer,
  CURRENT_VERSION,
  CURRENT_RELEASE_NOTES,
  INITIAL_CONFIG: cloneDeep(getConfig()),
  INITIAL_ROBOTS: getRobots(),
}
