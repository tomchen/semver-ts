import { Options } from '../types/Options'

// same as https://github.com/npm/node-semver/blob/main/internal/parse-options.js
const parseOptions = (options?: boolean | Options) => {
  if (!options) {
    return false
  } else if (typeof options !== 'object') {
    return true
  }
  return !!options.loose
}

export default parseOptions
