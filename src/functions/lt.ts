import compare from './compare'
import { Options } from '../types/Options'

/**
 * v1 < v2 This is true if v1 is less than v2.
 *
 * @param v1 first version string
 * @param v2 second version string
 * @param optionsOrLoose an options object `{ loose }` (where loose is the only available option) or a boolean indicating whether to enable loose mode. In loose mode, the parser is more forgiving with imperfectly formatted semver strings
 *
 * @returns `true` if v1 < v2, `false` if v1 >= v2
 *
 * @example
 * ```js
 * lt('1.2.3', '2.0.2') // true
 * ```
 *
 * @remarks build identifier (`[+BUILD]`) is not taken into account
 **/
const lt = (v1: string, v2: string, optionsOrLoose?: boolean | Options) =>
  compare(v1, v2, optionsOrLoose) < 0

export default lt
