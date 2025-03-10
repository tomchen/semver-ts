import { Options } from '../types/Options'
import parse from './parse'

/**
 * Return the parsed version as a string, or `null` if it's not valid.
 *
 * @param version version string
 * @param optionsOrLoose an options object `{ loose }` (where loose is the only available option) or a boolean indicating whether to enable loose mode. In loose mode, the parser is more forgiving with imperfectly formatted semver strings
 *
 * @returns the parsed version as a string, or `null` if it's not valid
 *
 * @example
 * ```js
 * valid('1.2.3') // '1.2.3'
 * valid('1.2.3-foo.bar+build.12345') // 1.2.3-foo.bar
 * valid('1.2') // null
 * ```
 */
const valid = (version: string, optionsOrLoose?: boolean | Options) => {
  const v = parse(version, optionsOrLoose)
  return v ? v.version : null
}

export default valid
