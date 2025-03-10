import { Options } from '../types/Options'
import parse from './parse'

/**
 * Return the minor version number.
 *
 * @param version version string
 * @param optionsOrLoose an options object `{ loose }` (where loose is the only available option) or a boolean indicating whether to enable loose mode. In loose mode, the parser is more forgiving with imperfectly formatted semver strings
 *
 * @returns the minor version number
 *
 * @example
 * ```js
 * minor('1.2.3') // 2
 * ```
 */
const minor = (version: string, optionsOrLoose?: boolean | Options) =>
  parse(version, optionsOrLoose, true).minor

export default minor
