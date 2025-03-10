import compareCore from './compareCore'
import { Options } from '../types/Options'
import parse from './parse'

/**
 * Compares two versions excluding build identifiers (the bit after `+` in the semantic version string).
 *
 * @param v1 first version string
 * @param v2 second version string
 * @param optionsOrLoose an options object `{ loose }` (where loose is the only available option) or a boolean indicating whether to enable loose mode. In loose mode, the parser is more forgiving with imperfectly formatted semver strings
 *
 * @returns
 * - `0` if `v1` == `v2`
 * - `1` if `v1` > `v2`
 * - `-1` if `v1` < `v2`
 *
 * @example
 * ```js
 * compare('1.2.3', '1.2.2') // 1
 * ```
 *
 * @remarks `versionArray.sort(compare)` can sort in ascending order for `MAJOR.MINOR.PATCH[-PRERELEASE]`, excluding build identifier (`[+BUILD]`). This is different from `sort()`, which also sorts in ascending order but for the whole `MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]`
 */
const compare = (v1: string, v2: string, optionsOrLoose?: boolean | Options) =>
  compareCore(parse(v1, optionsOrLoose, true), parse(v2, optionsOrLoose, true))

export default compare
