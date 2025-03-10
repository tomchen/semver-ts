import { Options } from '../types/Options'
import parse from './parse'

/**
 * Return the patch version number.
 *
 * @param version version string
 * @param optionsOrLoose an options object `{ loose }` (where loose is the only available option) or a boolean indicating whether to enable loose mode. In loose mode, the parser is more forgiving with imperfectly formatted semver strings
 *
 * @returns the patch version number
 *
 * @example
 * ```js
 * patch('1.2.3') // 3
 * ```
 */
const patch = (version: string, optionsOrLoose?: boolean | Options) =>
  parse(version, optionsOrLoose, true).patch

export default patch
