import compareCore from './compareCore'
import compareIdentifiers from '../utils/compareIdentifiers'
import { Options } from '../types/Options'
import parse from './parse'

const compareBuildCore = (
  build1: ReadonlyArray<string>,
  build2: ReadonlyArray<string>,
): 0 | 1 | -1 => {
  let i = 0
  while (true) {
    const a = build1[i]
    const b = build2[i]

    if (a === undefined && b === undefined) {
      return 0
    }
    if (b === undefined) {
      return 1
    }
    if (a === undefined) {
      return -1
    }
    if (a !== b) {
      return compareIdentifiers(a, b)
    }

    i++
  }
}

/**
 * Compares two versions including build identifiers (the bit after `+` in the semantic version string).
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
 * compareBuild('1.2.3foo', '1.2.3-foo') // 0
 * ```
 */
const compareBuild = (
  v1: string,
  v2: string,
  optionsOrLoose?: boolean | Options,
) => {
  const parsedV1 = parse(v1, optionsOrLoose, true)
  const parsedV2 = parse(v2, optionsOrLoose, true)
  return (
    compareCore(parsedV1, parsedV2) ||
    compareBuildCore(parsedV1.build, parsedV2.build)
  )
}

export default compareBuild
