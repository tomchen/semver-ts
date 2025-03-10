import compare from './compare'
import { Options } from '../types/Options'

/**
 * v1 == v2 This is true if they're logically equivalent, even if they're not the exact same string. You already know how to compare strings.
 *
 * @param v1 first version string
 * @param v2 second version string
 * @param optionsOrLoose an options object `{ loose }` (where loose is the only available option) or a boolean indicating whether to enable loose mode. In loose mode, the parser is more forgiving with imperfectly formatted semver strings
 *
 * @returns `true` if v1 == v2, `false` if v1 != v2
 *
 * @example
 * ```js
 * eq('1.2.3', '1.2.3') // true
 * ```
 *
 * @remarks build identifier (`[+BUILD]`) is not taken into account
 */
const eq = (v1: string, v2: string, optionsOrLoose?: boolean | Options) =>
  compare(v1, v2, optionsOrLoose) === 0

export default eq
