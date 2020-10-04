const config = {
  bingAPIKey: '',
}

try {
  // eslint-disable-next-line
  const configUpdate = require('./bingmap-key').default
  Object.assign(config, configUpdate)
} catch (e) {
  // eslint-disable-next-line
  console.warn('missing config files')
}

export default config
