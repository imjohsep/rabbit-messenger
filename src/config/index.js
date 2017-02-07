const env = process.env.NODE_ENV
const config = require(`./${env || 'production'}`).default
export default config
