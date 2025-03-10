import { Options } from '../types/Options'
import parse from './parse'

/**
 * Returns cleaned (removed leading/trailing whitespace, remove '=', 'v' prefixes) and parsed version, or `null` if version is invalid.
 *
 * @param version version string
 * @param optionsOrLoose an options object `{ loose }` (where loose is the only available option) or a boolean indicating whether to enable loose mode. In loose mode, the parser is more forgiving with imperfectly formatted semver strings
 *
 * @returns cleaned version string or `null` if version is invalid
 *
 * @example
 * ```js
 * clean('  =v1.2.3  ') // '1.2.3'
 * ```
 */
const clean = (version: string, optionsOrLoose?: boolean | Options) => {
  const s = parse(version.trim().replace(/^[=v]+/, ''), optionsOrLoose)
  return s ? s.version : null
}

export default clean
