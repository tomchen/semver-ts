import compare from './compare'

/**
 * Compare with loose mode enabled
 *
 * @param v1 first version string
 * @param v2 second version string
 *
 * @returns
 * - `0` if `v1` == `v2`
 * - `1` if `v1` > `v2`
 * - `-1` if `v1` < `v2`
 *
 * @example
 * ```js
 * compareLoose('1.2.3', '1.2.3') // 0
 * ```
 *
 * @remarks build identifier (`[+BUILD]`) is not taken into account
 */
const compareLoose = (v1: string, v2: string) => compare(v1, v2, true)

export default compareLoose
