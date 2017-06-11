/*eslint global-require:0*/
import Electron from 'electron';
const remote = Electron.remote;
const env = remote.getGlobal("appEnv").nodeEnv;
if (env.NODE_ENV === 'production') {
  module.exports = require('./configureStore.production');
} else {
  module.exports = require('./configureStore.development');
}
