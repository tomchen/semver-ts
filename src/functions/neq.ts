import compare from './compare'
import { Options } from '../types/Options'

/**
 * v1 != v2 The opposite of eq.
 *
 * @param v1 first version string
 * @param v2 second version string
 *
 * @returns `true` if v1 != v2, `false` if v1 == v2
 *
 * @example
 * ```js
 * neq('1.2.3', '2.0.2') // true
 * ```
 *
 * @remarks build identifier (`[+BUILD]`) is not taken into account
 */
const neq = (v1: string, v2: string, optionsOrLoose?: boolean | Options) =>
  compare(v1, v2, optionsOrLoose) !== 0

export default neq
