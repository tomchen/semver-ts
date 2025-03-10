import { Options } from '../types/Options'
import parse from './parse'

/**
 * Return the major version number.
 *
 * @param version version string
 * @param optionsOrLoose an options object `{ loose }` (where loose is the only available option) or a boolean indicating whether to enable loose mode. In loose mode, the parser is more forgiving with imperfectly formatted semver strings
 *
 * @returns the major version number
 *
 * @example
 * ```js
 * major('1.2.3') // 1
 * ```
 */
const major = (version: string, optionsOrLoose?: boolean | Options) =>
  parse(version, optionsOrLoose, true).major

export default major
