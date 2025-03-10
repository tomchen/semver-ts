import compare from './compare'
import { Options } from '../types/Options'

/**
 * The reverse of compare.
 *
 * @param v1 first version string
 * @param v2 second version string
 * @param optionsOrLoose an options object `{ loose }` (where loose is the only available option) or a boolean indicating whether to enable loose mode. In loose mode, the parser is more forgiving with imperfectly formatted semver strings
 *
 * @remarks `versionArray.sort(rcompare)` can sort in descending order for `MAJOR.MINOR.PATCH[-PRERELEASE]`, excluding build identifier (`[+BUILD]`). This is different from `rsort()`, which also sorts in descending order but for the whole `MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]`
 *
 * @returns
 * - `0` if `v1` == `v2`
 * - `-1` if `v1` > `v2`
 * - `1` if `v1` < `v2`
 *
 * @example
 * ```js
 * rcompare('1.2.3', '1.2.4') // 1
 * ```
 */
const rcompare = (v1: string, v2: string, optionsOrLoose?: boolean | Options) =>
  compare(v2, v1, optionsOrLoose)

export default rcompare
